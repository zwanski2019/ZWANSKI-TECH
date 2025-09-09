-- CRITICAL SECURITY FIXES - Phase 1: Database Security

-- 1. Fix admin_logs table - Remove dangerous public access policy
DROP POLICY IF EXISTS "replace_with_policy_name" ON public.admin_logs;
DROP POLICY IF EXISTS "Admins can view admin logs" ON public.admin_logs;

-- Create secure admin-only policy for admin_logs
CREATE POLICY "Admin only logs access" 
ON public.admin_logs 
FOR ALL 
USING (public.is_admin_secure());

-- 2. Secure analytics table - Remove unnecessary public select access
DROP POLICY IF EXISTS "Admins can view analytics" ON public.analytics;
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.analytics;
DROP POLICY IF EXISTS "analytics_public_insert" ON public.analytics;

-- Create secure analytics policies
CREATE POLICY "Admin only analytics access" 
ON public.analytics 
FOR SELECT 
USING (public.is_admin_secure());

CREATE POLICY "System can insert analytics" 
ON public.analytics 
FOR INSERT 
WITH CHECK (true);

-- 3. Ensure api_error_logs is admin-only (already has policy, but strengthen it)
DROP POLICY IF EXISTS "Admins can view error logs" ON public.api_error_logs;

CREATE POLICY "Admin only error logs access" 
ON public.api_error_logs 
FOR ALL 
USING (public.is_admin_secure());

-- 4. Create and secure security_events table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on security_events
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Admin-only access to security events
CREATE POLICY "Admin only security events access" 
ON public.security_events 
FOR ALL 
USING (public.is_admin_secure());

-- 5. Create and secure rate_limits table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  action TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(identifier, action, window_start)
);

-- Enable RLS on rate_limits
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Admin-only access to rate limits
CREATE POLICY "Admin only rate limits access" 
ON public.rate_limits 
FOR ALL 
USING (public.is_admin_secure());

-- 6. Secure newsletter_subscriptions table - limit public access
DROP POLICY IF EXISTS "Public newsletter insertion" ON public.newsletter_subscriptions;
DROP POLICY IF EXISTS "Admins can manage newsletters" ON public.newsletter_subscriptions;

-- Only allow public insertion, admin management
CREATE POLICY "Allow newsletter subscription" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin only newsletter management" 
ON public.newsletter_subscriptions 
FOR ALL 
USING (public.is_admin_secure());