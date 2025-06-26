import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Play, 
  Upload, 
  User, 
  Mic, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useTavus } from '../hooks/useTavus';

interface AvatarCreatorProps {
  onVideoCreated?: (videoUrl: string) => void;
}

const AvatarCreator: React.FC<AvatarCreatorProps> = ({ onVideoCreated }) => {
  const [script, setScript] = useState('');
  const [selectedReplica, setSelectedReplica] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [background, setBackground] = useState('office');
  const [replicas, setReplicas] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('create');

  const { 
    createAvatar, 
    createReplica, 
    getReplicas, 
    getVideos, 
    loading, 
    error 
  } = useTavus();

  useEffect(() => {
    loadReplicas();
    loadVideos();
  }, []);

  const loadReplicas = async () => {
    const replicaData = await getReplicas();
    setReplicas(replicaData);
  };

  const loadVideos = async () => {
    const videoData = await getVideos();
    setVideos(videoData);
  };

  const handleCreateVideo = async () => {
    if (!script.trim()) {
      return;
    }

    const result = await createAvatar({
      script: script.trim(),
      avatarId: selectedReplica,
      voiceId: selectedVoice,
      background,
    });

    if (result && onVideoCreated) {
      onVideoCreated(result.video_url);
      loadVideos(); // Refresh video list
    }
  };

  const handleCreateReplica = async (videoUrl: string, name: string) => {
    const result = await createReplica({
      videoUrl,
      replicaName: name,
    });

    if (result) {
      loadReplicas(); // Refresh replica list
    }
  };

  const backgrounds = [
    { id: 'office', name: 'Office', description: 'Professional office setting' },
    { id: 'home', name: 'Home', description: 'Cozy home environment' },
    { id: 'studio', name: 'Studio', description: 'Clean studio background' },
    { id: 'outdoor', name: 'Outdoor', description: 'Natural outdoor setting' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="border-b border-cream-200">
        <nav className="flex">
          {[
            { id: 'create', label: 'Create Video', icon: Video },
            { id: 'replicas', label: 'Manage Avatars', icon: User },
            { id: 'videos', label: 'Video Library', icon: Play },
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

      <div className="p-6">
        {error && (
          <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </div>
        )}

        {/* Create Video Tab */}
        {activeTab === 'create' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">
                Create Avatar Video
              </h3>
              <p className="text-secondary-600 mb-6">
                Generate a personalized video using AI avatars and voice synthesis.
              </p>
            </div>

            {/* Script Input */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Video Script
              </label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter the script for your memory video..."
                rows={4}
                className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-secondary-500 mt-1">
                {script.length}/1000 characters
              </p>
            </div>

            {/* Avatar Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Select Avatar
              </label>
              <select
                value={selectedReplica}
                onChange={(e) => setSelectedReplica(e.target.value)}
                className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Default Avatar</option>
                {replicas.map((replica) => (
                  <option key={replica.replica_id} value={replica.replica_id}>
                    {replica.replica_name} ({replica.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Background Selection */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Background Setting
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`
                      p-3 border rounded-lg text-center transition-colors duration-200
                      ${background === bg.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-cream-300 hover:border-primary-300'
                      }
                    `}
                  >
                    <div className="font-medium text-sm">{bg.name}</div>
                    <div className="text-xs text-secondary-500 mt-1">{bg.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <button
              onClick={handleCreateVideo}
              disabled={loading || !script.trim()}
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Creating Video...
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Create Video
                </>
              )}
            </button>
          </motion.div>
        )}

        {/* Replicas Tab */}
        {activeTab === 'replicas' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-secondary-800">
                Avatar Replicas
              </h3>
              <button className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Create New
              </button>
            </div>

            <div className="space-y-4">
              {replicas.length === 0 ? (
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                  <p className="text-secondary-600">No avatars created yet</p>
                  <p className="text-sm text-secondary-500">Upload a video to create your first avatar replica</p>
                </div>
              ) : (
                replicas.map((replica) => (
                  <div key={replica.replica_id} className="bg-cream-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-secondary-800">{replica.replica_name}</h4>
                        <p className="text-sm text-secondary-600">Created: {new Date(replica.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          replica.status === 'ready' 
                            ? 'bg-success-100 text-success-700' 
                            : 'bg-warning-100 text-warning-700'
                        }`}>
                          {replica.status}
                        </span>
                        <button className="p-2 text-secondary-600 hover:text-secondary-800">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-secondary-800">
              Generated Videos
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {videos.length === 0 ? (
                <div className="col-span-2 text-center py-8">
                  <Video className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                  <p className="text-secondary-600">No videos created yet</p>
                  <p className="text-sm text-secondary-500">Create your first avatar video to get started</p>
                </div>
              ) : (
                videos.map((video) => (
                  <div key={video.video_id} className="bg-cream-50 p-4 rounded-lg">
                    <div className="aspect-video bg-secondary-200 rounded-lg mb-3 flex items-center justify-center">
                      <Play className="h-8 w-8 text-secondary-500" />
                    </div>
                    <h4 className="font-medium text-secondary-800 mb-1">{video.video_name}</h4>
                    <p className="text-sm text-secondary-600 mb-2">
                      Created: {new Date(video.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        video.status === 'completed' 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-warning-100 text-warning-700'
                      }`}>
                        {video.status}
                      </span>
                      {video.status === 'completed' && (
                        <button 
                          onClick={() => window.open(video.video_url, '_blank')}
                          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                        >
                          View Video
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AvatarCreator;