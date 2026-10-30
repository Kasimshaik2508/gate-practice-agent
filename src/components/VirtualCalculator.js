// TCS iON-Style GATE Virtual Scientific Calculator
import { useState } from 'react';

export function VirtualCalculator({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRad, setIsRad] = useState(true);

  const handleNum = (num) => {
    setDisplay((prev) => (prev === '0' ? String(num) : prev + num));
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleEval = () => {
    try {
      // Safe math evaluation
      let sanitized = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      // eslint-disable-next-line no-eval
      const result = eval(sanitized);
      setDisplay(String(Number(result.toFixed(8))));
    } catch (err) {
      setDisplay('Error');
    }
  };

  const handleScientific = (op) => {
    try {
      const val = parseFloat(display);
      let res = val;
      const angle = isRad ? val : (val * Math.PI) / 180;

      switch (op) {
        case 'sin': res = Math.sin(angle); break;
        case 'cos': res = Math.cos(angle); break;
        case 'tan': res = Math.tan(angle); break;
        case 'ln': res = Math.log(val); break;
        case 'log10': res = Math.log10(val); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'sq': res = val * val; break;
        case 'cube': res = val * val * val; break;
        case 'inv': res = 1 / val; break;
        case 'exp': res = Math.exp(val); break;
        case 'neg': res = -val; break;
        case 'fact': {
          let f = 1;
          for (let i = 2; i <= Math.min(val, 20); i++) f *= i;
          res = f;
          break;
        }
        default: break;
      }
      setDisplay(String(Number(res.toFixed(8))));
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden font-mono text-xs animate-fadeIn">
      
      {/* Title Bar */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            GATE TCS iON Scientific Calculator
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition"
        >
          ✕
        </button>
      </div>

      {/* Calculator Display */}
      <div className="bg-slate-950 p-4 border-b border-slate-800">
        <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
          <button
            onClick={() => setIsRad(!isRad)}
            className="px-2 py-0.5 rounded bg-slate-800 text-blue-400 font-bold"
          >
            {isRad ? 'RAD' : 'DEG'}
          </button>
          <span>Memory: {memory !== 0 ? memory : '0'}</span>
        </div>
        <input
          type="text"
          readOnly
          value={display}
          className="w-full bg-transparent text-right text-2xl font-bold text-white tracking-wider outline-none"
        />
      </div>

      {/* Buttons Grid */}
      <div className="p-3 bg-slate-900 grid grid-cols-5 gap-1.5 text-center">
        {/* Memory Keys */}
        <button onClick={() => setMemory(0)} className="btn-calc bg-slate-800 text-amber-400">MC</button>
        <button onClick={() => setDisplay(String(memory))} className="btn-calc bg-slate-800 text-amber-400">MR</button>
        <button onClick={() => setMemory(parseFloat(display) || 0)} className="btn-calc bg-slate-800 text-amber-400">MS</button>
        <button onClick={() => setMemory((m) => m + (parseFloat(display) || 0))} className="btn-calc bg-slate-800 text-amber-400">M+</button>
        <button onClick={handleClear} className="btn-calc bg-rose-900/60 text-rose-300 font-bold">C</button>

        {/* Scientific row 1 */}
        <button onClick={() => handleScientific('sin')} className="btn-calc bg-slate-800 text-slate-300">sin</button>
        <button onClick={() => handleScientific('cos')} className="btn-calc bg-slate-800 text-slate-300">cos</button>
        <button onClick={() => handleScientific('tan')} className="btn-calc bg-slate-800 text-slate-300">tan</button>
        <button onClick={() => handleScientific('ln')} className="btn-calc bg-slate-800 text-slate-300">ln</button>
        <button onClick={() => handleScientific('log10')} className="btn-calc bg-slate-800 text-slate-300">log</button>

        {/* Scientific row 2 */}
        <button onClick={() => handleScientific('sqrt')} className="btn-calc bg-slate-800 text-slate-300">√x</button>
        <button onClick={() => handleScientific('sq')} className="btn-calc bg-slate-800 text-slate-300">x²</button>
        <button onClick={() => setDisplay((prev) => prev + '^')} className="btn-calc bg-slate-800 text-slate-300">x^y</button>
        <button onClick={() => handleScientific('inv')} className="btn-calc bg-slate-800 text-slate-300">1/x</button>
        <button onClick={() => setDisplay((prev) => prev + '÷')} className="btn-calc bg-indigo-900/40 text-indigo-300 font-bold">÷</button>

        {/* Digits 7,8,9 */}
        <button onClick={() => handleScientific('fact')} className="btn-calc bg-slate-800 text-slate-300">n!</button>
        <button onClick={() => handleNum(7)} className="btn-calc bg-slate-950 text-white font-bold text-sm">7</button>
        <button onClick={() => handleNum(8)} className="btn-calc bg-slate-950 text-white font-bold text-sm">8</button>
        <button onClick={() => handleNum(9)} className="btn-calc bg-slate-950 text-white font-bold text-sm">9</button>
        <button onClick={() => setDisplay((prev) => prev + '×')} className="btn-calc bg-indigo-900/40 text-indigo-300 font-bold">×</button>

        {/* Digits 4,5,6 */}
        <button onClick={() => setDisplay((prev) => (prev === '0' ? '3.14159' : prev + '3.14159'))} className="btn-calc bg-slate-800 text-slate-300">π</button>
        <button onClick={() => handleNum(4)} className="btn-calc bg-slate-950 text-white font-bold text-sm">4</button>
        <button onClick={() => handleNum(5)} className="btn-calc bg-slate-950 text-white font-bold text-sm">5</button>
        <button onClick={() => handleNum(6)} className="btn-calc bg-slate-950 text-white font-bold text-sm">6</button>
        <button onClick={() => setDisplay((prev) => prev + '-')} className="btn-calc bg-indigo-900/40 text-indigo-300 font-bold">-</button>

        {/* Digits 1,2,3 */}
        <button onClick={() => setDisplay((prev) => (prev === '0' ? '2.71828' : prev + '2.71828'))} className="btn-calc bg-slate-800 text-slate-300">e</button>
        <button onClick={() => handleNum(1)} className="btn-calc bg-slate-950 text-white font-bold text-sm">1</button>
        <button onClick={() => handleNum(2)} className="btn-calc bg-slate-950 text-white font-bold text-sm">2</button>
        <button onClick={() => handleNum(3)} className="btn-calc bg-slate-950 text-white font-bold text-sm">3</button>
        <button onClick={() => setDisplay((prev) => prev + '+')} className="btn-calc bg-indigo-900/40 text-indigo-300 font-bold">+</button>

        {/* Bottom row */}
        <button onClick={() => handleScientific('neg')} className="btn-calc bg-slate-800 text-slate-300">±</button>
        <button onClick={() => handleNum(0)} className="btn-calc bg-slate-950 text-white font-bold text-sm">0</button>
        <button onClick={() => setDisplay((prev) => prev + '.')} className="btn-calc bg-slate-950 text-white font-bold text-sm">.</button>
        <button onClick={handleBackspace} className="btn-calc bg-slate-800 text-slate-300">⌫</button>
        <button onClick={handleEval} className="btn-calc bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm">=</button>
      </div>

      <style>{`
        .btn-calc {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.1s ease;
          user-select: none;
          cursor: pointer;
        }
        .btn-calc:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
