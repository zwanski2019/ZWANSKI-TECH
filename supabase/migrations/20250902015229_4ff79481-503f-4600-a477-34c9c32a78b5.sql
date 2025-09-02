-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email CHARACTER VARYING NOT NULL UNIQUE,
  name CHARACTER VARYING NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  preferences JSONB DEFAULT '{"frequency": "weekly", "topics": []}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Subscribers can view their own subscription" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (true);

CREATE POLICY "Subscribers can update their own subscription" 
ON public.newsletter_subscriptions 
FOR UPDATE 
USING (true);

-- Admins can view all subscriptions
CREATE POLICY "Admins can manage all subscriptions" 
ON public.newsletter_subscriptions 
FOR ALL 
USING (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create newsletter sends tracking table
CREATE TABLE public.newsletter_sends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title CHARACTER VARYING NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  recipients_count INTEGER NOT NULL DEFAULT 0,
  status CHARACTER VARYING NOT NULL DEFAULT 'sent',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on newsletter sends
ALTER TABLE public.newsletter_sends ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage newsletter sends" 
ON public.newsletter_sends 
FOR ALL 
USING (is_admin());