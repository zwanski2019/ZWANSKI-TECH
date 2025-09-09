-- Secure community_user_stats by restricting public read access
-- Ensure table has RLS enabled
ALTER TABLE public.community_user_stats ENABLE ROW LEVEL SECURITY;

-- Drop overly permissive public read policy if it exists
DROP POLICY IF EXISTS "Users can view public stats" ON public.community_user_stats;

-- Allow users to view their own stats (already exists in many setups, but re-create to be sure)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'community_user_stats' 
      AND policyname = 'Users can view their own stats'
  ) THEN
    CREATE POLICY "Users can view their own stats"
    ON public.community_user_stats
    FOR SELECT
    USING (auth.uid() = user_id);
  END IF;
END$$;

-- Allow admins to view all stats
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'community_user_stats' 
      AND policyname = 'Admins can view all community stats'
  ) THEN
    CREATE POLICY "Admins can view all community stats"
    ON public.community_user_stats
    FOR SELECT
    USING (public.is_admin_secure());
  END IF;
END$$;

-- Keep existing UPDATE policy (users can update their own stats). If missing, add it.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'community_user_stats' 
      AND policyname = 'Users can update their own stats'
  ) THEN
    CREATE POLICY "Users can update their own stats"
    ON public.community_user_stats
    FOR UPDATE
    USING (auth.uid() = user_id);
  END IF;
END$$;
