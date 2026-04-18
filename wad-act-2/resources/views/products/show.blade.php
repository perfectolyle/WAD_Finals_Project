@extends('layouts.app')

@section('title', $product->name)
@section('page-title', $product->name)

@section('actions')
    <a href="{{ route('products.index') }}" class="btn btn-secondary">← Back</a>
    @if(auth()->user()->isAdmin())
        <a href="{{ route('products.edit', $product) }}" class="btn btn-primary">Edit</a>
    @endif
@endsection

@section('content')
<div class="card" style="margin-bottom: 24px;">
    <div class="card-header">Product Details</div>
    <div class="card-body">
        <div class="detail-grid">
            <div class="detail-label">ID</div>
            <div class="detail-value">{{ $product->id }}</div>

            <div class="detail-label">Name</div>
            <div class="detail-value">{{ $product->name }}</div>

            <div class="detail-label">Price</div>
            <div class="detail-value" style="color: var(--success); font-weight: 600;">₱{{ number_format($product->price, 2) }}</div>

            <div class="detail-label">Stock</div>
            <div class="detail-value">{{ $product->stock }}</div>

            <div class="detail-label">Created</div>
            <div class="detail-value">{{ $product->created_at->format('M d, Y h:i A') }}</div>
        </div>
    </div>
</div>

@if($product->orders->count())
<div class="card">
    <div class="card-header">Orders Containing This Product</div>
    <div class="card-body">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($product->orders as $order)
                    <tr>
                        <td><a href="{{ route('orders.show', $order) }}" style="color: var(--accent);">#{{ $order->id }}</a></td>
                        <td>{{ $order->user->name }}</td>
                        <td>{{ $order->pivot->quantity }}</td>
                        <td>₱{{ number_format($order->pivot->unit_price, 2) }}</td>
                        <td style="font-weight: 600;">₱{{ number_format($order->pivot->quantity * $order->pivot->unit_price, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endif
@endsection
