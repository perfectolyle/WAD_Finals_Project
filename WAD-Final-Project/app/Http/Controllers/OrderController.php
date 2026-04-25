<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     * Admin sees all orders; regular user sees only their own.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $search = $request->query('search');

        if ($user->isAdmin()) {
            $orders = Order::with('user', 'products')
                ->when($search, function ($query, $search) {
                    $query->where('id', 'like', "%{$search}%")
                          ->orWhereHas('user', function ($q) use ($search) {
                              $q->where('name', 'like', "%{$search}%");
                          });
                })
                ->latest('id')
                ->paginate(10);
        } else {
            $orders = $user->orders()
                ->with('products')
                ->when($search, function ($query, $search) {
                    $query->where('id', 'like', "%{$search}%");
                })
                ->latest('id')
                ->paginate(10);
        }

        return Inertia::render('orders/index', [
            'orders'  => $orders,
            'search'  => $search,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create()
    {
        $products = Product::where('stock', '>', 0)->get();
        return Inertia::render('orders/create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'products'            => ['required', 'array', 'min:1'],
            'products.*.id'       => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $totalAmount = 0;
        $pivotData = [];

        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['id']);

            if ($product->stock < $item['quantity']) {
                return back()->withInput()->withErrors([
                    'products' => "Insufficient stock for product: {$product->name}. Only {$product->stock} available."
                ]);
            }

            $unitPrice = $product->price;
            $totalAmount += $unitPrice * $item['quantity'];
            $pivotData[$product->id] = [
                'quantity'   => $item['quantity'],
                'unit_price' => $unitPrice,
            ];
        }

        DB::transaction(function () use ($validated, $pivotData, $totalAmount) {
            $order = Order::create([
                'user_id'      => auth()->id(),
                'order_date'   => now(),
                'total_amount' => $totalAmount,
            ]);

            // Attach products with pivot data (Many-to-Many via order_items)
            $order->products()->attach($pivotData);

            // Deduct stock
            foreach ($pivotData as $productId => $data) {
                Product::where('id', $productId)->decrement('stock', $data['quantity']);
            }
        });

        return redirect()->route('orders.index')
            ->with('success', 'Order placed successfully.');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        Gate::authorize('view', $order);

        $order->load(['user.profile', 'products']);

        return Inertia::render('orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified order.
     */
    public function edit(Order $order)
    {
        Gate::authorize('update', $order);

        $order->load('products');
        $products = Product::all();
        return Inertia::render('orders/edit', [
            'order'    => $order,
            'products' => $products,
        ]);
    }

    /**
     * Update the specified order.
     */
    public function update(Request $request, Order $order)
    {
        Gate::authorize('update', $order);

        $validated = $request->validate([
            'products'            => ['required', 'array', 'min:1'],
            'products.*.id'       => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $totalAmount = 0;
        $pivotData = [];

        // Pre-check stock
        $order->load('products');
        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['id']);
            $oldProduct = $order->products->firstWhere('id', $item['id']);
            $oldQuantity = $oldProduct ? $oldProduct->pivot->quantity : 0;

            if (($product->stock + $oldQuantity) < $item['quantity']) {
                return back()->withInput()->withErrors([
                    'products' => "Insufficient stock for product: {$product->name}. Only " . ($product->stock + $oldQuantity) . " available."
                ]);
            }
        }

        DB::transaction(function () use ($order, $validated, &$pivotData, &$totalAmount) {
            // Restore old stock
            foreach ($order->products as $oldProduct) {
                $oldProduct->increment('stock', $oldProduct->pivot->quantity);
            }

            foreach ($validated['products'] as $item) {
                $product = Product::findOrFail($item['id']);
                $unitPrice = $product->price;
                $totalAmount += $unitPrice * $item['quantity'];
                $pivotData[$product->id] = [
                    'quantity'   => $item['quantity'],
                    'unit_price' => $unitPrice,
                ];

                // Deduct new stock
                $product->decrement('stock', $item['quantity']);
            }

            $order->update(['total_amount' => $totalAmount]);

            // Sync products (replaces existing pivot rows)
            $order->products()->sync($pivotData);
        });

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified order.
     */
    public function destroy(Order $order)
    {
        Gate::authorize('delete', $order);

        DB::transaction(function () use ($order) {
            // Restore stock before deleting
            foreach ($order->products as $product) {
                $product->increment('stock', $product->pivot->quantity);
            }

            $order->delete();
        });

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }
}
