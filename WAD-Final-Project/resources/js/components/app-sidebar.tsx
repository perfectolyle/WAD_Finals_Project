import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Package, ShoppingCart, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        url: '/products',
        icon: Package,
    },
    {
        title: 'Orders',
        url: '/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Customers',
        url: '/customers',
        icon: Users,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'My Account',
        url: '/my-account',
        icon: User,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === 'admin';

    const filteredNavItems = isAdmin
        ? mainNavItems
        : mainNavItems.filter(item => item.title !== 'Customers');

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
