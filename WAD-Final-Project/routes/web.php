<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Products — full resource CRUD
    Route::resource('products', ProductController::class);

    // Orders — full resource CRUD (scoped in controller)
    Route::resource('orders', OrderController::class);

    // Customers — resource (admin guards handled in controller)
    Route::resource('customers', CustomerController::class)->except(['create', 'store']);

    // My Account shortcut — redirects to own customer profile
    Route::get('/my-account', function () {
        return redirect()->route('customers.show', auth()->id());
    })->name('my-account');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
