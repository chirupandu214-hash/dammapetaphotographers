import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  token: string | null;
  role: 'Admin' | 'Member' | null;
  user: any | null;
  login: (token: string, role: 'Admin' | 'Member', user: any) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<'Admin' | 'Member' | null>(localStorage.getItem('role') as any);
  const [user, setUser] = useState<any | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(false);

  const login = (jwtToken: string, userRole: 'Admin' | 'Member', userData: any) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('role', userRole);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(jwtToken);
    setRole(userRole);
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth called outside bounds of global AuthProvider layout.');
  return context;
};
