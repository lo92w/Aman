import { motion } from 'framer-motion';

export function Scene3() {
  const paths = [
    { title: "مسار موثوق", color: "from-green-500/20 to-emerald-500/5", border: "border-green-500/30", text: "text-green-400" },
    { title: "مراجعة اجتماعية", color: "from-[--brand-secondary]/20 to-[--brand-secondary]/5", border: "border-[--brand-secondary]/30", text: "text-[--brand-secondary]" },
    { title: "موافقة المستلم", color: "from-[--brand-salmon]/20 to-[--brand-salmon]/5", border: "border-[--brand-salmon]/30", text: "text-[--brand-salmon]" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-20 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        className="mb-6"
      >
        <h2 className="text-4xl font-bold text-[--brand-secondary]">كيف يعمل؟</h2>
      </motion.div>

      <motion.div 
        className="text-[5vw] font-display font-black text-white mb-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1.5, type: "spring", bounce: 0.4 }}
      >
        محرك <span className="text-gradient">الثقة</span>
      </motion.div>

      <motion.div 
        className="text-3xl text-[--brand-cream] opacity-90 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        تحليل فوري • درجة ثقة دقيقة • توجيه ذكي
      </motion.div>

      <div className="flex gap-8 w-full max-w-6xl relative">
        {/* Connecting Lines */}
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[--brand-cream] to-transparent opacity-20 -z-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
        />

        {paths.map((path, i) => (
          <motion.div
            key={i}
            className={`flex-1 relative overflow-hidden rounded-2xl border ${path.border} bg-gradient-to-b ${path.color} p-10 backdrop-blur-md flex items-center justify-center`}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5 + (i * 0.4), duration: 1, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className={`text-4xl font-bold ${path.text} z-10 text-center`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3 + (i * 0.4), duration: 0.5 }}
            >
              {path.title}
            </motion.div>
            
            {/* Animated gleam */}
            <motion.div 
              className="absolute inset-0 bg-white opacity-10 skew-x-12"
              initial={{ x: "150%" }}
              animate={{ x: "-150%" }}
              transition={{ delay: 4 + i, duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
