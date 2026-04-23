import { motion, AnimatePresence } from 'motion/react';
import { Flame, HeartPulse } from 'lucide-react';

interface LoveModeCelebrationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoveModeCelebration({ isOpen, onClose }: LoveModeCelebrationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-red-950/90"
          />
          
          {/* Modal principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-gradient-to-br from-red-600 to-rose-700 w-full max-w-sm sm:max-w-md rounded-[2.5rem] p-8 relative z-10 text-center shadow-2xl border border-red-400/20 overflow-hidden"
          >
            {/* Destellos de fondo dentro del modal */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="w-40 h-40 bg-white rounded-full blur-3xl absolute -top-10 -right-10" />
              <div className="w-40 h-40 bg-yellow-300 rounded-full blur-3xl absolute -bottom-10 -left-10" />
            </div>

            <div className="relative z-20">
              {/* Ícono animado */}
              <motion.div 
                animate={{ scale: [1, 1.15, 1] }} 
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-md"
              >
                <Flame className="w-12 h-12 text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.8)]" />
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-wide uppercase drop-shadow-md">
                Modo Amor Extremo
              </h2>
              
              <div className="bg-white/10 rounded-2xl p-5 mb-8 backdrop-blur-sm border border-white/20">
                <p className="text-red-50 text-[11px] sm:text-xs font-medium leading-relaxed opacity-90">
                  Has respondido a cada carta recordando todos los detalles maravillosos de nuestra historia, Ale.
                  <br/><br/>
                  Como recompensa secreta de tu Elizabeth, ¡la app ha mutado para arder con nuestro amor! Corazones de fuego, un tema carmesí y navegación instantánea...
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-white hover:bg-red-50 text-red-600 font-bold text-lg py-4 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <HeartPulse className="w-6 h-6 animate-pulse" />
                ¡A disfrutarlo!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
