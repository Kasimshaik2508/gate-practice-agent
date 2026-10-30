// Aspirant Sign-In & Profile Registration Modal
import { useState } from 'react';
import { GATE_PAPERS } from '../data/papers.js';

export function SignInModal({ isOpen, onClose, onSignIn, existingUser }) {
  if (!isOpen) return null;

  const [name, setName] = useState(existingUser?.name || '');
  const [email, setEmail] = useState(existingUser?.email || '');
  const [targetPaper, setTargetPaper] = useState(existingUser?.paperId || 'CS');
  const [targetYear, setTargetYear] = useState(existingUser?.targetYear || 'GATE 2025');
  const [dailyGoal, setDailyGoal] = useState(existingUser?.dailyGoal || 10);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      paperId: targetPaper,
      targetYear,
      dailyGoal: Number(dailyGoal),
      createdAt: existingUser?.createdAt || new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    onSignIn(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-base shadow-md shadow-blue-500/20">
                🎓
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Aspirant Profile
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
              {existingUser ? 'Edit Aspirant Profile' : 'Sign In to GATE Practice Agent'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Your test history, mistakes, scorecards, and progress will be securely saved.
            </p>
          </div>
          {existingUser && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            >
              ✕
            </button>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center space-x-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Full Name / Aspirant Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              placeholder="e.g. Kasim Shaik"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kasim@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Target GATE Paper Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Target GATE Engineering Paper *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GATE_PAPERS.map((paper) => {
                const isSelected = targetPaper === paper.id;
                return (
                  <button
                    type="button"
                    key={paper.id}
                    onClick={() => setTargetPaper(paper.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-blue-500 bg-blue-950/40 text-blue-200 font-bold shadow-md shadow-blue-500/10'
                        : 'border-slate-800 bg-slate-950/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-mono text-sm">{paper.code}</div>
                    <div className="text-[10px] text-slate-400 truncate">{paper.shortName.split(' ')[1] || paper.code}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exam Year & Daily Target */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Target Year
              </label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              >
                <option value="GATE 2025">GATE 2025</option>
                <option value="GATE 2026">GATE 2026</option>
                <option value="GATE 2027">GATE 2027</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Daily Goal
              </label>
              <select
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5 Questions / day</option>
                <option value={10}>10 Questions / day</option>
                <option value={15}>15 Questions / day</option>
                <option value={20}>20 Questions / day</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            {existingUser && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>{existingUser ? 'Update Profile' : 'Sign In & Start Practicing'}</span>
              <span>→</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
