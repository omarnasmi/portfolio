import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Zap } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
}

const deploymentSteps = [
  { delay: 0, text: '$ npm run deploy-omar' },
  { delay: 400, text: '' },
  { delay: 600, text: '▶ Building...' },
  { delay: 1200, text: '✔ Build complete (82KB)' },
  { delay: 1400, text: '' },
  { delay: 1600, text: '▶ Running tests...' },
  { delay: 2000, text: '✔ All tests passed' },
  { delay: 2200, text: '' },
  { delay: 2400, text: '▶ Deploying...' },
  { delay: 2800, text: '✔ Deployment successful' },
  { delay: 3000, text: '' },
  { delay: 3100, text: '🎉 Welcome to Omar\'s portfolio' },
];

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [speed, setSpeed] = useState(1);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Animate deployment steps
  useEffect(() => {
    const timeouts = deploymentSteps.map((step) => {
      return setTimeout(() => {
        setDisplayedLines((prev) => [...prev, step.text]);
      }, step.delay / speed);
    });

    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => onComplete(), 1500);
    }, (deploymentSteps[deploymentSteps.length - 1].delay + 600) / speed);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(completeTimeout);
    };
  }, [speed, onComplete]);

  const handleSkip = () => {
    setIsComplete(true);
    setTimeout(() => onComplete(), 300);
  };

  const handleReplay = () => {
    setDisplayedLines([]);
    setIsComplete(false);
    setSpeed(1);
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-[#0A0A0A] z-[999] flex items-center justify-center"
        >
          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl mx-4 h-96 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Terminal Header */}
            <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-[0.75rem] text-[#8E9299] ml-2 font-mono">
                omar@portfolio ~ npm run deploy
              </span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm flex-1 overflow-y-auto bg-[#0A0A0A]">
              <div className="space-y-1 text-[#D1D5DB]">
                {displayedLines.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${
                      line.startsWith('✔') ? 'text-[#10B981]' : ''
                    } ${
                      line.startsWith('▶') ? 'text-[#7C3AED]' : ''
                    } ${
                      line.startsWith('🎉') ? 'text-yellow-400 font-bold' : ''
                    } ${line === '' ? 'h-1' : ''}`}
                  >
                    {line}
                  </motion.div>
                ))}

                {/* Blinking Cursor */}
                {!isComplete && displayedLines.length > 0 && (
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0 }}
                    className="inline-block w-2 h-5 bg-[#7C3AED] ml-1"
                  />
                )}
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="bg-white/[0.02] border-t border-white/10 px-6 py-3 flex items-center justify-between">
              <div className="text-[0.7rem] text-[#8E9299]">
                {isComplete ? (
                  <span>Deployment complete</span>
                ) : (
                  <span>Deploying {Math.round((displayedLines.length / deploymentSteps.length) * 100)}%</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSpeed(speed === 1 ? 2 : 1)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-[0.7rem] text-white hover:border-[#7C3AED] transition-colors"
                  title="Toggle 2x speed"
                >
                  <Zap size={12} />
                  {speed === 2 ? '1x' : '2x'}
                </button>
                <button
                  onClick={handleReplay}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded text-[0.7rem] text-white hover:border-[#7C3AED] transition-colors"
                  title="Replay intro"
                >
                  <RotateCcw size={12} />
                  Replay
                </button>
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#7C3AED]/20 border border-[#7C3AED] rounded text-[0.7rem] text-white hover:bg-[#7C3AED]/30 transition-colors"
                  title="Skip intro"
                >
                  <X size={12} />
                  Skip
                </button>
              </div>
            </div>
          </motion.div>

          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#1e40af]/10 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
