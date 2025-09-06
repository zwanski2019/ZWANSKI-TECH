-- Secure contact_messages by removing over-permissive RLS policy
-- Keep public INSERT policy intact; admins retain ALL via existing policy

-- Ensure table has RLS enabled (no-op if already enabled)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop the policy that granted ALL actions to any authenticated user
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;

-- Optional hardening note: existing policy "Admins can view contact messages" (ALL USING is_admin()) remains,
-- which restricts read/update/delete to admins while allowing public inserts via the separate INSERT policy.
