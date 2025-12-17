-- Create hearts table for portfolio
CREATE TABLE IF NOT EXISTS hearts (
  id INTEGER PRIMARY KEY DEFAULT 1,
  count INTEGER NOT NULL DEFAULT 20,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial value with 20 hearts
INSERT INTO hearts (id, count)
VALUES (1, 20)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE hearts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read the heart count
CREATE POLICY "Allow public read access" ON hearts
  FOR SELECT
  USING (true);

-- Allow anyone to update the heart count
CREATE POLICY "Allow public update access" ON hearts
  FOR UPDATE
  USING (true);

-- Allow insert (for upsert)
CREATE POLICY "Allow public insert access" ON hearts
  FOR INSERT
  WITH CHECK (true);

