@extends('layouts.app')

@section('title', 'Edit ' . $customer->name)
@section('page-title', 'Edit ' . $customer->name)

@section('actions')
    <a href="{{ route('customers.show', $customer) }}" class="btn btn-secondary">← Back</a>
@endsection

@section('content')
<div class="card" style="max-width: 600px;">
    <div class="card-body">
        @if($errors->any())
            <div class="alert alert-error">
                @foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('customers.update', $customer) }}">
            @csrf @method('PUT')

            <div class="form-group">
                <label for="name">Full Name</label>
                <input type="text" id="name" name="name" class="form-control"
                       value="{{ old('name', $customer->name) }}" required>
            </div>

            <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" class="form-control"
                       value="{{ old('email', $customer->email) }}" required>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label for="password">New Password <span style="color: var(--text-muted);">(leave blank to keep)</span></label>
                    <input type="password" id="password" name="password" class="form-control"
                           placeholder="Min 8 characters">
                </div>
                <div class="form-group">
                    <label for="password_confirmation">Confirm Password</label>
                    <input type="password" id="password_confirmation" name="password_confirmation" class="form-control"
                           placeholder="Repeat password">
                </div>
            </div>

            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" id="address" name="address" class="form-control"
                       value="{{ old('address', $customer->profile->address ?? '') }}" required>
            </div>

            <div class="form-group">
                <label for="phone_no">Phone Number</label>
                <input type="text" id="phone_no" name="phone_no" class="form-control"
                       value="{{ old('phone_no', $customer->profile->phone_no ?? '') }}" required>
            </div>

            @if(auth()->user()->isAdmin())
            <div class="form-group">
                <label for="role">Role</label>
                <select id="role" name="role" class="form-control">
                    <option value="user" {{ $customer->role === 'user' ? 'selected' : '' }}>User</option>
                    <option value="admin" {{ $customer->role === 'admin' ? 'selected' : '' }}>Admin</option>
                </select>
            </div>
            @endif

            <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
    </div>
</div>
@endsection
