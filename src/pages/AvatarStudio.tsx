import React from 'react';
import { motion } from 'framer-motion';
import { Video, Sparkles, Users, Play } from 'lucide-react';
import AvatarCreator from '../components/AvatarCreator';

const AvatarStudio: React.FC = () => {
  const handleVideoCreated = (videoUrl: string) => {
    console.log('New video created:', videoUrl);
    // You can add additional logic here, like showing a success message
  };

  const features = [
    {
      icon: Video,
      title: 'AI Avatar Videos',
      description: 'Create lifelike avatar videos using advanced Tavus technology'
    },
    {
      icon: Sparkles,
      title: 'Personalized Content',
      description: 'Generate custom scripts and scenarios for meaningful memories'
    },
    {
      icon: Users,
      title: 'Multiple Avatars',
      description: 'Create and manage different avatar replicas for various family members'
    },
    {
      icon: Play,
      title: 'Instant Playback',
      description: 'Preview and share your generated videos immediately'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">Avatar Studio</h1>
        <p className="text-secondary-600">
          Create personalized avatar videos using Tavus AI technology for immersive memory experiences.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg text-center"
            >
              <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Avatar Creator Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AvatarCreator onVideoCreated={handleVideoCreated} />
      </motion.div>

      {/* Tavus Integration Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Powered by Tavus AI</h3>
            <p className="text-primary-100">
              Industry-leading avatar technology for realistic video generation and personalized memory experiences.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">HD Quality</div>
            <div className="text-primary-100 text-sm">Video Output</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AvatarStudio;