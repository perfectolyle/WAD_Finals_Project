@extends('layouts.app')

@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')
<div class="stats-grid">
    @if(auth()->user()->isAdmin())
    <div class="stat-card">
        <div class="stat-label">Total Customers</div>
        <div class="stat-value">{{ $totalCustomers }}</div>
    </div>
    @endif
    <div class="stat-card">
        <div class="stat-label">Total Products</div>
        <div class="stat-value">{{ $totalProducts }}</div>
    </div>
    <div class="stat-card">
        <div class="stat-label">{{ auth()->user()->isAdmin() ? 'Total Orders' : 'My Orders' }}</div>
        <div class="stat-value">{{ $totalOrders }}</div>
    </div>
</div>

<div class="card">
    <div class="card-header">Recent Orders</div>
    <div class="card-body">
        @if($recentOrders->count())
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Order #</th>
                        @if(auth()->user()->isAdmin())<th>Customer</th>@endif
                        <th>Date</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($recentOrders as $order)
                    <tr>
                        <td style="color: var(--text-primary); font-weight: 600;">#{{ $order->id }}</td>
                        @if(auth()->user()->isAdmin())
                        <td>{{ $order->user->name }}</td>
                        @endif
                        <td>{{ \Carbon\Carbon::parse($order->order_date)->format('M d, Y') }}</td>
                        <td>{{ $order->products->count() }} item(s)</td>
                        <td style="color: var(--success); font-weight: 600;">₱{{ number_format($order->total_amount, 2) }}</td>
                        <td>
                            <a href="{{ route('orders.show', $order) }}" class="btn btn-secondary btn-sm">View</a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @else
        <div class="empty-state">
            <div class="icon">📋</div>
            <p>No orders yet.</p>
            <a href="{{ route('orders.create') }}" class="btn btn-primary">Place First Order</a>
        </div>
        @endif
    </div>
</div>
@endsection
