import React from 'react';
import Terminal from './components/Terminal';
import VHSEffect from './components/VHSEffect';
import HalfLifeLogo from './components/HalfLifeLogo';

function App() {
  return (
    <div className="app-container relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl w-full relative z-10">
        <HalfLifeLogo className="mb-6" />
        <Terminal />
      </div>
      <VHSEffect />
    </div>
  );
}

export default App;