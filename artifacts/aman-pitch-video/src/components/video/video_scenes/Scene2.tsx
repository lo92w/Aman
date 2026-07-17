import { motion } from 'framer-motion';

export function Scene2() {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-end p-32 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 1 }}
    >
      <div className="w-[50vw] text-right">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 inline-block"
        >
          <span className="px-8 py-3 rounded-full bg-[--brand-secondary] text-white text-3xl font-bold shadow-[0_0_30px_rgba(131,127,216,0.5)]">
            أمان
          </span>
        </motion.div>

        <motion.h2 
          className="text-[5vw] font-display font-black leading-tight mb-10"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        >
          طبقة ثقة <br/>
          <span className="text-gradient">غير مرئية</span>
        </motion.h2>

        <motion.p 
          className="text-[2.5vw] text-[--brand-cream] opacity-90 leading-relaxed max-w-2xl ml-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          بين المستخدم والتحويل، تعمل في الخلفية لحمايتك قبل وقوع الكارثة.
        </motion.p>
        
        <motion.div
          className="mt-16 w-full h-2 bg-[--brand-primary-light] rounded-full overflow-hidden relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-[--brand-salmon] to-[--brand-secondary]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 2.5, duration: 3, ease: "circInOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-white opacity-50 blur-sm"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ delay: 3, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
