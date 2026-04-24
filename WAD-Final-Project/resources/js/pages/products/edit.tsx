import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Product } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Props {
    product: Product;
}

export default function ProductEdit({ product }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Products', href: '/products' },
        { title: product.name, href: `/products/${product.id}` },
        { title: 'Edit', href: `/products/${product.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: String(product.price),
        stock: String(product.stock),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className="mx-auto w-full max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">Product Name</label>
                        <input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="price" className="mb-2 block text-sm font-medium">Price (₱)</label>
                        <input id="price" type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.price && <p className="mt-1 text-sm text-destructive">{errors.price}</p>}
                    </div>
                    <div>
                        <label htmlFor="stock" className="mb-2 block text-sm font-medium">Stock</label>
                        <input id="stock" type="number" min="0" value={data.stock} onChange={(e) => setData('stock', e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                        {errors.stock && <p className="mt-1 text-sm text-destructive">{errors.stock}</p>}
                    </div>
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="inline-flex h-10 items-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Update Product'}
                        </button>
                        <Link href="/products" className="inline-flex h-10 items-center rounded-lg border border-input px-6 text-sm font-medium transition-colors hover:bg-muted">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
