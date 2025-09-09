-- Fix database function search paths to prevent security issues
-- Update all functions to have explicit search_path settings

-- Fix is_admin function
DROP FUNCTION IF EXISTS public.is_admin();
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

-- Fix update_thread_counts function
DROP FUNCTION IF EXISTS public.update_thread_counts();
CREATE OR REPLACE FUNCTION public.update_thread_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update category thread count
    UPDATE public.forum_categories 
    SET thread_count = thread_count + 1,
        updated_at = NOW()
    WHERE id = NEW.category_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update category thread count
    UPDATE public.forum_categories 
    SET thread_count = thread_count - 1,
        updated_at = NOW()
    WHERE id = OLD.category_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- Fix update_reply_counts function
DROP FUNCTION IF EXISTS public.update_reply_counts();
CREATE OR REPLACE FUNCTION public.update_reply_counts()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update thread reply count and last activity
    UPDATE forum_threads 
    SET reply_count = reply_count + 1,
        last_activity_at = NOW(),
        updated_at = NOW()
    WHERE id = NEW.thread_id;
    
    -- Update category post count
    UPDATE forum_categories 
    SET post_count = post_count + 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = NEW.thread_id);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Update thread reply count
    UPDATE forum_threads 
    SET reply_count = reply_count - 1,
        updated_at = NOW()
    WHERE id = OLD.thread_id;
    
    -- Update category post count
    UPDATE forum_categories 
    SET post_count = post_count - 1,
        updated_at = NOW()
    WHERE id = (SELECT category_id FROM forum_threads WHERE id = OLD.thread_id);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$function$;

-- Fix create_forum_user_preferences function
DROP FUNCTION IF EXISTS public.create_forum_user_preferences();
CREATE OR REPLACE FUNCTION public.create_forum_user_preferences()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.forum_user_preferences (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$function$;

-- Fix update_like_counts function
DROP FUNCTION IF EXISTS public.update_like_counts();
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
      UPDATE public.forum_replies SET like_count = like_count - 1 WHERE id = OLD.reply_id;
      RETURN OLD;
    END IF;
  END IF;
  RETURN NULL;
END;
$function$;

-- Fix update_post_counts function
DROP FUNCTION IF EXISTS public.update_post_counts();
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

-- Fix update_comment_counts function
DROP FUNCTION IF EXISTS public.update_comment_counts();
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

-- Fix create_community_stats_for_user function
DROP FUNCTION IF EXISTS public.create_community_stats_for_user();
CREATE OR REPLACE FUNCTION public.create_community_stats_for_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
    INSERT INTO public.community_user_stats (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$function$;