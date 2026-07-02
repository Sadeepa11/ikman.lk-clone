import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthCtx {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  loginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('ikman_auth') === '1');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const login = () => {
    localStorage.setItem('ikman_auth', '1');
    setIsLoggedIn(true);
    setLoginModalOpen(false);
  };

  const logout = () => {
    localStorage.removeItem('ikman_auth');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn, login, logout,
      loginModalOpen,
      openLoginModal: () => setLoginModalOpen(true),
      closeLoginModal: () => setLoginModalOpen(false),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
