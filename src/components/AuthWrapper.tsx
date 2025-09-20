import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Pasco...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return isSignup ? (
      <SignupForm onToggleForm={() => setIsSignup(false)} />
    ) : (
      <LoginForm onToggleForm={() => setIsSignup(true)} />
    );
  }

  return <>{children}</>;
}