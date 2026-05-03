import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function Timeline({ data }) {
  if (!data || data.length === 0) return <div>Loading timeline...</div>;

  return (
    <div className="relative wrap overflow-hidden p-4 h-full">
      <div className="absolute border-opacity-20 border-slate-700 dark:border-white h-full border left-1/2 -translate-x-1/2"></div>
      
      {data.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}
        >
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-primary-500 shadow-xl w-8 h-8 rounded-full">
            <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
          </div>
          <div className="order-1 glass-card w-5/12 px-6 py-4 relative group">
            {/* Connection line dot */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500 ${index % 2 === 0 ? '-left-1.5' : '-right-1.5'}`}></div>
            
            <h3 className="mb-3 font-bold text-slate-800 dark:text-slate-100 text-xl flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              <span>{item.phase}</span>
            </h3>
            
            <ul className="text-sm leading-snug tracking-wide text-slate-600 dark:text-slate-400 space-y-2">
              {item.events.map((event, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
