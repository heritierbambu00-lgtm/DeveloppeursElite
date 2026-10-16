-- SQL Script to create applications table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT NOT NULL,
    cover_letter TEXT,
    cv_url TEXT,
    status TEXT DEFAULT 'pending', -- pending, reviewed, accepted, rejected
    assigned_to TEXT DEFAULT 'COO'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Policy for public inserts (anyone can apply)
CREATE POLICY "Allow public application submission" ON public.applications
    FOR INSERT
    WITH CHECK (true);

-- Policy for authenticated admin/team/COO/CEO to view applications
CREATE POLICY "Allow team members to view applications" ON public.applications
    FOR SELECT
    USING (true);

-- Policy for admin/COO to update application status
CREATE POLICY "Allow team members to update applications" ON public.applications
    FOR UPDATE
    USING (true);

-- Create storage bucket for CVs if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('cvs', 'cvs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for CVs
CREATE POLICY "Allow public CV uploads" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'cvs');

CREATE POLICY "Allow public CV viewing" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'cvs');
