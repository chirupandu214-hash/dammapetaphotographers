import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  role: 'super_admin' | 'member' | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<'super_admin' | 'member' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. సెషన్ వివరాలు పొందడం
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      fetchRole(session?.user);
    });

    // 2. సెషన్ మారినప్పుడు (Login/Logout) ఆటోమేటిక్ గా అప్‌డేట్ అవ్వడం
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchRole(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // అడ్మిన్ లేదా మెంబర్ రోల్ పొందడం (Supabase Profile టేబుల్ నుండి)
  const fetchRole = async (user: User | undefined) => {
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      setRole(data?.role);
    } else {
      setRole(null);
    }
    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, role, session, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
