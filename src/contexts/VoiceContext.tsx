import React, { createContext, useContext, useState, useEffect } from 'react';

interface VoiceContextType {
  isSupported: boolean;
  isSpeaking: boolean;
  availableVoices: SpeechSynthesisVoice[];
  currentVoice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
  setVoice: (voice: SpeechSynthesisVoice) => void;
  setRate: (rate: number) => void;
  setPitch: (pitch: number) => void;
  setVolume: (volume: number) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error('useVoice must be used within a VoiceProvider');
  }
  return context;
}

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice (prefer English voices)
        const defaultVoice = voices.find(voice => voice.lang.startsWith('en')) || voices[0];
        if (defaultVoice && !currentVoice) {
          setCurrentVoice(defaultVoice);
        }
      };

      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;

      // Load saved preferences
      const savedRate = localStorage.getItem('dyswrite_voice_rate');
      const savedPitch = localStorage.getItem('dyswrite_voice_pitch');
      const savedVolume = localStorage.getItem('dyswrite_voice_volume');
      const savedVoiceName = localStorage.getItem('dyswrite_voice_name');

      if (savedRate) setRate(parseFloat(savedRate));
      if (savedPitch) setPitch(parseFloat(savedPitch));
      if (savedVolume) setVolume(parseFloat(savedVolume));
      
      if (savedVoiceName) {
        const savedVoice = voices.find(voice => voice.name === savedVoiceName);
        if (savedVoice) setCurrentVoice(savedVoice);
      }
    }
  }, []);

  const speakText = (text: string) => {
    if (!isSupported || !text.trim()) return;

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (currentVoice) {
      utterance.voice = currentVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleSetVoice = (voice: SpeechSynthesisVoice) => {
    setCurrentVoice(voice);
    localStorage.setItem('dyswrite_voice_name', voice.name);
  };

  const handleSetRate = (newRate: number) => {
    setRate(newRate);
    localStorage.setItem('dyswrite_voice_rate', newRate.toString());
  };

  const handleSetPitch = (newPitch: number) => {
    setPitch(newPitch);
    localStorage.setItem('dyswrite_voice_pitch', newPitch.toString());
  };

  const handleSetVolume = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem('dyswrite_voice_volume', newVolume.toString());
  };

  const value: VoiceContextType = {
    isSupported,
    isSpeaking,
    availableVoices,
    currentVoice,
    rate,
    pitch,
    volume,
    speakText,
    stopSpeaking,
    setVoice: handleSetVoice,
    setRate: handleSetRate,
    setPitch: handleSetPitch,
    setVolume: handleSetVolume
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
    </VoiceContext.Provider>
  );
}