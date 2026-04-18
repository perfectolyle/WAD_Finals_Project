<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="WAD Activity - Laravel CRUD with Middleware">
    <title>@yield('title', 'StoreFront') — StoreFront</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --bg-primary: #0f1117;
            --bg-secondary: #1a1d27;
            --bg-card: #1e2130;
            --bg-card-hover: #252839;
            --border: #2d3148;
            --text-primary: #e8eaed;
            --text-secondary: #9aa0b8;
            --text-muted: #6b7194;
            --accent: #6c5ce7;
            --accent-hover: #7c6ff7;
            --accent-glow: rgba(108, 92, 231, 0.25);
            --success: #00b894;
            --success-bg: rgba(0, 184, 148, 0.12);
            --danger: #ff6b6b;
            --danger-bg: rgba(255, 107, 107, 0.12);
            --danger-hover: #ee5a5a;
            --warning: #fdcb6e;
            --warning-bg: rgba(253, 203, 110, 0.12);
            --info: #74b9ff;
            --info-bg: rgba(116, 185, 255, 0.12);
            --radius: 10px;
            --radius-sm: 6px;
            --shadow: 0 4px 24px rgba(0,0,0,0.3);
            --transition: 0.2s ease;
        }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: var(--bg-primary);
            color: var(--text-primary);
            min-height: 100vh;
            display: flex;
            line-height: 1.6;
        }

        /* Sidebar */
        .sidebar {
            width: 260px;
            background: var(--bg-secondary);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0; left: 0; bottom: 0;
            z-index: 100;
        }
        .sidebar-brand {
            padding: 24px 20px;
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--accent);
            letter-spacing: -0.5px;
            border-bottom: 1px solid var(--border);
        }
        .sidebar-brand span { color: var(--text-primary); }
        .sidebar-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 4px; }
        .sidebar-nav a {
            display: flex; align-items: center; gap: 12px;
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem; font-weight: 500;
            transition: all var(--transition);
        }
        .sidebar-nav a:hover { background: var(--bg-card); color: var(--text-primary); }
        .sidebar-nav a.active { background: var(--accent); color: #fff; }
        .sidebar-nav .nav-icon { font-size: 1.1rem; width: 22px; text-align: center; }
        .sidebar-spacer { flex: 1; }
        .sidebar-footer {
            padding: 16px;
            border-top: 1px solid var(--border);
        }
        .user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .user-avatar {
            width: 36px; height: 36px;
            border-radius: 50%;
            background: var(--accent);
            display: flex; align-items: center; justify-content: center;
            font-weight: 700; font-size: 0.85rem; color: #fff;
        }
        .user-name { font-size: 0.85rem; font-weight: 600; }
        .user-role {
            font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;
            padding: 2px 8px; border-radius: 20px;
        }
        .role-admin { background: var(--warning-bg); color: var(--warning); }
        .role-user { background: var(--info-bg); color: var(--info); }
        .btn-logout {
            width: 100%; padding: 8px; border: 1px solid var(--border);
            border-radius: var(--radius-sm); background: transparent;
            color: var(--text-secondary); cursor: pointer; font-size: 0.8rem;
            font-family: inherit; transition: all var(--transition);
        }
        .btn-logout:hover { border-color: var(--danger); color: var(--danger); }

        /* Main Content */
        .main { flex: 1; margin-left: 260px; min-height: 100vh; }
        .topbar {
            padding: 20px 32px;
            border-bottom: 1px solid var(--border);
            display: flex; align-items: center; justify-content: space-between;
        }
        .topbar h1 { font-size: 1.4rem; font-weight: 700; letter-spacing: -0.3px; }
        .topbar-actions { display: flex; gap: 10px; }

        .content { padding: 28px 32px; }

        /* Flash Messages */
        .alert {
            padding: 14px 18px; border-radius: var(--radius-sm); margin-bottom: 20px;
            font-size: 0.88rem; font-weight: 500;
            display: flex; align-items: center; gap: 10px;
            animation: slideDown 0.3s ease;
        }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .alert-success { background: var(--success-bg); color: var(--success); border: 1px solid rgba(0,184,148,0.2); }
        .alert-error { background: var(--danger-bg); color: var(--danger); border: 1px solid rgba(255,107,107,0.2); }

        /* Buttons */
        .btn {
            display: inline-flex; align-items: center; gap: 6px;
            padding: 9px 18px; border-radius: var(--radius-sm);
            font-size: 0.85rem; font-weight: 600; font-family: inherit;
            text-decoration: none; border: none; cursor: pointer;
            transition: all var(--transition); line-height: 1.4;
        }
        .btn-primary { background: var(--accent); color: #fff; }
        .btn-primary:hover { background: var(--accent-hover); box-shadow: 0 0 20px var(--accent-glow); }
        .btn-secondary { background: var(--bg-card); color: var(--text-primary); border: 1px solid var(--border); }
        .btn-secondary:hover { border-color: var(--text-muted); }
        .btn-danger { background: var(--danger-bg); color: var(--danger); border: 1px solid rgba(255,107,107,0.2); }
        .btn-danger:hover { background: var(--danger); color: #fff; }
        .btn-sm { padding: 6px 12px; font-size: 0.78rem; }
        .btn-success { background: var(--success-bg); color: var(--success); border: 1px solid rgba(0,184,148,0.2); }
        .btn-success:hover { background: var(--success); color: #fff; }

        /* Search Form */
        .search-form { display: flex; align-items: center; flex: 1; max-width: 400px; position: relative; }
        .search-input {
            width: 100%; padding: 8px 14px 8px 36px; border-radius: 20px; border: 1px solid var(--border);
            background: var(--bg-primary); color: var(--text-primary); font-size: 0.85rem;
            transition: all var(--transition); outline: none;
        }
        .search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        .search-icon { position: absolute; left: 12px; color: var(--text-muted); font-size: 0.9rem; pointer-events: none; }

        /* Cards */
        .card {
            background: var(--bg-card); border: 1px solid var(--border);
            border-radius: var(--radius); box-shadow: var(--shadow);
        }
        .card-header {
            padding: 16px 20px; border-bottom: 1px solid var(--border);
            font-weight: 600; font-size: 0.95rem;
            display: flex; align-items: center; justify-content: space-between;
        }
        .card-body { padding: 20px; }

        /* Tables */
        .table-wrap { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        thead th {
            padding: 12px 16px; text-align: left;
            font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
            letter-spacing: 0.6px; color: var(--text-muted);
            border-bottom: 1px solid var(--border);
            white-space: nowrap;
        }
        tbody td {
            padding: 14px 16px; font-size: 0.88rem;
            border-bottom: 1px solid var(--border);
            color: var(--text-secondary);
            white-space: nowrap;
        }
        tbody tr { transition: background var(--transition); }
        tbody tr:hover { background: var(--bg-card-hover); }
        tbody tr:last-child td { border-bottom: none; }
        .table-actions { display: flex; gap: 6px; }

        /* Forms */
        .form-group { margin-bottom: 18px; }
        .form-group label {
            display: block; margin-bottom: 6px;
            font-size: 0.82rem; font-weight: 600;
            color: var(--text-secondary);
        }
        .form-control {
            width: 100%; padding: 10px 14px;
            background: var(--bg-primary); border: 1px solid var(--border);
            border-radius: var(--radius-sm); color: var(--text-primary);
            font-size: 0.9rem; font-family: inherit;
            transition: border var(--transition);
        }
        .form-control:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
        .form-control::placeholder { color: var(--text-muted); }
        select.form-control { appearance: none; cursor: pointer; }
        .form-error { color: var(--danger); font-size: 0.78rem; margin-top: 4px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
        .stat-card {
            background: var(--bg-card); border: 1px solid var(--border);
            border-radius: var(--radius); padding: 20px;
            transition: all var(--transition);
        }
        .stat-card:hover { border-color: var(--accent); transform: translateY(-2px); }
        .stat-label { font-size: 0.78rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
        .stat-value { font-size: 1.8rem; font-weight: 700; color: var(--text-primary); }

        /* Badges */
        .badge {
            display: inline-block; padding: 3px 10px; border-radius: 20px;
            font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px;
            white-space: nowrap;
        }
        .badge-admin { background: var(--warning-bg); color: var(--warning); }
        .badge-user { background: var(--info-bg); color: var(--info); }

        /* Detail list */
        .detail-grid { display: grid; grid-template-columns: 140px 1fr; gap: 12px 20px; }
        .detail-label { color: var(--text-muted); font-size: 0.82rem; font-weight: 600; }
        .detail-value { color: var(--text-primary); font-size: 0.9rem; }

        /* Pagination */
        .pagination { display: flex; justify-content: center; gap: 4px; margin-top: 20px; list-style: none; padding: 0; }
        .pagination li { display: inline-flex; }
        .pagination a, .pagination span {
            padding: 8px 14px; border-radius: var(--radius-sm);
            font-size: 0.82rem; text-decoration: none;
            border: 1px solid var(--border); color: var(--text-secondary);
            transition: all var(--transition); background: var(--bg-card); display: inline-block;
        }
        .pagination a:hover { border-color: var(--accent); color: var(--accent); }
        .pagination .active span { background: var(--accent); color: #fff; border-color: var(--accent); }
        .pagination .disabled span { color: var(--text-muted); cursor: not-allowed; opacity: 0.6; }
        .pagination p.small { display: none; } /* Hide the 'showing 1 to X' text if it appears */

        /* Order Products Section */
        .order-product-row {
            display: grid; grid-template-columns: 1fr 120px 120px auto;
            gap: 12px; align-items: end;
            padding: 12px 0; border-bottom: 1px solid var(--border);
        }
        .order-product-row:last-child { border-bottom: none; }
        .add-product-btn {
            padding: 10px 0; display: flex; align-items: center; gap: 6px;
            color: var(--accent); font-size: 0.85rem; font-weight: 600;
            cursor: pointer; background: none; border: none; font-family: inherit;
        }
        .add-product-btn:hover { color: var(--accent-hover); }
        .remove-row-btn {
            padding: 8px 12px; background: var(--danger-bg); border: 1px solid rgba(255,107,107,0.2);
            border-radius: var(--radius-sm); color: var(--danger); cursor: pointer;
            font-size: 0.8rem; transition: all var(--transition);
        }
        .remove-row-btn:hover { background: var(--danger); color: #fff; }

        .empty-state {
            text-align: center; padding: 60px 20px;
            color: var(--text-muted);
        }
        .empty-state .icon { font-size: 3rem; margin-bottom: 12px; }
        .empty-state p { font-size: 0.95rem; margin-bottom: 16px; }

        /* Inline delete form */
        form.inline { display: inline; }

        .mobile-toggle, .mobile-close { display: none; background: none; border: none; color: var(--text-primary); font-size: 1.6rem; cursor: pointer; padding: 0; line-height: 1; }
        
        /* Responsive */
        @media (max-width: 768px) {
            body, .main { max-width: 100vw; overflow-x: hidden; }
            .mobile-toggle { display: block; }
            .mobile-close { display: block; }
            .sidebar-brand { display: flex; justify-content: space-between; align-items: center; }
            
            .sidebar { 
                position: fixed; top: 0; left: 0; height: 100vh;
                transform: translateX(-100%); z-index: 200;
                width: 280px; border-right: 1px solid var(--border);
                box-shadow: none; background: var(--bg-secondary);
            }
            .sidebar.open { transform: translateX(0); box-shadow: 20px 0 50px rgba(0,0,0,0.7); }
            
            .sidebar-nav { flex-direction: column; padding: 16px 12px; gap: 4px; overflow-x: hidden; }
            .sidebar-nav a { padding: 10px 14px; }
            .sidebar-footer { padding: 16px; flex-direction: column; align-items: stretch; border-top: 1px solid var(--border); }
            .user-info { margin-bottom: 12px; }
            .btn-logout { width: 100%; padding: 8px; }
            
            .main { margin-left: 0; }
            .topbar { padding: 14px 12px; flex-direction: row; gap: 12px; justify-content: space-between; align-items: center; flex-wrap: wrap; }
            .topbar-left { width: 100%; display: flex; align-items: center; gap: 10px; }
            .topbar h1 { font-size: 1.15rem; white-space: nowrap; }
            .topbar-actions { width: 100%; display: flex; flex-direction: row; gap: 8px; align-items: center; justify-content: flex-end; }
            .topbar-actions .btn { padding: 8px 14px; font-size: 0.82rem; }
            .search-input { font-size: 0.8rem; }
            .content { padding: 12px; }
            
            /* Remove redundant outer card shell on mobile */
            .card { background: transparent; border: none; box-shadow: none; border-radius: 0; }
            .card-header { padding: 0 0 12px 0; border: none; font-size: 1.1rem; }
            .card-body { padding: 0; }
            
            .form-row { grid-template-columns: 1fr; }
            .order-product-row { grid-template-columns: 1fr; gap: 8px; }
            .stats-grid { grid-template-columns: 1fr; }
            
            /* Responsive Mobile Card Tables */
            .table-wrap { overflow: visible; width: 100%; }
            table, thead, tbody, th, td, tr { display: block; width: 100%; white-space: normal; }
            thead { display: none; }
            tbody tr { 
                margin-bottom: 16px; border: 1px solid var(--border); 
                border-radius: var(--radius); padding: 14px; 
                background: var(--bg-card); box-shadow: var(--shadow);
            }
            tbody td { 
                padding: 6px 0; border: none; font-size: 0.95rem; 
                text-align: left; color: var(--text-primary);
                display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
            }
            tbody td:first-child { 
                font-size: 1.15rem; font-weight: 700; color: var(--accent); 
                border-bottom: 1px solid var(--border); 
                padding-bottom: 12px; margin-bottom: 8px; 
            }
            tbody td:last-child { 
                margin-top: 12px; padding-top: 16px; 
                border-top: 1px solid var(--border); justify-content: flex-start; 
            }
            .table-actions { flex-wrap: wrap; width: 100%; justify-content: flex-start; gap: 8px; }
            .badge { white-space: normal; font-size: 0.75rem; padding: 4px 10px; }
        }
    </style>
</head>
<body>
    @auth
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-brand">
            <div>⬡ <span>StoreFront</span></div>
            <button class="mobile-close" onclick="document.getElementById('sidebar').classList.remove('open')">✕</button>
        </div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="{{ request()->routeIs('dashboard') ? 'active' : '' }}">
                <span class="nav-icon">📊</span> Dashboard
            </a>
            <a href="{{ route('products.index') }}" class="{{ request()->routeIs('products.*') ? 'active' : '' }}">
                <span class="nav-icon">📦</span> Products
            </a>
            <a href="{{ route('orders.index') }}" class="{{ request()->routeIs('orders.*') ? 'active' : '' }}">
                <span class="nav-icon">🛒</span> Orders
            </a>
            @if(auth()->user()->isAdmin())
            <a href="{{ route('customers.index') }}" class="{{ request()->routeIs('customers.*') && request()->url() !== route('customers.show', auth()->id()) && request()->url() !== route('customers.edit', auth()->id()) ? 'active' : '' }}">
                <span class="nav-icon">👥</span> Customers
            </a>
            @endif
            <a href="{{ route('my-account') }}" class="{{ request()->url() === route('customers.show', auth()->id()) || request()->url() === route('customers.edit', auth()->id()) ? 'active' : '' }}">
                <span class="nav-icon">👤</span> My Account
            </a>
        </nav>
        <div class="sidebar-footer">
            <div class="user-info">
                <div class="user-avatar">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</div>
                <div>
                    <div class="user-name">{{ auth()->user()->name }}</div>
                    <span class="user-role {{ auth()->user()->isAdmin() ? 'role-admin' : 'role-user' }}">
                        {{ auth()->user()->role }}
                    </span>
                </div>
            </div>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="btn-logout">Sign Out</button>
            </form>
        </div>
    </aside>
    @endauth

    <div class="main">
        <div class="topbar">
            <div class="topbar-left" style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
                @auth
                <button class="mobile-toggle" onclick="document.getElementById('sidebar').classList.add('open')">☰</button>
                @endauth
                @hasSection('page-title')
                <h1 style="white-space: nowrap;">@yield('page-title')</h1>
                @endif
                
                @hasSection('search')
                    @yield('search')
                @endif
            </div>
            
            @hasSection('actions')
            <div class="topbar-actions">
                @yield('actions')
            </div>
            @endif
        </div>

        <div class="content">
            @if(session('success'))
                <div class="alert alert-success">✓ {{ session('success') }}</div>
            @endif
            @if(session('error'))
                <div class="alert alert-error">✕ {{ session('error') }}</div>
            @endif

            @yield('content')
        </div>
    </div>
</body>
</html>
