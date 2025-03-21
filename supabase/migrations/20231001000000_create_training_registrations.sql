
-- Create training_registrations table
CREATE TABLE IF NOT EXISTS public.training_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  education TEXT NOT NULL,
  experience TEXT NOT NULL,
  additionalInfo TEXT,
  is_reviewed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row level security policies
ALTER TABLE public.training_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Allow public inserts to training_registrations (for form submissions)
CREATE POLICY "Allow public registration inserts" 
  ON public.training_registrations 
  FOR INSERT 
  TO public
  WITH CHECK (true);

-- Allow admins to see all registrations
CREATE POLICY "Allow admins to see all registrations" 
  ON public.training_registrations 
  FOR SELECT 
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- Allow admins to update registrations
CREATE POLICY "Allow admins to update registrations" 
  ON public.training_registrations 
  FOR UPDATE 
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- Allow public to view client logos (public data)
CREATE POLICY "Allow public to view client logos" 
  ON public.clients 
  FOR SELECT 
  TO public
  USING (true);

-- Allow admins to manage clients
CREATE POLICY "Allow admins to manage clients" 
  ON public.clients 
  FOR ALL 
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- Insert some sample clients
INSERT INTO public.clients (name, logo_url, industry) VALUES
  ('Microsoft', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png', 'Technology'),
  ('IBM', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png', 'Technology'),
  ('Oracle', 'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Symbol.png', 'Technology'),
  ('Cisco', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png', 'Networking'),
  ('Dell', 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/1200px-Dell_Logo.png', 'Hardware');
