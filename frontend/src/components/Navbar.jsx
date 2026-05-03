import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Sun, Moon, BrainCircuit, MessageSquare, Map as MapIcon, Route as RouteIcon, Info, Vote, Globe, Globe2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { theme, toggleTheme, language, setLanguage } = useStore();

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex justify-between items-center mb-8">
      <Link to="/" className="flex items-center space-x-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <BrainCircuit className="w-8 h-8 text-primary-500" />
        </motion.div>
        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500">
          EIA.
        </span>
      </Link>

      <div className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/chat" icon={<MessageSquare className="w-4 h-4" />} text="Chat" />
        <NavLink to="/learn" icon={<Info className="w-4 h-4" />} text="Learn" />
        <NavLink to="/timeline" icon={<MapIcon className="w-4 h-4" />} text="Timeline" />
        <NavLink to="/guide" icon={<RouteIcon className="w-4 h-4" />} text="Guide" />
        <NavLink to="/ballot" icon={<Vote className="w-4 h-4" />} text="Ballot" />
        <NavLink to="/map" icon={<Globe className="w-4 h-4" />} text="Map" />
        
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-dark-800 p-1 rounded-lg">
          <Globe2 className="w-4 h-4 text-slate-500 ml-1" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-medium focus:outline-none dark:text-slate-200"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-dark-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link to={to} className="flex items-center space-x-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
      {icon}
      <span>{text}</span>
    </Link>
  );
}
