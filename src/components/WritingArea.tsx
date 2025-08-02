import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, RotateCcw, Copy, Check } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';
import { TextAnalysis } from './TextAnalysis';
import { useAuth } from '../contexts/AuthContext';

export function WritingArea() {
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const { speakText, isSupported } = useVoice();
  const { user } = useAuth();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setText(text + finalTranscript);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [text]);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis - in production, this would call your API
    setTimeout(() => {
      const simulatedAnalysis = {
        originalText: text,
        correctedText: text.replace(/teh/g, 'the').replace(/recieve/g, 'receive'),
        errors: [
          { word: 'teh', correction: 'the', type: 'spelling', position: text.indexOf('teh') },
          { word: 'recieve', correction: 'receive', type: 'spelling', position: text.indexOf('recieve') }
        ],
        suggestions: [
          'Consider breaking long sentences into shorter ones for better readability.',
          'Use more specific verbs to make your writing more engaging.'
        ]
      };

      setAnalysis(simulatedAnalysis);
      setCorrectedText(simulatedAnalysis.correctedText);
      setIsAnalyzing(false);

      // Save to user's writing history (in production, this would save to database)
      saveWritingSession(simulatedAnalysis);
    }, 2000);
  };

  const saveWritingSession = (analysis: any) => {
    const session = {
      id: Date.now(),
      userId: user?.uid,
      timestamp: new Date().toISOString(),
      originalText: text,
      correctedText: analysis.correctedText,
      errors: analysis.errors,
      wordCount: text.split(' ').length
    };

    // Save to localStorage for now (in production, save to database)
    const sessions = JSON.parse(localStorage.getItem('writingSessions') || '[]');
    sessions.push(session);
    localStorage.setItem('writingSessions', JSON.stringify(sessions));
  };

  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const handleSpeak = () => {
    const textToSpeak = correctedText || text;
    if (textToSpeak.trim()) {
      speakText(textToSpeak);
    }
  };

  const handleCopy = async () => {
    const textToCopy = correctedText || text;
    if (textToCopy.trim()) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetAll = () => {
    setText('');
    setCorrectedText('');
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-warm-gray dyslexia-text">
              Your Writing
            </h2>
            <div className="flex items-center space-x-2">
              {recognition.current && (
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
              )}
              <button
                onClick={resetAll}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Reset all"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start writing here... You can also use voice input by clicking the microphone button."
            className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 dyslexia-text text-lg leading-relaxed"
            style={{ minHeight: '200px' }}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dyslexia-text">
              {text.split(' ').filter(word => word.length > 0).length} words
            </span>
            <button
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className="btn-primary text-white px-6 py-3 rounded-xl font-medium dyslexia-text disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Analyze & Improve</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-warm-gray dyslexia-text">
              Improved Text
            </h2>
            <div className="flex items-center space-x-2">
              {isSupported && correctedText && (
                <button
                  onClick={handleSpeak}
                  className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  title="Listen to improved text"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              {correctedText && (
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  title="Copy improved text"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>

          <div className="w-full h-64 p-4 border border-gray-300 rounded-xl bg-gray-50">
            {correctedText ? (
              <div className="dyslexia-text text-lg leading-relaxed text-warm-gray">
                {correctedText}
              </div>
            ) : (
              <div className="text-gray-400 dyslexia-text italic">
                Your improved text will appear here after analysis...
              </div>
            )}
          </div>

          {correctedText && (
            <div className="text-sm text-gray-500 dyslexia-text">
              {correctedText.split(' ').filter(word => word.length > 0).length} words
            </div>
          )}
        </div>
      </div>

      {analysis && <TextAnalysis analysis={analysis} />}
    </div>
  );
}