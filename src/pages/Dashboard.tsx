import React from 'react';
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

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { subscription, isActive, plan } = useSubscription();

  const recentMemories = [
    {
      id: 1,
      title: "Wedding Day with Sarah",
      date: "2024-01-15",
      emotion: "joyful",
      duration: "2:34",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Fishing with Dad",
      date: "2024-01-12",
      emotion: "nostalgic",
      duration: "3:12",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Birthday Celebration",
      date: "2024-01-10",
      emotion: "peaceful",
      duration: "1:45",
      avatar: "https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const stats = [
    { label: 'Memories Created', value: '24', icon: Heart, color: 'text-primary-500' },
    { label: 'Voice Clones', value: '3', icon: Mic, color: 'text-secondary-500' },
    { label: 'Hours Watched', value: '15.2', icon: Clock, color: 'text-success-500' },
    { label: 'Engagement Score', value: '92%', icon: TrendingUp, color: 'text-warning-500' }
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
        {stats.map((stat, index) => {
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
                <button className="text-primary-500 hover:text-primary-600 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="divide-y divide-cream-200">
              {recentMemories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6 hover:bg-cream-50 transition-colors duration-200 group cursor-pointer"
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
              ))}
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
              <button className="w-full bg-primary-500 text-white p-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload New Memory
              </button>
              <button className="w-full border border-secondary-200 text-secondary-700 p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-center">
                <Mic className="h-5 w-5 mr-2" />
                Record Voice Note
              </button>
              <button className="w-full border border-secondary-200 text-secondary-700 p-4 rounded-lg hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-center">
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
                <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">
                  Processing
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
                    onClick={() => window.location.href = '/settings'}
                    className="bg-white text-primary-600 px-3 py-1 rounded text-sm font-medium hover:bg-cream-50 transition-colors duration-200"
                  >
                    Manage
                  </button>
                </>
              ) : (
                <>
                  <span className="text-sm">Limited features available</span>
                  <button 
                    onClick={() => window.location.href = '/pricing'}
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