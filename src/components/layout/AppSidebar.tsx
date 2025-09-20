import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileQuestion, 
  TrendingUp, 
  Target, 
  MessageSquare, 
  Crown, 
  User, 
  LogOut,
  BookOpen,
  Settings
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & stats'
  },
  {
    title: 'Past Questions',
    url: '/past-questions',
    icon: FileQuestion,
    description: 'Practice questions'
  },
  {
    title: 'Progress',
    url: '/progress',
    icon: TrendingUp,
    description: 'Track your learning'
  },
  {
    title: 'Goals',
    url: '/goals',
    icon: Target,
    description: 'Weekly targets',
    badge: 'Pro'
  },
  {
    title: 'AI Assistant',
    url: '/ai-chat',
    icon: MessageSquare,
    description: 'Get help studying',
    badge: 'Pro'
  },
];

const bottomNavigation = [
  {
    title: 'Upgrade Plan',
    url: '/upgrade',
    icon: Crown,
    description: 'Unlock premium features'
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User,
    description: 'Account settings'
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  
  const getNavClassName = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
    return isActive(path)
      ? `${baseClasses} bg-sidebar-primary text-sidebar-primary-foreground shadow-lg`
      : `${baseClasses} text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`;
  };

  const getPlanBadgeVariant = () => {
    switch (user?.plan) {
      case 'pro': return 'default';
      case 'basic': return 'secondary';
      default: return 'outline';
    }
  };

  const getPlanColor = () => {
    switch (user?.plan) {
      case 'pro': return 'from-premium to-primary';
      case 'basic': return 'from-primary to-success';
      default: return 'from-muted to-muted-foreground';
    }
  };

  return (
    <Sidebar className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-success rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">Pasco</h2>
              <p className="text-xs text-sidebar-foreground/70">Learn • Practice • Excel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        {/* User Info */}
        {!collapsed && user && (
          <div className="mb-4 p-3 bg-sidebar-accent/50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-success text-white text-xs">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getPlanBadgeVariant()} className="text-xs px-2 py-0">
                    {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                  </Badge>
                  {user.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs">🔥</span>
                      <span className="text-xs text-sidebar-foreground/70">{user.streak}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-semibold uppercase tracking-wider">
            Study Hub
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item.title}</span>
                            {item.badge && user?.plan !== 'pro' && (
                              <Badge variant="outline" className="text-xs ml-2 bg-premium/10 text-premium border-premium/30">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs opacity-70 truncate">{item.description}</p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {bottomNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="truncate">{item.title}</span>
                          <p className="text-xs opacity-70 truncate">{item.description}</p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl"
        >
          <LogOut className={`${collapsed ? 'w-5 h-5' : 'w-4 h-4'} flex-shrink-0`} />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}