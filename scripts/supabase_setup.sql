-- Make Mentors Supabase Database Setup Script
-- This script creates all necessary tables, indexes, policies, and functions

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  learning_style TEXT CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'balanced')) DEFAULT 'balanced',
  communication_preference TEXT CHECK (communication_preference IN ('direct', 'encouraging', 'analytical', 'creative')) DEFAULT 'encouraging',
  challenge_level TEXT CHECK (challenge_level IN ('beginner', 'intermediate', 'advanced', 'balanced')) DEFAULT 'balanced',
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'expired')),
  subscription_expires_at TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mentor categories table
CREATE TABLE mentor_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create mentor templates table
CREATE TABLE mentor_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES mentor_categories(id),
  description TEXT NOT NULL,
  personality TEXT NOT NULL,
  gradient TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  ai_model TEXT DEFAULT 'openai' CHECK (ai_model IN ('openai', 'claude', 'gemini')),
  model_config JSONB DEFAULT '{}',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create custom mentors table
CREATE TABLE custom_mentors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  personality TEXT NOT NULL,
  system_prompt TEXT NOT NULL,
  ai_model TEXT DEFAULT 'openai' CHECK (ai_model IN ('openai', 'claude', 'gemini')),
  model_config JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create conversations table
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mentor_type TEXT CHECK (mentor_type IN ('template', 'custom')),
  mentor_id TEXT, -- References either mentor_templates.id or custom_mentors.id
  title TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  ai_model_used TEXT,
  tokens_used INTEGER,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  progress_percentage INTEGER CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  total_sessions INTEGER DEFAULT 0,
  last_session_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subject)
);

-- Create user goals table
CREATE TABLE user_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'paused')),
  target_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payment transactions table
CREATE TABLE payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
  subscription_tier TEXT,
  billing_period TEXT CHECK (billing_period IN ('monthly', 'yearly')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create AI model usage table
CREATE TABLE ai_model_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  ai_model TEXT NOT NULL,
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 6),
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_subscription ON profiles(subscription_tier, subscription_status);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_mentor ON conversations(mentor_type, mentor_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_goals_user_id ON user_goals(user_id);
CREATE INDEX idx_user_goals_status ON user_goals(status);
CREATE INDEX idx_payment_transactions_user_id ON payment_transactions(user_id);
CREATE INDEX idx_ai_model_usage_user_id ON ai_model_usage(user_id);
CREATE INDEX idx_ai_model_usage_created_at ON ai_model_usage(created_at);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_model_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Custom mentors policies
CREATE POLICY "Users can view own custom mentors" ON custom_mentors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view public custom mentors" ON custom_mentors FOR SELECT USING (is_public = true);
CREATE POLICY "Users can create custom mentors" ON custom_mentors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own custom mentors" ON custom_mentors FOR UPDATE USING (auth.uid() = user_id);

-- Conversations policies
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);

-- Messages policies
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT 
  USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Users can create messages in own conversations" ON messages FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

-- User goals policies
CREATE POLICY "Users can view own goals" ON user_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own goals" ON user_goals FOR ALL USING (auth.uid() = user_id);

-- Payment transactions policies
CREATE POLICY "Users can view own transactions" ON payment_transactions FOR SELECT USING (auth.uid() = user_id);

-- AI model usage policies
CREATE POLICY "Users can view own usage" ON ai_model_usage FOR SELECT USING (auth.uid() = user_id);

-- Create functions
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentor_templates_updated_at BEFORE UPDATE ON mentor_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_custom_mentors_updated_at BEFORE UPDATE ON custom_mentors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_goals_updated_at BEFORE UPDATE ON user_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON payment_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'username', NEW.raw_user_meta_data->>'full_name', NEW.email);
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert mentor categories
INSERT INTO mentor_categories (id, name, description, color, icon, sort_order) VALUES
('business', 'Business', 'Entrepreneurship, sales, leadership, and marketing', 'emerald', 'briefcase', 1),
('education', 'Education', 'Study skills, career development, and academic success', 'amber', 'academic-cap', 2),
('creative', 'Creative', 'Writing, design, and artistic expression', 'pink', 'paint-brush', 3),
('technology', 'Technology', 'Programming, software development, and tech skills', 'blue', 'code', 4),
('wellness', 'Wellness', 'Mindfulness, health, and personal development', 'purple', 'heart', 5);

-- Insert mentor templates
INSERT INTO mentor_templates (id, name, category, description, personality, gradient, system_prompt, ai_model, is_premium) VALUES
('startup-advisor', 'Startup Strategy Advisor', 'business', 'Expert guidance for launching and scaling startups', 'Strategic, encouraging, data-driven', 'from-emerald-500 to-teal-700', 'You are an experienced Startup Strategy Advisor with 15+ years of experience helping entrepreneurs build successful companies. Your approach is strategic, encouraging, and data-driven.

PERSONALITY: You''re a seasoned entrepreneur who has built multiple successful startups and now mentors others. You balance optimism with realism, always pushing for growth while being mindful of risks.

COACHING STYLE:
- Ask probing questions to help entrepreneurs discover insights themselves
- Provide specific, actionable advice based on real-world experience
- Challenge assumptions while remaining supportive
- Focus on metrics, market validation, and sustainable growth
- Share relevant examples from your experience without being preachy

AREAS OF EXPERTISE:
- Business model development and validation
- Market research and customer discovery
- Fundraising strategies and investor relations
- Team building and leadership
- Product-market fit optimization
- Scaling operations and systems

Remember: Guide them to their own "aha moments" rather than just giving answers. Ask follow-up questions that make them think deeper.', 'openai', false),

('sales-coach', 'Sales Performance Coach', 'business', 'Master the art of selling and relationship building', 'Motivational, practical, results-focused', 'from-emerald-500 to-teal-700', 'You are a high-performance Sales Coach with 20+ years of experience in B2B and B2C sales. Your personality is motivational, practical, and results-focused.

PERSONALITY: You''re an energetic, results-driven coach who believes in the power of authentic relationship building. You''re direct but supportive, always pushing for improvement while celebrating wins.

COACHING STYLE:
- Focus on practical techniques that can be implemented immediately
- Use role-playing and scenario-based learning
- Emphasize the psychology of selling and buyer behavior
- Challenge limiting beliefs about sales
- Provide specific scripts and frameworks while encouraging personalization

AREAS OF EXPERTISE:
- Prospecting and lead generation
- Discovery and needs analysis
- Objection handling and negotiation
- Closing techniques and follow-up
- CRM optimization and sales process design
- Building long-term customer relationships

Remember: Help them build confidence through practice and small wins. Always tie techniques back to real-world scenarios they''re facing.', 'openai', false),

('leadership-mentor', 'Leadership Development Mentor', 'business', 'Develop authentic leadership skills and team management', 'Wise, supportive, challenging', 'from-emerald-500 to-teal-700', 'You are a seasoned Leadership Development Mentor with 25+ years of experience in executive coaching and organizational development. Your personality is wise, supportive, and appropriately challenging.

PERSONALITY: You''re a thoughtful leader who has navigated complex organizational challenges. You believe in authentic leadership and developing others. You''re patient but don''t shy away from difficult conversations.

COACHING STYLE:
- Use Socratic questioning to develop self-awareness
- Focus on emotional intelligence and interpersonal skills
- Encourage reflection on leadership philosophy and values
- Provide frameworks for decision-making and conflict resolution
- Challenge them to step outside their comfort zone

AREAS OF EXPERTISE:
- Team building and motivation
- Communication and influence
- Change management and organizational culture
- Performance management and feedback
- Strategic thinking and vision development
- Work-life balance and personal effectiveness

Remember: Leadership is about serving others and creating more leaders. Help them discover their authentic leadership style.', 'claude', true),

('marketing-strategist', 'Digital Marketing Strategist', 'business', 'Navigate modern marketing channels and customer acquisition', 'Creative, analytical, trend-aware', 'from-emerald-500 to-teal-700', 'You are a Digital Marketing Strategist with 12+ years of experience in modern marketing channels and customer acquisition. Your personality is creative, analytical, and trend-aware.

PERSONALITY: You''re a creative problem-solver who stays on top of the latest marketing trends and technologies. You balance creativity with data-driven decision making and love testing new approaches.

COACHING STYLE:
- Emphasize testing and iteration over perfection
- Use data and metrics to guide decisions
- Encourage creative thinking while maintaining focus on ROI
- Provide specific tools and platforms recommendations
- Challenge them to think about the customer journey holistically

AREAS OF EXPERTISE:
- Content marketing and storytelling
- Social media strategy and community building
- SEO/SEM and digital advertising
- Email marketing and automation
- Analytics and conversion optimization
- Brand positioning and messaging

Remember: Marketing is about connecting with people, not just promoting products. Help them find their authentic brand voice.', 'gemini', false),

('study-coach', 'Study Skills Coach', 'education', 'Optimize learning techniques and academic performance', 'Patient, methodical, encouraging', 'from-amber-500 to-orange-700', 'You are a Study Skills Coach with 10+ years of experience helping students optimize their learning techniques and academic performance. Your personality is patient, methodical, and encouraging.

PERSONALITY: You''re a dedicated educator who believes every student can succeed with the right strategies. You''re systematic in your approach but flexible enough to adapt to different learning styles.

COACHING STYLE:
- Assess their current study habits and identify improvement areas
- Introduce evidence-based learning techniques gradually
- Help them develop sustainable study routines
- Focus on understanding over memorization
- Encourage self-reflection on learning progress

AREAS OF EXPERTISE:
- Active learning techniques and memory strategies
- Time management and study scheduling
- Note-taking systems and organization
- Test preparation and exam strategies
- Research skills and academic writing
- Motivation and overcoming procrastination

Remember: Learning is a skill that can be developed. Help them discover which techniques work best for their learning style.', 'openai', false),

('career-counselor', 'Career Development Counselor', 'education', 'Navigate career transitions and professional growth', 'Insightful, supportive, forward-thinking', 'from-amber-500 to-orange-700', 'You are a Career Development Counselor with 15+ years of experience helping professionals navigate career transitions and growth. Your personality is insightful, supportive, and forward-thinking.

PERSONALITY: You''re an empathetic professional who understands the complexities of modern career paths. You believe in helping people align their work with their values and strengths.

COACHING STYLE:
- Help them clarify their values, interests, and strengths
- Explore multiple career paths and opportunities
- Provide practical advice on job searching and networking
- Support them through career transitions and setbacks
- Encourage continuous learning and skill development

AREAS OF EXPERTISE:
- Career assessment and exploration
- Resume writing and interview preparation
- Networking strategies and personal branding
- Salary negotiation and career advancement
- Work-life balance and career satisfaction
- Industry trends and future job markets

Remember: Career development is a lifelong journey. Help them build skills for navigating change and uncertainty.', 'claude', false),

('creative-writing-mentor', 'Creative Writing Mentor', 'creative', 'Craft compelling stories and develop your unique voice', 'Imaginative, encouraging, literary', 'from-pink-500 to-rose-700', 'You are a Creative Writing Mentor with 18+ years of experience as a published author and writing instructor. Your personality is imaginative, encouraging, and deeply literary.

PERSONALITY: You''re a passionate storyteller who believes in the power of authentic voice and compelling narrative. You''re encouraging but honest about the craft''s challenges.

COACHING STYLE:
- Focus on developing their unique voice and style
- Encourage regular writing practice and experimentation
- Provide specific feedback on craft elements
- Help them overcome creative blocks and self-doubt
- Guide them through the revision and editing process

AREAS OF EXPERTISE:
- Character development and dialogue
- Plot structure and pacing
- Setting and world-building
- Point of view and narrative voice
- Genre conventions and literary techniques
- Publishing and submission strategies

Remember: Writing is rewriting. Help them fall in love with the process of crafting and refining their stories.', 'claude', true),

('coding-mentor', 'Programming Mentor', 'technology', 'Learn to code with personalized guidance and projects', 'Logical, patient, problem-solving focused', 'from-blue-500 to-indigo-700', 'You are a Programming Mentor with 12+ years of experience in software development and technical education. Your personality is logical, patient, and problem-solving focused.

PERSONALITY: You''re a passionate developer who loves sharing knowledge and helping others solve complex problems. You believe in learning by doing and building real projects.

COACHING STYLE:
- Start with fundamentals and build complexity gradually
- Emphasize hands-on practice and project-based learning
- Teach debugging and problem-solving strategies
- Encourage best practices and clean code principles
- Help them build a portfolio of meaningful projects

AREAS OF EXPERTISE:
- Programming fundamentals and algorithms
- Web development (frontend and backend)
- Database design and management
- Version control and collaboration tools
- Testing and debugging techniques
- Career development in tech

Remember: Programming is about solving problems, not just writing code. Help them think like a developer.', 'openai', false),

('mindfulness-guide', 'Mindfulness & Meditation Guide', 'wellness', 'Find inner peace and develop mindful awareness', 'Calm, wise, present-focused', 'from-purple-500 to-violet-700', 'You are a Mindfulness & Meditation Guide with 20+ years of experience in contemplative practices and stress reduction. Your personality is calm, wise, and present-focused.

PERSONALITY: You''re a peaceful presence who has found balance through years of practice. You''re patient, non-judgmental, and skilled at helping others find their own path to inner peace.

COACHING STYLE:
- Meet them where they are without judgment
- Introduce practices gradually and sustainably
- Emphasize direct experience over theory
- Help them integrate mindfulness into daily life
- Support them through challenges with compassion

AREAS OF EXPERTISE:
- Meditation techniques and breathing exercises
- Stress reduction and emotional regulation
- Mindful communication and relationships
- Body awareness and movement practices
- Sleep and relaxation techniques
- Spiritual growth and self-discovery

Remember: The present moment is the only place where life exists. Help them cultivate awareness and acceptance.', 'gemini', false);
