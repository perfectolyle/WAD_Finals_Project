# LogisTECH — WAD 2 Final Project

LogisTECH is a high-performance, full-stack logistics and e-commerce management platform built with **Laravel 12**, **React (Inertia.js)**, and **Tailwind CSS v4**. It features a modern 3D scroll-driven landing page and a robust administrative dashboard.

---

## ✨ Features

- **3D Scroll Animation**: Immersive Apple-style scroll-driven experience using 585 pre-rendered 3D frames.
- **Full CRUD Operations**: Manage `Products`, `Orders`, and `Customers` with a streamlined React interface.
- **Role-Based Access Control (RBAC)**: Secure access for `Admin` and `User` roles.
- **Advanced Authorization**: Implemented using Laravel **Gates**, **Policies**, and **Service Providers**.
- **Real-time Stats**: Dynamic dashboard with metrics on sales, users, and logistics performance.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop using Tailwind CSS v4 and Shadcn/UI.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19, TypeScript, Inertia.js
- **Styling**: Tailwind CSS v4, Shadcn/UI, Lucide Icons
- **Database**: SQLite (Production-ready schema)
- **Animation**: Canvas-based frame sequencing for 60FPS scroll performance

---

## 📐 Database Architecture (ERD)

The system demonstrates complex Eloquent relationships:
- **One-to-One**: `User` ↔ `Profile` (Managed during registration)
- **One-to-Many**: `User` ↔ `Order` (Customers can place multiple orders)
- **Many-to-Many**: `Order` ↔ `Product` (via `order_items` pivot with metadata)

![ERD Diagram](WAD-Final-Project/docs/screenshots/WAD_ACT_2_ERD.png)

---

## 🔐 Compliance & Security

This project strictly adheres to the WAD 2 Rubric requirements:

1. **CRUD Operations**: Fully implemented across all core entities.
2. **Authentication**: Custom registration flow that automatically creates user profiles.
3. **Middleware**: `AdminMiddleware` protects administrative routes.
4. **Authorization**:
    - **Gates**: Defined in `AppServiceProvider` for feature-level access (e.g., `manage-products`).
    - **Policies**: `OrderPolicy` and `UserPolicy` for resource-level ownership checks.
5. **Eloquent Relationships**: Properly defined and utilized throughout the application.

---

## 🚀 Setup Instructions

```bash
# 1. Navigate to project directory
cd WAD-Final-Project

# 2. Install dependencies
composer install
npm install

# 3. Setup environment
cp .env.example .env
php artisan key:generate

# 4. Prepare database
php artisan migrate --seed

# 5. Launch application
php artisan serve
npm run dev
```

---

## 📂 Project Structure

```
WAD-Final-Project/
├── app/
│   ├── Http/Controllers/   # Inertia Controllers
│   ├── Models/              # Eloquent Models (User, Profile, Order, Product)
│   ├── Policies/            # Resource Authorization
│   └── Providers/           # Gate Definitions (AppServiceProvider)
├── resources/js/
│   ├── components/          # Reusable UI & Layouts
│   └── pages/               # React (Inertia) Page Components
├── database/
│   └── migrations/          # Schema Definitions
└── public/frames/           # 3D Animation Assets (585 frames)
```

---

## 📊 Database Schema Summary

![Database Tables](WAD-Final-Project/docs/screenshots/database_tables.png)

---

Built with ❤️ by [Your Name/Team] for WAD 2 Finals.
