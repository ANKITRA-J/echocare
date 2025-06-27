import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Trash2, 
  Download,
  Volume2
} from 'lucide-react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecordingComplete?: (audioBlob: Blob, audioUrl: string) => void;
  className?: string;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  className = '',
}) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioBlob,
    audioUrl,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    clearRecording,
    downloadRecording,
  } = useAudioRecorder();

  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = async () => {
    try {
      await startRecording();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleStopRecording = () => {
    stopRecording();
    if (audioBlob && audioUrl && onRecordingComplete) {
      onRecordingComplete(audioBlob, audioUrl);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  React.useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleEnded = () => setIsPlaying(false);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [audioUrl]);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
      <div className="text-center">
        {/* Recording Status */}
        <div className="mb-6">
          {isRecording ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-pulse bg-error-500 w-3 h-3 rounded-full"></div>
              <span className="text-error-600 font-medium">
                Recording... {formatTime(recordingTime)}
              </span>
            </div>
          ) : recordingTime > 0 && audioUrl ? (
            <div className="text-success-600 font-medium">
              Recording complete: {formatTime(recordingTime)}
            </div>
          ) : (
            <div className="text-secondary-600">
              Click the microphone to start recording
            </div>
          )}
        </div>

        {/* Main Recording Button */}
        <div className="flex justify-center mb-6">
          {!isRecording && !audioUrl ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartRecording}
              className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 shadow-lg"
            >
              <Mic className="h-8 w-8" />
            </motion.button>
          ) : isRecording ? (
            <div className="flex items-center space-x-4">
              {!isPaused ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={pauseRecording}
                  className="w-16 h-16 bg-warning-500 text-white rounded-full flex items-center justify-center hover:bg-warning-600 transition-colors duration-200"
                >
                  <Pause className="h-6 w-6" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resumeRecording}
                  className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                >
                  <Mic className="h-6 w-6" />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStopRecording}
                className="w-16 h-16 bg-error-500 text-white rounded-full flex items-center justify-center hover:bg-error-600 transition-colors duration-200"
              >
                <Square className="h-6 w-6" />
              </motion.button>
            </div>
          ) : null}
        </div>

        {/* Playback Controls */}
        {audioUrl && !isRecording && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <audio ref={audioRef} src={audioUrl} />
            
            {/* Playback Button */}
            <div className="flex justify-center">
              <button
                onClick={handlePlayPause}
                className="w-12 h-12 bg-secondary-500 text-white rounded-full flex items-center justify-center hover:bg-secondary-600 transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-3">
              <button
                onClick={downloadRecording}
                className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              
              <button
                onClick={clearRecording}
                className="flex items-center px-4 py-2 bg-error-500 text-white rounded-lg hover:bg-error-600 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </button>
            </div>
          </motion.div>
        )}

        {/* Recording Tips */}
        {!isRecording && !audioUrl && (
          <div className="mt-6 text-sm text-secondary-600">
            <p className="mb-2">For best results:</p>
            <ul className="text-left space-y-1 max-w-xs mx-auto">
              <li>• Find a quiet environment</li>
              <li>• Speak clearly and naturally</li>
              <li>• Record for at least 5 minutes</li>
              <li>• Include varied emotions</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;