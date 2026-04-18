<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — StoreFront</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0f1117;
            color: #e8eaed;
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
        }
        .auth-container { width: 100%; max-width: 420px; padding: 20px; }
        .auth-card {
            background: #1e2130; border: 1px solid #2d3148;
            border-radius: 12px; padding: 40px 32px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .auth-brand {
            text-align: center; margin-bottom: 32px;
        }
        .auth-brand h1 { font-size: 1.6rem; font-weight: 700; }
        .auth-brand h1 span { color: #6c5ce7; }
        .auth-brand p { color: #6b7194; font-size: 0.88rem; margin-top: 6px; }
        .form-group { margin-bottom: 18px; }
        .form-group label { display: block; margin-bottom: 6px; font-size: 0.82rem; font-weight: 600; color: #9aa0b8; }
        .form-control {
            width: 100%; padding: 11px 14px;
            background: #0f1117; border: 1px solid #2d3148;
            border-radius: 8px; color: #e8eaed;
            font-size: 0.9rem; font-family: inherit;
        }
        .form-control:focus { outline: none; border-color: #6c5ce7; box-shadow: 0 0 0 3px rgba(108,92,231,0.25); }
        .form-error { color: #ff6b6b; font-size: 0.78rem; margin-top: 4px; }
        .btn {
            width: 100%; padding: 12px; border: none; border-radius: 8px;
            background: #6c5ce7; color: #fff; font-size: 0.9rem;
            font-weight: 600; font-family: inherit; cursor: pointer;
            transition: 0.2s ease;
        }
        .btn:hover { background: #7c6ff7; box-shadow: 0 0 24px rgba(108,92,231,0.3); }
        .auth-footer {
            text-align: center; margin-top: 20px;
            font-size: 0.85rem; color: #6b7194;
        }
        .auth-footer a { color: #6c5ce7; text-decoration: none; font-weight: 600; }
        .auth-footer a:hover { color: #7c6ff7; }
        .remember-row { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
        .remember-row label { font-size: 0.82rem; color: #9aa0b8; margin: 0; }
        .alert-error {
            padding: 12px 16px; border-radius: 8px; margin-bottom: 18px;
            background: rgba(255,107,107,0.12); color: #ff6b6b;
            border: 1px solid rgba(255,107,107,0.2);
            font-size: 0.85rem;
        }
        .alert-success {
            padding: 12px 16px; border-radius: 8px; margin-bottom: 18px;
            background: rgba(0,184,148,0.12); color: #00b894;
            border: 1px solid rgba(0,184,148,0.2);
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-brand">
                <h1>⬡ <span>Store</span>Front</h1>
                <p>Sign in to your account</p>
            </div>

            @if(session('success'))
                <div class="alert-success">{{ session('success') }}</div>
            @endif

            @if($errors->any())
                <div class="alert-error">
                    @foreach($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ url('/login') }}">
                @csrf
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="{{ old('email') }}" placeholder="you@example.com" required autofocus>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" class="form-control"
                           placeholder="••••••••" required>
                </div>
                <div class="remember-row">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Remember me</label>
                </div>
                <button type="submit" class="btn">Sign In</button>
            </form>

            <div class="auth-footer">
                Don't have an account? <a href="{{ route('register') }}">Create one</a>
            </div>
        </div>
    </div>
</body>
</html>
