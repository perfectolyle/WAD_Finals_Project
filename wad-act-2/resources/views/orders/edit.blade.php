@extends('layouts.app')

@section('title', 'Edit Order #' . $order->id)
@section('page-title', 'Edit Order #' . $order->id)

@section('actions')
    <a href="{{ route('orders.show', $order) }}" class="btn btn-secondary">← Back</a>
@endsection

@section('content')
<div class="card" style="max-width: 800px;">
    <div class="card-body">
        @if($errors->any())
            <div class="alert alert-error">
                @foreach($errors->all() as $e)<div>{{ $e }}</div>@endforeach
            </div>
        @endif

        <form method="POST" action="{{ route('orders.update', $order) }}">
            @csrf @method('PUT')

            <div style="margin-bottom: 16px;">
                <label style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary); display: block; margin-bottom: 10px;">
                    Order Items
                </label>
                <div id="productRows">
                    @foreach($order->products as $i => $orderProduct)
                    <div class="order-product-row">
                        <div class="form-group" style="margin: 0;">
                            <label>Product</label>
                            <select name="products[{{ $i }}][id]" class="form-control product-select" required onchange="updatePrice(this)">
                                <option value="">Select product...</option>
                                @foreach($products as $product)
                                    <option value="{{ $product->id }}" data-price="{{ $product->price }}"
                                        {{ $product->id == $orderProduct->id ? 'selected' : '' }}>
                                        {{ $product->name }} — ₱{{ number_format($product->price, 2) }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label>Qty</label>
                            <input type="number" name="products[{{ $i }}][quantity]" class="form-control"
                                   min="1" value="{{ $orderProduct->pivot->quantity }}" required>
                        </div>
                        <div class="form-group" style="margin: 0;">
                            <label>Unit Price</label>
                            <input type="text" class="form-control price-display" readonly
                                   value="₱{{ number_format($orderProduct->pivot->unit_price, 2) }}"
                                   style="color: var(--success);">
                        </div>
                        <div style="padding-bottom: 2px;">
                            <button type="button" class="remove-row-btn" onclick="removeRow(this)"
                                {{ $loop->first && $order->products->count() === 1 ? 'style=visibility:hidden' : '' }}>✕</button>
                        </div>
                    </div>
                    @endforeach
                </div>
                <button type="button" class="add-product-btn" onclick="addRow()">+ Add another product</button>
            </div>

            <button type="submit" class="btn btn-primary" style="margin-top: 8px;">Update Order</button>
        </form>
    </div>
</div>

<script>
    let rowIndex = {{ $order->products->count() }};
    const productsJson = @json($products);

    function addRow() {
        const container = document.getElementById('productRows');
        const row = document.createElement('div');
        row.className = 'order-product-row';
        let options = '<option value="">Select product...</option>';
        productsJson.forEach(p => {
            options += `<option value="${p.id}" data-price="${p.price}">${p.name} — ₱${Number(p.price).toFixed(2)}</option>`;
        });
        row.innerHTML = `
            <div class="form-group" style="margin:0;">
                <label>Product</label>
                <select name="products[${rowIndex}][id]" class="form-control product-select" required onchange="updatePrice(this)">${options}</select>
            </div>
            <div class="form-group" style="margin:0;">
                <label>Qty</label>
                <input type="number" name="products[${rowIndex}][quantity]" class="form-control" min="1" value="1" required>
            </div>
            <div class="form-group" style="margin:0;">
                <label>Unit Price</label>
                <input type="text" class="form-control price-display" readonly value="₱0.00" style="color:var(--success);">
            </div>
            <div style="padding-bottom:2px;">
                <button type="button" class="remove-row-btn" onclick="removeRow(this)">✕</button>
            </div>
        `;
        container.appendChild(row);
        rowIndex++;
    }

    function removeRow(btn) { btn.closest('.order-product-row').remove(); }

    function updatePrice(select) {
        const opt = select.options[select.selectedIndex];
        const price = opt.dataset.price || 0;
        select.closest('.order-product-row').querySelector('.price-display').value = '₱' + Number(price).toFixed(2);
    }
</script>
@endsection
