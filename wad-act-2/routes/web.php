<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Guest Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('/', fn () => redirect('/login'));
    Route::get('/login',    [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login',   [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register',[AuthController::class, 'register']);
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

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
