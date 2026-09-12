-- ==============================================================================
-- TrustWorkers Cooperative Platform - Supabase Storage & Profile Avatars Setup
-- ==============================================================================
-- This script sets up the 'avatars' storage bucket and policies in Supabase,
-- and ensures both customers and workers tables have the avatar_url column.
--
-- HOW TO RUN THIS IN SUPABASE:
-- 1. Log in to your Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Select your project.
-- 3. In the left sidebar, navigate to "SQL Editor".
-- 4. Click "New Query", paste the entire contents of this file, and click "Run".
-- 
-- ALTERNATIVE (Via Storage Dashboard):
-- 1. In the left sidebar, click "Storage".
-- 2. Click "New Bucket".
-- 3. Enter Bucket Name: "avatars".
-- 4. Turn ON the "Public bucket" toggle (so avatars can be viewed publicly).
-- 5. Under "Policies", add policies for:
--    - SELECT: Give public (anon and authenticated) read access.
--    - INSERT / UPDATE: Give anon and authenticated access to upload files.
-- ==============================================================================

-- 1. Ensure avatar_url column exists on customers table
ALTER TABLE IF EXISTS public.customers 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Ensure avatar_url column exists on workers table
ALTER TABLE IF EXISTS public.workers 
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Optional: ensure trust score columns exist on workers table
ALTER TABLE IF EXISTS public.workers 
ADD COLUMN IF NOT EXISTS verification_tier TEXT DEFAULT 'Bronze';

ALTER TABLE IF EXISTS public.workers 
ADD COLUMN IF NOT EXISTS cancelled_jobs INT DEFAULT 0;

-- 3. Create the 'avatars' storage bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5 MB file size limit
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];

-- 4. Enable Row Level Security (RLS) on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 5. Storage Policies for 'avatars' bucket

-- A. Public Read Access: Anyone can view profile avatars
DROP POLICY IF EXISTS "Public Read Avatars" ON storage.objects;
CREATE POLICY "Public Read Avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

-- B. Upload / Insert Access: Allow authenticated and anon users to upload profile photos
DROP POLICY IF EXISTS "Allow Upload Avatars" ON storage.objects;
CREATE POLICY "Allow Upload Avatars"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'avatars');

-- C. Update Access: Allow updating / overwriting an existing avatar image
DROP POLICY IF EXISTS "Allow Update Avatars" ON storage.objects;
CREATE POLICY "Allow Update Avatars"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

-- D. Delete Access: Allow deleting avatar images
DROP POLICY IF EXISTS "Allow Delete Avatars" ON storage.objects;
CREATE POLICY "Allow Delete Avatars"
ON storage.objects
FOR DELETE
USING (bucket_id = 'avatars');
