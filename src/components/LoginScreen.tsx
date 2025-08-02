import React from 'react';
import { BookOpen, CheckCircle, Volume2, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginScreen() {
  const { loginWithGoogle } = useAuth();

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "Smart Text Correction",
      description: "AI-powered writing assistance that learns from your patterns"
    },
    {
      icon: <Volume2 className="w-6 h-6 text-blue-500" />,
      title: "Text-to-Speech",
      description: "High-quality voice reading with multiple voice options"
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      title: "Personalized Learning",
      description: "Track your progress and get targeted improvement suggestions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-white to-soft-blue">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-large">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-warm-gray mb-6 dyslexia-text">
              Welcome to DysWrite
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed dyslexia-text">
              A writing assistant designed specifically for people with dyslexia. 
              Improve your writing with AI-powered corrections, voice assistance, 
              and personalized learning insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-warm-gray mb-3 dyslexia-text">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dyslexia-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="card p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-warm-gray mb-6 dyslexia-text">
                Get Started Today
              </h2>
              
              <button
                onClick={loginWithGoogle}
                className="w-full btn-primary text-white font-semibold py-4 px-6 rounded-xl dyslexia-text text-lg hover:shadow-large transition-all duration-300"
              >
                Continue with Google
              </button>
              
              <p className="text-sm text-gray-500 mt-4 dyslexia-text">
                Secure authentication • No spam • Privacy protected
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
              <h3 className="text-2xl font-bold text-warm-gray mb-4 dyslexia-text">
                Designed for Accessibility
              </h3>
              <p className="text-gray-600 dyslexia-text max-w-2xl mx-auto leading-relaxed">
                Our platform uses the OpenDyslexic font and high-contrast colors to ensure 
                the best reading experience. Every feature is designed with dyslexia-friendly 
                principles in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}