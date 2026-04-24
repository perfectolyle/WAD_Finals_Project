import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role: string;
    profile?: Profile;
    orders?: Order[];
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface Profile {
    id: number;
    user_id: number;
    address: string;
    phone_no: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    created_at: string;
    updated_at: string;
    orders?: Order[];
    pivot?: {
        quantity: number;
        unit_price: number;
    };
}

export interface Order {
    id: number;
    user_id: number;
    order_date: string;
    total_amount: number;
    created_at: string;
    updated_at: string;
    user?: User;
    products?: Product[];
}

export interface OrderItem {
    order_id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
