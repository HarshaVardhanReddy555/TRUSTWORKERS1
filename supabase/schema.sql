-- ==============================================================================
-- TrustWorkers Cooperative Platform - Supabase PostgreSQL Schema
-- ==============================================================================
-- NOTE: Row Level Security (RLS) is intentionally NOT enabled on these tables
-- during development to allow full read/write access via the client.
-- RLS policies and role-based access rules should be added before real production use.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables in reverse dependency order if recreating schema
DROP TABLE IF EXISTS booking_assigned_workers CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS active_job_requests CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS workers CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. Customers Table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  avatar_url TEXT
);

-- 2. Teams Table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  team_lead_id UUID, -- References workers(id), added via ALTER TABLE below
  trade TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  reviews_count INT DEFAULT 0,
  total_members INT DEFAULT 1,
  available_members INT DEFAULT 1,
  hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 250.00
);

-- 3. Workers Table
CREATE TABLE workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  reviews_count INT DEFAULT 0,
  experience_years INT DEFAULT 1,
  jobs_completed INT DEFAULT 0,
  on_time_percent NUMERIC(5, 2) DEFAULT 95.00,
  hourly_rate NUMERIC(10, 2) NOT NULL DEFAULT 200.00,
  avatar_url TEXT DEFAULT '',
  qualifications TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  mandal TEXT NOT NULL,
  cluster TEXT NOT NULL,
  shareholder_id TEXT NOT NULL,
  education JSONB NOT NULL DEFAULT '{}'::jsonb,
  kyc JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_team_lead BOOLEAN DEFAULT FALSE,
  team_id UUID REFERENCES teams(id) ON DELETE SET NULL
);

-- Add foreign key reference for team_lead_id on teams table
ALTER TABLE teams
  ADD CONSTRAINT fk_team_lead
  FOREIGN KEY (team_lead_id)
  REFERENCES workers(id)
  ON DELETE SET NULL;

-- 4. Team Members Table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  trade TEXT NOT NULL,
  experience_years INT DEFAULT 1,
  availability TEXT NOT NULL CHECK (availability IN ('Available', 'On Job', 'Off Duty')),
  phone TEXT NOT NULL,
  qualification TEXT NOT NULL,
  jobs_completed INT DEFAULT 0
);

-- 5. Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  base_rate_per_hour NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.00,
  jobs_count INT DEFAULT 0,
  badge TEXT,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  popular BOOLEAN DEFAULT FALSE
);

-- 6. Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('searching', 'assigned', 'en-route', 'in-progress', 'completed', 'cancelled')),
  date_str TEXT NOT NULL,
  time_window TEXT NOT NULL,
  worker_count INT DEFAULT 1,
  duration_hours NUMERIC(4, 2) DEFAULT 1.0,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  address TEXT NOT NULL,
  landmark TEXT,
  problem_description TEXT NOT NULL,
  rate_per_hour NUMERIC(10, 2) NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  paid_amount NUMERIC(10, 2),
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending',
  completed_date TEXT,
  rating_given NUMERIC(3, 2),
  review_comment TEXT,
  step_current INT DEFAULT 1,
  arriving_minutes INT
);

-- 7. Booking Assigned Workers (Join Table)
CREATE TABLE booking_assigned_workers (
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES workers(id) ON DELETE CASCADE,
  PRIMARY KEY (booking_id, worker_id)
);

-- 8. Active Job Requests Table
CREATE TABLE active_job_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_avatar TEXT NOT NULL,
  distance_km NUMERIC(5, 2) NOT NULL,
  location_area TEXT NOT NULL,
  trade TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  rate NUMERIC(10, 2) NOT NULL,
  timing TEXT NOT NULL,
  is_urgent BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  time_notice TEXT,
  slot_type TEXT CHECK (slot_type IN ('urgent', 'today', 'tomorrow'))
);

-- ==============================================================================
-- SEED DATA (Realistic initial records for immediate testing & demonstration)
-- ==============================================================================

-- Seed Customer
INSERT INTO customers (id, name, phone, email)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'Ram', '+91 98765 43210', 'ram.coop.customer@gmail.com');

-- Seed Team (Created first so team_id can be referenced by workers)
INSERT INTO teams (id, team_name, trade, rating, reviews_count, total_members, available_members, hourly_rate)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Undi Multi-Trade Guild Crew A', 'Electrical & Multi-Trade Services', 4.94, 520, 5, 3, 475.00);

-- Seed Workers
INSERT INTO workers (
  id, name, title, phone, email, rating, reviews_count, experience_years, jobs_completed, on_time_percent, hourly_rate, avatar_url, qualifications, languages, mandal, cluster, shareholder_id, education, kyc, is_team_lead, team_id
) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'Ravi Kumar',
    'Licensed Electrician & Plumber',
    '+91 98480 23145',
    'ravi.electrician.undi@gmail.com',
    4.92,
    430,
    7,
    482,
    98.0,
    250.00,
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=240&auto=format&fit=crop&q=80',
    ARRAY['SSC & ITI Verified', 'Co-op Shield Insured', 'Trade Master Grade A'],
    ARRAY['Telugu', 'English', 'Hindi'],
    'Undi Mandal',
    'Undi Cluster, West Godavari',
    '#408',
    '{"level": "10th Standard / SSC Passed", "school": "Zilla Parishad High School, Undi (BSEA)", "rollNo": "SSC-2015-84920", "passYear": "2015"}'::jsonb,
    '{"aadhaarMasked": "•••• 4892 (UIDAI Biometric Verified)", "upiId": "ravi.undi@sbi"}'::jsonb,
    TRUE,
    '10000000-0000-0000-0000-000000000001'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'Suresh Varma',
    'Senior Certified Electrician',
    '+91 97011 44520',
    'suresh.varma@coworkseva.in',
    4.80,
    290,
    6,
    312,
    96.0,
    250.00,
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80',
    ARRAY['10th Pass Verified', 'Wireman License #882'],
    ARRAY['Telugu', 'English'],
    'Bhimavaram',
    'Bhimavaram Town Co-op',
    '#512',
    '{"level": "10th Standard (SSC)", "school": "Govt High School, Bhimavaram", "rollNo": "SSC-2016-11029", "passYear": "2016"}'::jsonb,
    '{"aadhaarMasked": "•••• 7712 (UIDAI Biometric Verified)", "upiId": "suresh.varma@ybl"}'::jsonb,
    FALSE,
    '10000000-0000-0000-0000-000000000001'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'Mohan Rao',
    'Sanitary & Plumbing Specialist',
    '+91 98492 11029',
    'mohan.rao.plumb@gmail.com',
    4.88,
    210,
    5,
    240,
    97.0,
    250.00,
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
    ARRAY['10th SSC', 'Plumbing Co-op Grade B'],
    ARRAY['Telugu'],
    'Undi Mandal',
    'Undi Cluster, West Godavari',
    '#622',
    '{"level": "10th Standard (SSC)", "school": "Undi ZP High School", "rollNo": "SSC-2017-38192", "passYear": "2017"}'::jsonb,
    '{"aadhaarMasked": "•••• 3921 (UIDAI Verified)", "upiId": "mohan.rao@okaxis"}'::jsonb,
    FALSE,
    '10000000-0000-0000-0000-000000000001'
  );

-- Update team_lead_id on team
UPDATE teams
SET team_lead_id = '20000000-0000-0000-0000-000000000001'
WHERE id = '10000000-0000-0000-0000-000000000001';

-- Seed Team Members
INSERT INTO team_members (
  id, team_id, name, role, avatar_url, rating, trade, experience_years, availability, phone, qualification, jobs_completed
) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Ravi Kumar',
    'Team Lead & Master Electrician',
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=240&auto=format&fit=crop&q=80',
    4.92,
    'Electrical & Plumbing',
    7,
    'Available',
    '+91 98480 23145',
    'SSC & ITI Verified • Shield Insured',
    482
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Suresh Varma',
    'Senior Electrician & Wireman',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80',
    4.80,
    'Electrical & MCB Diagnostics',
    6,
    'Available',
    '+91 97011 44520',
    '10th Pass • Wireman License #882',
    312
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Mohan Rao',
    'Sanitary & Pipe Specialist',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80',
    4.88,
    'Plumbing & Drainage',
    5,
    'Available',
    '+91 98492 11029',
    '10th SSC • Plumbing Co-op Grade B',
    240
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    'Venkatesh Prasad',
    'Apprentice Technician',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
    4.75,
    'General Repairs & Conduit Laying',
    3,
    'On Job',
    '+91 96522 84910',
    'ITI Electrical 2021 • Trainee ID #912',
    118
  ),
  (
    '30000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    'Ramesh K.',
    'Appliance & Motor Specialist',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&auto=format&fit=crop&q=80',
    4.90,
    'Motors, Pumps & Geysers',
    8,
    'Off Duty',
    '+91 94401 77312',
    'Govt Polytechnic Diploma • Master Certified',
    390
  );

-- Seed Services
INSERT INTO services (
  id, name, category, base_rate_per_hour, rating, jobs_count, badge, description, icon_name, popular
) VALUES
  (
    '40000000-0000-0000-0000-000000000001',
    'Electrician',
    'Electrical',
    200.00,
    4.89,
    340,
    'Verified',
    'Wiring, repairs, MCB, switchboard installations',
    'bolt',
    TRUE
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    'Plumber',
    'Plumbing',
    250.00,
    4.92,
    520,
    'Fair Match',
    'Pipe leaks, taps, sanitary fittings, tank overhaul',
    'water_drop',
    TRUE
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    'Carpenter',
    'Carpentry',
    250.00,
    4.85,
    280,
    'Verified',
    'Furniture assembly, doors, locks & wood polish',
    'carpenter',
    FALSE
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    'Painter',
    'Painting',
    300.00,
    4.78,
    190,
    'Verified',
    'Interior, exterior wall painting & waterproofing touchup',
    'format_paint',
    FALSE
  ),
  (
    '40000000-0000-0000-0000-000000000005',
    'Appliance Repair',
    'Appliances',
    350.00,
    4.91,
    410,
    'Fair Match',
    'AC service, washing machine, geyser & microwave fix',
    'kitchen',
    FALSE
  ),
  (
    '40000000-0000-0000-0000-000000000006',
    'Home Cleaning & Pest',
    'Cleaning',
    400.00,
    4.87,
    370,
    'Verified',
    'Deep cleaning, kitchen degreasing & organic pest care',
    'cleaning_services',
    FALSE
  );

-- Seed Bookings
INSERT INTO bookings (
  id, service_id, service_name, category, status, date_str, time_window, worker_count, duration_hours,
  customer_name, customer_phone, address, landmark, problem_description, rate_per_hour, total_amount,
  paid_amount, payment_method, payment_status, step_current, arriving_minutes
) VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    '40000000-0000-0000-0000-000000000002',
    'Plumbing Repair',
    'Plumbing',
    'in-progress',
    'Today, 05 Sep',
    '2:00 PM - 4:00 PM',
    1,
    2.0,
    'Ram',
    '+91 98765 43210',
    '42 Cooperative Way, Block B, Flat 302, Green Park, Undi, 534199',
    'Near Undi Panchayati Library',
    'Kitchen washbasin lower elbow leaking water continuously.',
    250.00,
    500.00,
    500.00,
    'UPI',
    'paid',
    2,
    12
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    '40000000-0000-0000-0000-000000000001',
    'Electrical Switchboard Installation',
    'Electrical',
    'completed',
    '28 Aug 2024',
    '11:00 AM - 12:30 PM',
    1,
    1.5,
    'Ram',
    '+91 98765 43210',
    '42 Cooperative Way, Block B, Flat 302, Green Park, Undi',
    NULL,
    'Installed 2 modern modular boards with surge arrestor.',
    250.00,
    375.00,
    375.00,
    'UPI',
    'paid',
    4,
    NULL
  );

-- Seed Booking Assigned Workers
INSERT INTO booking_assigned_workers (booking_id, worker_id)
VALUES
  ('b0000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000002');

-- Seed Active Job Requests (Broadcasting to technicians)
INSERT INTO active_job_requests (
  id, customer_name, customer_avatar, distance_km, location_area, trade, title, description, rate, timing, is_urgent, status, time_notice, slot_type
) VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    'Venkata Lakshmi',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80',
    1.2,
    'Undi Main Road',
    'Electrician',
    'Ceiling Fan Sparking & Short Circuit Repair',
    'Master bedroom fan started making clicking noise and sparking when turned to speed 3. Need urgent inspection.',
    300.00,
    '< 30 mins',
    TRUE,
    'pending',
    'URGENT • JUST NOW',
    'urgent'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'Suresh Reddy',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160&auto=format&fit=crop&q=80',
    3.8,
    'Rayalam Road',
    'Plumbing',
    'Water Tank Float Valve & Pipe Leakage',
    'Overhead tank overflow valve broken, leaking onto roof slab.',
    450.00,
    'Today, 4:00 - 6:00 PM',
    FALSE,
    'pending',
    'Today, 4:00 - 6:00 PM',
    'today'
  ),
  (
    'a0000000-0000-0000-0000-000000000003',
    'Anusha G.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    2.5,
    'Green Park colony',
    'Electrical',
    'Full House Switchboard Upgrade',
    'Complete replacement of 6 switchboards with modular fittings. Materials provided by customer.',
    900.00,
    'Tomorrow, 10:00 AM',
    FALSE,
    'pending',
    'Tomorrow, 10:00 AM',
    'tomorrow'
  );
