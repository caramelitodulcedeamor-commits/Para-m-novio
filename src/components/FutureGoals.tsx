import { motion } from 'motion/react';
import { Plane, Home, Baby, HeartHandshake, MapPin } from 'lucide-react';

const GOALS = [
  { 
    icon: Plane, 
    title: "Viajes Inolvidables", 
    desc: "Recorrer juntos esos lugares mágicos que hemos guardado soñando en nuestras pláticas.",
    color: "from-blue-50 to-indigo-50",
    textClass: "text-indigo-500",
    iconBg: "bg-indigo-100"
  },
  { 
    icon: Home, 
    title: "Nuestra Casita", 
    desc: "Armar nuestro propio nidito de amor, decorarlo a nuestro estilo y llenarlo de memorias y risas.",
    color: "from-amber-50 to-orange-50",
    textClass: "text-orange-500",
    iconBg: "bg-orange-100"
  },
  { 
    icon: Baby, 
    title: "Crecer la Familia", 
    desc: "Quizás adoptar a un hermoso perrito o gatito que nos alegre las tardes (y algún día mucho más).",
    color: "from-emerald-50 to-teal-50",
    textClass: "text-emerald-500",
    iconBg: "bg-emerald-100"
  },
  { 
    icon: HeartHandshake, 
    title: "Amor Sin Fin", 
    desc: "Apoyarnos en nuestras peores crisis y aplaudir juntos nuestros mejores éxitos de por vida.",
    color: "from-rose-50 to-pink-50",
    textClass: "text-rose-500",
    iconBg: "bg-rose-100"
  }
];

export default function FutureGoals() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
      <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 text-slate-600 mb-6 shadow-inner ring-4 ring-white">
        <MapPin className="w-8 h-8" />
      </div>
      <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-800 mb-4 text-center">
        Un Futuro Contigo
      </h2>
      <p className="text-slate-600 font-light text-center mb-16 max-w-2xl">
        Llevamos 11 maravillosos meses de historia, mi querido Alejandro, pero mi corazón sabe que esto es solo el prólogo. 
        Estas son las próximas metas en la historia de amor de Ale y Eli:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative">
         {GOALS.map((goal, idx) => (
           <motion.div
             key={idx}
             initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.6, type: "spring" }}
             className={`bg-gradient-to-br ${goal.color} rounded-[2.5rem] p-8 border border-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-start`}
           >
             <div className={`w-14 h-14 ${goal.iconBg} ${goal.textClass} rounded-full flex items-center justify-center mb-6 shadow-inner`}>
               <goal.icon className="w-7 h-7" />
             </div>
             <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
               {goal.title}
             </h3>
             <p className="text-slate-600 font-medium leading-relaxed">
               {goal.desc}
             </p>
           </motion.div>
         ))}
      </div>
    </div>
  );
}
