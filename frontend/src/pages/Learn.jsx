import { useState, useEffect } from 'react';
import { fetchSteps } from '../services/api';
import Stepper from '../components/Stepper';
import Quiz from '../components/Quiz';
import { useStore } from '../store/useStore';

export default function Learn() {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const { userRole } = useStore();

  useEffect(() => {
    const loadSteps = async () => {
      setLoading(true);
      try {
        const data = await fetchSteps(userRole);
        setSteps(data);
      } catch (error) {
        console.error("Failed to fetch steps");
      }
      setLoading(false);
    };
    loadSteps();
  }, [userRole]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Process Breakdown</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Follow the structural flow of the election process tailored for your role as a <span className="font-semibold text-primary-500 capitalize">{userRole}</span>.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : showQuiz ? (
        <Quiz onComplete={() => setShowQuiz(false)} />
      ) : (
        <div className="space-y-8">
          <Stepper steps={steps} />
          <div className="flex justify-center pt-8 border-t border-slate-200 dark:border-white/10">
            <button 
              onClick={() => setShowQuiz(true)}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Take the Knowledge Check
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
