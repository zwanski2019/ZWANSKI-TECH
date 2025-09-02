
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { Form, Button } from "@/components/heroui";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function NewsletterForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Check if email already exists
      const { data: existing, error: checkError } = await supabase
        .from('newsletter_subscriptions')
        .select('id, is_active')
        .eq('email', data.email)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing subscription:', checkError);
        throw new Error('Failed to check subscription status');
      }

      if (existing) {
        if (existing.is_active) {
          toast.error("Already subscribed", {
            description: "This email is already subscribed to our newsletter.",
          });
          return;
        } else {
          // Reactivate existing subscription
          const { error: updateError } = await supabase
            .from('newsletter_subscriptions')
            .update({ 
              is_active: true,
              name: data.name,
              subscribed_at: new Date().toISOString(),
              unsubscribe_token: crypto.randomUUID()
            })
            .eq('email', data.email);

          if (updateError) throw updateError;

          toast.success("Subscription reactivated!", {
            description: "Welcome back! You're now subscribed to our newsletter.",
          });
        }
      } else {
        // Create new subscription
        const { error: insertError } = await supabase
          .from('newsletter_subscriptions')
          .insert({
            email: data.email,
            name: data.name,
            is_active: true
          });

        if (insertError) throw insertError;

        toast.success("Successfully subscribed to the newsletter!", {
          description: "Thank you for joining our community! We'll keep you updated with the latest insights.",
        });
      }
      
      form.reset();
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Failed to subscribe", {
        description: error.message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" aria-label="newsletter-signup">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your name" 
                    className="bg-background/50 backdrop-blur-sm border-purple-500/30 focus:border-purple-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="bg-background/50 backdrop-blur-sm border-purple-500/30 focus:border-purple-500"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full group relative overflow-hidden" 
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
              {isSubmitting ? "Submitting..." : "Join the Magic"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform group-hover:scale-105 transition-transform"></div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
