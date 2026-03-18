-- Create the discovery_sessions table for storing PPC discovery sessions
CREATE TABLE IF NOT EXISTS discovery_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  firm_size TEXT,
  practice_area TEXT,
  city TEXT,
  website TEXT,
  answers JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE discovery_sessions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anonymous/authenticated users (for the anon key)
CREATE POLICY "Allow insert for all" ON discovery_sessions
  FOR INSERT WITH CHECK (true);

-- Allow reading all sessions (you can restrict this to authenticated users)
CREATE POLICY "Allow read for all" ON discovery_sessions
  FOR SELECT USING (true);