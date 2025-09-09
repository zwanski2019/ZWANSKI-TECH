-- Fix database function search paths (safer approach)
-- Use CASCADE to handle dependencies

-- Fix is_admin function with CASCADE
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND user_type = 'admin'
  )
$function$;

-- Recreate the policies that depend on is_admin
CREATE POLICY "Admins can manage all posts" ON public.posts FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all comments" ON public.comments FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all channels" ON public.channels FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can view security events" ON public.security_events FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage all subscriptions" ON public.newsletter_subscriptions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can manage newsletter sends" ON public.newsletter_sends FOR ALL USING (public.is_admin());