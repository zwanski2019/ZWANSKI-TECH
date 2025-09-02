export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          details: Json | null
          id: string
          timestamp: string | null
          user_id: string
        }
        Insert: {
          action: string
          details?: Json | null
          id?: string
          timestamp?: string | null
          user_id: string
        }
        Update: {
          action?: string
          details?: Json | null
          id?: string
          timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      analytics: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          id: string
          ip_address: unknown | null
          page_path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          visitor_id: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          page_path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          id?: string
          ip_address?: unknown | null
          page_path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          visitor_id?: string | null
        }
        Relationships: []
      }
      api_error_logs: {
        Row: {
          client_info: Json | null
          error_message: string | null
          id: string
          method: string
          path: string
          request_data: Json | null
          request_id: string | null
          status_code: number
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          client_info?: Json | null
          error_message?: string | null
          id?: string
          method: string
          path: string
          request_data?: Json | null
          request_id?: string | null
          status_code: number
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          client_info?: Json | null
          error_message?: string | null
          id?: string
          method?: string
          path?: string
          request_data?: Json | null
          request_id?: string | null
          status_code?: number
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          cover_letter: string | null
          created_at: string | null
          id: string
          job_id: string
          proposed_rate: number | null
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id: string
          proposed_rate?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          cover_letter?: string | null
          created_at?: string | null
          id?: string
          job_id?: string
          proposed_rate?: number | null
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          likes: number | null
          published_at: string | null
          reading_time: number | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          active: boolean | null
          icon: string | null
          id: string
          name: string
          name_ar: string | null
          name_fr: string | null
          sort_order: number | null
        }
        Insert: {
          active?: boolean | null
          icon?: string | null
          id?: string
          name: string
          name_ar?: string | null
          name_fr?: string | null
          sort_order?: number | null
        }
        Update: {
          active?: boolean | null
          icon?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          name_fr?: string | null
          sort_order?: number | null
        }
        Relationships: []
      }
      channels: {
        Row: {
          category: string | null
          color: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          is_public: boolean | null
          member_count: number | null
          moderator_ids: string[] | null
          name: string
          post_count: number | null
          rules: string | null
          tags: string[] | null
        }
        Insert: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          member_count?: number | null
          moderator_ids?: string[] | null
          name: string
          post_count?: number | null
          rules?: string | null
          tags?: string[] | null
        }
        Update: {
          category?: string | null
          color?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_public?: boolean | null
          member_count?: number | null
          moderator_ids?: string[] | null
          name?: string
          post_count?: number | null
          rules?: string | null
          tags?: string[] | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: number
          message: string
          user_id: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: never
          message: string
          user_id?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: never
          message?: string
          user_id?: string | null
          username?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          is_edited: boolean | null
          like_count: number | null
          parent_id: string | null
          post_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          post_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_edited?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          post_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_user_stats: {
        Row: {
          comments_count: number | null
          community_level: string | null
          created_at: string | null
          id: string
          last_active_at: string | null
          likes_given: number | null
          likes_received: number | null
          posts_count: number | null
          reputation_points: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comments_count?: number | null
          community_level?: string | null
          created_at?: string | null
          id?: string
          last_active_at?: string | null
          likes_given?: number | null
          likes_received?: number | null
          posts_count?: number | null
          reputation_points?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comments_count?: number | null
          community_level?: string | null
          created_at?: string | null
          id?: string
          last_active_at?: string | null
          likes_given?: number | null
          likes_received?: number | null
          posts_count?: number | null
          reputation_points?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          read: boolean | null
          replied: boolean | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean | null
          replied?: boolean | null
          subject?: string | null
        }
        Relationships: []
      }
      conversation_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          last_message_at: string | null
          participant_1_id: string
          participant_2_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          last_message_at?: string | null
          participant_1_id: string
          participant_2_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          last_message_at?: string | null
          participant_1_id?: string
          participant_2_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      course_bookmarks: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_bookmarks_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_discussions: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          downvotes: number | null
          id: string
          is_pinned: boolean | null
          lesson_id: string | null
          parent_id: string | null
          title: string | null
          updated_at: string | null
          upvotes: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          lesson_id?: string | null
          parent_id?: string | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          downvotes?: number | null
          id?: string
          is_pinned?: boolean | null
          lesson_id?: string | null
          parent_id?: string | null
          title?: string | null
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_discussions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "course_discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          certificate_issued: boolean | null
          completed_at: string | null
          course_id: string | null
          enrolled_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          certificate_issued?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours: number | null
          enrollment_count: number | null
          external_url: string
          id: string
          instructor_id: string | null
          instructor_name: string | null
          is_active: boolean | null
          is_featured: boolean | null
          language: string | null
          platform: string | null
          rating: number | null
          slug: string
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          total_ratings: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          enrollment_count?: number | null
          external_url: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          platform?: string | null
          rating?: number | null
          slug: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          total_ratings?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          duration_hours?: number | null
          enrollment_count?: number | null
          external_url?: string
          id?: string
          instructor_id?: string | null
          instructor_name?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          language?: string | null
          platform?: string | null
          rating?: number | null
          slug?: string
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          total_ratings?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string | null
          metadata: Json | null
          priority: string | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          priority?: string | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string | null
          metadata?: Json | null
          priority?: string | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      experience: {
        Row: {
          achievements: string[] | null
          company: string
          company_url: string | null
          created_at: string | null
          current_job: boolean | null
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          logo_url: string | null
          position: string
          sort_order: number | null
          start_date: string
        }
        Insert: {
          achievements?: string[] | null
          company: string
          company_url?: string | null
          created_at?: string | null
          current_job?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          position: string
          sort_order?: number | null
          start_date: string
        }
        Update: {
          achievements?: string[] | null
          company?: string
          company_url?: string | null
          created_at?: string | null
          current_job?: boolean | null
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          logo_url?: string | null
          position?: string
          sort_order?: number | null
          start_date?: string
        }
        Relationships: []
      }
      forum_categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          post_count: number | null
          slug: string
          sort_order: number | null
          thread_count: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          post_count?: number | null
          slug: string
          sort_order?: number | null
          thread_count?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          post_count?: number | null
          slug?: string
          sort_order?: number | null
          thread_count?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_moderation_logs: {
        Row: {
          action: Database["public"]["Enums"]["moderation_action"]
          created_at: string | null
          id: string
          moderator_id: string
          notes: string | null
          reason: string
          target_reply_id: string | null
          target_thread_id: string | null
          target_user_id: string | null
        }
        Insert: {
          action: Database["public"]["Enums"]["moderation_action"]
          created_at?: string | null
          id?: string
          moderator_id: string
          notes?: string | null
          reason: string
          target_reply_id?: string | null
          target_thread_id?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: Database["public"]["Enums"]["moderation_action"]
          created_at?: string | null
          id?: string
          moderator_id?: string
          notes?: string | null
          reason?: string
          target_reply_id?: string | null
          target_thread_id?: string | null
          target_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_moderation_logs_target_reply_id_fkey"
            columns: ["target_reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_moderation_logs_target_thread_id_fkey"
            columns: ["target_thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          edit_count: number | null
          id: string
          is_edited: boolean | null
          like_count: number | null
          parent_id: string | null
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          edit_count?: number | null
          id?: string
          is_edited?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          edit_count?: number | null
          id?: string
          is_edited?: boolean | null
          like_count?: number | null
          parent_id?: string | null
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forum_replies_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_reply_likes: {
        Row: {
          created_at: string | null
          id: string
          reply_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reply_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reply_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_reply_likes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "forum_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_thread_bookmarks: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          thread_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          thread_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_thread_bookmarks_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_thread_likes: {
        Row: {
          created_at: string | null
          id: string
          thread_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          thread_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          thread_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_thread_likes_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          author_id: string
          category_id: string
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_pinned: boolean | null
          last_activity_at: string | null
          like_count: number | null
          reply_count: number | null
          slug: string
          status: Database["public"]["Enums"]["thread_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          category_id: string
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_pinned?: boolean | null
          last_activity_at?: string | null
          like_count?: number | null
          reply_count?: number | null
          slug: string
          status?: Database["public"]["Enums"]["thread_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          category_id?: string
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_pinned?: boolean | null
          last_activity_at?: string | null
          like_count?: number | null
          reply_count?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["thread_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "forum_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_user_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          forum_role: Database["public"]["Enums"]["forum_user_role"] | null
          id: string
          push_notifications: boolean | null
          signature: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          forum_role?: Database["public"]["Enums"]["forum_user_role"] | null
          id?: string
          push_notifications?: boolean | null
          signature?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          forum_role?: Database["public"]["Enums"]["forum_user_role"] | null
          id?: string
          push_notifications?: boolean | null
          signature?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      freelancer_profiles: {
        Row: {
          availability: string | null
          bio: string | null
          completed_projects: number | null
          created_at: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          portfolio_url: string | null
          skills: string[] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          completed_projects?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          skills?: string[] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability?: string | null
          bio?: string | null
          completed_projects?: number | null
          created_at?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          portfolio_url?: string | null
          skills?: string[] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      job_posts: {
        Row: {
          benefits: string[] | null
          category: string
          created_at: string | null
          description: string
          employer_id: string
          expires_at: string | null
          id: string
          job_type: Database["public"]["Enums"]["job_type"]
          latitude: number | null
          location: string
          longitude: number | null
          requirements: string[] | null
          salary_max: number | null
          salary_min: number | null
          salary_type: Database["public"]["Enums"]["salary_type"]
          status: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          benefits?: string[] | null
          category: string
          created_at?: string | null
          description: string
          employer_id: string
          expires_at?: string | null
          id?: string
          job_type: Database["public"]["Enums"]["job_type"]
          latitude?: number | null
          location: string
          longitude?: number | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          benefits?: string[] | null
          category?: string
          created_at?: string | null
          description?: string
          employer_id?: string
          expires_at?: string | null
          id?: string
          job_type?: Database["public"]["Enums"]["job_type"]
          latitude?: number | null
          location?: string
          longitude?: number | null
          requirements?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          salary_type?: Database["public"]["Enums"]["salary_type"]
          status?: Database["public"]["Enums"]["job_status"] | null
          title?: string
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: []
      }
      learning_path_courses: {
        Row: {
          course_id: string | null
          id: string
          learning_path_id: string | null
          order_index: number
        }
        Insert: {
          course_id?: string | null
          id?: string
          learning_path_id?: string | null
          order_index: number
        }
        Update: {
          course_id?: string | null
          id?: string
          learning_path_id?: string | null
          order_index?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_courses_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          created_at: string | null
          creator_id: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours: number | null
          id: string
          is_public: boolean | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_public?: boolean | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["course_difficulty"] | null
          estimated_hours?: number | null
          id?: string
          is_public?: boolean | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lesson_notes: {
        Row: {
          content: string
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          timestamp_seconds: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          timestamp_seconds?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_notes_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_notes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          external_url: string
          id: string
          is_free: boolean | null
          lesson_type: Database["public"]["Enums"]["lesson_type"] | null
          order_index: number
          title: string
          transcript: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          external_url: string
          id?: string
          is_free?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          order_index: number
          title: string
          transcript?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          external_url?: string
          id?: string
          is_free?: boolean | null
          lesson_type?: Database["public"]["Enums"]["lesson_type"] | null
          order_index?: number
          title?: string
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          comment_id: string | null
          created_at: string | null
          id: string
          post_id: string | null
          reaction_type: string | null
          user_id: string
        }
        Insert: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: string | null
          user_id: string
        }
        Update: {
          comment_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_comment_id_fkey"
            columns: ["comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          description: string | null
          file_size: number | null
          file_type: string
          file_url: string
          filename: string
          folder: string | null
          id: string
          original_name: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_type: string
          file_url: string
          filename: string
          folder?: string | null
          id?: string
          original_name: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          description?: string | null
          file_size?: number | null
          file_type?: string
          file_url?: string
          filename?: string
          folder?: string | null
          id?: string
          original_name?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      newsletter_sends: {
        Row: {
          content: string
          created_at: string
          id: string
          recipients_count: number
          sent_at: string
          status: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          recipients_count?: number
          sent_at?: string
          status?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          recipients_count?: number
          sent_at?: string
          status?: string
          title?: string
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          name: string
          preferences: Json | null
          subscribed_at: string
          unsubscribe_token: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          name: string
          preferences?: Json | null
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          name?: string
          preferences?: Json | null
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          message: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      password_failed_verification_attempts: {
        Row: {
          last_failed_at: string
          user_id: string
        }
        Insert: {
          last_failed_at?: string
          user_id: string
        }
        Update: {
          last_failed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          employer_id: string
          id: string
          job_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          worker_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          employer_id: string
          id?: string
          job_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          worker_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          employer_id?: string
          id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string | null
          id: string
          post_id: string | null
          reaction_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string | null
          reaction_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          attachment_urls: string[] | null
          author_id: string
          channel_id: string
          comment_count: number | null
          content: string
          content_type: string | null
          created_at: string | null
          id: string
          image_urls: string[] | null
          is_edited: boolean | null
          is_pinned: boolean | null
          like_count: number | null
          mention_user_ids: string[] | null
          post_type: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          attachment_urls?: string[] | null
          author_id: string
          channel_id: string
          comment_count?: number | null
          content: string
          content_type?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          is_edited?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          mention_user_ids?: string[] | null
          post_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          attachment_urls?: string[] | null
          author_id?: string
          channel_id?: string
          comment_count?: number | null
          content?: string
          content_type?: string | null
          created_at?: string | null
          id?: string
          image_urls?: string[] | null
          is_edited?: boolean | null
          is_pinned?: boolean | null
          like_count?: number | null
          mention_user_ids?: string[] | null
          post_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          rating: number | null
          updated_at: string | null
          user_id: string | null
          user_type: string | null
          verified: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
          verified?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
          user_type?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string | null
          created_at: string | null
          demo_url: string | null
          description: string | null
          detailed_description: string | null
          featured: boolean | null
          featured_image_url: string | null
          gallery_images: string[] | null
          github_url: string | null
          id: string
          live_url: string | null
          metrics: Json | null
          slug: string
          sort_order: number | null
          status: Database["public"]["Enums"]["project_status"] | null
          tech_stack: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          detailed_description?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          github_url?: string | null
          id?: string
          live_url?: string | null
          metrics?: Json | null
          slug: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string | null
          detailed_description?: string | null
          featured?: boolean | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          github_url?: string | null
          id?: string
          live_url?: string | null
          metrics?: Json | null
          slug?: string
          sort_order?: number | null
          status?: Database["public"]["Enums"]["project_status"] | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          action: string
          count: number
          expires_at: string
          id: string
          identifier: string
          window_start: string
        }
        Insert: {
          action: string
          count?: number
          expires_at?: string
          id?: string
          identifier: string
          window_start?: string
        }
        Update: {
          action?: string
          count?: number
          expires_at?: string
          id?: string
          identifier?: string
          window_start?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          job_id: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating: number
          reviewee_id: string
          reviewer_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          job_id?: string | null
          rating?: number
          reviewee_id?: string
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      security_events: {
        Row: {
          created_at: string
          event_data: Json | null
          event_type: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_data?: Json | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_data?: Json | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at: string | null
          description: string | null
          icon_url: string | null
          id: string
          name: string
          proficiency: number | null
          sort_order: number | null
          years_experience: number | null
        }
        Insert: {
          category: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          proficiency?: number | null
          sort_order?: number | null
          years_experience?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"]
          created_at?: string | null
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          proficiency?: number | null
          sort_order?: number | null
          years_experience?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          name: string
          position: string | null
          rating: number | null
          sort_order: number | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name: string
          position?: string | null
          rating?: number | null
          sort_order?: number | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          position?: string | null
          rating?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_type: string
          created_at: string | null
          description: string | null
          earned_at: string | null
          icon_url: string | null
          id: string
          metadata: Json | null
          title: string
          user_id: string | null
        }
        Insert: {
          achievement_type: string
          created_at?: string | null
          description?: string | null
          earned_at?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          title: string
          user_id?: string | null
        }
        Update: {
          achievement_type?: string
          created_at?: string | null
          description?: string | null
          earned_at?: string | null
          icon_url?: string | null
          id?: string
          metadata?: Json | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity_log: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_channel_subscriptions: {
        Row: {
          channel_id: string
          id: string
          notification_level: string | null
          subscribed_at: string | null
          user_id: string
        }
        Insert: {
          channel_id: string
          id?: string
          notification_level?: string | null
          subscribed_at?: string | null
          user_id: string
        }
        Update: {
          channel_id?: string
          id?: string
          notification_level?: string | null
          subscribed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_channel_subscriptions_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_connections: {
        Row: {
          connection_type: string | null
          created_at: string | null
          follower_id: string | null
          following_id: string | null
          id: string
        }
        Insert: {
          connection_type?: string | null
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Update: {
          connection_type?: string | null
          created_at?: string | null
          follower_id?: string | null
          following_id?: string | null
          id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          id: string
          lesson_id: string | null
          progress_percentage: number | null
          status: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string | null
          progress_percentage?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          time_spent_minutes?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_action: string
          p_identifier: string
          p_max_requests?: number
          p_window_minutes?: number
        }
        Returns: boolean
      }
      hook_password_verification_attempt: {
        Args: { event: Json }
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_enhanced: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_admin_secure: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      make_user_admin: {
        Args: { user_id: string }
        Returns: Json
      }
      validate_contact_input: {
        Args: { p_email: string; p_message: string; p_name: string }
        Returns: Json
      }
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected" | "withdrawn"
      course_difficulty: "beginner" | "intermediate" | "advanced"
      forum_user_role: "admin" | "moderator" | "trusted_user" | "member"
      job_status:
        | "draft"
        | "published"
        | "closed"
        | "filled"
        | "pending"
        | "rejected"
      job_type: "full-time" | "part-time" | "contract" | "freelance"
      lesson_type: "video" | "article" | "interactive" | "quiz"
      moderation_action:
        | "warning"
        | "temp_ban"
        | "permanent_ban"
        | "content_removal"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      post_status: "draft" | "published" | "scheduled"
      progress_status: "not_started" | "in_progress" | "completed"
      project_status: "draft" | "published" | "archived"
      salary_type: "hourly" | "daily" | "weekly" | "monthly" | "fixed"
      skill_category:
        | "frontend"
        | "backend"
        | "mobile"
        | "devops"
        | "design"
        | "other"
      thread_status: "open" | "closed" | "locked" | "archived"
      urgency_level: "low" | "medium" | "high"
      user_role:
        | "student"
        | "instructor"
        | "job_seeker"
        | "employer"
        | "freelancer"
        | "admin"
      user_type: "employer" | "worker" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "accepted", "rejected", "withdrawn"],
      course_difficulty: ["beginner", "intermediate", "advanced"],
      forum_user_role: ["admin", "moderator", "trusted_user", "member"],
      job_status: [
        "draft",
        "published",
        "closed",
        "filled",
        "pending",
        "rejected",
      ],
      job_type: ["full-time", "part-time", "contract", "freelance"],
      lesson_type: ["video", "article", "interactive", "quiz"],
      moderation_action: [
        "warning",
        "temp_ban",
        "permanent_ban",
        "content_removal",
      ],
      payment_status: ["pending", "completed", "failed", "refunded"],
      post_status: ["draft", "published", "scheduled"],
      progress_status: ["not_started", "in_progress", "completed"],
      project_status: ["draft", "published", "archived"],
      salary_type: ["hourly", "daily", "weekly", "monthly", "fixed"],
      skill_category: [
        "frontend",
        "backend",
        "mobile",
        "devops",
        "design",
        "other",
      ],
      thread_status: ["open", "closed", "locked", "archived"],
      urgency_level: ["low", "medium", "high"],
      user_role: [
        "student",
        "instructor",
        "job_seeker",
        "employer",
        "freelancer",
        "admin",
      ],
      user_type: ["employer", "worker", "admin"],
    },
  },
} as const
