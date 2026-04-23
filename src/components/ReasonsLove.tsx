import { motion } from 'motion/react';
import { HeartPulse, Sparkles } from 'lucide-react';

const REASONS = [
  "La forma en que me miras y me haces sentir especial cada día, mi Alejandro.",
  "Tus abrazos apretados que curan cualquier momento triste de mi corazón.",
  "Tu hermosa sonrisa, que ilumina hasta el día más oscuro de Elizabeth.",
  "Cómo me apoyas y motivas en cada locura que se le ocurre a tu novia.",
  "Que juntos podemos actuar como niños chiquitos y divertirnos horas.",
  "Lo mucho que te esfuerzas siempre por vernos y buscar a tu princesa.",
  "Tu paciencia infinita y comprensión cuando Ale me ve en un día difícil.",
  "Que con solo un besito repentino logras cambiar mi estado de ánimo.",
  "Nuestras pláticas profundas o de risas hasta la madrugada.",
  "Porque a tu lado encontré un hogar, mi lugar más seguro en el universo.",
];

export default function ReasonsLove() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-rose-100 text-rose-500 mb-6 shadow-inner ring-4 ring-white">
          <HeartPulse className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-800 mb-4">
          Razones por las que Te Amo
        </h2>
        <p className="text-slate-600 font-light max-w-2xl mx-auto">
          Podría escribir libros enteros sobre ti. Aquí te dejo algunos de los motivos por los que eres lo más importante en mi vida.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {REASONS.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.3, delay: (idx % 4) * 0.05 }}
            className="bg-white border border-rose-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-center text-center relative"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles className="w-4 h-4 text-rose-300" />
            </div>
            <div className="text-rose-200 font-display text-6xl opacity-40 mb-3 leading-none absolute -left-2 -top-2 select-none group-hover:text-rose-300 group-hover:opacity-50 transition-colors">
              {idx + 1}
            </div>
            <p className="text-slate-700 font-medium relative z-10 leading-snug">{reason}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
