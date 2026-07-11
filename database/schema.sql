-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean existing tables if any
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS receipts CASCADE;
DROP TABLE IF EXISTS loan_payments CASCADE;
DROP TABLE IF EXISTS loans CASCADE;
DROP TABLE IF EXISTS yearly_funds CASCADE;
DROP TABLE IF EXISTS kutumbha_bharosha CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS financial_years CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. USERS TABLE (Supabase Auth Linkage)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Admin', 'Member')),
    username VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. FINANCIAL YEARS TABLE
CREATE TABLE financial_years (
    id SERIAL PRIMARY KEY,
    year_label VARCHAR(9) UNIQUE NOT NULL, -- e.g., '2026-2027'
    is_active BOOLEAN DEFAULT false,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. MEMBERS TABLE
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    member_code VARCHAR(20) UNIQUE NOT NULL, -- Auto-generated: DPP0001
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    father_husband_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    dob DATE NOT NULL,
    blood_group VARCHAR(5) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    whatsapp VARCHAR(15),
    email VARCHAR(255),
    studio_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    village VARCHAR(100) NOT NULL,
    mandal VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL DEFAULT 'Andhra Pradesh',
    pin VARCHAR(10) NOT NULL,
    joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
    membership_status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (membership_status IN ('Active', 'Inactive', 'Suspended')),
    photo_url TEXT,
    aadhaar_url TEXT,
    is_deleted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. KUTUMBHA BHAROSHA TABLE (Family Protection Scheme)
CREATE TABLE kutumbha_bharosha (
    id SERIAL PRIMARY KEY,
    kb_code VARCHAR(20) UNIQUE NOT NULL, -- Auto-generated: DPKB0001
    member_id INT REFERENCES members(id) ON DELETE CASCADE UNIQUE,
    nominee_name VARCHAR(255) NOT NULL,
    relationship VARCHAR(100) NOT NULL,
    nominee_mobile VARCHAR(15) NOT NULL,
    family_details JSONB DEFAULT '[]'::jsonb,
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Claimed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. YEARLY FUNDS TABLE
CREATE TABLE yearly_funds (
    id SERIAL PRIMARY KEY,
    receipt_code VARCHAR(50) UNIQUE NOT NULL,
    financial_year_id INT REFERENCES financial_years(id),
    member_id INT REFERENCES members(id) ON DELETE RESTRICT,
    female_bb NUMERIC(12, 2) DEFAULT 0.00,
    male_bb NUMERIC(12, 2) DEFAULT 0.00,
    id_card_fee NUMERIC(12, 2) DEFAULT 0.00,
    total_amount NUMERIC(12, 2) GENERATED ALWAYS AS (female_bb + male_bb + id_card_fee) STORED,
    amount_paid NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    remaining_balance NUMERIC(12, 2) GENERATED ALWAYS AS ((female_bb + male_bb + id_card_fee) - amount_paid) STORED,
    payment_mode VARCHAR(50) NOT NULL CHECK (payment_mode IN ('Cash', 'UPI', 'Bank Transfer')),
    collection_date DATE NOT NULL DEFAULT CURRENT_DATE,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. LOANS TABLE
CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    loan_code VARCHAR(20) UNIQUE NOT NULL, -- Auto-generated: DPLN0001
    financial_year_id INT REFERENCES financial_years(id),
    member_id INT REFERENCES members(id) ON DELETE RESTRICT,
    loan_type VARCHAR(50) NOT NULL CHECK (loan_type IN ('Personal', 'Emergency', 'Equipment')),
    loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
    loan_amount NUMERIC(12, 2) NOT NULL,
    interest_type VARCHAR(20) NOT NULL CHECK (interest_type IN ('Flat', 'Reducing')),
    interest_rate NUMERIC(5, 2) NOT NULL, -- Percentage
    installments INT NOT NULL CHECK (installments > 0),
    emi NUMERIC(12, 2) NOT NULL,
    paid_amount NUMERIC(12, 2) DEFAULT 0.00,
    balance_amount NUMERIC(12, 2) NOT NULL,
    due_date DATE NOT NULL,
    loan_status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (loan_status IN ('Pending', 'Approved', 'Active', 'Closed', 'Defaulter')),
    guarantor_id INT REFERENCES members(id),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. LOAN PAYMENTS TABLE
CREATE TABLE loan_payments (
    id SERIAL PRIMARY KEY,
    receipt_code VARCHAR(50) UNIQUE NOT NULL,
    loan_id INT REFERENCES loans(id) ON DELETE RESTRICT,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount_paid NUMERIC(12, 2) NOT NULL,
    payment_mode VARCHAR(50) NOT NULL CHECK (payment_mode IN ('Cash', 'UPI', 'Bank Transfer')),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. AUDIT LOGS TABLE
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    username VARCHAR(100),
    role VARCHAR(50),
    action VARCHAR(50) NOT NULL,
    module VARCHAR(50) NOT NULL,
    record_id VARCHAR(100),
    ip_address VARCHAR(45),
    browser VARCHAR(255),
    device VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. SETTINGS TABLE
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    association_name VARCHAR(255) NOT NULL DEFAULT 'Dhammapeta Photographers Association',
    logo_url TEXT,
    address TEXT,
    contact_number VARCHAR(15),
    email VARCHAR(255),
    website VARCHAR(255),
    member_prefix VARCHAR(10) DEFAULT 'DPP',
    loan_prefix VARCHAR(10) DEFAULT 'DPLN',
    receipt_prefix VARCHAR(10) DEFAULT 'DPR',
    kb_prefix VARCHAR(10) DEFAULT 'DPKB',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AUTOMATIC SEQUENTIAL CODE GENERATORS VIA PROCEDURAL FUNCTIONS
CREATE OR REPLACE FUNCTION generate_member_code() 
RETURNS TRIGGER AS $$
DECLARE
    next_val INT;
    prefix VARCHAR(10);
BEGIN
    SELECT COALESCE(member_prefix, 'DPP') INTO prefix FROM settings LIMIT 1;
    IF prefix IS NULL THEN prefix := 'DPP'; END IF;
    
    SELECT COALESCE(MAX(id), 0) + 1 INTO next_val FROM members;
    NEW.member_code := prefix || LPAD(next_val::text, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_member_code
BEFORE INSERT ON members
FOR EACH ROW WHEN (NEW.member_code IS NULL)
EXECUTE FUNCTION generate_member_code();


CREATE OR REPLACE FUNCTION generate_kb_code() 
RETURNS TRIGGER AS $$
DECLARE
    next_val INT;
    prefix VARCHAR(10);
BEGIN
    SELECT COALESCE(kb_prefix, 'DPKB') INTO prefix FROM settings LIMIT 1;
    IF prefix IS NULL THEN prefix := 'DPKB'; END IF;
    
    SELECT COALESCE(MAX(id), 0) + 1 INTO next_val FROM kutumbha_bharosha;
    NEW.kb_code := prefix || LPAD(next_val::text, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_kb_code
BEFORE INSERT ON kutumbha_bharosha
FOR EACH ROW WHEN (NEW.kb_code IS NULL)
EXECUTE FUNCTION generate_kb_code();


CREATE OR REPLACE FUNCTION generate_loan_code() 
RETURNS TRIGGER AS $$
DECLARE
    next_val INT;
    prefix VARCHAR(10);
BEGIN
    SELECT COALESCE(loan_prefix, 'DPLN') INTO prefix FROM settings LIMIT 1;
    IF prefix IS NULL THEN prefix := 'DPLN'; END IF;
    
    SELECT COALESCE(MAX(id), 0) + 1 INTO next_val FROM loans;
    NEW.loan_code := prefix || LPAD(next_val::text, 4, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_loan_code
BEFORE INSERT ON loans
FOR EACH ROW WHEN (NEW.loan_code IS NULL)
EXECUTE FUNCTION generate_loan_code();

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE yearly_funds ENABLE ROW LEVEL SECURITY;

-- Dynamic RLS Policies
CREATE POLICY "Admins have complete clearance" ON users FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'Admin')
);

CREATE POLICY "Members view own user" ON users FOR SELECT TO authenticated USING (
    id = auth.uid()
);

CREATE POLICY "Admins manage all members" ON members FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.role = 'Admin')
);

CREATE POLICY "Members view self profile" ON members FOR SELECT TO authenticated USING (
    user_id = auth.uid()
);

-- SEED DATA SETUP
INSERT INTO settings (id, association_name, member_prefix, loan_prefix, receipt_prefix, kb_prefix)
VALUES (1, 'Dhammapeta Photographers Association', 'DPP', 'DPLN', 'DPR', 'DPKB')
ON CONFLICT (id) DO NOTHING;

INSERT INTO financial_years (year_label, is_active, start_date, end_date) VALUES
('2025-2026', false, '2025-04-01', '2026-03-31'),
('2026-2027', true, '2026-04-01', '2027-03-31');
