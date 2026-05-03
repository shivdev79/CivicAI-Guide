import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';

const stateData = {
  "California": { abbr: "CA", primary: "March 5", deadline: "Feb 20", early: "29 days before", color: "#3B82F6" },
  "Texas": { abbr: "TX", primary: "March 5", deadline: "Feb 5", early: "17 days before", color: "#EF4444" },
  "New York": { abbr: "NY", primary: "April 2", deadline: "March 23", early: "10 days before", color: "#8B5CF6" },
  "Florida": { abbr: "FL", primary: "March 19", deadline: "Feb 20", early: "10 days before", color: "#F59E0B" },
  "Pennsylvania": { abbr: "PA", primary: "April 23", deadline: "April 8", early: "50 days before", color: "#10B981" },
  "Ohio": { abbr: "OH", primary: "March 19", deadline: "Feb 20", early: "28 days before", color: "#EC4899" },
  "Illinois": { abbr: "IL", primary: "March 19", deadline: "Feb 20", early: "40 days before", color: "#06B6D4" },
  "Georgia": { abbr: "GA", primary: "March 12", deadline: "Feb 12", early: "21 days before", color: "#F97316" },
  "Michigan": { abbr: "MI", primary: "Feb 27", deadline: "Feb 12", early: "45 days before", color: "#14B8A6" },
  "Arizona": { abbr: "AZ", primary: "March 19", deadline: "Feb 20", early: "27 days before", color: "#A855F7" },
  "Virginia": { abbr: "VA", primary: "March 5", deadline: "Feb 12", early: "45 days before", color: "#6366F1" },
  "North Carolina": { abbr: "NC", primary: "March 5", deadline: "Feb 9", early: "N/A (absentee)", color: "#D946EF" },
};

export default function ElectionMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Interactive Election Map</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Click on any state card to explore its specific election deadlines and voting information.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* State Grid */}
        <div className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Object.entries(stateData).map(([name, data]) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected({ name, ...data })}
              className={`glass-card p-4 text-center transition-all relative overflow-hidden group ${
                selected?.name === name ? 'ring-2 ring-primary-500 shadow-xl' : ''
              }`}
            >
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" 
                style={{ backgroundColor: data.color }}
              />
              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  style={{ backgroundColor: data.color }}
                >
                  {data.abbr}
                </div>
                <p className="text-sm font-semibold truncate">{name}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Details Panel */}
        <div className="lg:w-1/3">
          <div className="glass-card p-6 min-h-[400px] sticky top-28">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div 
                  key={selected.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-white/10 pb-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                      style={{ backgroundColor: selected.color }}
                    >
                      {selected.abbr}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selected.name}</h3>
                      <p className="text-sm text-slate-500">Election Info</p>
                    </div>
                  </div>

                  <InfoRow icon={<Calendar className="w-5 h-5 text-blue-500" />} label="Primary Date" value={selected.primary} />
                  <InfoRow icon={<Clock className="w-5 h-5 text-amber-500" />} label="Registration Deadline" value={selected.deadline} />
                  <InfoRow icon={<CheckCircle2 className="w-5 h-5 text-green-500" />} label="Early Voting" value={selected.early} />

                  <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800/30">
                    <p className="text-sm text-primary-700 dark:text-primary-300 flex items-start space-x-2">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Always verify with the official state election office for the most current information.</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-3 py-20"
                >
                  <Info className="w-14 h-14" />
                  <p className="text-lg font-medium">Select a state to view its election data.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-dark-900 rounded-xl">
      {icon}
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">{label}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}
