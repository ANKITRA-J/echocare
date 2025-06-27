import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Updated Tavus API key
const TAVUS_API_KEY = '905aa62889034645b92065b8dc0be56b';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface CreateAvatarRequest {
  script: string;
  voice_id?: string;
  background?: string;
  avatar_id?: string;
}

interface CreateReplicaRequest {
  video_url: string;
  replica_name: string;
  callback_url?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    // Get user from auth token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Route handling
    if (path.endsWith('/create-avatar') && req.method === 'POST') {
      return await createAvatar(req);
    } else if (path.endsWith('/create-replica') && req.method === 'POST') {
      return await createReplica(req);
    } else if (path.endsWith('/get-replicas') && req.method === 'GET') {
      return await getReplicas();
    } else if (path.endsWith('/get-videos') && req.method === 'GET') {
      return await getVideos();
    } else {
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error: any) {
    console.error('Tavus API Error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function createAvatar(req: Request): Promise<Response> {
  try {
    const body: CreateAvatarRequest = await req.json();
    
    const response = await fetch('https://tavusapi.com/v2/videos', {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: body.script,
        replica_id: body.avatar_id || undefined,
        voice_id: body.voice_id || undefined,
        background: body.background || 'office',
        video_name: `Memory Video - ${new Date().toISOString()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API Error Response:', errorData);
      throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Create avatar error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

async function createReplica(req: Request): Promise<Response> {
  try {
    const body: CreateReplicaRequest = await req.json();
    
    const response = await fetch('https://tavusapi.com/v2/replicas', {
      method: 'POST',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        train_video_url: body.video_url,
        replica_name: body.replica_name,
        callback_url: body.callback_url,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API Error Response:', errorData);
      throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Create replica error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

async function getReplicas(): Promise<Response> {
  try {
    const response = await fetch('https://tavusapi.com/v2/replicas', {
      method: 'GET',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API Error Response:', errorData);
      throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Get replicas error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

async function getVideos(): Promise<Response> {
  try {
    const response = await fetch('https://tavusapi.com/v2/videos', {
      method: 'GET',
      headers: {
        'x-api-key': TAVUS_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Tavus API Error Response:', errorData);
      throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Get videos error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}