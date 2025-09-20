import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-accent hover:text-accent-foreground" />
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Welcome back, </span>
                <span className="font-semibold text-foreground">{user?.name}!</span>
                {user?.streak && user.streak > 0 && (
                  <div className="flex items-center gap-1 ml-2 px-2 py-1 bg-success/10 text-success rounded-full">
                    <span className="text-xs">🔥</span>
                    <span className="text-xs font-medium">{user.streak} day streak</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search questions..." 
                  className="pl-10 w-64 h-9 bg-background border-border focus:border-primary"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative hover:bg-accent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}