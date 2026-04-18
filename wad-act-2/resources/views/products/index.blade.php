@extends('layouts.app')

@section('title', 'Products')
@section('page-title', 'Products')

@section('search')
    <form method="GET" action="{{ route('products.index') }}" class="search-form">
        <span class="search-icon">🔍</span>
        <input type="search" name="search" value="{{ request('search') }}" 
               placeholder="Search products..." class="search-input"
               @if(request('search')) autofocus onfocus="var v=this.value; this.value=''; this.value=v;" @endif
               oninput="clearTimeout(this.timeout); this.timeout = setTimeout(() => { this.form.submit(); }, 600);">
    </form>
@endsection

@section('actions')
    @if(auth()->user()->isAdmin())
        <a href="{{ route('products.create') }}" class="btn btn-primary">+ Add Product</a>
    @endif
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($products->count())
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($products as $product)
                    <tr>
                        <td style="color: var(--text-primary); font-weight: 600;">{{ $product->id }}</td>
                        <td style="color: var(--text-primary);">{{ $product->name }}</td>
                        <td style="color: var(--success); font-weight: 600;">₱{{ number_format($product->price, 2) }}</td>
                        <td>
                            @if($product->stock > 10)
                                <span class="badge" style="background: var(--success-bg); color: var(--success);">{{ $product->stock }} in stock</span>
                            @elseif($product->stock > 0)
                                <span class="badge" style="background: var(--warning-bg); color: var(--warning);">{{ $product->stock }} left</span>
                            @else
                                <span class="badge" style="background: var(--danger-bg); color: var(--danger);">Out of stock</span>
                            @endif
                        </td>
                        <td>{{ $product->created_at->format('M d, Y') }}</td>
                        <td>
                            <div class="table-actions">
                                <a href="{{ route('products.show', $product) }}" class="btn btn-secondary btn-sm">View</a>
                                @if(auth()->user()->isAdmin())
                                    <a href="{{ route('products.edit', $product) }}" class="btn btn-success btn-sm">Edit</a>
                                    <form class="inline" method="POST" action="{{ route('products.destroy', $product) }}"
                                          onsubmit="return confirm('Delete this product?')">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                                    </form>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="pagination">{{ $products->appends(['search' => request('search')])->links() }}</div>
        @else
        <div class="empty-state">
            <div class="icon">📦</div>
            <p>No products found.</p>
            @if(auth()->user()->isAdmin())
                <a href="{{ route('products.create') }}" class="btn btn-primary">Add First Product</a>
            @endif
        </div>
        @endif
    </div>
</div>
@endsection
