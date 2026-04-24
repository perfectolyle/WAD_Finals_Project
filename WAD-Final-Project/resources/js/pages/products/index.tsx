import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PaginatedData, type Product } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Edit, Eye, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    products: PaginatedData<Product>;
    search: string | null;
    isAdmin: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Products', href: '/products' },
];

export default function ProductsIndex({ products, search, isAdmin }: Props) {
    const [searchQuery, setSearchQuery] = useState(search || '');
    const flash = (usePage().props as any).flash;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/products', { search: searchQuery }, { preserveState: true });
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(`/products/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                    <div className="flex gap-3">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </form>
                        {isAdmin && (
                            <Link
                                href="/products/create"
                                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                            >
                                <Plus className="h-4 w-4" /> Add Product
                            </Link>
                        )}
                    </div>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="rounded-lg border border-chart-2/30 bg-chart-2/10 px-4 py-3 text-sm text-chart-2">
                        {flash.success}
                    </div>
                )}

                {/* Table */}
                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">ID</th>
                                    <th className="px-6 py-3 text-left font-medium text-muted-foreground">Name</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Price</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Stock</th>
                                    <th className="px-6 py-3 text-right font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No products found.</td>
                                    </tr>
                                ) : (
                                    products.data.map((product) => (
                                        <tr key={product.id} className="border-b border-border transition-colors hover:bg-muted/30">
                                            <td className="px-6 py-4 font-medium">{product.id}</td>
                                            <td className="px-6 py-4 font-medium">{product.name}</td>
                                            <td className="px-6 py-4 text-right">₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${product.stock > 10 ? 'bg-chart-2/10 text-chart-2' : product.stock > 0 ? 'bg-chart-3/10 text-chart-3' : 'bg-destructive/10 text-destructive'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link href={`/products/${product.id}`} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    {isAdmin && (
                                                        <>
                                                            <Link href={`/products/${product.id}/edit`} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                            <button onClick={() => handleDelete(product.id, product.name)} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="flex items-center justify-between border-t border-border px-6 py-4">
                            <p className="text-sm text-muted-foreground">
                                Showing {products.from} to {products.to} of {products.total}
                            </p>
                            <div className="flex gap-1">
                                {products.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-3 text-sm ${link.active ? 'bg-primary text-primary-foreground' : link.url ? 'hover:bg-muted' : 'cursor-not-allowed opacity-50'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveState
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
