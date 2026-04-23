import { motion } from 'motion/react';
import { Heart, Sparkles, CloudRain, Droplet } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
  shape: 'heart' | 'sparkle' | 'droplet' | 'cloud';
}

interface FloatingHeartsProps {
  variant?: 'normal' | 'extreme' | 'sad';
}

export default function FloatingHearts({ variant = 'normal' }: FloatingHeartsProps) {
  const [items, setItems] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    const isSad = variant === 'sad';
    const isExtreme = variant === 'extreme';
    // Reduce particle counts strictly by ~50%
    const count = isExtreme ? 20 : isSad ? 15 : 8;
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      scale: Math.random() * (isExtreme ? 0.8 : 0.5) + 0.5,
      // Increase speeds slightly
      duration: isSad ? Math.random() * 3 + 3 : isExtreme ? Math.random() * 3 + 3 : Math.random() * 10 + 10,
      delay: Math.random() * (isExtreme ? 1.5 : 5),
      shape: isSad ? (Math.random() > 0.4 ? 'droplet' : 'cloud') : (Math.random() > 0.8 ? 'sparkle' : 'heart' as const)
    }));
    setItems(generated as FloatingHeart[]);
  }, [variant]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ willChange: 'transform' }}>
      {items.map((item) => (
        <motion.div
          key={`${variant}-${item.id}`} // force recreation on variant change
          initial={{ y: variant === 'sad' ? '-10vh' : '110vh', opacity: 0 }}
          animate={{
            y: variant === 'sad' ? '110vh' : '-10vh',
            opacity: variant === 'extreme' ? [0, 0.8, 0.8, 0] : variant === 'sad' ? [0, 0.5, 0.5, 0] : [0, 0.4, 0.4, 0],
            // Removed X sway completely to reduce frame lag and DOM recalculations
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear"
          }}
          className="absolute"
          style={{
            left: `${item.x}vw`,
            willChange: 'transform, opacity'
          }}
        >
          {item.shape === 'heart' ? (
             <Heart 
              className={variant === 'extreme' ? "text-red-500 fill-red-600/60 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : "text-rose-200/40 fill-rose-100/20"} 
              style={{ 
                width: `${24 * item.scale}px`, 
                height: `${24 * item.scale}px` 
              }} 
            />
          ) : item.shape === 'sparkle' ? (
            <Sparkles 
              className={variant === 'extreme' ? "text-yellow-400 fill-yellow-200/50" : "text-rose-200/40"} 
              style={{ 
                width: `${24 * item.scale}px`, 
                height: `${24 * item.scale}px` 
              }} 
            />
          ) : item.shape === 'droplet' ? (
            <Droplet 
              className="text-blue-300/40 fill-blue-200/20" 
              style={{ 
                width: `${20 * item.scale}px`, 
                height: `${20 * item.scale}px` 
              }} 
            />
          ) : (
            <CloudRain 
              className="text-slate-400/40" 
              style={{ 
                width: `${30 * item.scale}px`, 
                height: `${30 * item.scale}px` 
              }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
