<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CustomerController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('admin', only: ['index', 'destroy']),
        ];
    }

    /**
     * Display a listing of all customers (admin only).
     */
    public function index(Request $request)
    {
        $search = $request->query('search');

        $customers = User::with('profile')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%");
            })
            ->latest('id')
            ->paginate(10);

        return Inertia::render('customers/index', [
            'customers' => $customers,
            'search'    => $search,
        ]);
    }

    /**
     * Show the specified customer.
     */
    public function show(User $customer)
    {
        Gate::authorize('view', $customer);

        $customer->load(['profile', 'orders.products']);

        return Inertia::render('customers/show', [
            'customer' => $customer,
        ]);
    }

    /**
     * Show the form for editing the specified customer.
     */
    public function edit(User $customer)
    {
        Gate::authorize('update', $customer);

        $customer->load('profile');
        return Inertia::render('customers/edit', [
            'customer' => $customer,
            'isAdmin'  => auth()->user()->isAdmin(),
        ]);
    }

    /**
     * Update the specified customer.
     */
    public function update(Request $request, User $customer)
    {
        Gate::authorize('update', $customer);

        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email,' . $customer->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'address'  => ['required', 'string', 'max:255'],
            'phone_no' => ['required', 'string', 'regex:/^([0-9\s\-\+\(\)]*)$/', 'min:10', 'max:20'],
            'role'     => ['sometimes', 'in:admin,user'],
        ]);

        $customer->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $customer->update(['password' => Hash::make($validated['password'])]);
        }

        // Only admin can change roles
        if ($request->user()->isAdmin() && isset($validated['role'])) {
            $customer->update(['role' => $validated['role']]);
        }

        // Update or create profile
        $customer->profile()->updateOrCreate(
            ['user_id' => $customer->id],
            [
                'address'  => $validated['address'],
                'phone_no' => $validated['phone_no'],
            ]
        );

        return redirect()->route('customers.show', $customer)
            ->with('success', 'Customer updated successfully.');
    }

    /**
     * Remove the specified customer (admin only).
     */
    public function destroy(User $customer)
    {
        if (auth()->id() === $customer->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $customer->delete();

        return redirect()->route('customers.index')
            ->with('success', 'Customer deleted successfully.');
    }
}
