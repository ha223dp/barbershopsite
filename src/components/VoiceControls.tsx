import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Settings, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useVoice } from '../contexts/VoiceContext';

export function VoiceControls() {
  const { 
    speakText, 
    stopSpeaking, 
    isSupported, 
    isSpeaking, 
    currentVoice, 
    availableVoices, 
    setVoice,
    rate,
    setRate,
    pitch,
    setPitch
  } = useVoice();

  const [selectedText, setSelectedText] = useState('');
  const [sampleText, setSampleText] = useState('Welcome to DysWrite! This is a sample text to test the voice settings. You can adjust the voice, speed, and pitch to find what works best for you.');

  const handleSpeakSample = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(sampleText);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString());
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    return () => document.removeEventListener('mouseup', handleTextSelection);
  }, []);

  if (!isSupported) {
    return (
      <div className="text-center py-12">
        <VolumeX className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-warm-gray mb-2 dyslexia-text">
          Voice Not Supported
        </h3>
        <p className="text-gray-600 dyslexia-text max-w-md mx-auto">
          Your browser doesn't support text-to-speech functionality. Please try using a modern browser like Chrome, Firefox, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-warm-gray mb-2 dyslexia-text">
          Voice Controls
        </h2>
        <p className="text-gray-600 dyslexia-text">
          Customize your text-to-speech experience
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-500" />
            Voice Settings
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-gray mb-2 dyslexia-text">
                Voice
              </label>
              <select
                value={currentVoice?.name || ''}
                onChange={(e) => {
                  const voice = availableVoices.find(v => v.name === e.target.value);
                  if (voice) setVoice(voice);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dyslexia-text"
              >
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-gray mb-2 dyslexia-text">
                Speed: {rate}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1 dyslexia-text">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-gray mb-2 dyslexia-text">
                Pitch: {pitch}
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1 dyslexia-text">
                <span>Low</span>
                <span>Normal</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-green-500" />
            Test Voice
          </h3>

          <div className="space-y-4">
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Enter text to test the voice settings..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 dyslexia-text"
            />

            <div className="flex items-center space-x-2">
              <button
                onClick={handleSpeakSample}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors dyslexia-text ${
                  isSpeaking
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Test Voice</span>
                  </>
                )}
              </button>

              <button
                onClick={stopSpeaking}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Stop speaking"
              >
                <VolumeX className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-warm-gray mb-4 dyslexia-text">
          How to Use Voice Features
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-warm-gray dyslexia-text">In Writing Mode:</h4>
            <ul className="space-y-2 text-gray-600 dyslexia-text">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Click the speaker icon to hear your corrected text
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use the microphone for voice input
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Adjust settings here for better experience
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-warm-gray dyslexia-text">Tips for Better Reading:</h4>
            <ul className="space-y-2 text-gray-600 dyslexia-text">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Try different voices to find what works best
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Adjust speed based on your comprehension
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use higher pitch for better word distinction
              </li>
            </ul>
          </div>
        </div>
      </div>

      {selectedText && (
        <div className="card p-6 bg-blue-50 border-2 border-blue-200">
          <h4 className="font-medium text-warm-gray mb-2 dyslexia-text">
            Selected Text:
          </h4>
          <p className="text-gray-700 dyslexia-text mb-4 p-3 bg-white rounded-lg">
            "{selectedText}"
          </p>
          <button
            onClick={() => speakText(selectedText)}
            className="btn-primary text-white px-4 py-2 rounded-lg font-medium dyslexia-text flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Speak Selection</span>
          </button>
        </div>
      )}
    </div>
  );
}