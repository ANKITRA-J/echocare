import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Database, 
  Key,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Link,
  CheckCircle,
  AlertTriangle,
  Loader,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import { useDataExport } from '../hooks/useDataExport';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testSMSSending, setTestSMSSending] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { 
    settings: notificationSettings, 
    updateSetting: updateNotificationSetting,
    sendTestEmail,
    sendTestSMS 
  } = useNotifications();
  const { 
    exporting, 
    progress, 
    exportMemories, 
    exportVoiceData, 
    exportAllData 
  } = useDataExport();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Link }
  ];

  const handleSave = async () => {
    setSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Settings saved successfully!');
  };

  const handleTestEmail = async () => {
    setTestEmailSending(true);
    try {
      await sendTestEmail('robert.johnson@email.com');
      alert('Test email sent successfully!');
    } catch (error) {
      alert('Failed to send test email');
    } finally {
      setTestEmailSending(false);
    }
  };

  const handleTestSMS = async () => {
    setTestSMSSending(true);
    try {
      await sendTestSMS('+1 (555) 123-4567');
      alert('Test SMS sent successfully!');
    } catch (error) {
      alert('Failed to send test SMS');
    } finally {
      setTestSMSSending(false);
    }
  };

  const handleDataImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.zip';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing file:', file.name);
        alert(`Importing ${file.name}... This feature will be available soon.`);
      }
    };
    input.click();
  };

  const handleDeleteAccount = () => {
    const confirmation = prompt('Type "DELETE" to confirm account deletion:');
    if (confirmation === 'DELETE') {
      alert('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Profile Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Robert Johnson"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="test@echocare.com"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1945-03-15"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Medical Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Primary Diagnosis
                  </label>
                  <input
                    type="text"
                    defaultValue="Early-stage Alzheimer's"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Healthcare Provider
                  </label>
                  <input
                    type="text"
                    defaultValue="Dr. Sarah Williams, MD"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Emergency Contacts</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Contact Name"
                    defaultValue="Sarah Johnson"
                    className="p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    defaultValue="Daughter"
                    className="p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    defaultValue="+1 (555) 987-6543"
                    className="p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-cream-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-secondary-800">Memory Data Retention</h4>
                    <p className="text-sm text-secondary-600">How long to keep generated memories</p>
                  </div>
                  <select className="border border-cream-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Forever</option>
                    <option>5 years</option>
                    <option>2 years</option>
                    <option>1 year</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-secondary-800">Voice Data Sharing</h4>
                    <p className="text-sm text-secondary-600">Allow anonymized voice data for AI improvement</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Blockchain Consent</h3>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Key className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="font-medium text-secondary-800">NFT Consent Token</span>
                  </div>
                  <span className="bg-success-100 text-success-700 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                <p className="text-sm text-secondary-600 mb-3">
                  Your consent is secured on the Algorand blockchain with token ID: ALG-7829304
                </p>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => window.open('https://algoexplorer.io', '_blank')}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    View on Explorer
                  </button>
                  <button 
                    onClick={() => alert('Consent revocation initiated. This will disable all AI processing.')}
                    className="text-error-600 hover:text-error-800 text-sm font-medium"
                  >
                    Revoke Consent
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings).filter(([key]) => !['emailEnabled', 'smsEnabled'].includes(key)).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-secondary-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <p className="text-sm text-secondary-600">
                        {key === 'memoryGenerated' && 'Get notified when new memories are created'}
                        {key === 'voiceProcessing' && 'Updates on voice cloning progress'}
                        {key === 'weeklyDigest' && 'Weekly summary of activity and memories'}
                        {key === 'securityAlerts' && 'Important security and privacy updates'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => updateNotificationSetting(key as any, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Delivery Methods</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-cream-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-secondary-800">Email Notifications</h4>
                    <CheckCircle className="h-4 w-4 text-success-500" />
                  </div>
                  <p className="text-sm text-secondary-600 mb-3">test@echocare.com</p>
                  <button 
                    onClick={handleTestEmail}
                    disabled={testEmailSending}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium disabled:opacity-50"
                  >
                    {testEmailSending ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
                <div className="p-4 bg-cream-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-secondary-800">SMS Notifications</h4>
                    <button 
                      onClick={() => updateNotificationSetting('smsEnabled', !notificationSettings.smsEnabled)}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                    >
                      {notificationSettings.smsEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                  <p className="text-sm text-secondary-600 mb-3">+1 (555) 123-4567</p>
                  {notificationSettings.smsEnabled && (
                    <button 
                      onClick={handleTestSMS}
                      disabled={testSMSSending}
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium disabled:opacity-50"
                    >
                      {testSMSSending ? 'Sending...' : 'Send Test SMS'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Theme Settings</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'auto', label: 'Auto', icon: Monitor }
                ].map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id as any)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        theme === themeOption.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-cream-300 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-12 mx-auto mb-3 rounded flex items-center justify-center ${
                          themeOption.id === 'light' ? 'bg-white border border-cream-300' :
                          themeOption.id === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-white to-gray-800'
                        }`}>
                          <Icon className={`h-6 w-6 ${
                            themeOption.id === 'dark' ? 'text-white' : 'text-gray-600'
                          }`} />
                        </div>
                        <p className="font-medium text-secondary-800">{themeOption.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Accessibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-secondary-800">Large Text</h4>
                    <p className="text-sm text-secondary-600">Increase font size for better readability</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-secondary-800">High Contrast</h4>
                    <p className="text-sm text-secondary-600">Enhance color contrast for better visibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Data Export</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-cream-50 rounded-lg">
                  <h4 className="font-medium text-secondary-800 mb-2">Memory Data</h4>
                  <p className="text-sm text-secondary-600 mb-4">
                    Export all your memories, photos, and generated content
                  </p>
                  <button 
                    onClick={exportMemories}
                    disabled={exporting}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center disabled:opacity-50"
                  >
                    {exporting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                    Export Memories
                  </button>
                </div>
                <div className="p-4 bg-cream-50 rounded-lg">
                  <h4 className="font-medium text-secondary-800 mb-2">Voice Data</h4>
                  <p className="text-sm text-secondary-600 mb-4">
                    Download your voice recordings and clone models
                  </p>
                  <button 
                    onClick={exportVoiceData}
                    disabled={exporting}
                    className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center disabled:opacity-50"
                  >
                    {exporting ? <Loader className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
                    Export Voice
                  </button>
                </div>
              </div>
              
              {exporting && (
                <div className="bg-white p-4 rounded-lg border border-cream-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-secondary-700">Exporting data...</span>
                    <span className="text-sm text-secondary-600">{progress}%</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Data Import</h3>
              <div className="border-2 border-dashed border-cream-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                <h4 className="font-medium text-secondary-800 mb-2">Import Data</h4>
                <p className="text-sm text-secondary-600 mb-4">
                  Import memories and data from other platforms or previous exports
                </p>
                <button 
                  onClick={handleDataImport}
                  className="bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600 transition-colors duration-200"
                >
                  Choose Files
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">Danger Zone</h3>
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-error-600 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-error-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-error-700 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button 
                      onClick={handleDeleteAccount}
                      className="bg-error-600 text-white px-4 py-2 rounded-lg hover:bg-error-700 transition-colors duration-200 flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">API Integrations</h3>
              <div className="space-y-4">
                {[
                  { name: 'ElevenLabs', status: 'Connected', description: 'Voice cloning and synthesis', color: 'success' },
                  { name: 'Tavus', status: 'Connected', description: 'Avatar video generation', color: 'success' },
                  { name: 'Algorand', status: 'Connected', description: 'Blockchain consent management', color: 'success' },
                  { name: 'Supabase', status: 'Connected', description: 'Database and authentication', color: 'success' }
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        integration.color === 'success' ? 'bg-success-500' : 'bg-error-500'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-secondary-800">{integration.name}</h4>
                        <p className="text-sm text-secondary-600">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        integration.status === 'Connected' 
                          ? 'bg-success-100 text-success-700' 
                          : 'bg-error-100 text-error-700'
                      }`}>
                        {integration.status}
                      </span>
                      <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-secondary-800 mb-4">API Keys</h3>
              <div className="bg-warning-50 p-4 rounded-lg border border-warning-200 mb-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-warning-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning-800 mb-1">Security Notice</h4>
                    <p className="text-sm text-warning-700">
                      API keys are managed automatically by our secure infrastructure. Manual configuration is not required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm font-medium text-secondary-800">ElevenLabs API Key</span>
                  <span className="text-xs text-secondary-500">••••••••••••••••</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm font-medium text-secondary-800">Tavus API Key</span>
                  <span className="text-xs text-secondary-500">••••••••••••••••</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <span className="text-sm font-medium text-secondary-800">Algorand Wallet</span>
                  <span className="text-xs text-secondary-500">••••••••••••••••</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
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
        <h1 className="text-3xl font-bold text-secondary-800 mb-2">Settings</h1>
        <p className="text-secondary-600">
          Manage your account, privacy, and application preferences.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center px-4 py-3 text-left transition-colors duration-200
                      ${activeTab === tab.id
                        ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-500'
                        : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-800'
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-cream-200">
              <div className="flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;