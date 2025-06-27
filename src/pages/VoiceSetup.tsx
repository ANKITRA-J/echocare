import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Upload, 
  Play, 
  Pause, 
  Square, 
  Trash2, 
  CheckCircle,
  AlertCircle,
  Volume2,
  Download,
  Settings,
  Loader
} from 'lucide-react';
import AudioRecorder from '../components/AudioRecorder';
import FileUploadZone from '../components/FileUploadZone';
import { useElevenLabs } from '../hooks/useElevenLabs';

const VoiceSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('record');
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [testText, setTestText] = useState('Hello, this is a test of my voice clone. How does it sound?');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const {
    loading,
    error,
    getVoices,
    generateSpeech,
    cloneVoice,
    deleteVoice,
  } = useElevenLabs();

  // Load voices on component mount
  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const voiceList = await getVoices();
      setVoices(voiceList);
      if (voiceList.length > 0 && !selectedVoice) {
        setSelectedVoice(voiceList[0].voice_id);
      }
    } catch (error) {
      console.error('Failed to load voices:', error);
    }
  };

  const handleRecordingComplete = async (audioBlob: Blob, audioUrl: string) => {
    console.log('Recording completed:', { audioBlob, audioUrl });
    
    // Convert blob to file for voice cloning
    const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
    
    // Create voice clone
    const voiceName = `Voice Clone ${new Date().toLocaleString()}`;
    const result = await cloneVoice(voiceName, [audioFile], 'Voice clone created from recording');
    
    if (result) {
      alert('Voice clone created successfully!');
      loadVoices(); // Refresh voice list
    }
  };

  const handleFilesUploaded = async (files: any[]) => {
    console.log('Files uploaded:', files);
    
    if (files.length === 0) return;
    
    // Convert uploaded files to File objects
    const audioFiles: File[] = [];
    
    for (const file of files) {
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        const audioFile = new File([blob], file.name, { type: file.type });
        audioFiles.push(audioFile);
      } catch (error) {
        console.error('Failed to process file:', error);
      }
    }
    
    if (audioFiles.length > 0) {
      const voiceName = `Voice Clone ${new Date().toLocaleString()}`;
      const result = await cloneVoice(voiceName, audioFiles, 'Voice clone created from uploaded files');
      
      if (result) {
        alert('Voice clone created successfully!');
        loadVoices(); // Refresh voice list
      }
    }
  };

  const handleTestVoice = async (voiceId: string) => {
    if (playingAudio) {
      // Stop current audio
      setPlayingAudio(null);
      return;
    }

    try {
      setPlayingAudio(voiceId);
      
      const audioBlob = await generateSpeech({
        text: testText,
        voice_id: voiceId,
      });

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setPlayingAudio(null);
          URL.revokeObjectURL(audioUrl);
        };
        
        audio.onerror = () => {
          setPlayingAudio(null);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      }
    } catch (error) {
      console.error('Failed to test voice:', error);
      setPlayingAudio(null);
    }
  };

  const handleDeleteVoice = async (voiceId: string, voiceName: string) => {
    if (confirm(`Are you sure you want to delete "${voiceName}"?`)) {
      const success = await deleteVoice(voiceId);
      if (success) {
        alert('Voice deleted successfully!');
        loadVoices(); // Refresh voice list
      }
    }
  };

  const getStatusColor = (category: string) => {
    switch (category) {
      case 'cloned': return 'bg-primary-100 text-primary-700';
      case 'premade': return 'bg-secondary-100 text-secondary-700';
      case 'professional': return 'bg-success-100 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">Voice Setup</h1>
        <p className="text-secondary-600">
          Create and manage voice clones using ElevenLabs technology for personalized memory narration.
        </p>
      </motion.div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-cream-200">
          <nav className="flex">
            {[
              { id: 'record', label: 'Record Voice', icon: Mic },
              { id: 'upload', label: 'Upload Audio', icon: Upload },
              { id: 'manage', label: 'Manage Voices', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-6 py-4 font-medium text-sm border-b-2 transition-colors duration-200
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-secondary-600 hover:text-secondary-800'
                    }
                  `}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-8">
          {/* Record Tab */}
          {activeTab === 'record' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-secondary-800 mb-4">Record Your Voice</h2>
                <p className="text-secondary-600">
                  For best results, record in a quiet environment and speak naturally for at least 1 minute.
                </p>
              </div>

              <AudioRecorder 
                onRecordingComplete={handleRecordingComplete}
                className="mb-6"
              />

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-semibold text-secondary-800 mb-3">Recording Tips</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-secondary-600">
                  <div>
                    <h4 className="font-medium text-secondary-700 mb-2">Environment</h4>
                    <ul className="space-y-1">
                      <li>• Find a quiet room</li>
                      <li>• Use a good microphone</li>
                      <li>• Avoid echo or background noise</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-700 mb-2">Speech</h4>
                    <ul className="space-y-1">
                      <li>• Speak naturally and clearly</li>
                      <li>• Include various emotions</li>
                      <li>• Read different types of content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-secondary-800 mb-4">Upload Audio Files</h2>
                <p className="text-secondary-600">
                  Upload high-quality audio recordings for voice cloning. Supported formats: MP3, WAV, M4A
                </p>
              </div>

              <FileUploadZone
                accept={{
                  'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.ogg']
                }}
                maxSize={100 * 1024 * 1024} // 100MB for audio files
                onFilesUploaded={handleFilesUploaded}
                className="mb-6"
              />

              <div className="bg-cream-100 p-6 rounded-lg">
                <h3 className="font-semibold text-secondary-800 mb-3">File Requirements</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-secondary-600">
                  <div>
                    <h4 className="font-medium text-secondary-700 mb-2">Audio Quality</h4>
                    <ul className="space-y-1">
                      <li>• Minimum 22kHz sample rate</li>
                      <li>• 16-bit or higher depth</li>
                      <li>• Clear, noise-free audio</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-secondary-700 mb-2">Content</h4>
                    <ul className="space-y-1">
                      <li>• Minimum 1 minute total</li>
                      <li>• Single speaker only</li>
                      <li>• Natural conversational speech</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Manage Tab */}
          {activeTab === 'manage' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-secondary-800">Voice Library</h2>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={loadVoices}
                    disabled={loading}
                    className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors duration-200 flex items-center disabled:opacity-50"
                  >
                    {loading ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Settings className="h-4 w-4 mr-2" />}
                    Refresh
                  </button>
                  <button 
                    onClick={() => setActiveTab('record')}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Create New Voice
                  </button>
                </div>
              </div>

              {/* Test Voice Section */}
              <div className="bg-cream-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-secondary-800 mb-4">Test Voice</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Test Text
                    </label>
                    <textarea
                      value={testText}
                      onChange={(e) => setTestText(e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter text to test voice synthesis..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Select Voice
                    </label>
                    <select
                      value={selectedVoice}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {voices.map((voice) => (
                        <option key={voice.voice_id} value={voice.voice_id}>
                          {voice.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => selectedVoice && handleTestVoice(selectedVoice)}
                      disabled={loading || !selectedVoice || playingAudio === selectedVoice}
                      className="w-full mt-3 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                    >
                      {playingAudio === selectedVoice ? (
                        <>
                          <Square className="h-4 w-4 mr-2" />
                          Stop
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Test Voice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Voice List */}
              <div className="space-y-4">
                {loading && voices.length === 0 ? (
                  <div className="text-center py-8">
                    <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-500" />
                    <p className="text-secondary-600">Loading voices...</p>
                  </div>
                ) : voices.length === 0 ? (
                  <div className="text-center py-8">
                    <Mic className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-secondary-600 mb-2">No voices found</h3>
                    <p className="text-secondary-500 mb-4">Create your first voice clone to get started.</p>
                    <button 
                      onClick={() => setActiveTab('record')}
                      className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                    >
                      Create Voice Clone
                    </button>
                  </div>
                ) : (
                  voices.map((voice, index) => (
                    <motion.div
                      key={voice.voice_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-cream-50 rounded-xl p-6 border border-cream-200"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-secondary-800">{voice.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(voice.category)}`}>
                              {voice.category}
                            </span>
                            {voice.voice_verification?.is_verified && (
                              <CheckCircle className="h-4 w-4 text-success-500" />
                            )}
                          </div>
                          
                          {voice.description && (
                            <p className="text-secondary-600 text-sm mb-3">{voice.description}</p>
                          )}
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-secondary-500 mb-1">Stability</p>
                              <p className="font-semibold text-secondary-800">
                                {voice.settings?.stability ? Math.round(voice.settings.stability * 100) : 50}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-secondary-500 mb-1">Similarity</p>
                              <p className="font-semibold text-secondary-800">
                                {voice.settings?.similarity_boost ? Math.round(voice.settings.similarity_boost * 100) : 50}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-secondary-500 mb-1">Style</p>
                              <p className="font-semibold text-secondary-800">
                                {voice.settings?.style ? Math.round(voice.settings.style * 100) : 0}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-secondary-500 mb-1">Speaker Boost</p>
                              <p className="font-semibold text-secondary-800">
                                {voice.settings?.use_speaker_boost ? 'On' : 'Off'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button 
                            onClick={() => handleTestVoice(voice.voice_id)}
                            disabled={loading}
                            className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200 disabled:opacity-50"
                            title="Test Voice"
                          >
                            {playingAudio === voice.voice_id ? (
                              <Square className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          
                          {voice.preview_url && (
                            <button 
                              onClick={() => window.open(voice.preview_url, '_blank')}
                              className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                              title="Preview"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                          )}
                          
                          {voice.category === 'cloned' && (
                            <button 
                              onClick={() => handleDeleteVoice(voice.voice_id, voice.name)}
                              disabled={loading}
                              className="p-2 text-error-600 hover:text-error-800 transition-colors duration-200 disabled:opacity-50"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* ElevenLabs Integration Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Powered by ElevenLabs</h3>
            <p className="text-primary-100">
              State-of-the-art voice cloning technology for realistic and emotional memory narration.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{voices.length}</div>
            <div className="text-primary-100 text-sm">Available Voices</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSetup;