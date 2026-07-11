# Dhammapeta Photographers Association Management Portal

An enterprise-ready, role-based resource planning and financial tracking engine optimized specifically for association operational workflows.

## Core Architectural Composition
- **Client Topology:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query.
- **Service API Topology:** Node.js, Express, TypeScript, MVC Pattern with JWT Protection.
- **Database Engine Infrastructure:** Supabase PostgreSQL with built-in Procedural Code Generators and Row-Level Security (RLS).

## Quickstart Deployment Guide

### 1. Database Provisioning
Run the contents of `database/schema.sql` directly within the Supabase SQL editor workspace to generate tables, relational constraints, code sequence triggers, and core settings definitions.

### 2. Environment Verification
Create an operational `.env` runtime file in the root workspace boundary matching the properties detailed in `.env.example`.

### 3. Execution Execution
Run the programmatic setup routine using the terminal root directory footprint:
```bash
chmod +x scripts/setup-workspace.sh
./scripts/setup-workspace.sh
npm run dev
