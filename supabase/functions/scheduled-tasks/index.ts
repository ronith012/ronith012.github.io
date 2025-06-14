
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get pending tasks that are ready to run
    const { data: tasks, error: tasksError } = await supabase
      .from('scheduled_tasks')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .lt('attempts', 3);

    if (tasksError) {
      throw tasksError;
    }

    const results = [];

    for (const task of tasks || []) {
      try {
        console.log(`Processing task ${task.id} of type ${task.task_type}`);
        
        // Process different task types
        switch (task.task_type) {
          case 'room_cleanup':
            await processRoomCleanup(supabase, task.payload);
            break;
          case 'email_digest':
            await processEmailDigest(supabase, task.payload);
            break;
          case 'reminder':
            await processReminder(supabase, task.payload);
            break;
          default:
            console.log(`Unknown task type: ${task.task_type}`);
        }

        // Mark task as completed
        await supabase
          .from('scheduled_tasks')
          .update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          })
          .eq('id', task.id);

        results.push({ id: task.id, status: 'completed' });
      } catch (error) {
        console.error(`Error processing task ${task.id}:`, error);
        
        // Increment attempt count
        await supabase
          .from('scheduled_tasks')
          .update({
            attempts: task.attempts + 1,
            status: task.attempts + 1 >= task.max_attempts ? 'failed' : 'pending',
          })
          .eq('id', task.id);

        results.push({ id: task.id, status: 'error', error: error.message });
      }
    }

    return new Response(JSON.stringify({ 
      processed: results.length,
      results 
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in scheduled-tasks function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function processRoomCleanup(supabase: any, payload: any) {
  // Clean up inactive rooms older than specified time
  const hoursOld = payload?.hoursOld || 24;
  const cutoffTime = new Date(Date.now() - hoursOld * 60 * 60 * 1000).toISOString();
  
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('is_playing', false)
    .lt('updated_at', cutoffTime);
    
  if (error) throw error;
  console.log(`Cleaned up inactive rooms older than ${hoursOld} hours`);
}

async function processEmailDigest(supabase: any, payload: any) {
  // Send email digest to users
  console.log('Processing email digest for payload:', payload);
  // Implementation would call send-notifications function
}

async function processReminder(supabase: any, payload: any) {
  // Send reminder notifications
  console.log('Processing reminder for payload:', payload);
  // Implementation would call send-notifications function
}
