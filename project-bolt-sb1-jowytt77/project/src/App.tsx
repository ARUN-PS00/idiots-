import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import BubbleWrap from './components/BubbleWrap';
import SettingsPanel from './components/SettingsPanel';
import { GameSettings } from './types/GameSettings';

const defaultSettings: GameSettings = {
  bubbleSize: 'medium',
  backgroundGradient: 'blue-purple',
  bubbleColor: 'classic',
  density: 'normal'
};

function App() {
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleSettingsChange = (newSettings: GameSettings) => {
    setSettings(newSettings);
    setGameKey(prev => prev + 1); // Force recreation of bubble wrap
  };

  const gradients = {
    'blue-purple': 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500',
    'green-blue': 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
    'orange-red': 'bg-gradient-to-br from-orange-400 via-red-500 to-pink-500',
    'purple-indigo': 'bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-500',
    'warm-sunset': 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500'
  };

  return (
    <div className={`min-h-screen ${gradients[settings.backgroundGradient]} relative overflow-hidden`}>
      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors duration-200 border border-white/20"
        aria-label="Open settings"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-white text-2xl font-light tracking-wide">
          Bubble Wrap
        </h1>
        <p className="text-white/70 text-sm mt-1">
          Pop bubbles to relax
        </p>
      </div>

      {/* Bubble Wrap Game */}
      <BubbleWrap key={gameKey} settings={settings} />

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;