import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Order, type Product } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Package, ShoppingCart, Users } from 'lucide-react';

interface DashboardProps {
    totalCustomers?: number;
    totalProducts: number;
    totalOrders: number;
    recentOrders: Order[];
    isAdmin: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard({ totalCustomers, totalProducts, totalOrders, recentOrders, isAdmin }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Stat Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {isAdmin && (
                        <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                                    <p className="text-3xl font-bold tracking-tight">{totalCustomers}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                                <p className="text-3xl font-bold tracking-tight">{totalProducts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-chart-4/10 text-chart-4">
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{isAdmin ? 'Total Orders' : 'My Orders'}</p>
                                <p className="text-3xl font-bold tracking-tight">{totalOrders}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <div className="border-b border-border px-6 py-4">
                        <h2 className="text-lg font-semibold">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Order #</th>
                                    {isAdmin && <th className="px-6 py-3 text-left font-medium text-muted-foreground">Customer</th>}
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Products</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={isAdmin ? 6 : 5} className="px-6 py-8 text-center text-muted-foreground">
                                            No orders yet.
                                        </td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-6 py-4 font-medium">#{order.id}</td>
                                            {isAdmin && <td className="px-6 py-4">{order.user?.name}</td>}
                                            <td className="px-6 py-4">{new Date(order.order_date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">{order.products?.length ?? 0} items</td>
                                            <td className="px-6 py-4 text-right font-semibold">₱{Number(order.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/orders/${order.id}`} className="text-sm font-medium text-primary hover:underline">
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
