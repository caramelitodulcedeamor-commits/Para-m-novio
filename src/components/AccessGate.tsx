import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, LockKeyhole, ArrowRight } from 'lucide-react';

interface AccessGateProps {
  onUnlock: () => void;
}

export default function AccessGate({ onUnlock }: AccessGateProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validating against the 24th of the month.
    // Making it very flexible so any answer containing '24' passes.
    if (answer.trim().includes('24')) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 p-4 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-rose-900/5 relative z-10 border border-white/50"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center rotate-3 shadow-inner">
            <LockKeyhole className="w-8 h-8 text-rose-500" />
          </div>
        </div>

        <h1 className="text-3xl text-center font-display font-medium text-slate-800 mb-2">
          Hola, mi amor Alejandro
        </h1>
        <p className="text-center text-slate-600 mb-8 font-light">
          Para entrar a nuestra sorpresa de aniversario hecha por Elizabeth, responde esta sencilla pregunta:
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 text-center">
              ¿Qué día es nuestro aniversario 11?
            </label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Día de nuestro aniversario..."
              className="w-full px-4 py-3 rounded-xl border border-rose-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all text-center text-lg placeholder:text-slate-400 font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 transition-all text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
          >
            Entrar a nuestro espacio
            <ArrowRight className="w-5 h-5" />
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-rose-500 text-sm font-medium"
            >
              Casi, intenta de nuevo mi vida ❤️
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
