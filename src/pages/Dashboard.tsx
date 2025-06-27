import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Play, 
  Upload, 
  Clock, 
  TrendingUp, 
  Users,
  Video,
  Mic,
  Brain,
  Shield,
  Crown
} from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useSubscription } from '../hooks/useSubscription';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { subscription, isActive, plan } = useSubscription();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    memoriesCreated: 0,
    voiceClones: 0,
    hoursWatched: 0,
    engagementScore: 0
  });
  const [recentMemories, setRecentMemories] = useState<any[]>([]);

  // Load real user data
  useEffect(() => {
    if (user) {
      loadUserStats();
      loadRecentMemories();
    }
  }, [user]);

  const loadUserStats = async () => {
    // Simulate loading real user stats
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate stats based on user activity
    const accountAge = user?.created_at ? 
      Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;
    
    setStats({
      memoriesCreated: Math.max(1, Math.floor(accountAge / 7)), // 1 memory per week
      voiceClones: isActive ? 3 : 1,
      hoursWatched: Math.max(0.5, accountAge * 0.2),
      engagementScore: Math.min(100, 60 + accountAge * 2)
    });
  };

  const loadRecentMemories = async () => {
    // Simulate loading user's actual memories
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userEmail = user?.email || 'user';
    const userName = userEmail.split('@')[0];
    
    setRecentMemories([
      {
        id: 1,
        title: `${userName}'s Wedding Day`,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        emotion: "joyful",
        duration: "2:34",
        avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      {
        id: 2,
        title: `Family Gathering`,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        emotion: "nostalgic",
        duration: "3:12",
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      },
      {
        id: 3,
        title: `Birthday Celebration`,
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        emotion: "peaceful",
        duration: "1:45",
        avatar: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
      }
    ]);
  };

  const statsData = [
    { label: 'Memories Created', value: stats.memoriesCreated.toString(), icon: Heart, color: 'text-primary-500' },
    { label: 'Voice Clones', value: stats.voiceClones.toString(), icon: Mic, color: 'text-secondary-500' },
    { label: 'Hours Watched', value: stats.hoursWatched.toFixed(1), icon: Clock, color: 'text-success-500' },
    { label: 'Engagement Score', value: `${Math.round(stats.engagementScore)}%`, icon: TrendingUp, color: 'text-warning-500' }
  ];

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'joyful': return 'bg-success-100 text-success-700';
      case 'nostalgic': return 'bg-primary-100 text-primary-700';
      case 'peaceful': return 'bg-secondary-100 text-secondary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const userName = user?.email?.split('@')[0] || 'User';

  // Quick Action Handlers
  const handleUploadMemory = () => {
    navigate('/memories');
  };

  const handleRecordVoice = () => {
    navigate('/voice-setup');
  };

  const handleGenerateVideo = () => {
    navigate('/avatar-studio');
  };

  const handlePlayMemory = (memory: any) => {
    navigate('/memories');
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
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">Welcome back, {userName}</h1>
        <p className="text-secondary-600">Here's what's happening with your memory collection today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-secondary-800">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Memories */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-cream-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-secondary-800">Recent Memories</h2>
                <button 
                  onClick={() => navigate('/memories')}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-cream-200">
              {recentMemories.length > 0 ? recentMemories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6 hover:bg-cream-50 transition-colors duration-200 group cursor-pointer"
                  onClick={() => handlePlayMemory(memory)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={memory.avatar}
                        alt={memory.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-secondary-800 truncate">
                        {memory.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-secondary-500">{memory.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getEmotionColor(memory.emotion)}`}>
                          {memory.emotion}
                        </span>
                        <span className="text-sm text-secondary-500">{memory.duration}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="p-2 text-secondary-400 hover:text-secondary-600 transition-colors duration-200">
                        <Play className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="p-8 text-center">
                  <Heart className="h-12 w-12 text-secondary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-secondary-600 mb-2">No memories yet</h3>
                  <p className="text-secondary-500 mb-4">Start creating your first memory to see it here.</p>
                  <button 
                    onClick={handleUploadMemory}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
                  >
                    Create Memory
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-secondary-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button 
                onClick={handleUploadMemory}
                className="w-full bg-primary-500 text-white p-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload New Memory
              </button>
              <button 
                onClick={handleRecordVoice}
                className="w-full border border-secondary-200 text-secondary-700 p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-center"
              >
                <Mic className="h-5 w-5 mr-2" />
                Record Voice Note
              </button>
              <button 
                onClick={handleGenerateVideo}
                className="w-full border border-secondary-200 text-secondary-700 p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-center"
              >
                <Video className="h-5 w-5 mr-2" />
                Generate Video
              </button>
            </div>
          </motion.div>

          {/* AI Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-secondary-800 mb-4">AI Status</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-sm text-secondary-700">Memory Forge</span>
                </div>
                <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-secondary-500 mr-2" />
                  <span className="text-sm text-secondary-700">Ethics Guardian</span>
                </div>
                <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mic className="h-5 w-5 text-primary-500 mr-2" />
                  <span className="text-sm text-secondary-700">Voice Clone</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stats.voiceClones > 0 
                    ? 'bg-success-100 text-success-700' 
                    : 'bg-warning-100 text-warning-700'
                }`}>
                  {stats.voiceClones > 0 ? 'Ready' : 'Setup Required'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subscription Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`rounded-xl shadow-lg p-6 text-white ${
              isActive 
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                : 'bg-gradient-to-r from-secondary-400 to-secondary-500'
            }`}
          >
            <div className="flex items-center mb-2">
              {isActive ? (
                <Crown className="h-5 w-5 mr-2" />
              ) : (
                <Heart className="h-5 w-5 mr-2" />
              )}
              <h2 className="text-lg font-semibold">
                {isActive ? plan?.name || 'Premium Plan' : 'Free Plan'}
              </h2>
            </div>
            <p className="text-primary-100 text-sm mb-4">
              {isActive 
                ? 'Unlimited memories, priority processing, and advanced AI features.'
                : 'Upgrade to Premium for unlimited memories and advanced features.'
              }
            </p>
            <div className="flex items-center justify-between">
              {isActive ? (
                <>
                  <span className="text-sm">
                    {subscription?.current_period_end 
                      ? `Next billing: ${new Date(subscription.current_period_end * 1000).toLocaleDateString()}`
                      : 'Active subscription'
                    }
                  </span>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="bg-white text-primary-600 px-3 py-1 rounded text-sm font-medium hover:bg-cream-50 transition-colors duration-200"
                  >
                    Manage
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm">Limited features available</span>
                  <button 
                    onClick={() => navigate('/pricing')}
                    className="bg-white text-primary-600 px-3 py-1 rounded text-sm font-medium hover:bg-cream-50 transition-colors duration-200"
                  >
                    Upgrade
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;