import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const MAX_CLICKS = 7;

interface ExplodingHeartProps {
  grayMode?: boolean;
  onFinalExplode?: () => void;
}

export default function ExplodingHeart({ grayMode = false, onFinalExplode }: ExplodingHeartProps) {
  const [clicks, setClicks] = useState(0);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    if (grayMode) {
      setExploded(false);
      setClicks(0);
    }
  }, [grayMode]);

  const handleClick = () => {
    if (exploded) return;
    
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks >= MAX_CLICKS) {
      setExploded(true);
      
      if (grayMode && onFinalExplode) {
        // Exaggerated Fireworks Confetti
        const duration = 4000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({ particleCount: 10, angle: 60, spread: 80, origin: { x: 0, y: 0.8 }, colors: ['#ff0000', '#be123c', '#ffffff'], zIndex: 1000, startVelocity: 45 });
          confetti({ particleCount: 10, angle: 120, spread: 80, origin: { x: 1, y: 0.8 }, colors: ['#ff0000', '#be123c', '#ffffff'], zIndex: 1000, startVelocity: 45 });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();

        // Massive Center Explosion
        confetti({
          particleCount: 400,
          spread: 180,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#e11d48', '#be123c', '#ffffff', '#fda4af'],
          disableForReducedMotion: true,
          startVelocity: 80,
          zIndex: 1000
        });

        setTimeout(() => {
          onFinalExplode();
        }, 1500);

      } else {
        // Normal Explosion
        confetti({
          particleCount: 150,
          spread: 120,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#e11d48', '#be123c', '#ffffff', '#fda4af'],
          disableForReducedMotion: true,
          zIndex: 100
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.4 },
            colors: ['#ec4899', '#fce7f3', '#db2777'],
            disableForReducedMotion: true,
            zIndex: 100
          });
        }, 300);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-16 flex flex-col items-center justify-center min-h-[400px] relative z-20">
      <AnimatePresence mode="wait">
        {!exploded ? (
          <motion.div
            key="tap-heart"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, filter: 'blur(10px)' }}
            className="flex flex-col items-center"
          >
            <div className="text-rose-400 font-medium tracking-widest uppercase text-xs sm:text-sm mb-12 text-center">
              {clicks === 0 ? "¡Dame muchos besos!" : "¡Dame más besos!"}
            </div>
            
            <motion.button
              onClick={handleClick}
              animate={{ 
                scale: 1 + (clicks * 0.4), 
                rotate: clicks % 2 === 0 ? 5 : -5,
              }}
              whileTap={{ scale: (1 + (clicks * 0.4)) * 0.9 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="relative p-6 outline-none touch-manipulation group"
              style={{ transformOrigin: "center center" }}
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-rose-200/40 rounded-full blur-xl pointer-events-none"
              />
              <span className="text-6xl md:text-8xl drop-shadow-lg relative z-10 block select-none">
                😘
              </span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.8, y: 100, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 120,
              delay: 0.2 
            }}
            className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(244,63,94,0.2)] border-2 border-rose-100 text-center relative overflow-hidden"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-rose-100 rounded-full mix-blend-multiply blur-xl opacity-70" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-100 rounded-full mix-blend-multiply blur-xl opacity-70" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-6 shadow-inner ring-4 ring-white">
                <Sparkles className="w-8 h-8 fill-rose-200" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-semibold text-slate-800 mb-4 leading-tight">
                ¡BOOM! <br/> Mi corazón explota por ti, Ale
              </h3>
              <p className="text-lg sm:text-xl text-slate-600 italic font-light">
                "No hay un solo rincón en mi ser que no esté enamorado de ti. Gracias por hacer a Elizabeth la mujer más feliz en estos hermosos 11 meses. Te amo con locura, mi Alejandro."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
