import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-end p-8 md:p-16 border-b border-outline-variant/10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-full md:w-2/3 h-full overflow-hidden opacity-40 md:opacity-100 z-0"
      >
        <img 
          alt="RamXCat Portrait" 
          className="w-full h-full object-cover grayscale contrast-125" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzAoho9kHgIVV8FTFe25T2wCTwkgespSvkw3uotBCsyiRZjc46z6NEmSaujdT4VfVEOCYfzCspaCROavuibZ2cI50wUl2XyBwCE-ygDw3glx8QP8iJ22LViulw5xW81a54nrlrglDdhsAhd4r4-qYDI_L5HcjIgxQZp2eM7tXyl1gV-OIFjqfvkfasn3fKTkGSDe7AaQytk6sGByo1CBiXUQsfu-LnBoFZODVZvF__oAIHPoyCM-Gjxcp2LiK1NqE-YmYYO58Wm2-l"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/80 to-background"></div>
      </motion.div>

      <div className="relative z-10 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-primary mb-4 tracking-[0.3em] uppercase text-xs flex items-center gap-2"
        >
          <span className="w-8 h-px bg-primary"></span> [Subject_Identity: 001]
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-8"
        >
          RAMXCAT
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-surface-container-low p-8 ghost-border"
          >
            <p className="font-mono text-xs text-tertiary mb-2 uppercase tracking-widest">Designation</p>
            <p className="text-xl font-headline font-medium text-on-surface">Java Full Stack Developer // Enterprise Architect</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="bg-surface-container-low p-8 ghost-border"
          >
            <p className="font-mono text-xs text-tertiary mb-2 uppercase tracking-widest">Base_Location</p>
            <p className="text-xl font-headline font-medium text-on-surface">Bangalore, IN // 12.9716° N</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
