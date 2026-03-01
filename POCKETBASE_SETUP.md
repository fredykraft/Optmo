# PocketBase Setup Guide for OPTMO

This guide walks through setting up PocketBase as the backend database for OPTMO authentication and user analytics.

## Step 1: Download PocketBase

1. Go to [https://pocketbase.io/](https://pocketbase.io/)
2. Click **Download** and select your operating system:
   - **macOS**: Choose "darwin_amd64" (Intel) or "darwin_arm64" (Apple Silicon M1/M2)
   - **Linux**: Choose the appropriate Linux build
   - **Windows**: Choose "windows_amd64.zip"

3. Extract the downloaded file to a convenient location (e.g., `~/pocketbase/`)

## Step 2: Run PocketBase Locally

### macOS/Linux:
```bash
cd /Users/cheerie/Documents/GitHub/Optmo
pocketbase serve --dir ./pb_data
```

### Windows:
```cmd
cd C:\path\to\Optmo
pocketbase serve --dir .\pb_data
```

You should see output like:
```
Server started at http://127.0.0.1:8090
AdminUI:   http://127.0.0.1:8090/_/
```

**Keep this terminal running!** Keep PocketBase running while developing. You'll need it for the website to work.

## Step 3: Create Admin Account

1. Open [http://localhost:8090](http://localhost:8090) in your browser
2. You'll see a setup page asking for an admin email and password
3. Enter your credentials and click "Create admin"
4. You're now logged into PocketBase Admin UI

## Step 4: Apply Database Schema (Automatic)

Schema is already defined in migration file:

- `pb_migrations/1772354409_init_optmo_user_data.js`

When you start PocketBase with `pocketbase serve --dir ./pb_data`, it auto-applies migrations and creates:

- `users` (built-in auth collection)
- `user_profiles` (display name, full name, company)
- `projects` (user projects)
- `user_events` (behavior tracking events)

### Verify the collections

1. Open [http://localhost:8090/_/](http://localhost:8090/_/)
2. Go to **Collections**
3. Confirm you see: `users`, `user_profiles`, `projects`, `user_events`

No manual field creation is required.

## Step 5: Configure CORS (Cross-Origin)

Your website runs on `http://localhost:8000` but PocketBase runs on `http://localhost:8090`. You need to allow cross-origin requests.

1. In PocketBase Admin UI, click **Settings** (gear icon) in the left sidebar
2. Look for **CORS (Origins)** setting
3. Add: `http://localhost:8000` (and any other domains you'll use)
4. Click **Save settings**

## Step 6: Test the Authentication

1. Keep PocketBase running in your terminal
2. Open [http://localhost:8000/login.html](http://localhost:8000/login.html) in a browser
3. Try signing up with:
   - Email: `test@example.com`
   - Password: `Test123!`
4. You should see "✓ Login successful! Redirecting..." and redirect to account page
5. Your account is now in PocketBase!

### Optional: Seed Demo Data (Recommended)

To quickly populate PocketBase with a demo user, profile, projects, and events:

```bash
python3 scripts/seed_pocketbase.py
```

Default demo credentials:

- Email: `demo@optmo.app`
- Password: `Demo12345!`

You can customize with env vars:

```bash
SEED_EMAIL=you@example.com SEED_PASSWORD='YourStrongPass123!' SEED_NAME='Your Name' python3 scripts/seed_pocketbase.py
```

## Step 7: Verify User Data in PocketBase

1. Go to PocketBase Admin UI: [http://localhost:8090](http://localhost:8090)
2. Click on **Collections** → **users**
3. You should see your test user with email, name, and other fields
4. Click **user_events** to see login events tracked
5. All user actions are automatically logged!

## Troubleshooting

### "Connection refused" error when logging in
- Make sure PocketBase is running (`pocketbase serve --dir ./pb_data`)
- Check that you're accessing [http://localhost:8000](http://localhost:8000) (not https)
- Check CORS settings are configured in PocketBase

### "CORS error" in browser console
- Go to PocketBase Settings and add `http://localhost:8000` to CORS origins
- Wait a few seconds, then refresh the website

### Admin UI won't open
- If you closed PocketBase, restart with `pocketbase serve --dir ./pb_data`
- Open [http://localhost:8090](http://localhost:8090) in a fresh tab
- You'll need to log in again

### Collections missing
- Make sure `pb_migrations/1772354409_init_optmo_user_data.js` exists
- Restart server from project root with `pocketbase serve --dir ./pb_data`
- If needed, run `pocketbase migrate up --dir ./pb_data`

## Next Steps

### Running PocketBase on Cloud (Later)

When you're ready to deploy:

1. **Railway** (recommended for beginners)
   - Upload PocketBase executable to Railway
   - Set environment variable: `POCKETBASE_URL=http://your-railway-url`
   - Free tier: 5GB storage, unlimited bandwidth

2. **Render, Heroku, or DigitalOcean**
   - Similar setup, deploy PocketBase container
   - Typical cost: $5-10/month

3. **Your own VPS**
   - Most control and flexibility
   - Lowest pricing ($2-5/month for small VPS)

### Database Backup

Before you have lots of user data, set up backups:

1. In PocketBase Admin UI, go to **Settings**
2. Look for **Backup** section
3. Create a backup and download it regularly
4. Save backups securely

## Architecture Overview

```
┌─────────────────────────────┐
│   Your Website              │
│   (localhost:8000)          │
│  - index.html               │
│  - login.html               │
│  - account.html             │
└──────────────┬──────────────┘
               │ HTTP Requests
               ↓
┌─────────────────────────────┐
│   PocketBase Server         │
│   (localhost:8090)          │
│  - Authentication           │
│  - User Management          │
│  - Event Tracking           │
│  - Analytics                │
└──────────────┬──────────────┘
               │
               ↓
       ┌──────────────┐
       │  SQLite      │
       │  Database    │
       │  (os.db)     │
       └──────────────┘
```

## Questions?

- PocketBase docs: [https://pocketbase.io/docs/](https://pocketbase.io/docs/)
- GitHub issues: [https://github.com/pocketbase/pocketbase](https://github.com/pocketbase/pocketbase)
