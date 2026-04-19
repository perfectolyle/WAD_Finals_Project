<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

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

        return view('orders.index', compact('orders', 'search'));
    }

    /**
     * Show the form for creating a new order.
     */
    public function create()
    {
        $products = Product::where('stock', '>', 0)->get();
        return view('orders.create', compact('products'));
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
            $unitPrice = $product->price;
            $totalAmount += $unitPrice * $item['quantity'];
            $pivotData[$product->id] = [
                'quantity'   => $item['quantity'],
                'unit_price' => $unitPrice,
            ];
        }

        $order = Order::create([
            'user_id'      => auth()->id(),
            'order_date'   => now(),
            'total_amount' => $totalAmount,
        ]);

        // Attach products with pivot data (Many-to-Many via order_items)
        $order->products()->attach($pivotData);

        return redirect()->route('orders.index')
            ->with('success', 'Order placed successfully.');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        Gate::authorize('view', $order);

        // Eager loading the related user and products
        $order->load(['user.profile', 'products']);

        return view('orders.show', compact('order'));
    }

    /**
     * Show the form for editing the specified order.
     */
    public function edit(Order $order)
    {
        Gate::authorize('update', $order);

        $order->load('products');
        $products = Product::all();
        return view('orders.edit', compact('order', 'products'));
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

        foreach ($validated['products'] as $item) {
            $product = Product::findOrFail($item['id']);
            $unitPrice = $product->price;
            $totalAmount += $unitPrice * $item['quantity'];
            $pivotData[$product->id] = [
                'quantity'   => $item['quantity'],
                'unit_price' => $unitPrice,
            ];
        }

        $order->update(['total_amount' => $totalAmount]);

        // Sync products (replaces existing pivot rows)
        $order->products()->sync($pivotData);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Order updated successfully.');
    }

    /**
     * Remove the specified order.
     */
    public function destroy(Order $order)
    {
        Gate::authorize('delete', $order);

        $order->delete();

        return redirect()->route('orders.index')
            ->with('success', 'Order deleted successfully.');
    }

}
