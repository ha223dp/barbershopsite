import React from 'react';
import { AlertCircle, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';

interface TextAnalysisProps {
  analysis: {
    originalText: string;
    correctedText: string;
    errors: Array<{
      word: string;
      correction: string;
      type: string;
      position: number;
    }>;
    suggestions: string[];
  };
}

export function TextAnalysis({ analysis }: TextAnalysisProps) {
  const errorTypes = analysis.errors.reduce((acc: any, error) => {
    acc[error.type] = (acc[error.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
          Analysis Results
        </h3>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {analysis.errors.length}
            </div>
            <div className="text-sm text-blue-600 dyslexia-text">
              Errors Found
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {analysis.originalText.split(' ').length}
            </div>
            <div className="text-sm text-green-600 dyslexia-text">
              Words Analyzed
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {Math.round(((analysis.originalText.split(' ').length - analysis.errors.length) / analysis.originalText.split(' ').length) * 100)}%
            </div>
            <div className="text-sm text-purple-600 dyslexia-text">
              Accuracy
            </div>
          </div>
        </div>

        {analysis.errors.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-warm-gray mb-3 dyslexia-text flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
              Corrections Made
            </h4>
            <div className="space-y-2">
              {analysis.errors.map((error, index) => (
                <div key={index} className="flex items-center p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="error-text dyslexia-text font-medium">
                        {error.word}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="success-text dyslexia-text font-medium">
                        {error.correction}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dyslexia-text capitalize">
                      {error.type} error
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-warm-gray mb-3 dyslexia-text flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Writing Suggestions
            </h4>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-gray-700 dyslexia-text leading-relaxed">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {Object.keys(errorTypes).length > 0 && (
        <div className="card p-6">
          <h4 className="font-semibold text-warm-gray mb-3 dyslexia-text">
            Error Pattern Analysis
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(errorTypes).map(([type, count]) => (
              <div key={type} className="bg-gray-50 p-4 rounded-lg">
                <div className="text-lg font-semibold text-warm-gray capitalize dyslexia-text">
                  {type} Errors
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {count as number}
                </div>
                <div className="text-sm text-gray-600 dyslexia-text">
                  Focus area for improvement
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}