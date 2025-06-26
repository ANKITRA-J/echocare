import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface CreateAvatarOptions {
  script: string;
  voiceId?: string;
  background?: string;
  avatarId?: string;
}

interface CreateReplicaOptions {
  videoUrl: string;
  replicaName: string;
  callbackUrl?: string;
}

interface TavusVideo {
  video_id: string;
  video_name: string;
  video_url: string;
  status: string;
  created_at: string;
}

interface TavusReplica {
  replica_id: string;
  replica_name: string;
  status: string;
  created_at: string;
}

export const useTavus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAvatar = async (options: CreateAvatarOptions): Promise<TavusVideo | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to create avatars');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tavus-avatar/create-avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          script: options.script,
          voice_id: options.voiceId,
          background: options.background || 'office',
          avatar_id: options.avatarId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create avatar video');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createReplica = async (options: CreateReplicaOptions): Promise<TavusReplica | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to create replicas');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tavus-avatar/create-replica`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_url: options.videoUrl,
          replica_name: options.replicaName,
          callback_url: options.callbackUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create replica');
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getReplicas = async (): Promise<TavusReplica[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to get replicas');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tavus-avatar/get-replicas`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get replicas');
      }

      const data = await response.json();
      return data.replicas || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getVideos = async (): Promise<TavusVideo[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to get videos');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tavus-avatar/get-videos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get videos');
      }

      const data = await response.json();
      return data.videos || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    createAvatar,
    createReplica,
    getReplicas,
    getVideos,
    loading,
    error,
  };
};