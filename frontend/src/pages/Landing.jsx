import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Route, Map as MapIcon, MessageSquare, Vote, Globe } from 'lucide-react';
import Countdown from '../components/Countdown';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl space-y-6"
      >
        <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-primary-200 dark:border-primary-800/50">
          <BrainCircuit className="w-4 h-4" />
          <span>Election Intelligence Assistant v1.0</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Understand Elections <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
            Intelligently.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Not just answers. Guided learning, interactive timelines, and adaptive intelligence tailored to whether you're a voter, candidate, or student.
        </p>

        <div className="pt-4">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Next Major Election</p>
          <Countdown targetDate="2026-11-03T00:00:00" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
      >
        <FeatureCard 
          to="/chat"
          icon={<MessageSquare className="w-8 h-8" />}
          title="Intelligent Chat"
          desc="Ask complex questions and get structured, contextual answers."
          color="from-blue-500 to-cyan-500"
        />
        <FeatureCard 
          to="/learn"
          icon={<Route className="w-8 h-8" />}
          title="Step-by-Step"
          desc="Learn the process from registration to inauguration."
          color="from-purple-500 to-pink-500"
        />
        <FeatureCard 
          to="/timeline"
          icon={<MapIcon className="w-8 h-8" />}
          title="Visual Timeline"
          desc="See exactly when things happen in an interactive view."
          color="from-orange-500 to-red-500"
        />
        <FeatureCard 
          to="/guide"
          icon={<BrainCircuit className="w-8 h-8" />}
          title="Guided Wizard"
          desc="Personalized learning paths based on your goals."
          color="from-green-500 to-emerald-500"
        />
        <FeatureCard 
          to="/ballot"
          icon={<Vote className="w-8 h-8" />}
          title="Mock Ballot"
          desc="Practice casting votes on a realistic simulated ballot."
          color="from-rose-500 to-red-500"
        />
        <FeatureCard 
          to="/map"
          icon={<Globe className="w-8 h-8" />}
          title="Election Map"
          desc="Explore state-by-state election info interactively."
          color="from-teal-500 to-cyan-600"
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ to, icon, title, desc, color }) {
  return (
    <Link to={to} className="group relative glass-card p-6 flex flex-col items-center text-center space-y-4 hover:-translate-y-2 transition-transform duration-300">
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className={`p-4 rounded-full bg-gradient-to-br ${color} text-white shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
    </Link>
  );
}
