<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // --- Admin User ---
        $admin = User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@example.com',
            'password' => Hash::make('password'),
            'role'     => 'admin',
        ]);
        $admin->profile()->create([
            'address'  => '123 Admin St, Manila',
            'phone_no' => '+63 912 000 0001',
        ]);

        // --- Regular Users ---
        $user1 = User::create([
            'name'     => 'Juan Dela Cruz',
            'email'    => 'juan@example.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);
        $user1->profile()->create([
            'address'  => '456 Rizal Ave, Quezon City',
            'phone_no' => '+63 917 123 4567',
        ]);

        $user2 = User::create([
            'name'     => 'Maria Santos',
            'email'    => 'maria@example.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);
        $user2->profile()->create([
            'address'  => '789 Bonifacio Blvd, Makati',
            'phone_no' => '+63 918 987 6543',
        ]);

        $user3 = User::create([
            'name'     => 'Alexander Bell',
            'email'    => 'alex@example.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);
        $user3->profile()->create([
            'address'  => '101 Technology Park, Cebu',
            'phone_no' => '+63 920 111 2222',
        ]);

        $user4 = User::create([
            'name'     => 'Samantha Grace',
            'email'    => 'sam@example.com',
            'password' => Hash::make('password'),
            'role'     => 'user',
        ]);
        $user4->profile()->create([
            'address'  => '777 Emerald City, Davao',
            'phone_no' => '+63 933 444 5555',
        ]);

        // --- Products ---
        $products = [
            Product::create(['name' => 'Wireless Mouse',       'price' => 599.00,  'stock' => 50]),
            Product::create(['name' => 'Mechanical Keyboard',  'price' => 2499.00, 'stock' => 30]),
            Product::create(['name' => 'USB-C Hub',            'price' => 1299.00, 'stock' => 25]),
            Product::create(['name' => '27" Monitor',          'price' => 12999.00,'stock' => 10]),
            Product::create(['name' => 'Webcam HD 1080p',      'price' => 1899.00, 'stock' => 40]),
            Product::create(['name' => 'Noise Cancelling Headphones', 'price' => 4500.00, 'stock' => 15]),
            Product::create(['name' => 'Ergonomic Desk Chair', 'price' => 7999.00, 'stock' => 5]),
            Product::create(['name' => 'RGB Mousepad XXL',     'price' => 850.00,  'stock' => 100]),
            Product::create(['name' => 'Streaming Microphone', 'price' => 3200.00, 'stock' => 20]),
            Product::create(['name' => '1TB NVMe SSD',         'price' => 4100.00, 'stock' => 35]),
        ];

        // --- Orders for User 1 ---
        $order1 = Order::create([
            'user_id'      => $user1->id,
            'order_date'   => now()->subDays(6),
            'total_amount' => 0,
        ]);
        $order1->products()->attach([
            $products[0]->id => ['quantity' => 2, 'unit_price' => $products[0]->price],
            $products[1]->id => ['quantity' => 1, 'unit_price' => $products[1]->price],
        ]);
        $order1->update(['total_amount' => (2 * $products[0]->price) + $products[1]->price]);

        $order2 = Order::create([
            'user_id'      => $user1->id,
            'order_date'   => now()->subDays(2),
            'total_amount' => 0,
        ]);
        $order2->products()->attach([
            $products[3]->id => ['quantity' => 1, 'unit_price' => $products[3]->price],
            $products[7]->id => ['quantity' => 1, 'unit_price' => $products[7]->price],
        ]);
        $order2->update(['total_amount' => $products[3]->price + $products[7]->price]);

        // --- Orders for User 2 ---
        $order3 = Order::create([
            'user_id'      => $user2->id,
            'order_date'   => now()->subDays(5),
            'total_amount' => 0,
        ]);
        $order3->products()->attach([
            $products[2]->id => ['quantity' => 1, 'unit_price' => $products[2]->price],
            $products[4]->id => ['quantity' => 1, 'unit_price' => $products[4]->price],
        ]);
        $order3->update(['total_amount' => $products[2]->price + $products[4]->price]);

        // --- Orders for User 3 ---
        $order4 = Order::create([
            'user_id'      => $user3->id,
            'order_date'   => now()->subDays(1),
            'total_amount' => 0,
        ]);
        $order4->products()->attach([
            $products[5]->id => ['quantity' => 2, 'unit_price' => $products[5]->price],
            $products[8]->id => ['quantity' => 1, 'unit_price' => $products[8]->price],
        ]);
        $order4->update(['total_amount' => (2 * $products[5]->price) + $products[8]->price]);

        // --- Orders for User 4 ---
        $order5 = Order::create([
            'user_id'      => $user4->id,
            'order_date'   => now(),
            'total_amount' => 0,
        ]);
        $order5->products()->attach([
            $products[6]->id => ['quantity' => 1, 'unit_price' => $products[6]->price],
            $products[9]->id => ['quantity' => 3, 'unit_price' => $products[9]->price],
        ]);
        $order5->update(['total_amount' => $products[6]->price + (3 * $products[9]->price)]);
    }
}
