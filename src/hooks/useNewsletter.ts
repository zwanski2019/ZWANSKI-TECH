import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterSubscription {
  id: string;
  email: string;
  name: string;
  subscribed_at: string;
  is_active: boolean;
  preferences: any;
}

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string, name: string) => {
    setLoading(true);
    try {
      // Check if email already exists
      const { data: existing, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('id, is_active')
        .eq('email', email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing subscription:', checkError);
        throw new Error('Failed to check subscription status');
      }

      if (existing) {
        if (existing.is_active) {
          throw new Error('This email is already subscribed to our newsletter');
        } else {
          // Reactivate existing subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscriptions')
            .update({ 
              is_active: true,
              name: name,
              subscribed_at: new Date().toISOString(),
              unsubscribe_token: crypto.randomUUID()
            })
            .eq('email', email);

          if (updateError) throw updateError;
          return { success: true, message: 'Subscription reactivated!' };
        }
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: email,
            name: name,
            is_active: true
          });

        if (insertError) throw insertError;
        return { success: true, message: 'Successfully subscribed to the newsletter!' };
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async (token: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .update({ is_active: false })
        .eq('unsubscribe_token', token);

      if (error) throw error;

      toast.success('Successfully unsubscribed from newsletter');
      return { success: true };
    } catch (error: any) {
      console.error('Newsletter unsubscribe error:', error);
      toast.error('Failed to unsubscribe: ' + error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const sendNewsletter = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-newsletter', {
        body: {}
      });

      if (error) throw error;

      toast.success('Newsletter sent successfully!');
      return { success: true, data };
    } catch (error: any) {
      console.error('Send newsletter error:', error);
      toast.error('Failed to send newsletter: ' + error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getSubscriptions = async (): Promise<NewsletterSubscription[]> => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .eq('is_active', true)
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  };

  return {
    loading,
    subscribe,
    unsubscribe,
    sendNewsletter,
    getSubscriptions
  };
};