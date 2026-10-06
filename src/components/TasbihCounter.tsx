import React, { useState } from 'react';
import { RotateCcw, Volume2, VolumeX, Sparkles, X, ChevronUp, ChevronDown } from 'lucide-react';

interface TasbihCounterProps {
  initialTarget?: number;
}

export const TasbihCounter: React.FC<TasbihCounterProps> = ({ initialTarget = 33 }) => {
  const [count, setCount] = useState(0);
  const [totalLaps, setTotalLaps] = useState(0);
  const [target, setTarget] = useState(initialTarget);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const playClickSound = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(count + 1 >= target ? 880 : 540, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.07);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
      // AudioContext not allowed before user interaction
    }
  };

  const handleClick = () => {
    playClickSound();
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(count + 1 >= target ? [40, 40, 40] : 15);
      } catch (e) {}
    }

    if (count + 1 >= target) {
      setCount(0);
      setTotalLaps((prev) => prev + 1);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(0);
    setTotalLaps(0);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <div className="bg-stone-900/95 text-white border border-emerald-500/30 rounded-3xl p-3.5 shadow-2xl backdrop-blur-md flex flex-col items-center w-52 transition-all">
        {/* Header bar */}
        <div className="w-full flex items-center justify-between text-xs text-stone-400 mb-2 px-1">
          <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
            <Sparkles size={13} />
            <span>Tasbih Digital</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 hover:text-white transition-colors"
              title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:text-white transition-colors"
            >
              {isMinimized ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Target Selector */}
            <div className="flex gap-1 mb-2.5">
              {[33, 70, 100, 200].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTarget(t);
                    setCount(0);
                  }}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                    target === t
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                  }`}
                >
                  {t}x
                </button>
              ))}
            </div>

            {/* Counter display */}
            <div className="text-center my-1">
              <div className="font-mono text-4xl font-extrabold text-emerald-400 tracking-tight">
                {count}
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Target: {target} | Putaran: {totalLaps}
              </div>
            </div>

            {/* Click Button */}
            <button
              onClick={handleClick}
              className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-emerald-950/40 text-sm transition-all"
            >
              TEKAN (سبحان الله)
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-rose-400 mt-2 transition-colors"
            >
              <RotateCcw size={10} />
              Reset Hitungan
            </button>
          </>
        )}
      </div>
    </div>
  );
};
