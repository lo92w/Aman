import { motion } from 'framer-motion';

export function Scene4() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-20 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="w-full max-w-5xl bg-[--brand-primary-light]/80 backdrop-blur-xl border border-[--brand-secondary]/30 rounded-3xl p-16 shadow-2xl relative overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-[--brand-salmon] rounded-full blur-[100px] opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[--brand-secondary] rounded-full blur-[100px] opacity-20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />

        <div className="grid grid-cols-3 gap-12 relative z-10 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="text-[6vw] font-black text-[--brand-cream] mb-4">١٠٠٪</div>
            <div className="text-2xl text-[--brand-salmon] font-bold">حماية حقيقية</div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="border-x border-[--brand-secondary]/30"
          >
            <div className="text-[6vw] font-black text-[--brand-cream] mb-4">٠</div>
            <div className="text-2xl text-[--brand-secondary] font-bold">احتكاك بالتجربة</div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <div className="text-[6vw] font-black text-[--brand-cream] mb-4">∞</div>
            <div className="text-2xl text-green-400 font-bold">ثقة مستردة</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
