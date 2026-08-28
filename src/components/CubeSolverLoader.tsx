import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, ShieldCheck, Zap, Code2, Cpu } from 'lucide-react';
import { TechTrainXLogo } from './TechTrainXLogo';

interface CubeSolverLoaderProps {
  onLoadingComplete?: () => void;
  minDurationMs?: number;
}

const LOADING_STAGES = [
  { text: 'Booting TechTrainX Neural Core...', icon: Cpu, progress: 24 },
  { text: 'Aligning 3D Rubik Placement Matrix...', icon: Zap, progress: 52 },
  { text: 'Synthesizing 5-Hour Live Coding Modules...', icon: Code2, progress: 78 },
  { text: 'Mounting Academic Digital Registrar...', icon: ShieldCheck, progress: 95 },
  { text: 'Foundry Ready. Launching Experience...', icon: Sparkles, progress: 100 }
];

export const CubeSolverLoader: React.FC<CubeSolverLoaderProps> = ({
  onLoadingComplete,
  minDurationMs = 1800
}) => {
  const [progress, setProgress] = useState(12);
  const [stageIndex, setStageIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Keep steady, high-quality brand favicon intact without flickering
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(elapsed / minDurationMs, 1);
      
      // Eased progress calculation
      const currentVal = Math.floor(ratio * 100);
      setProgress(currentVal);

      // Determine stage
      if (currentVal < 30) setStageIndex(0);
      else if (currentVal < 60) setStageIndex(1);
      else if (currentVal < 85) setStageIndex(2);
      else if (currentVal < 98) setStageIndex(3);
      else setStageIndex(4);

      if (ratio >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          if (onLoadingComplete) onLoadingComplete();
        }, 350);
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [minDurationMs, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030611] overflow-hidden select-none"
        >
          {/* Ambient Cyber Grid & Glow Lights */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          {/* Cyber Isometric Grid Canvas Pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.15) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
          />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 space-y-8 text-center">
            
            {/* Top Brand Marker */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <TechTrainXLogo size="md" showTagline={false} theme="dark" />
            </motion.div>

            {/* 3D CUBE SOLVER ANIMATION CONTAINER */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              
              {/* Outer Holographic Energy Ring */}
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-dashed border-indigo-500/30 animate-[spin_12s_linear_infinite_reverse]" />
              <div className="absolute inset-6 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-indigo-400 border-l-transparent animate-[spin_3s_linear_infinite]" />

              {/* Pulsing Core Energy Orb */}
              <div className="absolute w-20 h-20 bg-cyan-400/20 rounded-full blur-xl animate-pulse" />

              {/* 3D Isometric Rubik's Solver Cube Assembly */}
              <div className="cube-solver-scene">
                <div className="cube-solver-wrapper">
                  {/* 3D Cube Faces */}
                  <div className="cube-face cube-front">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-core">X</span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-back">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-right">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-left">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-top">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-core">⚡</span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-sky"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-bottom">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-cyan"></span>
                      <span className="rubik-tile c-indigo"></span>
                      <span className="rubik-tile c-sky"></span>
                      <span className="rubik-tile c-cyan"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Laser Scanning Line */}
              <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] animate-[scanLaser_2s_easeInOut_infinite] pointer-events-none" />
            </div>

            {/* Stage Info & Animated Subroutine */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-cyan-400">
                  {React.createElement(LOADING_STAGES[stageIndex].icon, { className: 'w-3.5 h-3.5 animate-spin' })}
                  <span className="font-semibold tracking-wide text-left truncate max-w-[240px]">
                    {LOADING_STAGES[stageIndex].text}
                  </span>
                </div>
                <span className="text-white font-black text-sm bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/30">
                  {progress}%
                </span>
              </div>

              {/* High-Precision Progress Bar */}
              <div className="relative w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <motion.div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.8)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
                </motion.div>
              </div>

              {/* Live Telemetry Subtitle */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                <span>STAGE 0{stageIndex + 1}/05</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  QUANTUM SYNC ACTIVE
                </span>
              </div>
            </div>

            {/* Quick Skip Button */}
            <button
              onClick={() => {
                setIsDone(true);
                if (onLoadingComplete) onLoadingComplete();
              }}
              className="text-[11px] text-slate-500 hover:text-cyan-400 font-medium transition-colors cursor-pointer pt-2"
            >
              Skip intro →
            </button>

          </div>

          {/* Inline CSS Keyframes & 3D Matrix Transformations */}
          <style>{`
            .cube-solver-scene {
              width: 90px;
              height: 90px;
              perspective: 600px;
            }
            .cube-solver-wrapper {
              width: 100%;
              height: 100%;
              position: relative;
              transform-style: preserve-3d;
              animation: rotateSolverCube 6s infinite cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cube-face {
              position: absolute;
              width: 90px;
              height: 90px;
              background: rgba(10, 18, 38, 0.85);
              border: 1.5px solid rgba(6, 182, 212, 0.6);
              border-radius: 8px;
              box-shadow: inset 0 0 15px rgba(6, 182, 212, 0.3), 0 0 10px rgba(6, 182, 212, 0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 4px;
            }
            .cube-front  { transform: rotateY(  0deg) translateZ(45px); }
            .cube-back   { transform: rotateY(180deg) translateZ(45px); }
            .cube-right  { transform: rotateY( 90deg) translateZ(45px); }
            .cube-left   { transform: rotateY(-90deg) translateZ(45px); }
            .cube-top    { transform: rotateX( 90deg) translateZ(45px); }
            .cube-bottom { transform: rotateX(-90deg) translateZ(45px); }

            .rubik-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(3, 1fr);
              gap: 2.5px;
              width: 100%;
              height: 100%;
            }
            .rubik-tile {
              border-radius: 3px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 8px;
              font-weight: 900;
              transition: all 0.3s ease;
            }
            .c-cyan {
              background: linear-gradient(135deg, rgba(6, 182, 212, 0.7), rgba(14, 116, 144, 0.9));
              border: 1px solid rgba(103, 232, 249, 0.6);
              color: white;
            }
            .c-indigo {
              background: linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(67, 56, 202, 0.9));
              border: 1px solid rgba(165, 180, 252, 0.6);
              color: white;
            }
            .c-sky {
              background: linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(3, 105, 161, 0.9));
              border: 1px solid rgba(186, 230, 253, 0.6);
              color: white;
            }
            .c-core {
              background: linear-gradient(135deg, #06b6d4, #6366f1);
              border: 1px solid #ffffff;
              color: #ffffff;
              box-shadow: 0 0 8px #06b6d4;
              font-size: 10px;
            }

            @keyframes rotateSolverCube {
              0% {
                transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
              }
              25% {
                transform: rotateX(90deg) rotateY(180deg) rotateZ(45deg);
              }
              50% {
                transform: rotateX(180deg) rotateY(270deg) rotateZ(90deg);
              }
              75% {
                transform: rotateX(270deg) rotateY(360deg) rotateZ(135deg);
              }
              100% {
                transform: rotateX(360deg) rotateY(540deg) rotateZ(180deg);
              }
            }

            @keyframes scanLaser {
              0%, 100% {
                top: 5%;
                opacity: 0.3;
              }
              50% {
                top: 95%;
                opacity: 1;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CubeSolverLoader;
