import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import FloatingHearts from './FloatingHearts';
import Counter from './Counter';
import SecretLetters from './SecretLetters';
import OurPromises from './OurPromises';
import ExplodingHeart from './ExplodingHeart';
import ReasonsLove from './ReasonsLove';
import LoveCoupons from './LoveCoupons';
import LoveModeCelebration from './LoveModeCelebration';
import { 
  Home, Clock, Star, Heart, Mail, 
  Smile, ChevronLeft, ChevronRight,
  Gift, ArrowUpToLine, Lock, Unlock,
  ArrowRight
} from 'lucide-react';

// Secciones del menú deslizable
const SECTIONS = [
  { id: 's-home', icon: Home, label: 'Inicio' },
  { id: 's-time', icon: Clock, label: 'Tiempo' },
  { id: 's-promises', icon: Star, label: 'Promesas' },
  { id: 's-heart', icon: Heart, label: 'Sorpresa' },
  { id: 's-letters', icon: Mail, label: 'Cartas' },
  { id: 's-reasons', icon: Smile, label: 'Razones' },
];

export default function MainPage() {
  const [activeTab, setActiveTab] = useState('s-home');
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState(0);
  const [loveMode, setLoveMode] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sadMode, setSadMode] = useState(false);
  const [grayMode, setGrayMode] = useState(false);
  const [showGrayModal, setShowGrayModal] = useState(false);
  const [finalMode, setFinalMode] = useState(false);
  const [showCoupons, setShowCoupons] = useState(false);
  const [showPrankModal, setShowPrankModal] = useState(false);
  
  // Mantener el elemento del menú siempre visible al cambiar de pestaña
  useEffect(() => {
    if (navContainerRef.current) {
      const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>(`button[data-id="${activeTab}"]`);
      if (activeBtn) {
        requestAnimationFrame(() => {
           activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
      }
    }
  }, [activeTab]);

  const playFlechazo = () => {
    if (!loveMode) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle'; 
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15); 

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Ignorar bloqueos de audio
    }
  };

  const goToSection = (id: string) => {
    if (loveMode) playFlechazo();
    setActiveTab(id);
    // Scroll to top of current section if needed
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === activeTab);
    if (currentIndex < SECTIONS.length - 1) {
      goToSection(SECTIONS[currentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = SECTIONS.findIndex(s => s.id === activeTab);
    if (currentIndex > 0) {
      goToSection(SECTIONS[currentIndex - 1].id);
    }
  };

  return (
    <main className={`fixed inset-0 flex flex-col selection:bg-rose-200 selection:text-rose-900 overflow-hidden ${
      finalMode ? 'bg-white' :
      grayMode ? 'bg-slate-300 grayscale' :
      sadMode ? 'bg-sad' : 
      loveMode ? 'bg-love' : 'bg-white'
    }`}>
      {/* Fondo de seguridad para evitar parpadeos */}
      <div className="fixed inset-0 bg-white -z-50" />
      <FloatingHearts variant={finalMode ? 'extreme' : sadMode ? 'sad' : loveMode && !grayMode ? 'extreme' : 'normal'} />
      
      {/* Navegación Desktop Lateral */}
      <button 
        onClick={handlePrev} 
        disabled={SECTIONS.findIndex(s => s.id === activeTab) === 0}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/60 hover:bg-white p-3 rounded-full backdrop-blur-md shadow-xl transition-all border border-rose-100 disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-8 h-8 text-rose-500" />
      </button>
      <button 
        onClick={handleNext} 
        disabled={SECTIONS.findIndex(s => s.id === activeTab) === SECTIONS.length - 1}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/60 hover:bg-white p-3 rounded-full backdrop-blur-md shadow-xl transition-all border border-rose-100 disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronRight className="w-8 h-8 text-rose-500" />
      </button>

      {/* CONTENEDOR DE PESTAÑAS INDEPENDIENTES */}
      <div className="flex-1 w-full h-full relative z-10 overflow-hidden">
        <AnimatePresence>
          {activeTab === 's-home' && (
            <motion.section
              key="s-home"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32 flex flex-col items-center justify-center"
            >
              <div className="text-center relative px-4">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-rose-500 font-medium tracking-widest uppercase text-sm mb-4 block"
                >
                  Nuestra Historia de Amor
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-slate-800 leading-tight"
                >
                  Felices 11 Meses, <br className="hidden sm:block" />
                  <span className="text-rose-500 inline-flex items-center gap-2 sm:gap-4 mt-2">
                     Alejandro
                     <Heart className="w-10 h-10 sm:w-14 sm:h-14 fill-rose-500 animate-pulse" />
                  </span>
                </motion.h1>
                
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  onClick={() => goToSection('s-time')}
                  className="mt-12 bg-white px-8 py-4 rounded-full shadow-lg border border-rose-100 text-rose-500 font-medium hover:bg-rose-50 transition-all flex items-center gap-2 group mx-auto"
                >
                  Empezar el viaje
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.section>
          )}

          {activeTab === 's-time' && (
            <motion.section
              key="s-time"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32 px-2 sm:px-6"
            >
              <Counter />
            </motion.section>
          )}

          {activeTab === 's-promises' && (
            <motion.section
              key="s-promises"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32 px-4"
            >
              <OurPromises />
            </motion.section>
          )}

          {activeTab === 's-heart' && (
            <motion.section
              key="s-heart"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32 flex flex-col justify-center px-4"
            >
              <ExplodingHeart grayMode={grayMode} onFinalExplode={() => setFinalMode(true)} />
            </motion.section>
          )}

          {activeTab === 's-letters' && (
            <motion.section
              key="s-letters"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32"
            >
              <SecretLetters 
                onEarnCoin={() => setCoins(prev => prev + 1)} 
                onCompleteAll={() => {
                  setSadMode(false);
                  setLoveMode(true);
                  setShowCelebration(true);
                }}
                onFail={() => {
                  setLoveMode(false);
                  setSadMode(true);
                }} 
              />
            </motion.section>
          )}

          {activeTab === 's-reasons' && (
            <motion.section
              key="s-reasons"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 w-full h-full overflow-y-auto hide-scrollbar pb-40 pt-32"
            >
              <div className="flex flex-col items-center">
                <ReasonsLove />
              </div>
              
              <div className="mt-16 flex flex-col items-center">
                 <motion.button
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (loveMode) {
                        setShowPrankModal(true);
                      } else {
                        goToSection('s-home');
                      }
                    }}
                    className={`group flex flex-col items-center gap-4 transition-all p-8 rounded-[3rem] ${loveMode ? 'bg-rose-600 text-white shadow-2xl shadow-rose-500/50' : 'text-rose-500'}`}
                  >
                    <div className={`w-20 h-20 rounded-full shadow-lg border flex items-center justify-center transition-all ${loveMode ? 'bg-white text-rose-600 border-white animate-bounce' : 'bg-white border-rose-100 group-hover:-translate-y-2 group-hover:shadow-xl'}`}>
                      {loveMode ? <Lock className="w-8 h-8" /> : <ArrowUpToLine className="w-8 h-8" />}
                    </div>
                    <span className={`font-bold tracking-[0.3em] uppercase text-center ${loveMode ? 'text-white text-xl animate-pulse' : 'text-xs text-rose-500'}`}>
                      {loveMode ? '¡NO TOQUES!' : 'Volver al Inicio'}
                    </span>
                 </motion.button>

                <footer className="w-full text-center text-slate-400 font-light text-sm mt-12 mb-8 px-4">
                  <p>Hecho con todo mi infinito amor para ti, mi Alejandro • De tu amada Elizabeth</p>
                </footer>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* BOTÓN INDEPENDIENTE DE CUPONES */}
      <button 
        onClick={() => setShowCoupons(true)}
        className="fixed bottom-24 right-4 z-[45] md:right-8 md:bottom-32 bg-white p-4 rounded-full shadow-2xl border border-rose-100 group transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group pointer-events-auto"
      >
        <div className="bg-rose-500 p-2 rounded-full text-white group-hover:animate-bounce transition-all">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <span className="text-rose-500 font-bold text-xs tracking-tighter sm:text-sm uppercase pr-2">Canje</span>
      </button>

      {/* NAVEGACIÓN INFERIOR (TIPO APP) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-4xl pointer-events-none">
        <div 
          ref={navContainerRef}
          className="bg-white/95 backdrop-blur-2xl border border-rose-100 shadow-[0_10px_40px_rgb(0,0,0,0.1)] p-2 rounded-full flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto overflow-y-hidden hide-scrollbar pointer-events-auto scroll-smooth px-4 flex-nowrap"
        >
          {SECTIONS.map((sec) => {
            const isActive = activeTab === sec.id;
            return (
              <button
                key={sec.id}
                data-id={sec.id}
                onClick={() => goToSection(sec.id)}
                className={`relative flex flex-col items-center justify-center p-2 sm:px-5 sm:py-2 min-w-[4.2rem] sm:min-w-[5.5rem] transition-all duration-300 font-medium shrink-0 z-10 ${
                  isActive 
                  ? 'text-white scale-105 focus:outline-none' 
                  : 'text-slate-400 hover:bg-rose-50/50 hover:text-rose-500 rounded-xl'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dockHeartIndicator"
                    className="absolute inset-0 flex items-center justify-center -z-10"
                    transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                  >
                    <svg 
                      className={`absolute w-[125%] h-[125%] drop-shadow-md transition-colors duration-1000 ${loveMode ? 'text-red-600' : 'text-rose-500'}`} 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </motion.div>
                )}
                
                <sec.icon className={`relative z-10 w-5 h-5 sm:w-6 sm:h-6 mb-0.5 transition-colors ${isActive ? 'fill-white/30 text-white' : ''}`} />
                <span className="relative z-10 text-[8px] sm:text-[10px] tracking-wide uppercase mt-0.5 whitespace-nowrap">
                  {sec.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      {/* MODAL DE CUPONES INDEPENDIENTE */}
      <AnimatePresence>
        {showCoupons && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCoupons(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-rose-50 w-full max-w-4xl max-h-[90dvh] rounded-[2.5rem] relative z-10 shadow-2xl p-4 md:p-8 overflow-y-auto hide-scrollbar border-4 border-white"
            >
              <button 
                onClick={() => setShowCoupons(false)}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg text-rose-500 hover:bg-rose-50 transition-all z-20"
              >
                <ArrowUpToLine className="w-5 h-5 rotate-180" />
              </button>
              
              <div className="pt-8">
                <LoveCoupons coins={coins} onSpendCoins={(cost) => setCoins(prev => prev - cost)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL MODO TRISTE */}
      <AnimatePresence>
        {sadMode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="bg-slate-800 w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 text-center shadow-[0_0_60px_rgba(30,41,59,0.8)] border border-slate-600"
            >
              <div className="text-6xl mb-6 inline-block animate-bounce">😢</div>
              <h2 className="text-2xl font-display font-medium text-blue-100 mb-4">
                Me rompiste el corazón...
              </h2>
              <p className="text-slate-300 font-light mb-8 leading-relaxed">
                ¿Acaso elegiste otra respuesta en nuestra última carta? ¿No quieres que estemos juntos y felices para siempre? 
              </p>
              <button
                onClick={() => setSadMode(false)}
                className="bg-blue-600 hover:bg-blue-500 text-white w-full rounded-2xl py-4 font-medium transition-colors shadow-lg shadow-blue-500/30"
              >
                Perdón, me equivoqué... 🥺
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINAL MODE FULLSCREEN */}
      <AnimatePresence>
        {finalMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-rose-50 flex flex-col items-center justify-center p-4 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 0, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
              className="relative z-10 text-center flex flex-col items-center"
            >
              <Heart className="w-24 h-24 text-rose-500 fill-rose-500 mx-auto mb-8 animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-display font-medium text-slate-800 mb-4 tracking-tight px-4">
                ¡Gracias por todo tu amor, Alejandro!
              </h1>
              <p className="text-rose-500 tracking-widest uppercase font-semibold text-sm">
                Eres lo mejor que me ha pasado ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRAY MODAL */}
      <AnimatePresence>
        {showGrayModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 relative z-10 text-center shadow-2xl border border-slate-200"
            >
              <div className="text-6xl mb-6 inline-block">🥺</div>
              <h2 className="text-2xl font-display font-medium text-slate-800 mb-4">
                ¿Acaso no quieres continuar?
              </h2>
              <p className="text-slate-500 font-light mb-8 leading-relaxed">
                Nuestra historia se ha vuelto gris... por favor, encuentra la manera de que nuestro corazón vuelva a latir y recuperar el color.
              </p>
              <button
                onClick={() => {
                  setShowGrayModal(false);
                  goToSection('s-heart'); // Guiamos mágicamente hasta la sección especial
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white w-full rounded-2xl py-4 font-medium transition-colors shadow-lg shadow-slate-200"
              >
                Buscaré la manera
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL BROMA (PRANK) */}
      <AnimatePresence>
        {showPrankModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-rose-950/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -10 }}
              className="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-10 text-center shadow-[0_0_100px_rgba(30,41,59,0.5)] border-4 border-slate-400"
            >
              <div className="text-8xl mb-8 animate-bounce">😢</div>
              <h2 className="text-4xl font-display font-bold text-slate-800 mb-6 leading-tight">
                Me pusiste triste...
              </h2>
              <p className="text-slate-600 font-medium mb-10 text-lg">
                ¿Por qué tocaste si te pedí que no lo hicieras? <br/> Me duele que no me hagas caso, Alejandro... 💔
              </p>
              <button
                onClick={() => {
                  setShowPrankModal(false);
                  goToSection('s-heart');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white w-full rounded-2xl py-5 text-xl font-bold transition-all shadow-xl shadow-slate-300 active:scale-95"
              >
                Perdón mi amor, te llenaré de besos... 🥺
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LoveModeCelebration 
        isOpen={showCelebration} 
        onClose={() => setShowCelebration(false)} 
      />

    </main>
  );
}
