// Mock data for Pasco Educational Platform

export const educationLevels = [
  { id: 'shs', name: 'Senior High School (SHS)', description: 'WASSCE preparation' },
  { id: 'wassce', name: 'WASSCE', description: 'West African Senior School Certificate Examination' },
  { id: 'university', name: 'University', description: 'Undergraduate studies' },
  { id: 'jhs', name: 'Junior High School (JHS)', description: 'BECE preparation' },
  { id: 'primary', name: 'Primary School', description: 'Foundation education' },
];

export const subjects = [
  'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology', 
  'Social Studies', 'History', 'Geography', 'Economics', 'Government',
  'Literature', 'French', 'Integrated Science', 'Computer Science'
];

export const subscriptionPlans = [
  {
    id: 'freemium',
    name: 'Freemium',
    price: 0,
    features: [
      'Limited access to past questions',
      'Basic progress tracking',
      'Community access'
    ],
    limitations: ['Only 5 questions per day', 'No AI assistance', 'No goal setting']
  },
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 15,
    period: 'month',
    features: [
      'Access to all past questions (1990-date)',
      'Full progress tracking by subject & year',
      'Unlimited question access',
      'Performance analytics',
      'Study streaks'
    ],
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 25,
    period: 'month',
    features: [
      'Everything in Basic Plan',
      'AI Study Assistant',
      'Question solver (upload & solve)',
      'Live AI chatbot',
      'Weekly goals & gamification',
      'Achievement badges',
      'Priority support'
    ],
    popular: true
  }
];

// Mock past questions data
export const mockPastQuestions = [
  {
    id: 1,
    subject: 'Mathematics',
    year: 2023,
    questionNumber: 1,
    difficulty: 'medium',
    content: 'Solve for x in the equation: 2x² + 5x - 3 = 0',
    solution: 'Using the quadratic formula: x = (-5 ± √(25 + 24))/4 = (-5 ± 7)/4. Therefore x = 1/2 or x = -3',
    tags: ['algebra', 'quadratic equations'],
    timeToSolve: 300 // seconds
  },
  {
    id: 2,
    subject: 'Physics',
    year: 2023,
    questionNumber: 2,
    difficulty: 'hard',
    content: 'A projectile is launched at an angle of 45° with initial velocity 20 m/s. Calculate the maximum height reached.',
    solution: 'Using h = (v₀²sin²θ)/(2g) = (400 × 0.5)/(2 × 9.8) = 10.2 m',
    tags: ['mechanics', 'projectile motion'],
    timeToSolve: 480
  },
  {
    id: 3,
    subject: 'Chemistry',
    year: 2022,
    questionNumber: 1,
    difficulty: 'easy',
    content: 'Balance the chemical equation: H₂ + O₂ → H₂O',
    solution: '2H₂ + O₂ → 2H₂O',
    tags: ['chemical equations', 'balancing'],
    timeToSolve: 120
  },
  // Add more questions...
];

// Mock user progress data
export const mockUserProgress = {
  overall: 15, // Overall completion percentage
  subjects: {
    'Mathematics': { completed: 45, total: 200, percentage: 22.5 },
    'Physics': { completed: 12, total: 150, percentage: 8 },
    'Chemistry': { completed: 23, total: 180, percentage: 12.8 },
    'Biology': { completed: 8, total: 120, percentage: 6.7 },
    'English Language': { completed: 67, total: 300, percentage: 22.3 },
  },
  years: {
    '2023': { completed: 15, total: 50, percentage: 30 },
    '2022': { completed: 25, total: 50, percentage: 50 },
    '2021': { completed: 12, total: 50, percentage: 24 },
    '2020': { completed: 8, total: 50, percentage: 16 },
  },
  streak: 7, // Days in a row
  totalQuestionsAnswered: 155,
  averageScore: 78,
  studyTime: 2340, // minutes this week
};

// Mock weekly goals
export const mockWeeklyGoals = [
  {
    id: 1,
    title: 'Solve 25 Mathematics questions',
    description: 'Complete algebra and geometry sections',
    target: 25,
    current: 18,
    deadline: '2024-01-14',
    reward: 'Mathematics Badge',
    category: 'questions'
  },
  {
    id: 2,
    title: 'Study for 10 hours this week',
    description: 'Consistent daily practice',
    target: 600, // minutes
    current: 420,
    deadline: '2024-01-14',
    reward: 'Study Streak Badge',
    category: 'time'
  },
  {
    id: 3,
    title: 'Complete 2022 Physics papers',
    description: 'Focus on mechanics and waves',
    target: 4,
    current: 2,
    deadline: '2024-01-14',
    reward: 'Physics Master Badge',
    category: 'papers'
  }
];

// Mock achievements/badges
export const mockAchievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Completed your first question',
    icon: '🚀',
    earned: true,
    earnedDate: '2024-01-08'
  },
  {
    id: 2,
    name: 'Week Warrior',
    description: 'Maintained a 7-day study streak',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-01-10'
  },
  {
    id: 3,
    name: 'Math Master',
    description: 'Solved 50 mathematics questions',
    icon: '📐',
    earned: false,
    progress: 45,
    target: 50
  },
  {
    id: 4,
    name: 'Speed Demon',
    description: 'Solved a question in under 60 seconds',
    icon: '⚡',
    earned: true,
    earnedDate: '2024-01-12'
  }
];

// Mock AI responses
export const mockAIResponses = [
  {
    question: "How do I solve quadratic equations?",
    response: "Quadratic equations can be solved using several methods:\n\n1. **Factoring**: Look for two numbers that multiply to 'c' and add to 'b'\n2. **Quadratic Formula**: x = (-b ± √(b²-4ac))/2a\n3. **Completing the Square**: Rewrite in (x+h)² = k form\n\nWould you like me to work through a specific example?"
  },
  {
    question: "Explain projectile motion",
    response: "Projectile motion involves two components:\n\n**Horizontal motion**: Constant velocity (no acceleration)\n**Vertical motion**: Constant acceleration due to gravity\n\nKey equations:\n- Range: R = (v₀²sin2θ)/g\n- Maximum height: h = (v₀²sin²θ)/(2g)\n- Time of flight: t = (2v₀sinθ)/g\n\nThe path forms a parabola!"
  }
];

// Helper function to get user plan features
export function getPlanFeatures(planId: string) {
  return subscriptionPlans.find(plan => plan.id === planId)?.features || [];
}

// Helper function to check if feature is available for user plan
export function hasFeature(userPlan: string, feature: string): boolean {
  const planFeatures = getPlanFeatures(userPlan);
  return planFeatures.some(f => f.toLowerCase().includes(feature.toLowerCase()));
}