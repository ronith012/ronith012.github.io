
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  userId: string;
  type: string;
  title: string;
  message: string;
  email?: string;
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, type, title, message, email }: NotificationRequest = await req.json();
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create notification in database
    const { data: notification, error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
      })
      .select()
      .single();

    if (notificationError) {
      throw notificationError;
    }

    // Send email if email address provided
    if (email) {
      try {
        await resend.emails.send({
          from: "StreamSync <notifications@resend.dev>",
          to: [email],
          subject: title,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                ${title}
              </h2>
              <p style="color: #666; line-height: 1.6;">
                ${message}
              </p>
              <div style="margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px;">
                <p style="margin: 0; color: #888; font-size: 14px;">
                  This notification was sent from StreamSync. You can manage your notification preferences in your account settings.
                </p>
              </div>
            </div>
          `,
        });

        // Mark email as sent
        await supabase
          .from('notifications')
          .update({ email_sent: true })
          .eq('id', notification.id);

        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
      }
    }

    return new Response(JSON.stringify({ success: true, notification }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in send-notifications function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
