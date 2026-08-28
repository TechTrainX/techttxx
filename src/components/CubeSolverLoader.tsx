import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck, Zap, Code2, Cpu } from 'lucide-react';
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
            scale: 1.03,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050b1a] overflow-hidden select-none"
        >
          {/* Ambient brand-blue depth field */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(0,102,204,0.20)_0%,transparent_62%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#071a35_0%,#050b1a_55%,#030712_100%)] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-[#0066cc]/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Precision grid, on-brand and quiet */}
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(59,130,246,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,130,246,0.16) 1px, transparent 1px)',
              backgroundSize: '44px 44px'
            }}
          />

          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 space-y-9 text-center">

            {/* Brand mark */}
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <TechTrainXLogo size="md" showTagline={false} theme="dark" />
            </motion.div>

            {/* 3D CUBE SOLVER ANIMATION CONTAINER */}
            <div className="relative w-44 h-44 flex items-center justify-center">

              {/* Restrained orbital rings — single accent, deliberate motion */}
              <div className="absolute inset-0 rounded-full border border-[#3b82f6]/20 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-5 rounded-full border-2 border-t-[#60a5fa] border-r-transparent border-b-[#0066cc] border-l-transparent animate-[spin_3.4s_linear_infinite]" />

              {/* Core glow */}
              <div className="absolute w-16 h-16 bg-[#3b82f6]/25 rounded-full blur-2xl animate-pulse" />

              {/* 3D Isometric Rubik's Solver Cube Assembly */}
              <div className="cube-solver-scene">
                <div className="cube-solver-wrapper">
                  <div className="cube-face cube-front">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-core">X</span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-back">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-right">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-left">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-top">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-core">⚡</span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                    </div>
                  </div>
                  <div className="cube-face cube-bottom">
                    <div className="rubik-grid">
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                      <span className="rubik-tile c-deep"></span>
                      <span className="rubik-tile c-mid"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sweeping scan line — single accent, subtle */}
              <div className="absolute left-3 right-3 h-px bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent shadow-[0_0_10px_#3b82f6] animate-[scanLaser_2.4s_ease-in-out_infinite] pointer-events-none" />
            </div>

            {/* Stage Info & Telemetry */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-[#60a5fa]">
                  {React.createElement(LOADING_STAGES[stageIndex].icon, { className: 'w-3.5 h-3.5 animate-spin' })}
                  <span className="font-semibold tracking-wide text-left truncate max-w-[240px]">
                    {LOADING_STAGES[stageIndex].text}
                  </span>
                </div>
                <span className="text-white font-black text-sm bg-[#0a1730]/90 px-2 py-0.5 rounded border border-[#3b82f6]/30">
                  {progress}%
                </span>
              </div>

              {/* High-Precision Progress Bar */}
              <div className="relative w-full h-2 bg-[#04091a] rounded-full overflow-hidden border border-[#152447] p-0.5">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#0066cc] via-[#3b82f6] to-[#60a5fa] shadow-[0_0_12px_rgba(59,130,246,0.75)] relative"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/90 rounded-full animate-pulse" />
                </motion.div>
              </div>

              {/* Live Telemetry Subtitle */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 tracking-wide">
                <span>STAGE 0{stageIndex + 1}/05</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  SYSTEM SYNC ACTIVE
                </span>
              </div>
            </div>

            {/* Quick Skip Button */}
            <button
              onClick={() => {
                setIsDone(true);
                if (onLoadingComplete) onLoadingComplete();
              }}
              className="text-[11px] text-slate-500 hover:text-[#60a5fa] font-medium transition-colors cursor-pointer pt-2"
            >
              Skip intro →
            </button>

          </div>

          {/* Inline CSS Keyframes & 3D Matrix Transformations */}
          <style>{`
            .cube-solver-scene {
              width: 90px;
              height: 90px;
              perspective: 640px;
            }
            .cube-solver-wrapper {
              width: 100%;
              height: 100%;
              position: relative;
              transform-style: preserve-3d;
              animation: rotateSolverCube 6.5s infinite cubic-bezier(0.45, 0, 0.2, 1);
            }
            .cube-face {
              position: absolute;
              width: 90px;
              height: 90px;
              background: rgba(7, 16, 36, 0.88);
              border: 1.5px solid rgba(59, 130, 246, 0.45);
              border-radius: 8px;
              box-shadow: inset 0 0 15px rgba(0, 102, 204, 0.28), 0 0 10px rgba(59, 130, 246, 0.18);
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
            .c-deep {
              background: linear-gradient(135deg, rgba(0, 102, 204, 0.75), rgba(5, 30, 66, 0.95));
              border: 1px solid rgba(59, 130, 246, 0.5);
              color: white;
            }
            .c-mid {
              background: linear-gradient(135deg, rgba(59, 130, 246, 0.7), rgba(0, 82, 163, 0.9));
              border: 1px solid rgba(147, 197, 253, 0.5);
              color: white;
            }
            .c-core {
              background: linear-gradient(135deg, #3b82f6, #0066cc);
              border: 1px solid #ffffff;
              color: #ffffff;
              box-shadow: 0 0 10px #3b82f6;
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
                top: 6%;
                opacity: 0.25;
              }
              50% {
                top: 94%;
                opacity: 0.9;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .cube-solver-wrapper {
                animation-duration: 18s;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CubeSolverLoader;