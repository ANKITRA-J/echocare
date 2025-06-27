import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Heart, 
  Mic, 
  Video, 
  Users, 
  Shield, 
  Zap,
  Crown,
  Star
} from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useStripe } from '../hooks/useStripe';
import { useSubscription } from '../hooks/useSubscription';
import { products } from '../stripe-config';

const Pricing: React.FC = () => {
  const { user } = useAuth();
  const { createCheckoutSession, loading: checkoutLoading, error: checkoutError } = useStripe();
  const { subscription, isActive } = useSubscription();

  const handleSubscribe = async () => {
    if (!user) {
      window.location.href = '/signup';
      return;
    }

    const product = products[0]; // EchoCare Premium
    await createCheckoutSession(product.priceId);
  };

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'Forever',
      description: 'Perfect for getting started with memory preservation',
      features: [
        '1 voice clone',
        '10 memories per month',
        'Basic AI memory generation',
        'Standard video quality',
        'Email support',
        'HIPAA compliance',
        'Basic privacy controls'
      ],
      limitations: [
        'Limited memory generation',
        'Standard processing speed',
        'Basic voice quality'
      ],
      buttonText: 'Get Started',
      buttonStyle: 'border border-secondary-300 text-secondary-700 hover:bg-secondary-50',
      popular: false,
      icon: Heart,
      onClick: () => user ? window.location.href = '/dashboard' : window.location.href = '/signup'
    },
    {
      name: 'Premium',
      price: '$24.00',
      period: 'per month',
      description: 'Enhanced features for regular memory creation',
      features: [
        '3 voice clones',
        'Unlimited memories',
        'Advanced AI with emotional context',
        'HD video quality (720p)',
        'Priority processing',
        'Advanced privacy controls',
        'Phone & email support',
        'Memory analytics',
        'Custom memory themes'
      ],
      limitations: [],
      buttonText: isActive ? 'Current Plan' : 'Start Premium',
      buttonStyle: isActive 
        ? 'bg-success-500 text-white cursor-not-allowed' 
        : 'bg-primary-500 text-white hover:bg-primary-600',
      popular: true,
      icon: Zap,
      onClick: isActive ? () => {} : handleSubscribe,
      disabled: isActive
    },
    {
      name: 'Family',
      price: '$49.99',
      period: 'per month',
      description: 'Complete solution for families and legacy preservation',
      features: [
        '10 voice clones',
        'Unlimited memories',
        'Premium AI with deep memory analysis',
        '4K video quality',
        'Instant processing',
        'Multi-user access',
        'Family sharing features',
        'Legacy preservation tools',
        'Advanced analytics',
        'Custom branding',
        'Dedicated support',
        'API access'
      ],
      limitations: [],
      buttonText: 'Coming Soon',
      buttonStyle: 'bg-secondary-300 text-secondary-500 cursor-not-allowed',
      popular: false,
      icon: Crown,
      onClick: () => {},
      disabled: true
    }
  ];

  const features = [
    {
      category: 'Voice Technology',
      items: [
        { name: 'ElevenLabs Voice Cloning', basic: true, premium: true, family: true },
        { name: 'Multiple Voice Profiles', basic: false, premium: true, family: true },
        { name: 'Voice Quality Enhancement', basic: false, premium: true, family: true },
        { name: 'Emotional Voice Modulation', basic: false, premium: false, family: true }
      ]
    },
    {
      category: 'Memory Generation',
      items: [
        { name: 'AI Memory Creation', basic: true, premium: true, family: true },
        { name: 'Photo Analysis', basic: true, premium: true, family: true },
        { name: 'Emotional Context Understanding', basic: false, premium: true, family: true },
        { name: 'Deep Memory Analysis', basic: false, premium: false, family: true }
      ]
    },
    {
      category: 'Video Features',
      items: [
        { name: 'Tavus Avatar Videos', basic: true, premium: true, family: true },
        { name: 'HD Quality (720p)', basic: false, premium: true, family: true },
        { name: '4K Quality', basic: false, premium: false, family: true },
        { name: 'Custom Avatars', basic: false, premium: false, family: true }
      ]
    },
    {
      category: 'Security & Privacy',
      items: [
        { name: 'HIPAA Compliance', basic: true, premium: true, family: true },
        { name: 'Algorand Blockchain Consent', basic: true, premium: true, family: true },
        { name: 'Advanced Privacy Controls', basic: false, premium: true, family: true },
        { name: 'Enterprise Security', basic: false, premium: false, family: true }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-secondary-800 mb-4">
          Choose Your Memory Journey
        </h1>
        <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
          Select the perfect plan for preserving and sharing precious memories with your loved ones.
        </p>
      </motion.div>

      {/* Error Message */}
      {checkoutError && (
        <div className="mb-8 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
          {checkoutError}
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`
                    w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                    ${plan.name === 'Basic' ? 'bg-secondary-100' : 
                      plan.name === 'Premium' ? 'bg-primary-100' : 
                      'bg-gradient-to-br from-primary-100 to-secondary-100'}
                  `}>
                    <Icon className={`h-8 w-8 ${
                      plan.name === 'Basic' ? 'text-secondary-600' : 
                      plan.name === 'Premium' ? 'text-primary-600' : 
                      'text-primary-600'
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-800 mb-2">{plan.name}</h3>
                  <p className="text-secondary-600 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-secondary-800">{plan.price}</span>
                    {plan.price !== 'Free' && (
                      <span className="text-secondary-600 ml-1">/{plan.period.split(' ')[1]}</span>
                    )}
                  </div>
                  <p className="text-secondary-500 text-sm mt-1">{plan.period}</p>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-4 w-4 text-success-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-secondary-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button 
                  onClick={plan.onClick}
                  disabled={plan.disabled || checkoutLoading}
                  className={`
                    w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 
                    ${plan.buttonStyle}
                    ${(plan.disabled || checkoutLoading) ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {checkoutLoading && plan.name === 'Premium' ? 'Processing...' : plan.buttonText}
                </button>

                {/* Limitations */}
                {plan.limitations.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-cream-200">
                    <p className="text-xs text-secondary-500 mb-2">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="text-xs text-secondary-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-16"
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold text-secondary-800 mb-6 text-center">
            Detailed Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left py-4 px-4 font-semibold text-secondary-800">Features</th>
                  <th className="text-center py-4 px-4 font-semibold text-secondary-800">Basic</th>
                  <th className="text-center py-4 px-4 font-semibold text-secondary-800">Premium</th>
                  <th className="text-center py-4 px-4 font-semibold text-secondary-800">Family</th>
                </tr>
              </thead>
              <tbody>
                {features.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr>
                      <td colSpan={4} className="py-4 px-4">
                        <h3 className="font-semibold text-secondary-800 bg-cream-50 px-3 py-2 rounded">
                          {category.category}
                        </h3>
                      </td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-b border-cream-100">
                        <td className="py-3 px-4 text-secondary-700">{item.name}</td>
                        <td className="py-3 px-4 text-center">
                          {item.basic ? (
                            <Check className="h-4 w-4 text-success-500 mx-auto" />
                          ) : (
                            <span className="text-secondary-300">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.premium ? (
                            <Check className="h-4 w-4 text-success-500 mx-auto" />
                          ) : (
                            <span className="text-secondary-300">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {item.family ? (
                            <Check className="h-4 w-4 text-success-500 mx-auto" />
                          ) : (
                            <span className="text-secondary-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-cream-50 rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-secondary-800 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              question: "How does voice cloning work?",
              answer: "We use ElevenLabs' advanced AI to create realistic voice clones from audio samples. The process typically takes 5-10 minutes and requires at least 5 minutes of clear speech."
            },
            {
              question: "Is my data secure?",
              answer: "Yes, we're HIPAA compliant and use Algorand blockchain for consent management. All data is encrypted and stored securely with enterprise-grade protection."
            },
            {
              question: "Can I cancel anytime?",
              answer: "Absolutely. You can cancel your subscription at any time. Your data will remain accessible during your billing period and can be exported before cancellation."
            },
            {
              question: "What video quality do I get?",
              answer: "Basic plan includes standard quality, Premium offers HD (720p), and Family plan provides 4K quality videos with advanced avatar customization."
            },
            {
              question: "How many memories can I create?",
              answer: "Basic plan allows 10 memories per month, while Premium and Family plans offer unlimited memory generation with priority processing."
            },
            {
              question: "Do you offer family sharing?",
              answer: "Yes, the Family plan includes multi-user access and sharing features, allowing multiple family members to contribute to and access memories."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-secondary-800 mb-3">{faq.question}</h3>
              <p className="text-secondary-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center mt-16"
      >
        <h2 className="text-2xl font-bold text-secondary-800 mb-4">
          Ready to Preserve Your Memories?
        </h2>
        <p className="text-secondary-600 mb-8 max-w-2xl mx-auto">
          Start your journey with EchoCare today and create lasting connections through AI-powered memory preservation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-semibold"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => window.location.href = '/login'}
                className="border border-secondary-300 text-secondary-700 px-8 py-3 rounded-lg hover:bg-secondary-50 transition-colors duration-200 font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 font-semibold"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;