import React, { useEffect, useRef, useState, useCallback } from 'react';
import Bubble from './Bubble';
import { GameSettings } from '../types/GameSettings';
import { generateBubbleRows, BubbleData } from '../utils/bubbleGenerator';

interface BubbleWrapProps {
  settings: GameSettings;
}

const BubbleWrap: React.FC<BubbleWrapProps> = ({ settings }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const lastRowRef = useRef(0);

  const generateInitialBubbles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerHeight = window.innerHeight;
    const containerWidth = container.clientWidth;
    
    const bubbleSize = settings.bubbleSize === 'small' ? 30 : 
                      settings.bubbleSize === 'medium' ? 40 : 50;
    const spacing = settings.density === 'sparse' ? bubbleSize * 1.8 :
                   settings.density === 'normal' ? bubbleSize * 1.5 :
                   bubbleSize * 1.3;

    const rowsToGenerate = Math.ceil(containerHeight * 2 / spacing) + 5;
    const newBubbles = generateBubbleRows(0, rowsToGenerate, containerWidth, bubbleSize, spacing);
    
    setBubbles(newBubbles);
    lastRowRef.current = rowsToGenerate;
  }, [settings]);

  const addMoreBubbles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const bubbleSize = settings.bubbleSize === 'small' ? 30 : 
                      settings.bubbleSize === 'medium' ? 40 : 50;
    const spacing = settings.density === 'sparse' ? bubbleSize * 1.8 :
                   settings.density === 'normal' ? bubbleSize * 1.5 :
                   bubbleSize * 1.3;

    const newBubbles = generateBubbleRows(lastRowRef.current, 10, containerWidth, bubbleSize, spacing);
    
    setBubbles(prev => [...prev, ...newBubbles]);
    lastRowRef.current += 10;
  }, [settings]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    setScrollOffset(scrollTop);

    // Check if we need to generate more bubbles
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    if (scrollTop + clientHeight > scrollHeight - 1000) {
      addMoreBubbles();
    }

    // Remove bubbles that are far above the viewport to save memory
    setBubbles(prev => prev.filter(bubble => 
      bubble.y > scrollTop - 500
    ));
  }, [addMoreBubbles]);

  useEffect(() => {
    generateInitialBubbles();
  }, [generateInitialBubbles]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleBubblePop = (id: string) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
  };

  const bubbleSize = settings.bubbleSize === 'small' ? 30 : 
                    settings.bubbleSize === 'medium' ? 40 : 50;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-auto overflow-x-hidden relative"
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="relative" style={{ height: `${bubbles.length > 0 ? Math.max(...bubbles.map(b => b.y)) + 100 : 2000}px` }}>
        {bubbles.map(bubble => (
          <Bubble
            key={bubble.id}
            {...bubble}
            settings={settings}
            onPop={() => handleBubblePop(bubble.id)}
            size={bubbleSize}
          />
        ))}
      </div>
    </div>
  );
};

export default BubbleWrap;