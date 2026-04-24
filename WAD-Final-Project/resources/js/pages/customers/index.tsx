import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type User } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    customers: PaginatedData<User>;
    search: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Customers', href: '/customers' },
];

export default function CustomersIndex({ customers, search }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');
    const flash = (usePage().props as any).flash;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/customers', { search: searchQuery }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(`/customers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" placeholder="Search customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </form>
                </div>

                {flash?.success && (
                    <div className="rounded-lg border border-chart-2/30 bg-chart-2/10 px-4 py-3 text-sm text-chart-2">{flash.success}</div>
                )}
                {flash?.error && (
                    <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{flash.error}</div>
                )}

                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">ID</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Name</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Email</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Phone</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Role</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.data.length === 0 ? (
                                    <tr><td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">No customers found.</td></tr>
                                ) : (
                                    customers.data.map((customer) => (
                                        <tr key={customer.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-6 py-4 font-medium">{customer.id}</td>
                                            <td className="px-6 py-4 font-medium">{customer.name}</td>
                                            <td className="px-6 py-4">{customer.email}</td>
                                            <td className="px-6 py-4">{customer.profile?.phone_no || '—'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${customer.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                    {customer.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/customers/${customer.id}`} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><Eye className="h-4 w-4" /></Link>
                                                    <button onClick={() => handleDelete(customer.id, customer.name)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {customers.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <p className="text-sm text-muted-foreground">Showing {customers.from} to {customers.to} of {customers.total}</p>
                            <div className="flex gap-1">
                                {customers.links.map((link, i) => (
                                    <Link key={i} href={link.url || '#'} className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-3 text-sm ${link.active ? 'bg-primary text-primary-foreground' : link.url ? 'hover:bg-muted' : 'cursor-not-allowed opacity-50'}`} dangerouslySetInnerHTML={{ __html: link.label }} preserveState />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
