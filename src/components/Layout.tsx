import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Home, 
  Library, 
  Mic, 
  Settings, 
  User,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';
import { useSubscription } from '../hooks/useSubscription';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const { plan, isActive: isSubscriptionActive } = useSubscription();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: User },
    { name: 'Memories', href: '/memories', icon: Library },
    { name: 'Voice Setup', href: '/voice-setup', icon: Mic },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex h-screen bg-cream-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white shadow-lg">
          <div className="flex items-center flex-shrink-0 px-6 py-4">
            <Heart className="h-8 w-8 text-primary-500" />
            <span className="ml-3 text-xl font-bold text-secondary-800">EchoCare</span>
          </div>
          
          {/* User info */}
          {user && (
            <div className="px-6 py-4 border-b border-cream-200">
              <div className="flex items-center">
                <div className="bg-primary-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-secondary-800">
                    {user.email?.split('@')[0]}
                  </p>
                  {plan && isSubscriptionActive && (
                    <p className="text-xs text-primary-600">{plan.name}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      isActiveRoute(item.href)
                        ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800'
                    } group flex items-center px-3 py-3 text-sm font-medium rounded-l-lg transition-all duration-200`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            
            {/* Sign out button */}
            <div className="px-4 pb-4">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-3 py-3 text-sm font-medium text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800 rounded-lg transition-all duration-200"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Sponsor badges */}
          <div className="p-4 border-t border-cream-200">
            <p className="text-xs text-secondary-500 mb-2">Powered by</p>
            <div className="flex flex-wrap gap-2">
              {['ElevenLabs', 'Tavus', 'Algorand', 'Supabase'].map((sponsor) => (
                <span key={sponsor} className="text-xs bg-cream-100 text-secondary-600 px-2 py-1 rounded">
                  {sponsor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-primary-500" />
            <span className="ml-2 text-lg font-bold text-secondary-800">EchoCare</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-secondary-600 hover:text-secondary-800 hover:bg-secondary-50"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50"
          >
            <nav className="px-4 py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${
                      isActiveRoute(item.href)
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-secondary-600 hover:bg-secondary-50'
                    } flex items-center px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-secondary-600 hover:bg-secondary-50 rounded-md"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </button>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;