import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import InputDemo from './components/InputDemo';
import LoadingSpectacle from './components/LoadingSpectacle';
import ResultShowcase from './components/ResultShowcase';

type Screen = 'hero' | 'input' | 'loading' | 'result';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('hero');
  const [userPrompt, setUserPrompt] = useState('');

  const goToInput = () => {
    setCurrentScreen('input');
  };

  const goToLoading = (prompt: string) => {
    setUserPrompt(prompt);
    setCurrentScreen('loading');
  };

  const goToResult = () => {
    setCurrentScreen('result');
  };

  const restart = () => {
    setCurrentScreen('hero');
    setUserPrompt('');
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'hero' && (
          <Hero key="hero" onComplete={goToInput} />
        )}
        {currentScreen === 'input' && (
          <InputDemo key="input" onSubmit={goToLoading} />
        )}
        {currentScreen === 'loading' && (
          <LoadingSpectacle key="loading" onComplete={goToResult} />
        )}
        {currentScreen === 'result' && (
          <ResultShowcase
            key="result"
            prompt={userPrompt}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
