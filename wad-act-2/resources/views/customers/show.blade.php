@extends('layouts.app')

@section('title', $customer->name)
@section('page-title', $customer->name)

@section('actions')
    @if(auth()->user()->isAdmin())
        <a href="{{ route('customers.index') }}" class="btn btn-secondary">← Back</a>
    @endif
    @if(auth()->user()->isAdmin() || auth()->id() === $customer->id)
        <a href="{{ route('customers.edit', $customer) }}" class="btn btn-primary">Edit</a>
    @endif
@endsection

@section('content')
<div class="card" style="margin-bottom: 24px;">
    <div class="card-header">
        Account Details
        <span class="badge {{ $customer->isAdmin() ? 'badge-admin' : 'badge-user' }}">{{ $customer->role }}</span>
    </div>
    <div class="card-body">
        <div class="detail-grid">
            <div class="detail-label">ID</div>
            <div class="detail-value">{{ $customer->id }}</div>

            <div class="detail-label">Name</div>
            <div class="detail-value">{{ $customer->name }}</div>

            <div class="detail-label">Email</div>
            <div class="detail-value">{{ $customer->email }}</div>

            @if($customer->profile)
            <div class="detail-label">Address</div>
            <div class="detail-value">{{ $customer->profile->address }}</div>

            <div class="detail-label">Phone</div>
            <div class="detail-value">{{ $customer->profile->phone_no }}</div>
            @endif

            <div class="detail-label">Member Since</div>
            <div class="detail-value">{{ $customer->created_at->format('F d, Y') }}</div>
        </div>
    </div>
</div>

@if($customer->orders->count())
<div class="card">
    <div class="card-header">Order History ({{ $customer->orders->count() }})</div>
    <div class="card-body">
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($customer->orders as $order)
                    <tr>
                        <td style="font-weight: 600; color: var(--text-primary);">#{{ $order->id }}</td>
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
    </div>
</div>
@endif
@endsection
