import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';

export default function Ballot() {
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const races = [
    {
      title: "President of the United States",
      candidates: [
        { id: 'c1', name: "Jane Doe", party: "Progressive Party" },
        { id: 'c2', name: "John Smith", party: "Conservative Party" },
        { id: 'c3', name: "Alex Johnson", party: "Independent" }
      ]
    },
    {
      title: "City Mayor",
      candidates: [
        { id: 'm1', name: "Sarah Williams", party: "Local Coalition" },
        { id: 'm2', name: "Michael Brown", party: "Citizens First" }
      ]
    },
    {
      title: "Proposition 1: Park Funding",
      desc: "Allocates $5M for local park renovations.",
      candidates: [
        { id: 'p1_yes', name: "Yes" },
        { id: 'p1_no', name: "No" }
      ]
    }
  ];

  const handleSelect = (raceIdx, candidateId) => {
    setSelections({ ...selections, [raceIdx]: candidateId });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Interactive Mock Ballot</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Practice your voting skills on this simulated digital ballot.
        </p>
      </div>

      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-12 text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-green-600 dark:text-green-400">Ballot Cast Successfully!</h2>
          <p>Your mock vote has been securely recorded.</p>
          <button onClick={() => {setSubmitted(false); setSelections({});}} className="mt-6 px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-full">Vote Again</button>
        </motion.div>
      ) : (
        <div className="glass-card p-8 space-y-8 border-t-8 border-t-primary-500">
          <div className="flex items-start space-x-3 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-blue-800 dark:text-blue-300">
            <Info className="w-6 h-6 flex-shrink-0" />
            <p className="text-sm">Instructions: Select one candidate per race. Review your selections at the bottom before casting your ballot.</p>
          </div>

          {races.map((race, rIdx) => (
            <div key={rIdx} className="space-y-4">
              <div className="border-b-2 border-slate-200 dark:border-white/10 pb-2">
                <h3 className="text-xl font-bold uppercase tracking-wide">{race.title}</h3>
                {race.desc && <p className="text-sm text-slate-500">{race.desc}</p>}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {race.candidates.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(rIdx, c.id)}
                    className={`flex justify-between items-center p-4 rounded-xl border-2 text-left transition-all ${
                      selections[rIdx] === c.id 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md' 
                        : 'border-slate-200 dark:border-white/10 hover:border-primary-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-lg">{c.name}</div>
                      {c.party && <div className="text-sm text-slate-500">{c.party}</div>}
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selections[rIdx] === c.id ? 'border-primary-500' : 'border-slate-300 dark:border-slate-600'}`}>
                      {selections[rIdx] === c.id && <div className="w-3 h-3 bg-primary-500 rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex justify-end">
            <button 
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selections).length === 0}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold text-lg shadow-lg disabled:opacity-50 transition-colors"
            >
              Cast Ballot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
