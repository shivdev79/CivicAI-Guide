import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGuide } from '../services/api';
import { ArrowRight, Sparkles, User, Briefcase, GraduationCap } from 'lucide-react';

export default function GuideWizard() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const data = await getGuide(role, goal);
      setResult(data);
      setStep(3);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const roles = [
    { id: 'voter', icon: <User className="w-6 h-6"/>, label: 'Voter' },
    { id: 'candidate', icon: <Briefcase className="w-6 h-6"/>, label: 'Candidate' },
    { id: 'student', icon: <GraduationCap className="w-6 h-6"/>, label: 'Student / Citizen' }
  ];

  const goals = [
    { id: 'quick', label: 'Quick Overview', desc: 'Just the basics, keep it short.' },
    { id: 'deep', label: 'Deep Learning', desc: 'I want to know all the details.' }
  ];

  return (
    <div className="max-w-2xl mx-auto glass-card p-8 min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        
        {/* Step 1: Role */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Who are you?</h2>
              <p className="text-slate-500">Help us personalize your learning experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); handleNext(); }}
                  className="flex flex-col items-center justify-center p-6 space-y-4 rounded-2xl border-2 transition-all hover:bg-slate-50 dark:hover:bg-dark-800 border-slate-200 dark:border-white/10 hover:border-primary-500"
                >
                  <div className="text-primary-500">{r.icon}</div>
                  <span className="font-semibold">{r.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Goal */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">What is your goal?</h2>
              <p className="text-slate-500">How deep do you want to dive?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map(g => (
                <button
                  key={g.id}
                  onClick={() => { setGoal(g.id); }}
                  className={`flex flex-col p-6 rounded-2xl border-2 transition-all text-left ${goal === g.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-200 dark:border-white/10 hover:border-primary-300'}`}
                >
                  <span className="font-bold text-lg">{g.label}</span>
                  <span className="text-sm text-slate-500 mt-2">{g.desc}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button onClick={() => setStep(1)} className="px-6 py-2 rounded-full font-medium border border-slate-300 dark:border-slate-700">Back</button>
              <button 
                onClick={handleSubmit}
                disabled={!goal || loading}
                className="px-6 py-2 rounded-full font-medium bg-primary-500 text-white flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? 'Generating...' : <><span>Generate Guide</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 text-primary-500 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Your Custom Path</h2>
            </div>
            
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">{result.message}</p>
            
            <div className="space-y-4 mt-6">
              {result.steps.map((s, i) => (
                <div key={s.id} className="bg-slate-50 dark:bg-dark-900 p-4 rounded-xl border border-slate-200 dark:border-white/5 flex space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{s.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">{s.description}</p>
                    {s.details && (
                      <p className="text-sm mt-3 text-slate-500 dark:text-slate-500 border-l-2 border-primary-500 pl-3">{s.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <button onClick={() => setStep(1)} className="px-6 py-2 rounded-full font-medium border border-slate-300 dark:border-slate-700 w-full hover:bg-slate-50 dark:hover:bg-dark-800">
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
