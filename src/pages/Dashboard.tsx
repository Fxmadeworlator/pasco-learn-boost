import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  Calendar,
  ChevronRight,
  Flame,
  Trophy,
  Zap,
  Crown
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockUserProgress, mockWeeklyGoals, mockAchievements } from '@/lib/mockData';

export function Dashboard() {
  const { user } = useAuth();
  
  const welcomeMessages = [
    "Ready to conquer some questions today?",
    "Your brain is hungry for knowledge!",
    "Time to level up your skills!",
    "Let's make today count!",
    "Your future self will thank you!"
  ];
  
  const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const quickStats = [
    {
      title: 'Total Questions',
      value: mockUserProgress.totalQuestionsAnswered.toLocaleString(),
      description: 'Questions solved',
      icon: BookOpen,
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      title: 'Average Score',
      value: `${mockUserProgress.averageScore}%`,
      description: 'Success rate',
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success/10'
    },
    {
      title: 'Study Streak',
      value: mockUserProgress.streak.toString(),
      description: 'Days in a row',
      icon: Flame,
      color: 'text-warning',
      bg: 'bg-warning/10'
    },
    {
      title: 'Study Time',
      value: `${Math.floor(mockUserProgress.studyTime / 60)}h ${mockUserProgress.studyTime % 60}m`,
      description: 'This week',
      icon: Clock,
      color: 'text-premium',
      bg: 'bg-premium/10'
    }
  ];

  const recentSubjects = Object.entries(mockUserProgress.subjects)
    .sort((a, b) => b[1].percentage - a[1].percentage)
    .slice(0, 4);

  const upcomingGoals = mockWeeklyGoals.slice(0, 2);

  const recentAchievements = mockAchievements.filter(a => a.earned).slice(0, 3);

  const getPlanBadge = () => {
    switch (user?.plan) {
      case 'pro':
        return <Badge variant="default" className="bg-gradient-to-r from-premium to-primary text-white">Pro</Badge>;
      case 'basic':
        return <Badge variant="secondary" className="bg-gradient-to-r from-primary to-success text-white">Basic</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary via-success to-premium rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-white/90 text-lg">{randomWelcome}</p>
            </div>
            <div className="text-right">
              {getPlanBadge()}
              <p className="text-white/80 text-sm mt-2">{user?.educationLevel}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-warning" />
              <span className="font-semibold">{mockUserProgress.totalQuestionsAnswered} Questions Solved</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-success" />
              <span className="font-semibold">{mockUserProgress.averageScore}% Average Score</span>
            </div>
            {mockUserProgress.streak > 0 && (
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-warning animate-pulse" />
                <span className="font-semibold">{mockUserProgress.streak} Day Streak</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="card-interactive border-0 bg-card hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview */}
        <Card className="lg:col-span-2 border-0 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Subject Progress
            </CardTitle>
            <CardDescription>Your performance across different subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentSubjects.map(([subject, data]) => (
              <div key={subject} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {data.completed} of {data.total} questions
                    </p>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {data.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={data.percentage} className="h-2" />
              </div>
            ))}
            
            <Button variant="outline" className="w-full mt-4">
              View Detailed Progress
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Goals & Achievements */}
        <div className="space-y-6">
          {/* Weekly Goals */}
          <Card className="border-0 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Weekly Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{goal.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {goal.current}/{goal.target}
                    </Badge>
                  </div>
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-2" 
                  />
                  <p className="text-xs text-muted-foreground">
                    Reward: {goal.reward}
                  </p>
                </div>
              ))}
              
              {user?.plan === 'freemium' ? (
                <div className="p-4 bg-premium/10 rounded-lg border border-premium/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-4 h-4 text-premium" />
                    <p className="text-sm font-medium text-premium">Pro Feature</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upgrade to Pro to set custom weekly goals and earn rewards!
                  </p>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  View All Goals
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-0 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" size="sm" className="w-full">
                View All Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-to-r from-card to-accent/20">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump back into your studies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-16 flex flex-col gap-2 btn-hero">
              <BookOpen className="w-5 h-5" />
              <span>Practice Questions</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span>Study Schedule</span>
            </Button>
            {user?.plan === 'pro' ? (
              <Button variant="outline" className="h-16 flex flex-col gap-2">
                <Zap className="w-5 h-5" />
                <span>AI Assistant</span>
              </Button>
            ) : (
              <Button variant="outline" className="h-16 flex flex-col gap-2 opacity-50 cursor-not-allowed">
                <Crown className="w-5 h-5" />
                <span>Upgrade to Pro</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}