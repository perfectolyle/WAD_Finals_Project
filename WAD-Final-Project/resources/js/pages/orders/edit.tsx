import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order, type Product } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    order: Order;
    products: Product[];
}

interface OrderLine {
    id: number;
    quantity: number;
}

export default function OrderEdit({ order, products }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/orders' },
        { title: `Order #${order.id}`, href: `/orders/${order.id}` },
        { title: 'Edit', href: `/orders/${order.id}/edit` },
    ];

    const initialLines: OrderLine[] = order.products?.map(p => ({
        id: p.id,
        quantity: p.pivot?.quantity ?? 1,
    })) ?? [{ id: 0, quantity: 1 }];

    const [lines, setLines] = useState<OrderLine[]>(initialLines);
    const { put, processing, errors } = useForm({});

    const addLine = () => setLines([...lines, { id: 0, quantity: 1 }]);
    const removeLine = (index: number) => setLines(lines.filter((_, i) => i !== index));
    const updateLine = (index: number, field: keyof OrderLine, value: number) => {
        const updated = [...lines];
        updated[index] = { ...updated[index], [field]: value };
        setLines(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validLines = lines.filter(l => l.id > 0 && l.quantity > 0);
        
        put(`/orders/${order.id}`, {
            onBefore: () => {
                setData('products', validLines);
            },
            preserveScroll: true,
        });
    };

    const getTotal = () => {
        return lines.reduce((sum, line) => {
            const product = products.find(p => p.id === line.id);
            return sum + (product ? product.price * line.quantity : 0);
        }, 0);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Order #${order.id}`} />
            <div className="mx-auto w-full max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit Order #{order.id}</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <label className="text-sm font-medium">Order Items</label>
                            <button type="button" onClick={addLine} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                <Plus className="h-4 w-4" /> Add Item
                            </button>
                        </div>
                        {errors.products && <p className="mb-3 text-sm text-destructive">{(errors as any).products}</p>}
                        <div className="space-y-3">
                            {lines.map((line, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-lg border border-border p-3">
                                    <select value={line.id} onChange={(e) => updateLine(index, 'id', Number(e.target.value))} className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                        <option value={0}>Select product...</option>
                                        {products.map(p => (
                                            <option key={p.id} value={p.id}>{p.name} — ₱{Number(p.price).toLocaleString()} (Stock: {p.stock})</option>
                                        ))}
                                    </select>
                                    <input type="number" min="1" value={line.quantity} onChange={(e) => updateLine(index, 'quantity', Number(e.target.value))} className="h-10 w-20 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                                    <span className="w-28 text-right text-sm font-medium">
                                        ₱{(() => {
                                            const p = products.find(p => p.id === line.id);
                                            return p ? (p.price * line.quantity).toLocaleString('en-PH', { minimumFractionDigits: 2 }) : '0.00';
                                        })()}
                                    </span>
                                    {lines.length > 1 && (
                                        <button type="button" onClick={() => removeLine(index)} className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                        <p className="text-lg font-bold">Total: ₱{getTotal().toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                        <div className="flex gap-3">
                            <button type="submit" disabled={processing} className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
                                {processing ? 'Saving...' : 'Update Order'}
                            </button>
                            <Link href={`/orders/${order.id}`} className="inline-flex h-10 items-center rounded-lg border border-input px-6 text-sm font-medium transition-colors hover:bg-muted">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
