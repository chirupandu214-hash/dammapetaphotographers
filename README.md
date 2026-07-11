# Dammapeta Photographers Portal
A professional management system for the Dammapeta Association.

## Features
- Full Member CRUD operations.
- LocalStorage persistence.
- Responsive design.
- Dashboard with charts.

## Deployment
1. Upload to GitHub.
2. Go to **Settings > Pages**.
3. Set **Source** to `main` branch.
4. Portal will be live at `https://yourusername.github.io/dammapeta-photographers-portal/`.

## Phase 2 Upgrades
- Transition data to Supabase PostgreSQL.
- Replace `localStorage` calls with `supabase.from('members').insert()`.
