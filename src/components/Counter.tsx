import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CalendarHeart, Infinity as InfinityIcon, Sparkles } from 'lucide-react';

interface TimeDiff {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Counter() {
  const [time, setTime] = useState<TimeDiff>({ months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdown, setCountdown] = useState<CountdownDiff | null>(null);

  // Slot Machine States
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [slotResult, setSlotResult] = useState<string[]>(['0', '0', '0', '0', '0', '0', '0', '0']);

  useEffect(() => {
    // Fecha de inicio: 24 de Mayo de 2025 a las 00:00 hr (Hora México)
    const startDate = new Date('2025-05-24T00:00:00-06:00');
    // Próximo aniversario (1er Año)
    const anniversaryDate = new Date('2026-05-24T00:00:00-06:00');

    const updateCounter = () => {
      // Obtenemos la hora actual y la forzamos a una representación "MX" 
      // para que el cálculo de años/meses/días sea exacto respecto a MX
      const now = new Date();
      
      // Convertir 'now' a la zona horaria de México (UTC-6)
      // Usamos formatToParts para obtener los componentes exactos en MX
      const mxParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }).formatToParts(now);

      const mxDate: Record<string, number> = {};
      mxParts.forEach(({ type, value }) => {
        if (type !== 'literal') mxDate[type] = parseInt(value, 10);
      });

      // --- Tiempo Transcurrido ---
      const diffMs = now.getTime() - startDate.getTime();
      if (diffMs > 0) {
        // Componentes de la fecha de inicio en MX (ya definidos en startDate)
        const startYear = 2025;
        const startMonth = 5; // Mayo
        const startDay = 24;

        let years = mxDate.year - startYear;
        let months = mxDate.month - startMonth;
        let days = mxDate.day - startDay;
        let hours = mxDate.hour - 0;
        let minutes = mxDate.minute - 0;
        let seconds = mxDate.second - 0;

        if (seconds < 0) { seconds += 60; minutes -= 1; }
        if (minutes < 0) { minutes += 60; hours -= 1; }
        if (hours < 0) { hours += 24; days -= 1; }
        if (days < 0) {
          // Obtener días del mes anterior en MX
          const prevMonth = new Date(mxDate.year, mxDate.month - 1, 0);
          days += prevMonth.getDate();
          months -= 1;
        }
        if (months < 0) { months += 12; years -= 1; }

        const totalMonths = years * 12 + months;
        setTime({ months: totalMonths, days, hours, minutes, seconds });
      }

      // --- Tiempo Faltante ---
      const diffRemainMs = anniversaryDate.getTime() - now.getTime();
      if (diffRemainMs > 0) {
        const d = Math.floor(diffRemainMs / (1000 * 60 * 60 * 24));
        const h = Math.floor((diffRemainMs / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diffRemainMs / 1000 / 60) % 60);
        const s = Math.floor((diffRemainMs / 1000) % 60);
        setCountdown({ days: d, hours: h, minutes: m, seconds: s });
      } else {
        setCountdown(null);
      }
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    let spins = 0;
    
    // Play a tick sound if possible
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const intervalId = setInterval(() => {
          if (spins > 50) return clearInterval(intervalId);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        }, 50);
      }
    } catch(e) {}

    const spinInterval = setInterval(() => {
      setSlotResult(Array.from({ length: 8 }, () => Math.floor(Math.random() * 10).toString()));
      spins++;
      if (spins > 50) { // 2.5 seconds roughly
        clearInterval(spinInterval);
        setIsSpinning(false);
        setHasSpun(true);
        // Transform the numbers into infinities!
        setSlotResult(['∞', '∞', '∞', '∞', '∞', '∞', '∞', '∞']);
      }
    }, 40);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-12 relative z-10 px-4 space-y-12">
      
      {/* 1. SECCIÓN BENTO GRID - TIEMPO TRANSCURRIDO */}
      <div className="space-y-4">
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-500 mb-3 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          >
            <Heart className="w-6 h-6 fill-current animate-pulse" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl text-slate-800 font-display font-semibold mb-2">
            Nuestro Reloj de Amor
          </h2>
          <p className="text-slate-500 font-light tracking-wide">
            Cada segundo suma a nuestra eternidad, Alejandro
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-2 md:col-span-2 bg-gradient-to-br from-rose-50 to-pink-50 backdrop-blur-xl p-8 rounded-[2rem] border border-white shadow-xl shadow-rose-900/5 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CalendarHeart className="w-24 h-24" />
            </div>
            <span className="text-7xl font-display font-bold text-rose-600 tracking-tighter drop-shadow-sm mb-1">{time.months.toString().padStart(2, '0')}</span>
            <span className="text-rose-400 font-semibold uppercase tracking-widest text-sm">Meses</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-1 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-lg shadow-rose-900/5 flex flex-col items-center justify-center"
          >
            <span className="text-4xl md:text-5xl font-mono font-bold text-pink-500 tracking-tight mb-1">{time.days.toString().padStart(2, '0')}</span>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Días</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-1 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-lg shadow-rose-900/5 flex flex-col items-center justify-center"
          >
            <span className="text-4xl md:text-5xl font-mono font-bold text-rose-400 tracking-tight mb-1">{time.hours.toString().padStart(2, '0')}</span>
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Horas</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 md:col-span-2 bg-gradient-to-r from-white/90 to-rose-50/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-lg shadow-rose-900/5 flex flex-row items-center justify-evenly"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-mono font-bold text-slate-700 tracking-tight mb-1">{time.minutes.toString().padStart(2, '0')}</span>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-xs">Minutos</span>
            </div>
            <div className="w-px h-12 bg-rose-200/50" />
            <div className="flex flex-col items-center">
               {/* Utilizamos AnimatePresence para hacer que los segundos parpadeen sutilmente si se quisiera, 
                   pero usar tabular-nums evita tirones */}
              <span className="text-4xl md:text-5xl font-mono font-bold text-rose-600 tracking-tight mb-1 tabular-nums">{time.seconds.toString().padStart(2, '0')}</span>
              <span className="text-rose-300 font-semibold uppercase tracking-wider text-xs">Segundos</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. MÁQUINA DE LA SUERTE (SLOT MACHINE) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-700/50 flex flex-col items-center justify-center min-h-[300px]"
      >
        {/* Fondo de luces simuladas */}
        <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent pointer-events-none" />
        <div className={`absolute top-0 right-1/4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl ${isSpinning ? 'animate-pulse' : ''}`} />
        <div className={`absolute bottom-0 left-1/4 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl ${hasSpun ? 'bg-rose-500/40 scale-150 transition-all duration-1000' : ''}`} />

        <div className="text-center relative z-10 mb-8">
          <h3 className="text-2xl md:text-3xl text-white font-display font-medium tracking-wide mb-2 flex flex-col sm:flex-row items-center gap-2 justify-center">
            ¿Cuánto tiempo seguiremos juntos?
          </h3>
          <p className="text-slate-400 text-sm font-light">Calculando el destino de nuestro amor...</p>
        </div>

        {/* Las Cajas de la Máquina Tragamonedas */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 relative z-10 perspective-1000">
          {slotResult.map((num, i) => (
            <motion.div 
              key={i}
              animate={isSpinning ? { y: [0, -10, 10, 0], opacity: [1, 0.5, 1] } : hasSpun ? { scale: [1, 1.2, 1], rotateX: [0, 360], color: '#f43f5e' } : {}}
              transition={{
                duration: isSpinning ? 0.1 : 1.5,
                repeat: isSpinning ? Infinity : 0,
                delay: isSpinning ? Math.random() * 0.1 : i * 0.1
              }}
              className={`w-10 h-14 md:w-16 md:h-20 bg-slate-800 rounded-xl border-2 flex items-center justify-center shadow-inner overflow-hidden relative ${hasSpun ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 'border-slate-700'}`}
            >
               {hasSpun && <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />}
               <span className={`text-2xl md:text-5xl font-mono font-bold ${hasSpun ? 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]' : 'text-slate-300'}`}>
                 {num}
               </span>
            </motion.div>
          ))}
        </div>

        {/* Botón de Interacción */}
        <div className="relative z-10 mt-2">
          <AnimatePresence mode="wait">
            {!hasSpun ? (
              <motion.button
                key="spinBtn"
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleSpin}
                disabled={isSpinning}
                className={`px-8 py-4 rounded-full font-semibold text-white tracking-widest uppercase text-sm md:text-base cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.3)] border border-rose-400/50 transition-all ${
                  isSpinning 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed scale-95' 
                  : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:scale-105 hover:shadow-[0_0_40px_rgba(244,63,94,0.6)]'
                }`}
              >
                {isSpinning ? 'Calculando...' : '¡Averiguar! ✨'}
              </motion.button>
            ) : (
              <motion.div
                key="resultMsg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-rose-300 font-display text-xl md:text-2xl"
              >
                <InfinityIcon className="w-8 h-8 md:w-10 md:h-10 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                <span>Para Siempre.</span>
                <InfinityIcon className="w-8 h-8 md:w-10 md:h-10 text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* TARJETA 3: Cuenta Regresiva para Aniversario (Ahora Minimalista abajo) */}
      {countdown && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-lg text-slate-700 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/60 rounded-full shadow-sm">
              <CalendarHeart className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Próximo gran hito</h4>
              <p className="text-sm text-slate-500">1er Aniversario Oficial</p>
            </div>
          </div>

          <div className="flex gap-4">
             {[
               { val: countdown.days, lbl: 'Días' },
               { val: countdown.hours, lbl: 'Hrs' },
               { val: countdown.minutes, lbl: 'Min' }
             ].map((timePart, idx) => (
               <div key={idx} className="flex flex-col items-center w-12">
                 <span className="text-xl md:text-2xl font-mono font-bold text-slate-700">
                   {timePart.val.toString().padStart(2, '0')}
                 </span>
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                   {timePart.lbl}
                 </span>
               </div>
             ))}
          </div>
        </motion.div>
      )}

    </div>
  );
}
