import { Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function TerminalForm() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-background border border-tertiary/10 shadow-2xl h-full flex flex-col"
    >
      {/* Terminal Header */}
      <div className="bg-surface-high px-4 py-3 flex items-center justify-between border-b border-tertiary/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[#ff5f56] opacity-50" />
          <div className="w-3 h-3 bg-[#ffbd2e] opacity-50" />
          <div className="w-3 h-3 bg-[#27c93f] opacity-50" />
        </div>
        <div className="text-[0.6rem] font-mono text-tertiary/50 uppercase tracking-widest">SEND_MESSAGE.SH</div>
        <div className="w-10" />
      </div>

      {/* Terminal Body */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="mb-8 font-mono text-xs text-primary/70 leading-relaxed">
          <p>&gt;_ SYSTEM_STATUS: ONLINE</p>
          <p>&gt;_ WAITING FOR INPUT...</p>
        </div>

        <form className="space-y-8 flex-1 flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <div className="relative group">
            <label className="block text-[0.65rem] font-mono text-primary mb-1 uppercase tracking-tighter">SENDER_IDENTITY</label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 text-on-surface font-mono py-2 focus:ring-0 focus:border-primary transition-colors placeholder:text-surface-high"
              placeholder="USER@TERMINAL"
              type="text"
            />
          </div>

          <div className="relative group">
            <label className="block text-[0.65rem] font-mono text-primary mb-1 uppercase tracking-tighter">PROTOCOL_SUBJECT</label>
            <input
              className="w-full bg-transparent border-0 border-b border-outline-variant/30 text-on-surface font-mono py-2 focus:ring-0 focus:border-primary transition-colors placeholder:text-surface-high"
              placeholder="COLLABORATION_REQUEST"
              type="text"
            />
          </div>

          <div className="relative group flex-1">
            <label className="block text-[0.65rem] font-mono text-primary mb-1 uppercase tracking-tighter">PAYLOAD_CONTENT</label>
            <textarea
              className="w-full h-full bg-transparent border-0 border-b border-outline-variant/30 text-on-surface font-mono py-2 focus:ring-0 focus:border-primary transition-colors resize-none placeholder:text-surface-high"
              placeholder="ENTER_MESSAGE_DATA_HERE..."
              rows={6}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-tertiary/5">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="group relative w-full py-4 bg-primary text-on-primary-container font-mono font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
              type="submit"
            >
              <Send className="w-4 h-4" />
              EXECUTE_SEND
              <span className="absolute bottom-1 right-1 text-[0.5rem] opacity-30">ENTER TO SUBMIT</span>
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
