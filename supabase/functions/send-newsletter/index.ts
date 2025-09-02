import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  slug: string;
  published_at: string;
  tags: string[];
  featured_image_url: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  slug: string;
  created_at: string;
  tech_stack: string[];
  featured_image_url: string | null;
}

const generateNewsletterContent = (blogPosts: BlogPost[], projects: Project[]): string => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  let content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Zwanski Tech Newsletter - ${currentDate}</title>
      <style>
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
        .content { padding: 30px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1e293b; font-size: 22px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e2e8f0; }
        .post-card, .project-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #fafafa; }
        .post-card h3, .project-card h3 { color: #374151; font-size: 18px; margin: 0 0 10px 0; }
        .post-meta { color: #6b7280; font-size: 14px; margin-bottom: 10px; }
        .tags { margin-top: 10px; }
        .tag { display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; }
        .cta { text-align: center; margin: 30px 0; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; }
        .footer { background: #f1f5f9; padding: 30px; text-align: center; color: #64748b; font-size: 14px; }
        .unsubscribe { margin-top: 20px; }
        .unsubscribe a { color: #64748b; text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Zwanski Tech Newsletter</h1>
          <p>Your weekly dose of tech insights and updates - ${currentDate}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <p>Hello there! 👋</p>
            <p>Welcome to this week's edition of the Zwanski Tech Newsletter. We're excited to share the latest insights, projects, and developments from our community.</p>
          </div>
  `;

  // Add blog posts section
  if (blogPosts.length > 0) {
    content += `
      <div class="section">
        <h2>📝 Latest Blog Posts</h2>
    `;
    
    blogPosts.slice(0, 3).forEach(post => {
      const excerpt = post.excerpt || (post.content ? post.content.substring(0, 150) + '...' : 'No excerpt available');
      content += `
        <div class="post-card">
          <h3>${post.title}</h3>
          <div class="post-meta">Published on ${new Date(post.published_at).toLocaleDateString()}</div>
          <p>${excerpt}</p>
          ${post.tags && post.tags.length > 0 ? `
            <div class="tags">
              ${post.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
          ` : ''}
          <div class="cta">
            <a href="https://zwanski.org/blog/${post.slug}" class="button">Read More</a>
          </div>
        </div>
      `;
    });
    
    content += `</div>`;
  }

  // Add projects section
  if (projects.length > 0) {
    content += `
      <div class="section">
        <h2>🛠️ Featured Projects</h2>
    `;
    
    projects.slice(0, 2).forEach(project => {
      content += `
        <div class="project-card">
          <h3>${project.title}</h3>
          <p>${project.description || 'Check out this amazing project!'}</p>
          ${project.tech_stack && project.tech_stack.length > 0 ? `
            <div class="tags">
              ${project.tech_stack.slice(0, 4).map(tech => `<span class="tag">${tech}</span>`).join('')}
            </div>
          ` : ''}
          <div class="cta">
            <a href="https://zwanski.org/projects/${project.slug}" class="button">View Project</a>
          </div>
        </div>
      `;
    });
    
    content += `</div>`;
  }

  // Add closing and footer
  content += `
          <div class="section">
            <h2>🤝 Stay Connected</h2>
            <p>Follow us on our journey as we continue to build innovative solutions and share knowledge with the tech community.</p>
            <div class="cta">
              <a href="https://zwanski.org" class="button">Visit Our Website</a>
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Zwanski Tech</strong> - Empowering the next generation of developers</p>
          <p>📧 contact@zwanski.org | 🌐 zwanski.org</p>
          <div class="unsubscribe">
            <p>Don't want to receive these emails? <a href="{{unsubscribe_url}}">Unsubscribe here</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return content;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting newsletter send process...");

    // Get active newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscriptions')
      .select('email, name, unsubscribe_token')
      .eq('is_active', true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No active subscribers found");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No active subscribers to send to",
        recipients_count: 0
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`Found ${subscribers.length} active subscribers`);

    // Fetch recent blog posts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('id, title, excerpt, content, slug, published_at, tags, featured_image_url')
      .eq('status', 'published')
      .gte('published_at', thirtyDaysAgo.toISOString())
      .order('published_at', { ascending: false })
      .limit(5);

    if (blogError) {
      console.error("Error fetching blog posts:", blogError);
    }

    // Fetch recent featured projects (last 60 days)
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('id, title, description, slug, created_at, tech_stack, featured_image_url')
      .eq('status', 'published')
      .eq('featured', true)
      .gte('created_at', sixtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(3);

    if (projectsError) {
      console.error("Error fetching projects:", projectsError);
    }

    const posts = blogPosts || [];
    const featuredProjects = projects || [];

    console.log(`Found ${posts.length} recent blog posts and ${featuredProjects.length} featured projects`);

    // Skip if no content to send
    if (posts.length === 0 && featuredProjects.length === 0) {
      console.log("No recent content found for newsletter");
      return new Response(JSON.stringify({ 
        success: true, 
        message: "No recent content to send in newsletter",
        recipients_count: 0
      }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Generate newsletter content
    const newsletterHtml = generateNewsletterContent(posts, featuredProjects);
    const subject = `Zwanski Tech Newsletter - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;

    console.log("Generated newsletter content, preparing to send emails...");

    // Send emails in batches to avoid rate limits
    const batchSize = 50;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      const emailPromises = batch.map(async (subscriber) => {
        try {
          // Replace unsubscribe URL in content
          const personalizedContent = newsletterHtml.replace(
            '{{unsubscribe_url}}',
            `https://zwanski.org/unsubscribe?token=${subscriber.unsubscribe_token}`
          );

          const { error } = await resend.emails.send({
            from: 'Zwanski Tech <newsletter@zwanski.org>',
            to: [subscriber.email],
            subject: subject,
            html: personalizedContent,
          });

          if (error) {
            console.error(`Failed to send to ${subscriber.email}:`, error);
            errorCount++;
          } else {
            successCount++;
          }
        } catch (error) {
          console.error(`Error sending to ${subscriber.email}:`, error);
          errorCount++;
        }
      });

      await Promise.all(emailPromises);
      
      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Newsletter sending completed: ${successCount} successful, ${errorCount} failed`);

    // Record the newsletter send
    const { error: recordError } = await supabase
      .from('newsletter_sends')
      .insert({
        title: subject,
        content: newsletterHtml,
        recipients_count: successCount,
        status: errorCount === 0 ? 'sent' : 'partial'
      });

    if (recordError) {
      console.error("Error recording newsletter send:", recordError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Newsletter sent successfully to ${successCount} recipients`,
      recipients_count: successCount,
      failed_count: errorCount
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);