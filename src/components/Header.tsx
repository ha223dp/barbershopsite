import React from 'react';
import { BookOpen, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-warm-gray dyslexia-text">
                DysWrite
              </h1>
              <p className="text-sm text-gray-600 dyslexia-text">
                Your Writing Assistant
              </p>
            </div>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || '/api/placeholder/40/40'}
                  alt={user.displayName || 'User'}
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                />
                <span className="text-sm font-medium text-warm-gray dyslexia-text">
                  {user.displayName}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  title="Settings"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}