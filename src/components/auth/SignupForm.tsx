import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { educationLevels } from '@/lib/mockData';
import { Eye, EyeOff, BookOpen, GraduationCap } from 'lucide-react';

interface SignupFormProps {
  onToggleForm: () => void;
}

export function SignupForm({ onToggleForm }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    
    if (formData.name && formData.email && formData.password && formData.educationLevel) {
      await signup(formData.name, formData.email, formData.password, formData.educationLevel);
    }
  };

  const isFormValid = 
    formData.name && 
    formData.email && 
    formData.password && 
    formData.confirmPassword &&
    formData.educationLevel &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-success/10 via-background to-primary/10 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-success to-primary rounded-xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
              Join Pasco!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Start your learning journey today
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="h-12 rounded-xl border-2 focus:border-success transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="h-12 rounded-xl border-2 focus:border-success transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="educationLevel" className="text-sm font-medium">
                Education Level
              </Label>
              <Select 
                value={formData.educationLevel} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, educationLevel: value }))}
              >
                <SelectTrigger className="h-12 rounded-xl border-2 focus:border-success">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{level.name}</span>
                        <span className="text-sm text-muted-foreground">{level.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="h-12 rounded-xl border-2 focus:border-success transition-colors pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                  className={`h-12 rounded-xl border-2 transition-colors pr-12 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-destructive focus:border-destructive'
                      : 'focus:border-success'
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-sm text-destructive">Passwords do not match</p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 rounded-xl btn-success text-lg font-semibold"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto font-semibold text-success hover:text-success-light"
                onClick={onToggleForm}
              >
                Sign in here
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}