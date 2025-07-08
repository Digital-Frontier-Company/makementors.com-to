# Make Mentors - Complete Lovable Implementation Prompt

## Project Overview

Create a comprehensive AI-powered personalized coaching platform called "Make Mentors" that allows users to interact with specialized AI mentors across various domains. This is a production-ready application with real AI integrations, authentication, payment processing, and no mock data.

## Core Concept

Make Mentors is an innovative platform that democratizes access to expert mentorship by providing AI-powered coaches specialized in different fields including business, education, creative arts, technology, and wellness. Users can engage in meaningful conversations with these AI mentors, track their progress, set goals, and access premium features through a subscription model.

## Technical Architecture

### Frontend Framework
- **React 18+** with TypeScript for type safety
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for responsive, modern styling
- **Shadcn/ui** components for consistent UI elements
- **React Router** for client-side routing
- **React Query/TanStack Query** for server state management
- **Zustand** for client state management

### Backend Infrastructure
- **Supabase** as the primary backend service
- **PostgreSQL** database with Row Level Security (RLS)
- **Supabase Auth** for user authentication and authorization
- **Supabase Realtime** for live conversation updates
- **Edge Functions** for AI model integrations and payment processing

### AI Model Integrations
- **OpenAI GPT-4o-mini** for general mentoring (primary model)
- **Anthropic Claude 3.5 Sonnet** for creative and analytical mentoring
- **Google Gemini Pro** for technical and research-focused mentoring
- **Dynamic model routing** based on mentor type and user preferences

### Payment Processing
- **Stripe** integration for subscription management
- **Stripe Customer Portal** for subscription management
- **Webhook handling** for payment status updates
- **Multiple subscription tiers** (Free, Premium, Enterprise)

...and so on.
