// Web Audio API context
let audioContext: AudioContext | null = null;

const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  // Resume context if it's suspended (required for user interaction)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  return audioContext;
};

export const playPoppedSound = (volume: number = 0.8) => {
  try {
    const context = initAudioContext();
    
    // Create oscillator for the pop sound
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Configure the pop sound
    const now = context.currentTime;
    
    // Frequency starts high and drops quickly (pop sound characteristic)
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    
    // Volume envelope (quick attack, fast decay)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * (0.3 + Math.random() * 0.4), now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    // Use a mix of sine and sawtooth for more realistic sound
    oscillator.type = Math.random() > 0.5 ? 'sine' : 'sawtooth';
    
    // Start and stop the sound
    oscillator.start(now);
    oscillator.stop(now + 0.15);
    
    // Add slight pitch variation for realism
    if (Math.random() > 0.7) {
      const oscillator2 = context.createOscillator();
      const gainNode2 = context.createGain();
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(context.destination);
      
      oscillator2.frequency.setValueAtTime(600 + Math.random() * 200, now + 0.02);
      oscillator2.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      
      gainNode2.gain.setValueAtTime(0, now + 0.02);
      gainNode2.gain.linearRampToValueAtTime(volume * 0.2, now + 0.03);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      
      oscillator2.type = 'triangle';
      oscillator2.start(now + 0.02);
      oscillator2.stop(now + 0.1);
    }
    
  } catch (error) {
    console.warn('Could not play pop sound:', error);
  }
};