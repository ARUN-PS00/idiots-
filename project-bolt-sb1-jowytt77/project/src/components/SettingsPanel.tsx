import React from 'react';
import { X } from 'lucide-react';
import { GameSettings } from '../types/GameSettings';

interface SettingsPanelProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onClose
}) => {
  const handleChange = (key: keyof GameSettings, value: string) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Bubble Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bubble Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['small', 'medium', 'large'].map((size) => (
                <button
                  key={size}
                  onClick={() => handleChange('bubbleSize', size)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                    settings.bubbleSize === size
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Density */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bubble Density
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['sparse', 'normal', 'dense'].map((density) => (
                <button
                  key={density}
                  onClick={() => handleChange('density', density)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors ${
                    settings.density === density
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {density}
                </button>
              ))}
            </div>
          </div>

          {/* Background Gradient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Background
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'blue-purple', name: 'Blue Purple', gradient: 'from-blue-400 to-purple-500' },
                { key: 'green-blue', name: 'Green Blue', gradient: 'from-green-400 to-blue-500' },
                { key: 'orange-red', name: 'Orange Red', gradient: 'from-orange-400 to-red-500' },
                { key: 'purple-indigo', name: 'Purple Indigo', gradient: 'from-purple-400 to-indigo-500' },
                { key: 'warm-sunset', name: 'Warm Sunset', gradient: 'from-yellow-400 to-red-500' }
              ].slice(0, 4).map((bg) => (
                <button
                  key={bg.key}
                  onClick={() => handleChange('backgroundGradient', bg.key)}
                  className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                    settings.backgroundGradient === bg.key
                      ? 'ring-2 ring-blue-500'
                      : ''
                  }`}
                >
                  <div className={`w-full h-8 rounded bg-gradient-to-r ${bg.gradient} mb-1`} />
                  {bg.name}
                </button>
              ))}
            </div>
          </div>

          {/* Bubble Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bubble Color
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { key: 'classic', name: 'Classic', color: 'bg-white' },
                { key: 'blue', name: 'Blue', color: 'bg-blue-200' },
                { key: 'green', name: 'Green', color: 'bg-green-200' },
                { key: 'pink', name: 'Pink', color: 'bg-pink-200' },
                { key: 'gold', name: 'Gold', color: 'bg-yellow-200' }
              ].map((color) => (
                <button
                  key={color.key}
                  onClick={() => handleChange('bubbleColor', color.key)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                    settings.bubbleColor === color.key
                      ? 'bg-blue-100 ring-2 ring-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full ${color.color} border-2 border-gray-300 mb-1`} />
                  <span className="text-xs">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;