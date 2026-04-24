import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props {
    product: Product;
}

export default function ProductShow({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/products' },
        { title: product.name, href: `/products/${product.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={product.name} />
            <div className="mx-auto w-full max-w-4xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                    <Link href="/products" className="text-sm font-medium text-primary hover:underline">← Back to Products</Link>
                </div>

                {/* Product Details */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="mt-1 text-2xl font-bold text-primary">₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Stock</p>
                        <p className="mt-1 text-2xl font-bold">{product.stock}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Orders</p>
                        <p className="mt-1 text-2xl font-bold">{product.orders?.length ?? 0}</p>
                    </div>
                </div>

                {/* Related Orders */}
                {product.orders && product.orders.length > 0 && (
                    <div className="rounded-xl border border-border bg-card shadow-sm">
                        <div className="border-b border-border px-6 py-4">
                            <h2 className="text-lg font-semibold">Orders Containing This Product</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-6 py-3 text-left font-medium text-muted-foreground">Order #</th>
                                        <th className="px-6 py-3 text-left font-medium text-muted-foreground">Customer</th>
                                        <th className="px-6 py-3 text-right font-medium text-muted-foreground">Qty</th>
                                        <th className="px-6 py-3 text-right font-medium text-muted-foreground">Unit Price</th>
                                        <th className="px-6 py-3 text-right font-medium text-muted-foreground">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.orders.map((order) => (
                                        <tr key={order.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-6 py-4">
                                                <Link href={`/orders/${order.id}`} className="font-medium text-primary hover:underline">#{order.id}</Link>
                                            </td>
                                            <td className="px-6 py-4">{order.user?.name}</td>
                                            <td className="px-6 py-4 text-right">{order.pivot?.quantity}</td>
                                            <td className="px-6 py-4 text-right">₱{Number(order.pivot?.unit_price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4 text-right font-semibold">₱{((order.pivot?.quantity ?? 0) * (order.pivot?.unit_price ?? 0)).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
