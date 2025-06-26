import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Mic, 
  Video, 
  Brain, 
  Users,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI Memory Generation',
      description: 'Transform photos and stories into personalized memories using ethical AI technology.'
    },
    {
      icon: Mic,
      title: 'Voice Cloning',
      description: 'Preserve loved ones\' voices with ElevenLabs technology for authentic memory playback.'
    },
    {
      icon: Video,
      title: 'Avatar Videos',
      description: 'Create comforting video memories with Tavus avatar technology.'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security with blockchain consent management via Algorand.'
    }
  ];

  const stats = [
    { label: 'Families Helped', value: '2,500+' },
    { label: 'Memories Created', value: '15,000+' },
    { label: 'Voice Clones', value: '3,200+' },
    { label: 'Satisfaction Rate', value: '98%' }
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-800 mb-6">
              Preserving Memories,
              <span className="text-primary-500 block">Restoring Connections</span>
            </h1>
            <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              EchoCare uses ethical AI to create personalized memory experiences for dementia patients, 
              helping them reconnect with their loved ones through voice, video, and meaningful moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/onboarding"
                className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 flex items-center group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border border-secondary-300 text-secondary-700 px-8 py-4 rounded-lg font-semibold hover:bg-secondary-50 transition-colors duration-200 flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              Advanced AI Technology for Memory Care
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with compassionate design to create 
              meaningful connections between patients and their memories.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-secondary-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-4">
              Simple Steps to Meaningful Memories
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Upload & Consent',
                description: 'Share photos, stories, and voice recordings. Our blockchain consent system ensures privacy and security.',
                icon: Users
              },
              {
                step: '2',
                title: 'AI Processing',
                description: 'Our ethical AI agents analyze content and generate personalized memories with safety guardrails.',
                icon: Brain
              },
              {
                step: '3',
                title: 'Memory Playback',
                description: 'Experience lifelike conversations and video memories that help patients reconnect with their past.',
                icon: Heart
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <Icon className="h-8 w-8 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Begin Your Memory Journey?
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of families who have found comfort and connection through EchoCare's compassionate AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/onboarding"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-cream-50 transition-colors duration-200"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust & Security */}
      <div className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              Trusted by Healthcare Professionals
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'HIPAA Compliant Data Protection',
              'Blockchain Consent Management',
              'Ethical AI Safety Guardrails'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center text-center"
              >
                <CheckCircle className="h-5 w-5 text-success-500 mr-2" />
                <span className="text-secondary-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;