import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, login as apiLogin, register as apiRegister } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isOwner: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user', error);
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      const newToken = response.token; // Changed from Token to token (lowercase)
      console.log('Login successful, token:', newToken);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      
      // Fetch user data immediately after setting token
      try {
        console.log('Attempting to fetch user with token:', newToken);
        // Pass token directly to avoid timing issues with state updates
        const userData = await getCurrentUser(newToken);
        console.log('User data fetched successfully:', userData);
        setUser(userData);
      } catch (error: any) {
        console.error('Failed to fetch user after login. Error status:', error?.response?.status);
        console.error('Full error:', error);
        throw new Error(`Failed to fetch user data: ${error?.response?.status || error?.message}`);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, fullName: string, role: string) => {
    try {
      const response = await apiRegister(email, password, fullName, role);
      const newToken = response.token; // Changed from Token to token (lowercase)
      localStorage.setItem('token', newToken);
      setToken(newToken);
      navigate('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = !!token;
  const isOwner = user?.role === 'Owner';

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated, isOwner }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};