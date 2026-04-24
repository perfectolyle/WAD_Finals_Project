import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface Props {
    customer: User;
}

export default function CustomerShow({ customer }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Customers', href: '/customers' },
        { title: customer.name, href: `/customers/${customer.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={customer.name} />
            <div className="mx-auto w-full max-w-4xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
                    <div className="flex gap-3">
                        <Link href={`/customers/${customer.id}/edit`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                            <Edit className="h-4 w-4" /> Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Account Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Name</p>
                                <p className="font-medium">{customer.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium">{customer.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Role</p>
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${customer.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                    {customer.role}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Profile Details</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Address</p>
                                <p className="font-medium">{customer.profile?.address || '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Phone</p>
                                <p className="font-medium">{customer.profile?.phone_no || '—'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Member Since</p>
                                <p className="font-medium">{new Date(customer.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order History */}
                {customer.orders && customer.orders.length > 0 && (
                    <div className="rounded-xl border border-border bg-card shadow-sm">
                        <div className="border-b border-border px-6 py-4">
                            <h2 className="text-lg font-semibold">Order History ({customer.orders.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="px-6 py-3 text-left font-medium text-muted-foreground">Order #</th>
                                        <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
                                        <th className="px-6 py-3 text-left font-medium text-muted-foreground">Products</th>
                                        <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
                                        <th className="px-6 py-3 text-right font-medium text-muted-foreground">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customer.orders.map((order) => (
                                        <tr key={order.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-6 py-4 font-medium">
                                                <Link href={`/orders/${order.id}`} className="text-primary hover:underline">#{order.id}</Link>
                                            </td>
                                            <td className="px-6 py-4">{new Date(order.order_date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4">
                                                {order.products?.map(p => p.name).join(', ') || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-right font-semibold">₱{Number(order.total_amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/orders/${order.id}`} className="text-sm font-medium text-primary hover:underline">View</Link>
                                            </td>
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
