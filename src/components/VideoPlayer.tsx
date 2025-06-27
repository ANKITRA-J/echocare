import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Loader
} from 'lucide-react';
import { useVideoPlayer } from '../hooks/useVideoPlayer';

interface VideoPlayerProps {
  src: string;
  title?: string;
  poster?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  poster,
  className = '',
  onPlay,
  onPause,
  onEnded,
}) => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    loading,
    error,
    play,
    pause,
    seek,
    setVolume,
    toggleMute,
    setupVideoElement,
  } = useVideoPlayer(src);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const cleanup = setupVideoElement(videoRef.current);
      return cleanup;
    }
  }, [setupVideoElement]);

  useEffect(() => {
    if (isPlaying && onPlay) onPlay();
    if (!isPlaying && onPause) onPause();
  }, [isPlaying, onPlay, onPause]);

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = clickX / rect.width;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  if (error) {
    return (
      <div className={`bg-gray-900 rounded-lg flex items-center justify-center p-8 ${className}`}>
        <div className="text-center text-white">
          <div className="text-red-400 mb-2">⚠️</div>
          <p className="text-sm">Failed to load video</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-xs text-blue-400 hover:text-blue-300"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden group ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Loader className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Play/Pause button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 text-white hover:bg-white/30 transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary-500 rounded-full transition-all duration-150"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayPause}
                className="hover:text-primary-400 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="hover:text-primary-400 transition-colors duration-200"
                >
                  {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <div 
                  className="w-16 h-1 bg-white/30 rounded-full cursor-pointer"
                  onClick={handleVolumeChange}
                >
                  <div 
                    className="h-full bg-white rounded-full"
                    style={{ width: `${muted ? 0 : volume * 100}%` }}
                  />
                </div>
              </div>

              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => seek(0)}
                className="hover:text-primary-400 transition-colors duration-200"
                title="Restart"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="hover:text-primary-400 transition-colors duration-200"
                title="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Title overlay */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white font-medium text-lg drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;