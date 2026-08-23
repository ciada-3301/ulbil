"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SeniorModeContextType {
  seniorMode: boolean;
  toggleSeniorMode: () => void;
  speechEnabled: boolean;
  toggleSpeech: () => void;
  speakText: (text: string) => void;
}

const SeniorModeContext = createContext<SeniorModeContextType>({
  seniorMode: false,
  toggleSeniorMode: () => {},
  speechEnabled: false,
  toggleSpeech: () => {},
  speakText: () => {}
});

export function SeniorModeProvider({ children }: { children: React.ReactNode }) {
  const [seniorMode, setSeniorMode] = useState<boolean>(false);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem('uil_senior_mode');
    if (saved === 'true') {
      setSeniorMode(true);
      document.documentElement.classList.add('senior-mode');
    }
  }, []);

  const toggleSeniorMode = () => {
    const next = !seniorMode;
    setSeniorMode(next);
    localStorage.setItem('uil_senior_mode', String(next));
    if (next) {
      document.documentElement.classList.add('senior-mode');
    } else {
      document.documentElement.classList.remove('senior-mode');
    }
  };

  const toggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <SeniorModeContext.Provider value={{ seniorMode, toggleSeniorMode, speechEnabled, toggleSpeech, speakText }}>
      {children}
    </SeniorModeContext.Provider>
  );
}

export function useSeniorMode() {
  return useContext(SeniorModeContext);
}
