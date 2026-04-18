<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register — StoreFront</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0f1117;
            color: #e8eaed;
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
            padding: 20px 0;
        }
        .auth-container { width: 100%; max-width: 480px; padding: 20px; }
        .auth-card {
            background: #1e2130; border: 1px solid #2d3148;
            border-radius: 12px; padding: 40px 32px;
            box-shadow: 0 8px 40px rgba(0,0,0,0.4);
        }
        .auth-brand { text-align: center; margin-bottom: 32px; }
        .auth-brand h1 { font-size: 1.6rem; font-weight: 700; }
        .auth-brand h1 span { color: #6c5ce7; }
        .auth-brand p { color: #6b7194; font-size: 0.88rem; margin-top: 6px; }
        .form-group { margin-bottom: 16px; }
        .form-group label { display: block; margin-bottom: 6px; font-size: 0.82rem; font-weight: 600; color: #9aa0b8; }
        .form-control {
            width: 100%; padding: 11px 14px;
            background: #0f1117; border: 1px solid #2d3148;
            border-radius: 8px; color: #e8eaed;
            font-size: 0.9rem; font-family: inherit;
        }
        .form-control:focus { outline: none; border-color: #6c5ce7; box-shadow: 0 0 0 3px rgba(108,92,231,0.25); }
        .form-error { color: #ff6b6b; font-size: 0.78rem; margin-top: 4px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .btn {
            width: 100%; padding: 12px; border: none; border-radius: 8px;
            background: #6c5ce7; color: #fff; font-size: 0.9rem;
            font-weight: 600; font-family: inherit; cursor: pointer;
            transition: 0.2s ease; margin-top: 6px;
        }
        .btn:hover { background: #7c6ff7; box-shadow: 0 0 24px rgba(108,92,231,0.3); }
        .auth-footer {
            text-align: center; margin-top: 20px;
            font-size: 0.85rem; color: #6b7194;
        }
        .auth-footer a { color: #6c5ce7; text-decoration: none; font-weight: 600; }
        .auth-footer a:hover { color: #7c6ff7; }
        .alert-error {
            padding: 12px 16px; border-radius: 8px; margin-bottom: 18px;
            background: rgba(255,107,107,0.12); color: #ff6b6b;
            border: 1px solid rgba(255,107,107,0.2);
            font-size: 0.85rem;
        }
    </style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-brand">
                <h1>⬡ <span>Store</span>Front</h1>
                <p>Create your account</p>
            </div>

            @if($errors->any())
                <div class="alert-error">
                    @foreach($errors->all() as $error)
                        <div>{{ $error }}</div>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ url('/register') }}">
                @csrf
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" class="form-control"
                           value="{{ old('name') }}" placeholder="John Doe" required autofocus>
                </div>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" class="form-control"
                           value="{{ old('email') }}" placeholder="you@example.com" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control"
                               placeholder="Min 8 characters" required>
                    </div>
                    <div class="form-group">
                        <label for="password_confirmation">Confirm Password</label>
                        <input type="password" id="password_confirmation" name="password_confirmation"
                               class="form-control" placeholder="Repeat password" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" name="address" class="form-control"
                           value="{{ old('address') }}" placeholder="123 Main St, City" required>
                </div>
                <div class="form-group">
                    <label for="phone_no">Phone Number</label>
                    <input type="text" id="phone_no" name="phone_no" class="form-control"
                           value="{{ old('phone_no') }}" placeholder="+63 912 345 6789" required>
                </div>
                <button type="submit" class="btn">Create Account</button>
            </form>

            <div class="auth-footer">
                Already have an account? <a href="{{ route('login') }}">Sign in</a>
            </div>
        </div>
    </div>
</body>
</html>
