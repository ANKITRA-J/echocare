import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  useEffect(() => {
    // Clear any checkout-related data from localStorage if needed
    localStorage.removeItem('checkout_session_id');
  }, []);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-success-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-success-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-secondary-800 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-secondary-600 mb-8">
            Thank you for choosing EchoCare. Your subscription is now active and you can start creating precious memories.
          </p>

          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center font-semibold"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/onboarding"
              className="w-full border border-secondary-300 text-secondary-700 py-3 px-6 rounded-lg hover:bg-secondary-50 transition-colors duration-200 flex items-center justify-center font-semibold"
            >
              Complete Setup
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-cream-200">
            <div className="flex items-center justify-center text-sm text-secondary-500">
              <Heart className="h-4 w-4 mr-2 text-primary-500" />
              Welcome to the EchoCare family
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;