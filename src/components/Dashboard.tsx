import React, { useState } from 'react';
import { WritingArea } from './WritingArea';
import { StatisticsPanel } from './StatisticsPanel';
import { VoiceControls } from './VoiceControls';
import { ProgressTracker } from './ProgressTracker';
import { FileText, BarChart3, Volume2, TrendingUp } from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'write' | 'stats' | 'voice' | 'progress'>('write');

  const tabs = [
    { id: 'write', label: 'Write', icon: <FileText className="w-5 h-5" /> },
    { id: 'stats', label: 'Statistics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'voice', label: 'Voice', icon: <Volume2 className="w-5 h-5" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-warm-gray mb-2 dyslexia-text">
          Your Writing Dashboard
        </h1>
        <p className="text-gray-600 dyslexia-text">
          Track your progress, improve your writing, and build confidence.
        </p>
      </div>

      <div className="card p-6 mb-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 dyslexia-text ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          {activeTab === 'write' && <WritingArea />}
          {activeTab === 'stats' && <StatisticsPanel />}
          {activeTab === 'voice' && <VoiceControls />}
          {activeTab === 'progress' && <ProgressTracker />}
        </div>
      </div>
    </div>
  );
}