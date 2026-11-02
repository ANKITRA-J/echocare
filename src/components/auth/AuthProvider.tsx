import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const notConfiguredError = {
  message: 'Account sign-in is unavailable right now. Please continue as a guest.',
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInAsGuest: () => void;
  isGuest: boolean;
}

const GUEST_STORAGE_KEY = 'echocare_guest_user';

// Builds a local-only user object so guests can explore the app without an account.
const createGuestUser = (): User => {
  const now = new Date().toISOString();
  return {
    id: `guest-${crypto.randomUUID?.() ?? Date.now().toString(36)}`,
    email: 'guest@echocare.app',
    app_metadata: { provider: 'guest' },
    user_metadata: { is_guest: true },
    aud: 'guest',
    created_at: now,
  } as User;
};

const loadGuestUser = (): User | null => {
  try {
    const stored = localStorage.getItem(GUEST_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as User) : null;
  } catch {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [guestUser, setGuestUser] = useState<User | null>(() => loadGuestUser());

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: notConfiguredError };
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: notConfiguredError };
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // Disable email confirmation
      },
    });
    return { error };
  };

  const signInAsGuest = () => {
    const guest = createGuestUser();
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(guest));
    setGuestUser(guest);
  };

  const clearGuest = () => {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    setGuestUser(null);
  };

  const signOut = async () => {
    clearGuest();
    await supabase.auth.signOut();
  };

  // A real Supabase session always takes priority over guest mode.
  useEffect(() => {
    if (user && guestUser) {
      clearGuest();
    }
  }, [user, guestUser]);

  const value = {
    user: user ?? guestUser,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInAsGuest,
    isGuest: !user && !!guestUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};