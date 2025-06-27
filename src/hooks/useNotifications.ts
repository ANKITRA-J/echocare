import { useState, useCallback } from 'react';

interface NotificationSettings {
  memoryGenerated: boolean;
  voiceProcessing: boolean;
  weeklyDigest: boolean;
  securityAlerts: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const useNotifications = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    memoryGenerated: true,
    voiceProcessing: true,
    weeklyDigest: false,
    securityAlerts: true,
    emailEnabled: true,
    smsEnabled: false,
  });

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Memory Generated',
      message: 'Your new memory "Wedding Day with Sarah" has been created successfully.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Voice Processing Complete',
      message: 'Your voice clone has been processed and is ready for use.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Subscription Reminder',
      message: 'Your premium subscription will renew in 3 days.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: false,
    },
  ]);

  const updateSetting = useCallback((key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const sendTestEmail = useCallback(async (email: string) => {
    // Simulate sending test email
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addNotification({
      type: 'success',
      title: 'Test Email Sent',
      message: `A test email has been sent to ${email}`,
    });
  }, [addNotification]);

  const sendTestSMS = useCallback(async (phone: string) => {
    // Simulate sending test SMS
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addNotification({
      type: 'success',
      title: 'Test SMS Sent',
      message: `A test SMS has been sent to ${phone}`,
    });
  }, [addNotification]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    settings,
    notifications,
    unreadCount,
    updateSetting,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendTestEmail,
    sendTestSMS,
  };
};