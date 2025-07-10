-- Enable Row Level Security
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Create the table to store mentor configurations
CREATE TABLE public.mentors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    model TEXT NOT NULL,
    expertise_level TEXT,
    communication_style TEXT,
    aggressiveness INTEGER,
    daily_reminders BOOLEAN DEFAULT false,
    achievement_alerts BOOLEAN DEFAULT false,
    session_reminders BOOLEAN DEFAULT false
);

-- Create policies for RLS
CREATE POLICY "Allow users to view their own mentors" ON public.mentors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert their own mentors" ON public.mentors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own mentors" ON public.mentors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own mentors" ON public.mentors FOR DELETE USING (auth.uid() = user_id);
