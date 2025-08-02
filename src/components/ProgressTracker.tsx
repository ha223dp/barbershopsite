import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Calendar, BookOpen, Zap } from 'lucide-react';

interface ProgressData {
  totalSessions: number;
  totalWords: number;
  averageAccuracy: number;
  improvementRate: number;
  streak: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    earned: boolean;
    earnedDate?: string;
  }>;
}

export function ProgressTracker() {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<'accuracy' | 'words' | 'sessions'>('accuracy');

  useEffect(() => {
    // Calculate progress from stored sessions
    const sessions = JSON.parse(localStorage.getItem('writingSessions') || '[]');
    
    const totalSessions = sessions.length;
    const totalWords = sessions.reduce((sum: number, session: any) => sum + session.wordCount, 0);
    const totalErrors = sessions.reduce((sum: number, session: any) => sum + session.errors.length, 0);
    const averageAccuracy = totalWords > 0 ? Math.round((totalWords - totalErrors) / totalWords * 100) : 0;
    
    // Calculate improvement rate (comparing first half to second half of sessions)
    const midpoint = Math.floor(sessions.length / 2);
    const firstHalf = sessions.slice(0, midpoint);
    const secondHalf = sessions.slice(midpoint);
    
    const firstHalfAccuracy = firstHalf.length > 0 ? 
      Math.round((firstHalf.reduce((sum: number, s: any) => sum + s.wordCount, 0) - 
                  firstHalf.reduce((sum: number, s: any) => sum + s.errors.length, 0)) / 
                  firstHalf.reduce((sum: number, s: any) => sum + s.wordCount, 0) * 100) : 0;
    
    const secondHalfAccuracy = secondHalf.length > 0 ? 
      Math.round((secondHalf.reduce((sum: number, s: any) => sum + s.wordCount, 0) - 
                  secondHalf.reduce((sum: number, s: any) => sum + s.errors.length, 0)) / 
                  secondHalf.reduce((sum: number, s: any) => sum + s.wordCount, 0) * 100) : 0;
    
    const improvementRate = secondHalfAccuracy - firstHalfAccuracy;
    
    // Calculate streak (consecutive days with sessions)
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const hasSession = sessions.some((session: any) => {
        const sessionDate = new Date(session.timestamp);
        return sessionDate.toDateString() === checkDate.toDateString();
      });
      if (hasSession) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // Define achievements
    const achievements = [
      {
        id: 'first-session',
        title: 'Getting Started',
        description: 'Complete your first writing session',
        icon: <BookOpen className="w-6 h-6 text-blue-500" />,
        earned: totalSessions > 0,
        earnedDate: sessions[0]?.timestamp
      },
      {
        id: 'accuracy-80',
        title: 'Accuracy Master',
        description: 'Achieve 80% accuracy or higher',
        icon: <Target className="w-6 h-6 text-green-500" />,
        earned: averageAccuracy >= 80,
      },
      {
        id: 'words-1000',
        title: 'Word Warrior',
        description: 'Write 1,000 words total',
        icon: <Award className="w-6 h-6 text-purple-500" />,
        earned: totalWords >= 1000,
      },
      {
        id: 'streak-7',
        title: 'Consistent Writer',
        description: 'Write for 7 consecutive days',
        icon: <Calendar className="w-6 h-6 text-orange-500" />,
        earned: streak >= 7,
      },
      {
        id: 'improvement-10',
        title: 'Rapid Improver',
        description: 'Improve accuracy by 10% or more',
        icon: <TrendingUp className="w-6 h-6 text-red-500" />,
        earned: improvementRate >= 10,
      },
      {
        id: 'sessions-50',
        title: 'Dedication Champion',
        description: 'Complete 50 writing sessions',
        icon: <Zap className="w-6 h-6 text-yellow-500" />,
        earned: totalSessions >= 50,
      }
    ];

    setProgressData({
      totalSessions,
      totalWords,
      averageAccuracy,
      improvementRate,
      streak,
      achievements
    });
  }, []);

  const getGoalProgress = () => {
    if (!progressData) return 0;
    
    switch (selectedGoal) {
      case 'accuracy':
        return Math.min(progressData.averageAccuracy, 100);
      case 'words':
        return Math.min((progressData.totalWords / 5000) * 100, 100);
      case 'sessions':
        return Math.min((progressData.totalSessions / 100) * 100, 100);
      default:
        return 0;
    }
  };

  const getGoalTarget = () => {
    switch (selectedGoal) {
      case 'accuracy':
        return '95% accuracy';
      case 'words':
        return '5,000 words';
      case 'sessions':
        return '100 sessions';
      default:
        return '';
    }
  };

  if (!progressData) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dyslexia-text">Loading your progress...</p>
      </div>
    );
  }

  const earnedAchievements = progressData.achievements.filter(a => a.earned);
  const totalAchievements = progressData.achievements.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray mb-2 dyslexia-text">
          Your Progress
        </h2>
        <p className="text-gray-600 dyslexia-text">
          Track your writing improvement journey
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {progressData.totalSessions}
          </div>
          <div className="text-sm text-gray-600 dyslexia-text">
            Writing Sessions
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {progressData.averageAccuracy}%
          </div>
          <div className="text-sm text-gray-600 dyslexia-text">
            Average Accuracy
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {progressData.streak}
          </div>
          <div className="text-sm text-gray-600 dyslexia-text">
            Day Streak
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {progressData.improvementRate > 0 ? '+' : ''}{progressData.improvementRate}%
          </div>
          <div className="text-sm text-gray-600 dyslexia-text">
            Improvement Rate
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text">
            Current Goal
          </h3>
          
          <div className="space-y-4">
            <div className="flex space-x-2">
              {[
                { key: 'accuracy', label: 'Accuracy', icon: <Target className="w-4 h-4" /> },
                { key: 'words', label: 'Words', icon: <BookOpen className="w-4 h-4" /> },
                { key: 'sessions', label: 'Sessions', icon: <Calendar className="w-4 h-4" /> }
              ].map(goal => (
                <button
                  key={goal.key}
                  onClick={() => setSelectedGoal(goal.key as typeof selectedGoal)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors dyslexia-text ${
                    selectedGoal === goal.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {goal.icon}
                  <span className="text-sm">{goal.label}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dyslexia-text">
                  Progress to {getGoalTarget()}
                </span>
                <span className="text-sm font-medium text-gray-800 dyslexia-text">
                  {Math.round(getGoalProgress())}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-primary-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${getGoalProgress()}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text">
            Achievements ({earnedAchievements.length}/{totalAchievements})
          </h3>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  achievement.earned
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-warm-gray dyslexia-text">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-gray-600 dyslexia-text">
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-green-600 dyslexia-text mt-1">
                      Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <Award className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text">
          Weekly Progress
        </h3>
        
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            const sessions = JSON.parse(localStorage.getItem('writingSessions') || '[]');
            const hasSession = sessions.some((session: any) => {
              const sessionDate = new Date(session.timestamp);
              return sessionDate.toDateString() === date.toDateString();
            });
            
            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs dyslexia-text ${
                  hasSession
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <div className="font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dyslexia-text">
            Green squares represent days with writing sessions
          </p>
        </div>
      </div>
    </div>
  );
}