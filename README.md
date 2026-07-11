# Dammapeta Photographers Association - Management Portal

An enterprise-grade, full-stack web application designed for managing members, loans, yearly fund collections, and Kutumbha Bharosha welfare schemes for the Dammapeta Photographers Association.

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI, TanStack Query, React Hook Form, Chart.js.
* **Backend:** Node.js, Express.js, TypeScript, REST API, JWT Authentication.
* **Database:** Supabase (PostgreSQL), Row Level Security (RLS), Supabase Storage.
* **Deployment:** Render.com (Frontend & Backend), GitHub Actions.

## Project Architecture

The project strictly follows a decoupled client-server architecture:
* `/client`: Frontend React application.
* `/server`: Backend Express REST API.
* `/database`: PostgreSQL schema, policies, and seed data.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/dammapeta-portal.git](https://github.com/your-username/dammapeta-portal.git)
   cd dammapeta-portal
