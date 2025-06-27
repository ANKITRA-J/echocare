import React, { useState } from 'react';
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
  Settings
} from 'lucide-react';
import AudioRecorder from '../components/AudioRecorder';
import FileUploadZone from '../components/FileUploadZone';

const VoiceSetup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('record');

  const voiceClones = [
    {
      id: 1,
      name: "Robert - Original Voice",
      status: "active",
      quality: 95,
      duration: "8:45",
      created: "2024-01-15",
      samples: 12,
      isDefault: true
    },
    {
      id: 2,
      name: "Robert - Younger Voice",
      status: "processing",
      quality: 0,
      duration: "6:32",
      created: "2024-01-14",
      samples: 8,
      isDefault: false
    },
    {
      id: 3,
      name: "Robert - Elderly Voice",
      status: "completed",
      quality: 88,
      duration: "5:21",
      created: "2024-01-12",
      samples: 6,
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-700';
      case 'processing': return 'bg-warning-100 text-warning-700';
      case 'completed': return 'bg-secondary-100 text-secondary-700';
      case 'failed': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <div className="animate-spin h-4 w-4 border-2 border-warning-500 border-t-transparent rounded-full" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleRecordingComplete = (audioBlob: Blob, audioUrl: string) => {
    console.log('Recording completed:', { audioBlob, audioUrl });
    // Here you would typically upload to your voice cloning service
  };

  const handleFilesUploaded = (files: any[]) => {
    console.log('Files uploaded:', files);
    // Here you would process the uploaded audio files
  };

  const handleTestVoice = (cloneId: number) => {
    // Simulate voice test
    const utterance = new SpeechSynthesisUtterance(
      "Hello, this is a test of my voice clone. How does it sound?"
    );
    speechSynthesis.speak(utterance);
  };

  const handleDeleteClone = (cloneId: number) => {
    if (confirm('Are you sure you want to delete this voice clone?')) {
      console.log('Deleting voice clone:', cloneId);
      // Here you would delete the voice clone
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

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-cream-200">
          <nav className="flex">
            {[
              { id: 'record', label: 'Record Voice', icon: Mic },
              { id: 'upload', label: 'Upload Audio', icon: Upload },
              { id: 'manage', label: 'Manage Clones', icon: Settings }
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
                  For best results, record in a quiet environment and speak naturally for at least 5 minutes.
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
                      <li>• Minimum 5 minutes total</li>
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
                <h2 className="text-2xl font-bold text-secondary-800">Voice Clones</h2>
                <button 
                  onClick={() => setActiveTab('record')}
                  className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Create New Clone
                </button>
              </div>

              <div className="space-y-6">
                {voiceClones.map((clone, index) => (
                  <motion.div
                    key={clone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-cream-50 rounded-xl p-6 border border-cream-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-secondary-800">{clone.name}</h3>
                          {clone.isDefault && (
                            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                              Default
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(clone.status)}`}>
                            {getStatusIcon(clone.status)}
                            <span className="ml-1 capitalize">{clone.status}</span>
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-secondary-500 mb-1">Quality Score</p>
                            <p className="font-semibold text-secondary-800">
                              {clone.status === 'processing' ? 'Processing...' : `${clone.quality}%`}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-secondary-500 mb-1">Audio Duration</p>
                            <p className="font-semibold text-secondary-800">{clone.duration}</p>
                          </div>
                          <div>
                            <p className="text-xs text-secondary-500 mb-1">Samples</p>
                            <p className="font-semibold text-secondary-800">{clone.samples}</p>
                          </div>
                          <div>
                            <p className="text-xs text-secondary-500 mb-1">Created</p>
                            <p className="font-semibold text-secondary-800">{clone.created}</p>
                          </div>
                        </div>

                        {clone.status === 'active' || clone.status === 'completed' ? (
                          <div className="w-full bg-cream-200 rounded-full h-2 mb-4">
                            <div 
                              className="bg-success-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${clone.quality}%` }}
                            ></div>
                          </div>
                        ) : clone.status === 'processing' ? (
                          <div className="w-full bg-cream-200 rounded-full h-2 mb-4">
                            <div className="bg-warning-500 h-2 rounded-full animate-pulse w-1/2"></div>
                          </div>
                        ) : null}
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {(clone.status === 'active' || clone.status === 'completed') && (
                          <>
                            <button 
                              onClick={() => handleTestVoice(clone.id)}
                              className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                              title="Test Voice"
                            >
                              <Play className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                              title="Adjust Volume"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                            <button 
                              className="p-2 text-secondary-600 hover:text-secondary-800 transition-colors duration-200"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDeleteClone(clone.id)}
                          className="p-2 text-error-600 hover:text-error-800 transition-colors duration-200"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {clone.status === 'active' && (
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-secondary-600">
                          This voice clone is currently being used for memory generation.
                        </p>
                        <button 
                          onClick={() => handleTestVoice(clone.id)}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                          Test Voice
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
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
            <div className="text-2xl font-bold">99.2%</div>
            <div className="text-primary-100 text-sm">Accuracy Rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VoiceSetup;