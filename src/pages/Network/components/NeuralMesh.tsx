import { motion } from 'motion/react';

export default function NeuralMesh() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mt-20"
    >
      <div className="bg-surface-low p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <img
            alt="Cybersecurity hardware"
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://picsum.photos/seed/hardware/1920/1080?blur=4"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="col-span-2">
            <h2 className="text-3xl font-headline font-bold tracking-tight mb-4">NEURAL_MESH_ACTIVE</h2>
            <p className="text-tertiary max-w-xl text-sm leading-loose opacity-80">
              My network infrastructure is optimized for minimal latency communication. Every connection node is monitored for secure data transmission. Looking for direct technical integration? Access the REST API documentation below.
            </p>
          </div>
          <div className="text-right">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent border border-primary/30 text-primary font-mono text-xs hover:bg-primary/5 transition-all"
            >
              VIEW_API_DOCS
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
