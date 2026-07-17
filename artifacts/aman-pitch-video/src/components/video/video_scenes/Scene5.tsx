import { motion } from 'framer-motion';

export function Scene5() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-20 z-10 bg-[--brand-primary]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5, type: "spring", stiffness: 80 }}
      >
        <span className="text-[10vw] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(131,127,216,0.3)] mb-4">
          أمان
        </span>
        <span className="text-4xl text-[--brand-salmon] font-bold tracking-wider">
          AMAN
        </span>
      </motion.div>

      <motion.div 
        className="h-px w-64 bg-gradient-to-r from-transparent via-[--brand-secondary] to-transparent my-16"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />

      <motion.div
        className="flex flex-col items-center gap-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="text-3xl text-[--brand-cream] opacity-80 mb-4">
          هاكاثون امد ٢٦
        </div>
        <img 
          src={`${import.meta.env.BASE_URL}images/alinma-logo.svg`}
          className="w-64 opacity-90"
        />
      </motion.div>
      
      {/* Cinematic Flash / Wipe finish */}
      <motion.div 
        className="absolute inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 6.5, duration: 1.5, times: [0, 0.2, 1] }}
      />
    </motion.div>
  );
}
