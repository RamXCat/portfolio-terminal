import React from 'react';

export default function TerminalDashboard() {
  return (
    <div className="w-full max-w-4xl mx-auto p-2 md:p-4 space-y-4 font-mono">
      {/* ASCII Header */}
      <div className="text-primary text-[8px] md:text-xs leading-none whitespace-pre overflow-hidden opacity-90 max-w-full">
{`
 ██████╗  █████╗ ███╗   ███╗██╗  ██╗ ██████╗ █████╗ ████████╗
 ██╔══██╗██╔══██╗████╗ ████║╚██╗██╔╝██╔════╝██╔══██╗╚══██╔══╝
 ██████╔╝███████║██╔████╔██║ ╚███╔╝ ██║     ███████║   ██║   
 ██╔══██╗██╔══██║██║╚██╔╝██║ ██╔██╗ ██║     ██╔══██║   ██║   
 ██║  ██║██║  ██║██║ ╚═╝ ██║██╔╝ ██╗╚██████╗██║  ██║   ██║   
 ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   
`}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 border border-dashed border-primary/20 p-4 md:p-6 rounded-sm bg-primary/2 overflow-hidden">
        {/* Left Column: Welcome & Portrait */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-white text-base font-bold tracking-tight">Welcome, visitor.</h2>
            <div className="text-primary/60 text-[2px] md:text-[3.5px] leading-none whitespace-pre opacity-80 overflow-hidden max-w-full">
{`
@@@@@@@@@@@@@       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(      @@@@@@@@@@@@@
@@@@@@@@@@            ,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&    .       @@@@@@@@@@
@@@@@@@@@@   @@@         .@@@@@@@@@@@@@@@@@@@@@@@@@@@@     .   @@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@          @@@@@@@@@@@@@@@@@@@@@@         &@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@  .       %%@@@@@@@@@@@@@@@@@##%         &@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@@@@         %@@@@@@@@@@@@@@@@         (@@@@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@@@@@@@                             .@@@@@@@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@@@@       ..                 ...      #@@@@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@@@@      ...,..    .      .     , ..,,.     &@@@@@   @@@@@@@@@@
@@@@@@@@@@   @@@      *** ,*.,    ...     .,*   ..,,...,,.     @@@   @@@@@@@@@@
@@@@@@@@@@   ...     ., ,..    %&@.,.      . @&@   ,....,..    ...   @@@@@@@@@@
@@@@@@@@@@         .**.  ..    %@@, .     .,.@@@   .,.. , .,         @@@@@@@@@@
@@@@@@@@@@       . . ..  ,@@#  %@@ ...     ,.@@@   @@&  ,. , . .     @@@@@@@@@@
@@@@@@@@@@   .. ...   @@@@@@@@@@@@@ ,.. ,.. @@@@@@@@@@@@@(. ..*      @@@@@@@@@@
@@@@@@@@@@         @@@         &@@@ ,.. .,. @@@@         (@@,.       @@@@@@@@@@
@@@@@@@@@@    .       @@@&  .@@*(@@ ,....., @@@ @@@  ,@@@(     . .   @@@@@@@@@@
@@@@@@             ,..@@@&      (@@ *.,.,., @@@      ,@@@(,,             @@@@@@
@@@@@@          ,* ...@@@&       ..@@@@@@@@@,        ,@@@(.,.,*          @@@@@@
@@@@@@@@@@     .  .   .,   ., .    @@@@@@@@@      ., , ..   ...      @@@@@@@@@@
@@@@@@@@             ,.     /@@@@@@         @@@@@@@ .  ....            @@@@@@@@
@@@@@@@@       . . .    @@@@@@@@@@@@@@   ,@@@@@@@@@@@@@ ..    .. .     @@@@@@@@
@@@@@@@@@@       ... .@@@@@@%  &@@@@@@   ,@@@@@@   @@@@@@%  ...      @@@@@@@@@@
@@@@@@@@@@@@@      @@@@@@@@@@@@*      @@@&      @@@@@@@@@@@@.     @@@@@@@@@@@@@
@@@@@@@@@@@@@      ,..  .,@@@@@@@@@@@@@@@@@@@@@@@@@@@%......      @@@@@@@@@@@@@
@@@@@@@@@@@@@@@@      .. .@&&&&&@@@@@@@@@@@@@@@&&&&&@&   .     &@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@             (@@@@@@@@@@@@@@.  .         %@@@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@@@@@@@@@@&                           ,@@@@@@@@@@@@@@@@@@@@@@@@@
`}
            </div>
          </div>
          <div className="space-y-1 pt-2">
            <p className="text-tertiary text-[11px]">System Architect • Noida, India</p>
            <p className="text-primary text-[11px] font-bold underline decoration-primary/30">contact@ramxcat.dev</p>
          </div>
          
          <div className="pt-10 space-y-4 opacity-70">
            <h3 className="text-[13.5px] md:text-[14.5px] font-bold tracking-[0.25em] uppercase italic border-b border-dashed pb-2 w-fit" style={{ color: '#ffb5a7', borderColor: 'rgba(255, 181, 167, 0.3)' }}>Discovery Node</h3>
            <p className="text-tertiary text-[12px] md:text-[14px] leading-relaxed max-w-[300px] italic font-medium">
              "There are more commands buried in the architecture than meet the eye... explore with <span className="text-primary font-bold">/help</span>, <span className="text-primary font-bold">/help -n</span> or hunt for secrets."
            </p>
          </div>
        </div>

        {/* Right Column: Capabilities & Navigation */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-4 border-l border-dashed border-primary/20 pl-6">
            <h3 className="text-secondary text-sm font-bold tracking-widest uppercase italic">Capabilities</h3>
            <div className="space-y-3 text-[11px]">
              <div className="flex gap-4">
                <span className="w-16 text-tertiary shrink-0">Design</span>
                <span className="text-white">Systems, UX/UI, Strategy</span>
              </div>
              <div className="flex gap-4">
                <span className="w-16 text-tertiary shrink-0">Lead</span>
                <span className="text-white">Teams, Workshops, Mentoring</span>
              </div>
              <div className="flex gap-4">
                <span className="w-16 text-tertiary shrink-0">Build</span>
                <span className="text-white">Web, Mobile, Branding</span>
              </div>
              <div className="flex gap-4">
                <span className="w-16 text-tertiary shrink-0">Ship</span>
                <span className="text-white">SaaS, Enterprise, Consumer</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-l border-dashed border-primary/20 pl-6 pt-4 mt-auto">
            <h3 className="text-secondary text-sm font-bold tracking-widest uppercase italic">Navigation</h3>
            <div className="space-y-2 text-[12px] font-bold">
              <p className="text-white cursor-pointer hover:text-primary transition-colors">/about</p>
              <p className="text-white cursor-pointer hover:text-primary transition-colors">/work</p>
              <p className="text-white cursor-pointer hover:text-primary transition-colors">/clients</p>
              <p className="text-white cursor-pointer hover:text-primary transition-colors">/skills</p>
            </div>
            <div className="space-y-1 pt-4 border-t border-dashed border-primary/10">
              <p className="text-tertiary/60 text-[10px]">... /help and /help -n for all commands</p>
              <p className="text-tertiary/40 text-[10px]">Try /themes to change the vibe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
