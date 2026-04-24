import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    order: Order;
}

export default function OrderShow({ order }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Orders', href: '/orders' },
        { title: `Order #${order.id}`, href: `/orders/${order.id}` },
    ];

    const flash = (usePage().props as any).flash;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id}`} />
            <div className="mx-auto w-full max-w-4xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Order #{order.id}</h1>
                    <Link href="/orders" className="text-sm font-medium text-primary hover:underline">← Back to Orders</Link>
                </div>

                {flash?.success && (
                    <div className="mb-6 rounded-lg border border-chart-2/30 bg-chart-2/10 px-4 py-3 text-sm text-chart-2">{flash.success}</div>
                )}

                {/* Order Info */}
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Customer</p>
                        <p className="mt-1 text-lg font-semibold">{order.user?.name}</p>
                        {order.user?.profile && (
                            <p className="mt-1 text-sm text-muted-foreground">{order.user.profile.address}</p>
                        )}
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Order Date</p>
                        <p className="mt-1 text-lg font-semibold">{new Date(order.order_date).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="mt-1 text-2xl font-bold text-primary">₱{Number(order.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <div className="border-b border-border px-6 py-4">
                        <h2 className="text-lg font-semibold">Order Items</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Unit Price</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Quantity</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products?.map((product) => (
                                    <tr key={product.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                        <td className="px-6 py-4 font-medium">
                                            <Link href={`/products/${product.id}`} className="text-primary hover:underline">{product.name}</Link>
                                        </td>
                                        <td className="px-6 py-4 text-right">₱{Number(product.pivot?.unit_price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 text-right">{product.pivot?.quantity}</td>
                                        <td className="px-6 py-4 text-right font-semibold">₱{((product.pivot?.quantity ?? 0) * (product.pivot?.unit_price ?? 0)).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-muted/30">
                                    <td colSpan={3} className="px-6 py-4 text-right font-bold">Total:</td>
                                    <td className="px-6 py-4 text-right text-lg font-bold text-primary">₱{Number(order.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
