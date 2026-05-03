import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Quiz({ onComplete }) {
  const questions = [
    {
      q: "What is the primary purpose of voter registration?",
      opts: ["To count votes", "To prevent fraud and organize polling", "To collect taxes", "To fund campaigns"],
      a: 1
    },
    {
      q: "Which phase comes immediately before Voting Day?",
      opts: ["Certification", "Registration", "Campaigning & Debates", "Nomination"],
      a: 2
    },
    {
      q: "Who officially counts and verifies the ballots?",
      opts: ["Candidates", "Election Officials", "The President", "News Networks"],
      a: 1
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (idx) => {
    if (idx === questions[current].a) setScore(s => s + 1);
    
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const passed = score >= 2;
    return (
      <div className="glass-card p-8 text-center space-y-4">
        {passed && <Confetti recycle={false} numberOfPieces={300} />}
        {passed ? <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" /> : <XCircle className="w-16 h-16 text-red-500 mx-auto" />}
        <h2 className="text-2xl font-bold">{passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
        <p className="text-lg">You scored {score} out of {questions.length}.</p>
        {passed && <div className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full font-bold shadow-lg">Certified Informed Citizen Badge 🏅</div>}
        <button onClick={onComplete} className="mt-6 px-6 py-2 bg-primary-500 text-white rounded-full">Finish</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="glass-card p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl text-primary-500">Knowledge Check</h3>
        <span className="text-sm font-semibold bg-slate-100 dark:bg-dark-800 px-3 py-1 rounded-full">{current + 1} / {questions.length}</span>
      </div>
      <p className="text-lg font-medium mb-6">{q.q}</p>
      <div className="grid grid-cols-1 gap-3">
        {q.opts.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="text-left p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500 transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
