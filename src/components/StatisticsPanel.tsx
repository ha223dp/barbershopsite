import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Award, Calendar, PieChart, BookOpen } from 'lucide-react';

interface WritingSession {
  id: number;
  timestamp: string;
  originalText: string;
  correctedText: string;
  errors: any[];
  wordCount: number;
}

export function StatisticsPanel() {
  const [sessions, setSessions] = useState<WritingSession[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('writingSessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const filterSessionsByPeriod = (sessions: WritingSession[]) => {
    const now = new Date();
    const cutoff = new Date();
    
    switch (selectedPeriod) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      case 'all':
        cutoff.setFullYear(1970);
        break;
    }
    
    return sessions.filter(session => new Date(session.timestamp) >= cutoff);
  };

  const filteredSessions = filterSessionsByPeriod(sessions);
  const totalWords = filteredSessions.reduce((sum, session) => sum + session.wordCount, 0);
  const totalErrors = filteredSessions.reduce((sum, session) => sum + session.errors.length, 0);
  const averageAccuracy = filteredSessions.length > 0 
    ? Math.round((totalWords - totalErrors) / totalWords * 100) 
    : 0;

  const errorTypes = filteredSessions.reduce((acc: any, session) => {
    session.errors.forEach(error => {
      acc[error.type] = (acc[error.type] || 0) + 1;
    });
    return acc;
  }, {});

  const commonErrors = filteredSessions.reduce((acc: any, session) => {
    session.errors.forEach(error => {
      const key = `${error.word} → ${error.correction}`;
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {});

  const topErrors = Object.entries(commonErrors)
    .sort(([,a], [,b]) => (b as number) - (a as number))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-warm-gray dyslexia-text">
          Your Writing Statistics
        </h2>
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' },
            { key: 'all', label: 'All Time' }
          ].map(period => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as typeof selectedPeriod)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors dyslexia-text ${
                selectedPeriod === period.key
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <span className="text-sm text-gray-500 dyslexia-text">Sessions</span>
          </div>
          <div className="text-2xl font-bold text-warm-gray">
            {filteredSessions.length}
          </div>
          <p className="text-sm text-gray-600 dyslexia-text">Writing sessions</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-500 dyslexia-text">Words</span>
          </div>
          <div className="text-2xl font-bold text-warm-gray">
            {totalWords.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600 dyslexia-text">Total words written</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-500 dyslexia-text">Accuracy</span>
          </div>
          <div className="text-2xl font-bold text-warm-gray">
            {averageAccuracy}%
          </div>
          <p className="text-sm text-gray-600 dyslexia-text">Average accuracy</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-yellow-500" />
            <span className="text-sm text-gray-500 dyslexia-text">Errors</span>
          </div>
          <div className="text-2xl font-bold text-warm-gray">
            {totalErrors}
          </div>
          <p className="text-sm text-gray-600 dyslexia-text">Total corrections</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-blue-500" />
            Error Types
          </h3>
          {Object.keys(errorTypes).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(errorTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="capitalize text-warm-gray dyslexia-text">{type}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(count as number) / totalErrors * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dyslexia-text w-8">
                      {count as number}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dyslexia-text italic">No errors to analyze yet</p>
          )}
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
            <Target className="w-5 h-5 mr-2 text-red-500" />
            Most Common Corrections
          </h3>
          {topErrors.length > 0 ? (
            <div className="space-y-3">
              {topErrors.map(([error, count], index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-warm-gray dyslexia-text text-sm">
                    {error}
                  </span>
                  <span className="text-sm text-gray-600 dyslexia-text bg-gray-100 px-2 py-1 rounded">
                    {count as number}x
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dyslexia-text italic">No corrections to show yet</p>
          )}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-green-500" />
          Recent Activity
        </h3>
        {filteredSessions.length > 0 ? (
          <div className="space-y-4">
            {filteredSessions.slice(-5).reverse().map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600 dyslexia-text">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600 dyslexia-text">
                      {session.wordCount} words
                    </div>
                    <div className="text-sm text-gray-600 dyslexia-text">
                      {session.errors.length} corrections
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dyslexia-text mt-1 truncate">
                    {session.originalText.substring(0, 100)}...
                  </div>
                </div>
                <div className="text-lg font-semibold text-green-600">
                  {Math.round((session.wordCount - session.errors.length) / session.wordCount * 100)}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dyslexia-text italic">No writing sessions yet</p>
        )}
      </div>
    </div>
  );
}