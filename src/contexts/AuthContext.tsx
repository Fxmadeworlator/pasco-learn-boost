import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  plan: 'freemium' | 'basic' | 'pro';
  joinDate: string;
  streak: number;
  totalPoints: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, educationLevel: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pasco_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pasco_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pasco_user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - in real app, this would be server-side
    const users = JSON.parse(localStorage.getItem('pasco_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser(userWithoutPassword);
      setIsLoading(false);
      
      toast({
        title: "Welcome back!",
        description: `Good to see you again, ${existingUser.name}`,
      });
      
      return true;
    } else {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password",
      });
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, educationLevel: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('pasco_users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "User with this email already exists",
      });
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name,
      email,
      educationLevel,
      plan: 'freemium',
      joinDate: new Date().toISOString(),
      streak: 0,
      totalPoints: 0,
    };
    
    // Save to mock database
    const updatedUsers = [...users, { ...newUser, password }];
    localStorage.setItem('pasco_users', JSON.stringify(updatedUsers));
    
    // Set current user (without password)
    setUser(newUser);
    setIsLoading(false);
    
    toast({
      title: "Welcome to Pasco! 🎉",
      description: `Your account has been created successfully. Let's start learning!`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "See you later!",
      description: "You've been logged out successfully",
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // Update in mock database too
      const users = JSON.parse(localStorage.getItem('pasco_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('pasco_users', JSON.stringify(users));
      }
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}