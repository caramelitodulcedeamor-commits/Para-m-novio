import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, X, CheckCircle2, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

// Sub-componente para el efecto de escritura
function TypewriterText({ text }: { text: string }) {
  const words = text.split(' ');
  
  return (
    <motion.div className="flex flex-wrap justify-center gap-x-1.5">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.1,
            ease: "easeOut"
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

const LETTERS = [
  {
    id: 1,
    title: "Mes 1",
    question: "Alejandro, ¿cuánto amas a tu hermosa novia Elizabeth?",
    options: ["Mucho", "Bastante", "Demasiado"],
    answerMsg: "¡Yo también te amo muchísimo Ale, más de lo que imaginas! ❤️",
    confetti: ['#f43f5e', '#fb7185', '#ffffff']
  },
  {
    id: 2,
    title: "Mes 2",
    question: "¿Qué es lo que Alejandro más ama de Elizabeth?",
    options: ["Tu tierna forma de ser", "Tu hermosa sonrisa", "Todo de ti, mi reina"],
    answerMsg: "¡A mí me encanta absolutamente todo de ti, mi Alejandro! 🥰",
    confetti: ['#fbbf24', '#f59e0b', '#ffffff']
  },
  {
    id: 3,
    title: "Mes 3",
    question: "¿Cuál es el sueño más grande que Alejandro quiere cumplir con Elizabeth?",
    options: ["Viajar por todo el mundo", "Formar un hogar lleno de amor", "Envejecer juntitos y felices"],
    answerMsg: "¡Cualquier futuro a tu lado es mi mayor sueño hecho realidad, mi cielo! 🏠",
    confetti: ['#0ea5e9', '#38bdf8', '#ffffff']
  },
  {
    id: 4,
    title: "Mes 4",
    question: "¿Quién de los dos es el más consentido y berrinchudo?",
    options: ["Elizabeth (tu novia)", "Alejandro (mi niño guapo)", "Somos un empate"],
    answerMsg: "¡Jaja! Ya sabemos la verdad, pero así nos amamos tal y como somos. 😂",
    confetti: ['#8b5cf6', '#a78bfa', '#ffffff']
  },
  {
    id: 5,
    title: "Mes 5",
    question: "¿Qué es lo que más te enamoró de nosotros?",
    options: ["Nuestra química loca", "La confianza única", "Absolutamente todo"],
    answerMsg: "Tenemos una conexión mágica que nadie más entendería. Te adoro Ale. ✨",
    confetti: ['#ec4899', '#f472b6', '#ffffff']
  },
  {
    id: 6,
    title: "Mes 6",
    question: "¿Qué es lo que más te gusta de nuestra relación?",
    options: ["Como encajamos de perfecto", "Nuestra confianza y risas", "Que somos el mejor equipo del mundo"],
    answerMsg: "¡Ve empacando tus maletas mi amor, porque el mundo es nuestro! ✈️",
    confetti: ['#10b981', '#34d399', '#ffffff']
  },
  {
    id: 7,
    title: "Mes 7",
    question: "Si yo (Elizabeth) fuera un postrecito, ¿cuál dulce sería?",
    options: ["Un pastelito súper dulce", "Un helado suave", "Tu postre favorito en el mundo"],
    answerMsg: "¡Preparado para comerme a besos siempre, amor! 🍰",
    confetti: ['#f97316', '#fb923c', '#ffffff']
  },
  {
    id: 8,
    title: "Mes 8",
    question: "¿Quién sintió primero el flechazo del amor?",
    options: ["Tú, Alejandro, caíste primero", "Yo, Elizabeth, me enamoré enseguida", "Fue algo mutuo e inevitable"],
    answerMsg: "Sea como sea, elegirte fue la mejor decisión de toda mi vida. 💘",
    confetti: ['#e11d48', '#f43f5e', '#ffffff']
  },
  {
    id: 9,
    title: "Mes 9",
    question: "¿Qué frase o palabra describe nuestra historia?",
    options: ["Locos de amor", "Un cuento de hadas", "Almas gemelas destinadas"],
    answerMsg: "Nadie en la tierra se ama de la forma tan bonita en la que lo hacemos nosotros, Ale. 🌟",
    confetti: ['#facc15', '#fde047', '#ffffff']
  },
  {
    id: 10,
    title: "Aniversario 11 Meses",
    question: "¿Qué esperas para nosotros en este día tan especial?",
    options: ["Muchísimos besos", "Muchos mimos y abrazos", "TODO y para siempre"],
    correctOptionIndex: 2, 
    answerMsg: "¡Prepárate para ser consentido, felices 11 meses mi príncipe Alejandro! De tu amada Eli 🎁",
    confetti: ['#f43f5e', '#e11d48', '#ffffff', '#fb923c', '#fbbf24']
  }
];

interface SecretLettersProps {
  onEarnCoin?: () => void;
  onCompleteAll?: () => void;
  onFail?: () => void;
}

export default function SecretLetters({ onEarnCoin, onCompleteAll, onFail }: SecretLettersProps) {
  const [selectedLetter, setSelectedLetter] = useState<typeof LETTERS[0] | null>(null);
  const [answeredState, setAnsweredState] = useState<Record<number, string>>({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleSelectOption = (letterId: number, optionIndex: number, optionStr: string) => {
    const letterObj = LETTERS.find(l => l.id === letterId);
    if (!letterObj) return;

    if (letterObj.correctOptionIndex !== undefined) {
      if (optionIndex !== letterObj.correctOptionIndex) {
        setSelectedLetter(null);
        if (onFail) onFail();
        return;
      }
      
      // Easter Egg para el mes 11 si es correcto
      if (letterId === 10) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 5000);
        
        // Super confetti explosion
        const end = Date.now() + 3000;
        const frame = () => {
          confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: letterObj.confetti });
          confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: letterObj.confetti });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      }
    }

    const isNew = !answeredState[letterId];
    const newCount = Object.keys(answeredState).length + (isNew ? 1 : 0);

    if (isNew && newCount % 3 === 0) {
      if (onEarnCoin) onEarnCoin();
    }
    
    if (isNew && newCount === LETTERS.length) {
      if (onCompleteAll) {
        setTimeout(onCompleteAll, 800); 
      }
    }

    setAnsweredState(prev => ({
      ...prev,
      [letterId]: optionStr
    }));

    // Confetti temático
    confetti({
      particleCount: isNew && newCount % 3 === 0 ? 150 : 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: letterObj.confetti || ['#f43f5e', '#ec4899', '#fda4af'],
      disableForReducedMotion: true,
      zIndex: 9999
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-44 pt-8 relative z-10 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-100 text-rose-500 mb-4 shadow-inner">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl text-slate-800 font-display font-medium mb-4">
          Cartas Interactivas
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto font-light leading-relaxed">
          10 mesecitos llenos de amor y nuestro 11 mes aquí. Abre cada sobre y responde con sinceridad a cada preguntita que Elizabeth tiene para ti.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {LETTERS.map((letter, index) => {
          const isAnswered = !!answeredState[letter.id];
          return (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedLetter(letter)}
              className={`group relative bg-white/70 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-xl hover:shadow-rose-900/10 transition-all text-center focus:outline-none overflow-hidden border-2 ${isAnswered ? 'border-rose-400' : 'border-transparent hover:border-rose-100'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform shadow-inner ${isAnswered ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-500 group-hover:scale-110'}`}>
                  {isAnswered ? <CheckCircle2 className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
                </div>
                <span className="font-display font-medium text-slate-700 block mb-1 text-sm md:text-base">
                  Sobre #{letter.id}
                </span>
                <span className={`text-xs font-semibold tracking-widest uppercase ${isAnswered ? 'text-rose-500' : 'text-slate-400'}`}>
                  {isAnswered ? 'RESPONDIDO' : 'ABRIR'}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-rose-500/20 backdrop-blur-sm p-10 rounded-full border-4 border-rose-500 animate-pulse">
              <h2 className="text-6xl md:text-9xl font-display font-black text-white drop-shadow-[0_0_20px_rgba(244,63,94,0.8)] text-center">
                ¡TE AMO <br/> PARA <br/> SIEMPRE!
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLetter(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 border border-rose-100 hide-scrollbar"
              style={{ transformPerspective: 1000 }}
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-200 rounded-full p-2 transition-colors z-20"
                aria-label="Cerrar carta"
              >
                <X className="w-5 h-5" />
              </button>

              {!answeredState[selectedLetter.id] ? (
                // Vista de Pregunta
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full"
                >
                  <div className="flex justify-center mb-6 mt-4">
                    <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center relative">
                      <Sparkles className="w-6 h-6 text-rose-400 absolute top-0 -right-2 animate-pulse" />
                      <Heart className="w-8 h-8 text-rose-500 fill-rose-500/30" />
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <h3 className="text-rose-500 font-semibold text-xs tracking-[0.2em] uppercase mb-3">
                      {selectedLetter.title}
                    </h3>
                    <h4 className="text-2xl md:text-3xl font-display font-medium text-slate-800 leading-snug">
                      {selectedLetter.question}
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {selectedLetter.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(selectedLetter.id, idx, option)}
                        className="w-full text-left px-5 py-4 rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 text-slate-700 font-medium transition-all group flex items-center justify-between"
                      >
                        <span className="text-lg">{option}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-rose-200 group-hover:border-rose-400 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                // Vista de Respuesta (Éxito)
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col h-full items-center justify-center py-10"
                >
                  <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-inner shadow-rose-200 text-rose-500 overflow-hidden relative">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <PartyPopper className="w-12 h-12" />
                    </motion.div>
                  </div>
                  <h4 className="text-rose-500 font-semibold text-sm tracking-widest uppercase mb-4">
                    Tu respuesta para mí, mi amor
                  </h4>
                  <div className="text-xl md:text-2xl text-slate-800 text-center font-display leading-relaxed font-medium italic px-6 bg-rose-50 rounded-3xl py-8 border-2 border-rose-100 w-full relative shadow-inner">
                    <span className="absolute -top-3 -left-2 text-5xl text-rose-200 font-display">"</span>
                    <TypewriterText text={selectedLetter.answerMsg} />
                    <span className="absolute -bottom-7 -right-2 text-5xl text-rose-200 font-display transform rotate-180">"</span>
                  </div>
                  
                  <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="text-sm text-slate-500 font-medium bg-slate-50 px-4 py-2 rounded-full">
                      Escogiste: "{answeredState[selectedLetter.id]}"
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="mt-8 px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-medium shadow-lg shadow-rose-200 active:scale-95 transition-all"
                  >
                    Cerrar Carta
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
