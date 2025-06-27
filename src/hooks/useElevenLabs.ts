import { useState, useCallback } from 'react';

interface VoiceClone {
  voice_id: string;
  name: string;
  category: string;
  fine_tuning: {
    is_allowed: boolean;
    finetuning_state: string;
    verification_attempts: any[];
    verification_failures: string[];
    verification_attempts_count: number;
    slice_ids: string[];
  };
  labels: Record<string, string>;
  description: string;
  preview_url: string;
  available_for_tiers: string[];
  settings: {
    stability: number;
    similarity_boost: number;
    style: number;
    use_speaker_boost: boolean;
  };
  sharing: {
    status: string;
    history_item_sample_id: string;
    original_voice_id: string;
    public_owner_id: string;
    liked_by_count: number;
    cloned_by_count: number;
  };
  high_quality_base_model_ids: string[];
  safety_control: string;
  voice_verification: {
    requires_verification: boolean;
    is_verified: boolean;
    verification_failures: string[];
    verification_attempts_count: number;
    language: string;
  };
  permission_on_resource: string;
}

interface GenerationOptions {
  text: string;
  voice_id: string;
  model_id?: string;
  voice_settings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export const useElevenLabs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;

  const getVoices = useCallback(async (): Promise<VoiceClone[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (err: any) {
      setError(err.message || 'Failed to fetch voices');
      return [];
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const generateSpeech = useCallback(async (options: GenerationOptions): Promise<Blob | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${options.voice_id}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: options.text,
          model_id: options.model_id || 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true,
            ...options.voice_settings,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return audioBlob;
    } catch (err: any) {
      setError(err.message || 'Failed to generate speech');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const cloneVoice = useCallback(async (name: string, files: File[], description?: string): Promise<VoiceClone | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      
      if (description) {
        formData.append('description', description);
      }

      // Add audio files
      files.forEach((file, index) => {
        formData.append('files', file, `sample_${index}.${file.name.split('.').pop()}`);
      });

      const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to clone voice');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const deleteVoice = useCallback(async (voiceId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
        method: 'DELETE',
        headers: {
          'xi-api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete voice');
      return false;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  const getVoiceSettings = useCallback(async (voiceId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}/settings`, {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message || 'Failed to get voice settings');
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  return {
    loading,
    error,
    getVoices,
    generateSpeech,
    cloneVoice,
    deleteVoice,
    getVoiceSettings,
  };
};