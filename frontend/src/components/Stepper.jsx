import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

export default function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  if (!steps || steps.length === 0) return <div>Loading steps...</div>;

  const current = steps[activeStep];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar navigation */}
      <div className="md:w-1/3 glass-card p-4 space-y-2">
        <h3 className="font-bold text-lg mb-4 px-2">Learning Path</h3>
        {steps.map((step, idx) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(idx)}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-colors text-left ${
              activeStep === idx 
                ? 'bg-primary-500 text-white shadow-md' 
                : 'hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {activeStep >= idx ? (
              <CheckCircle2 className={`w-5 h-5 ${activeStep === idx ? 'text-white' : 'text-primary-500'}`} />
            ) : (
              <Circle className="w-5 h-5 opacity-50" />
            )}
            <span className="font-medium">{step.title}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="md:w-2/3 glass-card p-8 relative overflow-hidden">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-semibold">
            Step {activeStep + 1} of {steps.length}
          </div>
          
          <h2 className="text-3xl font-bold">{current.title}</h2>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">
              {current.description}
            </p>
            
            <div className="mt-8 p-6 bg-slate-50 dark:bg-dark-900 rounded-2xl border border-slate-200 dark:border-white/5">
              <h4 className="text-sm font-bold text-primary-500 uppercase tracking-wider mb-2">Deep Dive</h4>
              <p className="leading-relaxed">{current.details}</p>
            </div>

            <div className="mt-6 flex items-center space-x-2 text-sm text-slate-500 bg-white dark:bg-dark-800 inline-flex px-4 py-2 rounded-full border border-slate-200 dark:border-white/10">
              <span className="font-semibold">Duration:</span>
              <span>{current.duration}</span>
            </div>
          </div>

          <div className="flex justify-between pt-8 mt-8 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-2 rounded-full font-medium border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-dark-800 disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-6 py-2 rounded-full font-medium bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 shadow-md transition-colors"
            >
              Next Step
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
