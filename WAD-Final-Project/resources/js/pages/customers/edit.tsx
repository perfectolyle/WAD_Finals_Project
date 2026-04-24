import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    customer: User;
    isAdmin: boolean;
}

export default function CustomerEdit({ customer, isAdmin }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Customers', href: '/customers' },
        { title: customer.name, href: `/customers/${customer.id}` },
        { title: 'Edit', href: `/customers/${customer.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        email: customer.email,
        password: '',
        password_confirmation: '',
        address: customer.profile?.address || '',
        phone_no: customer.profile?.phone_no || '',
        role: customer.role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/customers/${customer.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${customer.name}`} />
            <div className="mx-auto w-full max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit Customer</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
                            <input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
                            <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="address" className="mb-2 block text-sm font-medium">Address</label>
                            <input id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                            {errors.address && <p className="mt-1 text-sm text-destructive">{errors.address}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone_no" className="mb-2 block text-sm font-medium">Phone Number</label>
                            <input id="phone_no" type="text" value={data.phone_no} onChange={(e) => setData('phone_no', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+63 9XX XXX XXXX" />
                            {errors.phone_no && <p className="mt-1 text-sm text-destructive">{errors.phone_no}</p>}
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium">New Password <span className="text-muted-foreground">(optional)</span></label>
                            <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Leave blank to keep current" />
                            {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="mb-2 block text-sm font-medium">Confirm Password</label>
                            <input id="password_confirmation" type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>
                    {isAdmin && (
                        <div>
                            <label htmlFor="role" className="mb-2 block text-sm font-medium">Role</label>
                            <select id="role" value={data.role} onChange={(e) => setData('role', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Customer'}
                        </button>
                        <Link href={`/customers/${customer.id}`} className="inline-flex h-10 items-center rounded-lg border border-input px-6 text-sm font-medium transition-colors hover:bg-muted">Cancel</Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
