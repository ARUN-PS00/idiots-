import React, { useState, useCallback } from 'react';
import { GameSettings } from '../types/GameSettings';
import { playPoppedSound } from '../utils/soundManager';

interface BubbleProps {
  id: string;
  x: number;
  y: number;
  requiresDoubleClick: boolean;
  settings: GameSettings;
  onPop: () => void;
  size: number;
}

const Bubble: React.FC<BubbleProps> = ({
  id,
  x,
  y,
  requiresDoubleClick,
  settings,
  onPop,
  size
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [isPopping, setIsPopping] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);

  const bubbleColors = {
    classic: 'bg-white/30 border-white/50',
    blue: 'bg-blue-200/40 border-blue-300/60',
    green: 'bg-green-200/40 border-green-300/60',
    pink: 'bg-pink-200/40 border-pink-300/60',
    gold: 'bg-yellow-200/40 border-yellow-300/60'
  };

  const handleClick = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    
    if (isPopping) return;

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (requiresDoubleClick && newClickCount === 1) {
      // First click - dim the bubble
      setIsDimmed(true);
      playPoppedSound(0.3); // Softer sound for first click
    } else {
      // Pop the bubble
      setIsPopping(true);
      playPoppedSound();
      
      setTimeout(() => {
        onPop();
      }, 200);
    }
  }, [clickCount, requiresDoubleClick, isPopping, onPop]);

  return (
    <div
      className={`absolute rounded-full cursor-pointer select-none transition-all duration-200 ease-out transform-gpu ${
        isPopping 
          ? 'scale-0 opacity-0' 
          : isDimmed 
            ? 'scale-95 opacity-50' 
            : 'hover:scale-105 active:scale-95'
      } ${bubbleColors[settings.bubbleColor]} border-2 backdrop-blur-sm`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: isPopping 
          ? 'none' 
          : `inset 0 ${size * 0.1}px ${size * 0.2}px rgba(255,255,255,0.3), 
             0 ${size * 0.1}px ${size * 0.2}px rgba(0,0,0,0.1)`,
        background: isDimmed 
          ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
          : 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
      }}
      onClick={handleClick}
      onTouchStart={handleClick}
    >
      {/* Highlight effect */}
      <div 
        className="absolute rounded-full bg-white/20"
        style={{
          width: `${size * 0.3}px`,
          height: `${size * 0.3}px`,
          top: `${size * 0.15}px`,
          left: `${size * 0.2}px`,
          filter: 'blur(2px)'
        }}
      />
    </div>
  );
};

export default Bubble;