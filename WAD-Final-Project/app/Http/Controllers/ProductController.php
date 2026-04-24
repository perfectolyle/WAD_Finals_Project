<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ProductController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('admin', except: ['index', 'show']),
        ];
    }

    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $products = Product::when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%");
        })->latest('id')->paginate(10);

        return Inertia::render('products/index', [
            'products' => $products,
            'search'   => $search,
            'isAdmin'  => $request->user()?->isAdmin() ?? false,
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('products/create');
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        Product::create($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product with related orders.
     */
    public function show(Product $product)
    {
        $product->load(['orders.user']);
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $product->update($validated);

        return redirect()->route('products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
