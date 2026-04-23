import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ticket, Coffee, Film, Utensils, Heart, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveCouponsProps {
  coins: number;
  onSpendCoins: (amount: number) => void;
}

const COUPONS = [
  { id: 1, title: 'Vale por:', desc: 'Un masaje relajante muy merecido para Ale (30 min)', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-200', cost: 2 },
  { id: 2, title: 'Vale por:', desc: 'Alejandro elige la película y snacks para hoy', icon: Film, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', cost: 1 },
  { id: 3, title: 'Vale por:', desc: 'Tus antojitos favoritos pagados por Eli', icon: Utensils, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', cost: 2 },
  { id: 4, title: 'Vale por:', desc: 'Una salida sorpresa donde Alejandro decida', icon: Coffee, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', cost: 3 },
  { id: 5, title: 'Vale por:', desc: 'Tener la razón en una discusión pequeñita con Eli', icon: Ticket, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', cost: 1 },
  { id: 6, title: 'Vale por:', desc: '100 besos de Elizabeth repartidos cuando Ale decida', icon: Sparkles, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-200', cost: 1 },
];

export default function LoveCoupons({ coins, onSpendCoins }: LoveCouponsProps) {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const handleRedeem = (e: React.MouseEvent, id: number, cost: number) => {
    if (redeemed.includes(id) || coins < cost) return;

    // Obtener la posición del botón presionado para lanzar el confeti desde ahí
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#a855f7', '#fb923c', '#34d399', '#facc15'],
      disableForReducedMotion: true,
      zIndex: 100
    });

    setRedeemed((prev) => [...prev, id]);
    onSpendCoins(cost);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
      <div className="text-center mb-8 w-full">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-rose-100 text-rose-500 mb-6 shadow-inner ring-4 ring-white">
          <Gift className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-800 mb-4">
          Cuponera del Amor
        </h2>
        <p className="text-slate-600 font-light max-w-xl mx-auto mb-6">
          Aquí tienes una lista de regalos simbólicos que puedes canjear cuando quieras. ¡Eli te los hizo con mucho amor!
        </p>

        <div className="bg-amber-100/50 border border-amber-200 inline-flex items-center gap-3 px-6 py-3 rounded-full text-amber-600 font-medium">
          <Sparkles className="w-5 h-5" />
          Tus Moneditas: <span className="text-2xl font-bold bg-white px-3 py-1 rounded-full shadow-inner text-amber-500">{coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {COUPONS.map((coupon, idx) => {
          const isRedeemed = redeemed.includes(coupon.id);
          const cannotAfford = !isRedeemed && coins < coupon.cost;

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (idx % 3) * 0.1, type: "spring" }}
              className="relative"
            >
              <div 
                className={`relative flex items-center bg-white border-2 border-dashed ${coupon.border} rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group ${isRedeemed ? 'opacity-80 scale-[0.98] grayscale-[0.2]' : cannotAfford ? 'opacity-90 grayscale-[0.5]' : 'hover:shadow-md hover:-translate-y-1'}`}
              >
                {/* Lado izquierdo con perforaciones estilo ticket */}
                <div className={`w-24 shrink-0 flex flex-col items-center justify-center ${coupon.bg} self-stretch border-r-2 border-dashed ${coupon.border} relative py-6`}>
                   
                   {/* Circulitos de perforación */}
                   <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-rose-50/50 sm:bg-rose-50/30 rounded-full" style={{boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)'}} />
                   <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-l-2 border-dashed border-rose-200" />
                   
                   <coupon.icon className={`w-10 h-10 ${coupon.color} mb-2 drop-shadow-sm`} />
                   <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 rotate-180" style={{ writingMode: 'vertical-rl' }}>CUPÓN OFICIAL</span>
                </div>

                {/* Contenido principal */}
                <div className="p-5 flex-1 relative min-h-[140px] flex flex-col justify-center">
                  <span className={`text-xs font-bold uppercase tracking-widest ${coupon.color} mb-1 block`}>
                    {coupon.title}
                  </span>
                  <p className="text-slate-700 font-medium text-lg leading-tight mb-4">
                    {coupon.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto gap-2">
                    <span className="text-sm font-semibold flex items-center gap-1 text-slate-500">
                      Cuesta: <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">{coupon.cost} 🪙</span>
                    </span>
                    <button
                      onClick={(e) => handleRedeem(e, coupon.id, coupon.cost)}
                      disabled={isRedeemed || cannotAfford}
                      className={`text-sm py-2 px-4 rounded-xl font-medium transition-all flex-1 ${
                        isRedeemed 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : cannotAfford
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : `bg-rose-50 hover:bg-rose-100 text-rose-600 active:scale-95`
                      }`}
                    >
                      {isRedeemed ? '¡Reclamado!' : cannotAfford ? 'Faltan Monedas' : 'Reclamar Ya'}
                    </button>
                  </div>
                </div>

                {/* Sello de Reclamado */}
                {isRedeemed && (
                  <motion.div 
                    initial={{ scale: 3, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: -15 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  >
                    <div className="border-4 border-rose-500 text-rose-500 px-6 py-2 rounded-xl text-3xl font-black uppercase tracking-widest bg-white/40 backdrop-blur-[2px] shadow-2xl skew-x-6">
                      CANJEADO
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
