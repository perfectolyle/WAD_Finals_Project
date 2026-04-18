@extends('layouts.app')

@section('title', 'Add Product')
@section('page-title', 'Add Product')

@section('actions')
    <a href="{{ route('products.index') }}" class="btn btn-secondary">← Back</a>
@endsection

@section('content')
<div class="card" style="max-width: 600px;">
    <div class="card-body">
        @if($errors->any())
            <div class="alert alert-error">
                @foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('products.store') }}">
            @csrf
            <div class="form-group">
                <label for="name">Product Name</label>
                <input type="text" id="name" name="name" class="form-control"
                       value="{{ old('name') }}" placeholder="e.g. Wireless Mouse" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="price">Price (₱)</label>
                    <input type="number" id="price" name="price" class="form-control"
                           value="{{ old('price') }}" step="0.01" min="0" placeholder="0.00" required>
                </div>
                <div class="form-group">
                    <label for="stock">Stock Quantity</label>
                    <input type="number" id="stock" name="stock" class="form-control"
                           value="{{ old('stock') }}" min="0" placeholder="0" required>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Create Product</button>
        </form>
    </div>
</div>
@endsection
