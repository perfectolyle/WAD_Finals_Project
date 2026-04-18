@extends('layouts.app')

@section('title', 'Customers')
@section('page-title', 'Customers')

@section('search')
    <form method="GET" action="{{ route('customers.index') }}" class="search-form">
        <span class="search-icon">🔍</span>
        <input type="search" name="search" value="{{ request('search') }}" 
               placeholder="Search customers by name or email..." class="search-input"
               @if(request('search')) autofocus onfocus="var v=this.value; this.value=''; this.value=v;" @endif
               oninput="clearTimeout(this.timeout); this.timeout = setTimeout(() => { this.form.submit(); }, 600);">
    </form>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($customers->count())
        <div class="table-wrap">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($customers as $customer)
                    <tr>
                        <td style="color: var(--text-primary); font-weight: 600;">{{ $customer->id }}</td>
                        <td style="color: var(--text-primary);">{{ $customer->name }}</td>
                        <td>{{ $customer->email }}</td>
                        <td>{{ $customer->profile->phone_no ?? '—' }}</td>
                        <td>
                            <span class="badge {{ $customer->isAdmin() ? 'badge-admin' : 'badge-user' }}">
                                {{ $customer->role }}
                            </span>
                        </td>
                        <td>{{ $customer->created_at->format('M d, Y') }}</td>
                        <td>
                            <div class="table-actions">
                                <a href="{{ route('customers.show', $customer) }}" class="btn btn-secondary btn-sm">View</a>
                                <a href="{{ route('customers.edit', $customer) }}" class="btn btn-success btn-sm">Edit</a>
                                @if($customer->id !== auth()->id())
                                    <form class="inline" method="POST" action="{{ route('customers.destroy', $customer) }}"
                                          onsubmit="return confirm('Delete this customer?')">
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
        <div class="pagination">{{ $customers->appends(['search' => request('search')])->links() }}</div>
        @else
        <div class="empty-state">
            <div class="icon">👥</div>
            <p>No customers found.</p>
        </div>
        @endif
    </div>
</div>
@endsection
