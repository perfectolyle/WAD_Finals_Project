@extends('layouts.app')

@section('title', 'Order #' . $order->id)
@section('page-title', 'Order #' . $order->id)

@section('actions')
    <a href="{{ route('orders.index') }}" class="btn btn-secondary">← Back</a>
    @if(auth()->user()->isAdmin() || $order->user_id === auth()->id())
        <a href="{{ route('orders.edit', $order) }}" class="btn btn-primary">Edit</a>
    @endif
@endsection

@section('content')
<div class="card" style="margin-bottom: 24px;">
    <div class="card-header">Order Details</div>
    <div class="card-body">
        <div class="detail-grid">
            <div class="detail-label">Order ID</div>
            <div class="detail-value">#{{ $order->id }}</div>

            <div class="detail-label">Customer</div>
            <div class="detail-value">
                {{ $order->user->name }}
                @if($order->user->profile)
                    <span style="color: var(--text-muted); font-size: 0.82rem;">— {{ $order->user->profile->phone_no }}</span>
                @endif
            </div>

            <div class="detail-label">Order Date</div>
            <div class="detail-value">{{ \Carbon\Carbon::parse($order->order_date)->format('F d, Y h:i A') }}</div>

            <div class="detail-label">Total Amount</div>
            <div class="detail-value" style="color: var(--success); font-weight: 700; font-size: 1.2rem;">
                ₱{{ number_format($order->total_amount, 2) }}
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header">Order Items</div>
    <div class="card-body">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->products as $product)
                    <tr>
                        <td style="color: var(--text-primary); font-weight: 500;">
                            <a href="{{ route('products.show', $product) }}" style="color: var(--accent); text-decoration: none;">
                                {{ $product->name }}
                            </a>
                        </td>
                        <td>₱{{ number_format($product->pivot->unit_price, 2) }}</td>
                        <td>{{ $product->pivot->quantity }}</td>
                        <td style="font-weight: 600; color: var(--text-primary);">
                            ₱{{ number_format($product->pivot->quantity * $product->pivot->unit_price, 2) }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align: right; font-weight: 700; color: var(--text-primary);">Grand Total</td>
                        <td style="font-weight: 700; color: var(--success); font-size: 1.05rem;">
                            ₱{{ number_format($order->total_amount, 2) }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>
@endsection
