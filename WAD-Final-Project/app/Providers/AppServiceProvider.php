<?php

namespace App\Providers;

use App\Models\Order;
use App\Models\User;
use App\Policies\OrderPolicy;
use App\Policies\UserPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ── Explicit Policy Registration ──
        Gate::policy(Order::class, OrderPolicy::class);
        Gate::policy(User::class, UserPolicy::class);

        // ── Gate Definitions ──
        // Gate: Only admins can manage (create/edit/delete) products
        Gate::define('manage-products', function (User $user) {
            return $user->isAdmin();
        });

        // Gate: Only admins can manage (list/delete) customers
        Gate::define('manage-customers', function (User $user) {
            return $user->isAdmin();
        });

        // Gate: Only admins can access admin dashboard stats
        Gate::define('view-admin-dashboard', function (User $user) {
            return $user->isAdmin();
        });
    }
}
