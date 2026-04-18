@extends('layouts.app')

@section('title', 'Orders')
@section('page-title', 'Orders')

@section('search')
    <form method="GET" action="{{ route('orders.index') }}" class="search-form">
        <span class="search-icon">🔍</span>
        <input type="search" name="search" value="{{ request('search') }}" 
               placeholder="{{ auth()->user()->isAdmin() ? 'Search by # or Customer...' : 'Search by Order #...' }}" class="search-input"
               @if(request('search')) autofocus onfocus="var v=this.value; this.value=''; this.value=v;" @endif
               oninput="clearTimeout(this.timeout); this.timeout = setTimeout(() => { this.form.submit(); }, 600);">
    </form>
@endsection

@section('actions')
    <a href="{{ route('orders.create') }}" class="btn btn-primary">+ New Order</a>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($orders->count())
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>Order #</th>
                        @if(auth()->user()->isAdmin())<th>Customer</th>@endif
                        <th>Date</th>
                        <th>Products</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($orders as $order)
                    <tr>
                        <td style="color: var(--text-primary); font-weight: 600;">#{{ $order->id }}</td>
                        @if(auth()->user()->isAdmin())
                        <td>{{ $order->user->name ?? 'N/A' }}</td>
                        @endif
                        <td>{{ \Carbon\Carbon::parse($order->order_date)->format('M d, Y') }}</td>
                        <td>
                            @foreach($order->products->take(2) as $product)
                                <span class="badge" style="background: var(--info-bg); color: var(--info); margin-right: 4px;">{{ $product->name }}</span>
                            @endforeach
                            @if($order->products->count() > 2)
                                <span class="badge" style="background: var(--bg-card-hover); color: var(--text-muted);">+{{ $order->products->count() - 2 }} more</span>
                            @endif
                        </td>
                        <td style="color: var(--success); font-weight: 600;">₱{{ number_format($order->total_amount, 2) }}</td>
                        <td>
                            <div class="table-actions">
                                <a href="{{ route('orders.show', $order) }}" class="btn btn-secondary btn-sm">View</a>
                                @if(auth()->user()->isAdmin() || $order->user_id === auth()->id())
                                    <a href="{{ route('orders.edit', $order) }}" class="btn btn-success btn-sm">Edit</a>
                                    <form class="inline" method="POST" action="{{ route('orders.destroy', $order) }}"
                                          onsubmit="return confirm('Delete this order?')">
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
        <div class="pagination">{{ $orders->appends(['search' => request('search')])->links() }}</div>
        @else
        <div class="empty-state">
            <div class="icon">🛒</div>
            <p>No orders found.</p>
            <a href="{{ route('orders.create') }}" class="btn btn-primary">Place First Order</a>
        </div>
        @endif
    </div>
</div>
@endsection
