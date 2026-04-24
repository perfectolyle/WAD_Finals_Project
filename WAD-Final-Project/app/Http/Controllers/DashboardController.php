<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the dashboard with role-based stats.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isAdmin()) {
            $data = [
                'totalCustomers' => User::count(),
                'totalProducts'  => Product::count(),
                'totalOrders'    => Order::count(),
                'recentOrders'   => Order::with('user', 'products')
                    ->latest('id')
                    ->take(5)
                    ->get(),
                'isAdmin'        => true,
            ];
        } else {
            $data = [
                'totalProducts' => Product::count(),
                'totalOrders'   => $user->orders()->count(),
                'recentOrders'  => $user->orders()
                    ->with('products')
                    ->latest('id')
                    ->take(5)
                    ->get(),
                'isAdmin'       => false,
            ];
        }

        return Inertia::render('dashboard', $data);
    }
}
