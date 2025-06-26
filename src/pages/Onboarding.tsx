import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  FileText, 
  Mic, 
  Upload, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    patientName: '',
    caregiverName: '',
    relationship: '',
    consentGiven: false,
    voiceRecorded: false,
    memoriesUploaded: false
  });

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to EchoCare',
      description: 'Let\'s set up your personalized memory companion',
      icon: Heart
    },
    {
      id: 'consent',
      title: 'Privacy & Consent',
      description: 'Your privacy and security are our top priorities',
      icon: Shield
    },
    {
      id: 'profile',
      title: 'Patient Information',
      description: 'Help us understand who we\'re creating memories for',
      icon: FileText
    },
    {
      id: 'voice',
      title: 'Voice Setup',
      description: 'Record or upload voice samples for cloning',
      icon: Mic
    },
    {
      id: 'memories',
      title: 'Initial Memories',
      description: 'Upload photos and stories to get started',
      icon: Upload
    },
    {
      id: 'complete',
      title: 'Setup Complete',
      description: 'Your AI companion is ready to create memories',
      icon: CheckCircle
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              Welcome to Your Memory Journey
            </h2>
            <p className="text-secondary-600 mb-8 max-w-md mx-auto">
              EchoCare uses ethical AI to help preserve and share precious memories. 
              We'll guide you through a simple setup process to create your personalized memory companion.
            </p>
            <div className="bg-cream-100 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-secondary-500 mr-3 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm text-secondary-700 font-medium mb-1">This process takes about 10-15 minutes</p>
                  <p className="text-sm text-secondary-600">
                    We'll help you set up voice cloning, upload memories, and configure your AI companion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'consent':
        return (
          <div>
            <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-secondary-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
              Privacy & Data Protection
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-cream-200">
                <h3 className="font-semibold text-secondary-800 mb-3">HIPAA Compliance</h3>
                <p className="text-sm text-secondary-600 mb-4">
                  All data is encrypted and stored in HIPAA-compliant infrastructure. 
                  Your memories and personal information are protected by enterprise-grade security.
                </p>
                <div className="flex items-center text-success-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Verified Compliant</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-cream-200">
                <h3 className="font-semibold text-secondary-800 mb-3">Blockchain Consent</h3>
                <p className="text-sm text-secondary-600 mb-4">
                  We use Algorand blockchain to create immutable consent records. 
                  You maintain full control over your data and can revoke consent at any time.
                </p>
                <div className="flex items-center text-primary-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Algorand Secured</span>
                </div>
              </div>

              <div className="bg-primary-50 p-4 rounded-lg">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.consentGiven}
                    onChange={(e) => setFormData({ ...formData, consentGiven: e.target.checked })}
                    className="mt-1 mr-3"
                  />
                  <div className="text-sm">
                    <span className="font-medium text-secondary-800">I consent to data processing</span>
                    <p className="text-secondary-600 mt-1">
                      I understand and agree to the privacy policy and consent to the processing 
                      of personal data for memory generation and AI training purposes.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <div className="bg-cream-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="h-8 w-8 text-secondary-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
              Patient Information
            </h2>
            <div className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Patient Name
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  placeholder="Enter patient's name"
                  className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Your Name (Caregiver)
                </label>
                <input
                  type="text"
                  value={formData.caregiverName}
                  onChange={(e) => setFormData({ ...formData, caregiverName: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Relationship to Patient
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select relationship</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Child</option>
                  <option value="parent">Parent</option>
                  <option value="sibling">Sibling</option>
                  <option value="caregiver">Professional Caregiver</option>
                  <option value="friend">Friend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'voice':
        return (
          <div>
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mic className="h-8 w-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
              Voice Setup
            </h2>
            <div className="max-w-md mx-auto">
              <p className="text-secondary-600 mb-6 text-center">
                Upload audio recordings to create a realistic voice clone using ElevenLabs technology. 
                We recommend 5-10 minutes of clear speech for best results.
              </p>
              
              <div className="bg-white p-6 rounded-lg border border-cream-200 mb-6">
                <h3 className="font-semibold text-secondary-800 mb-3">Recording Tips</h3>
                <ul className="text-sm text-secondary-600 space-y-2">
                  <li>• Use a quiet environment</li>
                  <li>• Speak naturally and clearly</li>
                  <li>• Include varied emotions and tones</li>
                  <li>• Record for at least 5 minutes</li>
                </ul>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-primary-500 text-white p-4 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center">
                  <Mic className="h-5 w-5 mr-2" />
                  Start Recording
                </button>
                
                <div className="text-center text-secondary-500">or</div>
                
                <button className="w-full border border-cream-300 text-secondary-700 p-4 rounded-lg hover:bg-cream-50 transition-colors duration-200 flex items-center justify-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Audio File
                </button>
              </div>

              {!formData.voiceRecorded && (
                <div className="mt-4 p-3 bg-warning-50 rounded-lg border border-warning-200">
                  <p className="text-sm text-warning-700">
                    Voice recording is required to continue. This enables personalized memory playback.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'memories':
        return (
          <div>
            <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
              Upload Initial Memories
            </h2>
            <div className="max-w-lg mx-auto">
              <p className="text-secondary-600 mb-6 text-center">
                Share photos, letters, or stories that hold special meaning. 
                Our AI will help transform these into conversational memories.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-cream-200 text-center">
                  <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-secondary-700">Photos</p>
                  <p className="text-xs text-secondary-500">JPG, PNG up to 10MB</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-cream-200 text-center">
                  <FileText className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-secondary-700">Stories</p>
                  <p className="text-xs text-secondary-500">Text, letters, journals</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-cream-300 rounded-lg p-8 text-center hover:border-primary-300 transition-colors duration-200 cursor-pointer">
                <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <p className="text-secondary-700 font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-secondary-500">
                  Upload photos, documents, or audio recordings
                </p>
              </div>

              <div className="mt-6 p-4 bg-cream-100 rounded-lg">
                <h3 className="font-medium text-secondary-800 mb-2">Memory Examples</h3>
                <ul className="text-sm text-secondary-600 space-y-1">
                  <li>• Wedding photos with context about the day</li>
                  <li>• Family vacation pictures and stories</li>
                  <li>• Letters or cards from loved ones</li>
                  <li>• Audio recordings of conversations</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center">
            <div className="bg-success-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-800 mb-4">
              Setup Complete!
            </h2>
            <p className="text-secondary-600 mb-8 max-w-md mx-auto">
              Your AI memory companion is now being prepared. We're processing your voice and 
              generating your first memories. This typically takes 5-10 minutes.
            </p>
            
            <div className="bg-cream-100 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-secondary-800 mb-4">What's happening now:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-700">Voice cloning (ElevenLabs)</span>
                  <span className="text-xs bg-warning-100 text-warning-700 px-2 py-1 rounded-full">
                    Processing
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-700">Memory generation (AI)</span>
                  <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                    Queued
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-700">Video rendering (Tavus)</span>
                  <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                    Waiting
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200">
              Go to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'consent':
        return formData.consentGiven;
      case 'profile':
        return formData.patientName && formData.caregiverName && formData.relationship;
      case 'voice':
        return formData.voiceRecorded;
      case 'memories':
        return formData.memoriesUploaded;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'bg-primary-500 text-white' 
                      : isCompleted 
                        ? 'bg-success-500 text-white' 
                        : 'bg-cream-200 text-secondary-400'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-12 h-1 mx-2 transition-all duration-300
                      ${isCompleted ? 'bg-success-500' : 'bg-cream-200'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <p className="text-sm text-secondary-600">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`
              flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${currentStep === 0 
                ? 'text-secondary-400 cursor-not-allowed' 
                : 'text-secondary-700 hover:bg-secondary-50'
              }
            `}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed() || currentStep === steps.length - 1}
            className={`
              flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${canProceed() && currentStep < steps.length - 1
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-secondary-200 text-secondary-400 cursor-not-allowed'
              }
            `}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;