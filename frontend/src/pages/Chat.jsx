import ChatUI from '../components/ChatUI';
import { useStore } from '../store/useStore';
import { Settings2 } from 'lucide-react';

export default function Chat() {
  const { userRole, setUserRole, complexity, setComplexity } = useStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card p-4">
        <div>
          <h1 className="text-2xl font-bold">EIA Interface</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Context-aware election assistant.</p>
        </div>
        
        <div className="flex items-center space-x-4 bg-slate-100 dark:bg-dark-900 p-2 rounded-xl border border-slate-200 dark:border-white/10">
          <Settings2 className="w-5 h-5 text-slate-400 ml-2" />
          
          <select 
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none dark:text-slate-200"
          >
            <option value="student">Student</option>
            <option value="voter">Voter</option>
            <option value="candidate">Candidate</option>
          </select>
          
          <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
          
          <select 
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none dark:text-slate-200"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <ChatUI />
    </div>
  );
}
