import { useState, useRef, useCallback } from 'react';

interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  loading: boolean;
  error: string | null;
}

export const useVideoPlayer = (videoUrl?: string) => {
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
    loading: false,
    error: null,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const play = useCallback(async () => {
    if (videoRef.current) {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        await videoRef.current.play();
        setState(prev => ({ ...prev, isPlaying: true, loading: false }));
      } catch (error: any) {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message || 'Failed to play video' 
        }));
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = Math.max(0, Math.min(1, volume));
      setState(prev => ({ ...prev, volume }));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !state.muted;
      videoRef.current.muted = newMuted;
      setState(prev => ({ ...prev, muted: newMuted }));
    }
  }, [state.muted]);

  const setupVideoElement = useCallback((video: HTMLVideoElement) => {
    videoRef.current = video;
    
    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: video.currentTime }));
    };
    
    const handleDurationChange = () => {
      setState(prev => ({ ...prev, duration: video.duration }));
    };
    
    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };
    
    const handleError = () => {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load video',
        loading: false,
        isPlaying: false 
      }));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('durationchange', handleDurationChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('durationchange', handleDurationChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return {
    ...state,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    setupVideoElement,
    videoRef,
  };
};