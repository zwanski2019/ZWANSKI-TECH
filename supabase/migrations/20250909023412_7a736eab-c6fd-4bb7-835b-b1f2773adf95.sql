-- Address linter WARN 1: ensure function search_path is explicitly set without dropping dependencies

-- 1) Ensure is_admin has correct search_path
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

-- 2) Ensure is_admin_secure has correct search_path (already set, but re-affirm)
CREATE OR REPLACE FUNCTION public.is_admin_secure()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  user_admin_status boolean := false;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  SELECT (user_type = 'admin' AND is_verified = true) 
  INTO user_admin_status
  FROM public.profiles 
  WHERE id = auth.uid();
  INSERT INTO public.security_events (user_id, event_type, event_data)
  VALUES (
    auth.uid(),
    'admin_access_verification',
    jsonb_build_object(
      'is_admin', COALESCE(user_admin_status, false),
      'timestamp', now(),
      'ip_address', current_setting('request.headers', true)::jsonb->>'x-real-ip'
    )
  );
  RETURN COALESCE(user_admin_status, false);
END;
$function$;

-- 3) Ensure other trigger functions have public search_path
CREATE OR REPLACE FUNCTION public.update_thread_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.forum_categories 
    SET thread_count = thread_count + 1,
        updated_at = NOW()
    WHERE id = NEW.category_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.forum_categories 
    SET thread_count = thread_count - 1,
        updated_at = NOW()
    WHERE id = OLD.category_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_reply_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE forum_threads 
    SET reply_count = reply_count + 1,
        last_activity_at = NOW(),
        updated_at = NOW()
    WHERE id = NEW.thread_id;
    UPDATE forum_categories 
    SET post_count = post_count + 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = NEW.thread_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE forum_threads 
    SET reply_count = reply_count - 1,
        updated_at = NOW()
    WHERE id = OLD.thread_id;
    UPDATE forum_categories 
    SET post_count = post_count - 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = OLD.thread_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_forum_user_preferences()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.forum_user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_like_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_TABLE_NAME = 'forum_thread_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.forum_threads SET like_count = like_count + 1 WHERE id = NEW.thread_id;
      RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.forum_threads SET like_count = like_count - 1 WHERE id = OLD.thread_id;
      RETURN OLD;
    END IF;
  ELSIF TG_TABLE_NAME = 'forum_reply_likes' THEN
    IF TG_OP = 'INSERT' THEN
      UPDATE public.forum_replies SET like_count = like_count + 1 WHERE id = NEW.reply_id;
      RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
      UPDATE public.replies SET like_count = like_count - 1 WHERE id = OLD.reply_id;
      RETURN OLD;
    END IF;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_post_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.channels 
    SET post_count = post_count + 1 
    WHERE id = NEW.channel_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.channels 
    SET post_count = post_count - 1 
    WHERE id = OLD.channel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_comment_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.posts 
    SET comment_count = comment_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.posts 
    SET comment_count = comment_count - 1 
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

CREATE OR REPLACE FUNCTION public.create_community_stats_for_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.community_user_stats (user_id)
    VALUES (NEW.id)
    ON CONFLICT DO NOTHING;
    RETURN NEW;
END;
$function$;