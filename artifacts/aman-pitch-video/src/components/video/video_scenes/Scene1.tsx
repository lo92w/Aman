import { motion } from 'framer-motion';

export function Scene1() {
  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center text-center p-20 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8"
      >
        <span className="px-6 py-2 rounded-full border border-[--brand-salmon] text-[--brand-salmon] text-2xl font-bold bg-[#cd907e20]">
          المشكلة
        </span>
      </motion.div>

      <motion.h1 
        className="text-[6vw] font-display font-black leading-tight mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        احتيال التحويلات البنكية <br/>
        <span className="text-gradient">في تصاعد مستمر</span>
      </motion.h1>

      <motion.div className="flex gap-16 mt-12">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
        >
          <span className="text-[5vw] font-bold text-[--brand-salmon]">مليارات</span>
          <span className="text-3xl text-[--brand-cream] opacity-80">تُفقد سنوياً</span>
        </motion.div>
        
        <motion.div 
          className="w-px h-32 bg-gradient-to-b from-transparent via-[--brand-secondary] to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        />

        <motion.div 
          className="flex flex-col items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8, type: "spring" }}
        >
          <span className="text-[5vw] font-bold text-[--brand-salmon]">المستخدم</span>
          <span className="text-3xl text-[--brand-cream] opacity-80">هو الضحية الأولى</span>
        </motion.div>
      </motion.div>
      
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/alinma-logo.svg`}
        className="absolute top-12 left-12 w-48 opacity-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.5, x: 0 }}
        transition={{ delay: 3, duration: 1 }}
      />
    </motion.div>
  );
}
