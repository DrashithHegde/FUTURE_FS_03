import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { initializeSocket, disconnectSocket } from '../services/socket';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        const parsedUser = JSON.parse(userData);

        setUser(parsedUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          initializeSocket(parsedUser.id);
        } catch (e) {
          console.warn('Socket init failed during restore', e.message);
        }
      }
    } catch (error) {
      console.error('Failed to restore auth state:', error);

      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  
  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      
      if (!response.data || !response.data.success) {
        throw new Error(response.data?.message || 'Login failed');
      }

      const { token, ...userData } = response.data.data;

      if (!token) {
        throw new Error('Token not received from server');
      }

      
      const normalizedUser = { ...userData, username: userData.name || userData.username };

      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(normalizedUser));

      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      
      setUser(normalizedUser);

      
      try {
        initializeSocket(userData.id);
      } catch (e) {
        console.warn('Socket init failed on login', e.message);
      }

      
      toast.success('Login successful! Welcome back.');

      
      return true;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);

      const message =
        error.response?.data?.message || error.message || 'Login failed. Please check credentials.';

      toast.error(message);

      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);

      return false;
    }
  };

  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    try {
      disconnectSocket();
    } catch (e) {
      console.warn('Socket disconnect failed', e?.message || e);
    }
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthContext;
