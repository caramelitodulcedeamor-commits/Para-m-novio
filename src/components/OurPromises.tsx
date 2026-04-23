import { motion } from 'motion/react';
import { Star, Heart } from 'lucide-react';

const PROMISES = [
  "Prometo elegirte a ti, amor mío, todos los días de lo que nos queda de vida.",
  "Prometo ser siempre tu refugio seguro cuando tengas esos días difíciles.",
  "Prometo celebrar cada uno de tus triunfos como si fueran los míos propios.",
  "Prometo escucharte siempre con toda mi atención y con un amor infinito.",
  "Prometo no dejar de sorprenderte nunca con esos detallitos que te encantan.",
  "Prometo cuidarte y llenarte de mimos siempre que te sientas mal o estés cansado.",
  "Prometo mirarte siempre con la misma admiración con la que te vi la primera vez.",
  "Prometo apoyarte sin condiciones en absolutamente todos y cada uno de tus sueños.",
  "Prometo esforzarme por hacerte reír tanto que hasta te duela el estómago.",
  "Te prometo que siempre buscaré una solución contigo para que nunca nos durmamos enojados.",
  "Prometo amarte con más fuerza cada día que pase, hasta el final de nuestra historia."
];

export default function OurPromises() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col items-center">
        <div className="p-6 md:p-8 shrink-0 border-b border-rose-200/50 flex flex-col items-center relative w-full">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4 shadow-inner shadow-rose-200">
            <Star className="w-8 h-8 fill-rose-200" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-slate-800 text-center leading-tight">
            Nuestras 11 Promesas
          </h2>
          <p className="text-rose-500 font-medium text-xs sm:text-sm mt-3 uppercase tracking-widest text-center bg-rose-100/50 px-4 py-1.5 rounded-full inline-block">
            Una promesa por cada mes juntos
          </p>
        </div>
        
        <div className="p-6 md:p-8 w-full space-y-4">
          {PROMISES.map((promise, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 5) * 0.1 }}
              className="bg-white/80 rounded-2xl p-4 sm:p-5 shadow-sm border border-rose-100 flex gap-4 items-start group hover:border-rose-300 transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-bold shrink-0 shadow-inner group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all">
                {index + 1}
              </div>
              <p className="text-slate-700 md:text-lg pt-1 leading-relaxed font-light">
                {promise}
              </p>
            </motion.div>
          ))}
          <div className="flex justify-center pt-8 pb-4">
            <Heart className="w-8 h-8 text-rose-300 fill-rose-200 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
