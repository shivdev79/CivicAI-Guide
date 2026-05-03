import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import Learn from './pages/Learn';
import TimelineView from './pages/TimelineView';
import Guide from './pages/Guide';
import Ballot from './pages/Ballot';
import ElectionMap from './pages/ElectionMap';

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-dark-950 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/timeline" element={<TimelineView />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/ballot" element={<Ballot />} />
            <Route path="/map" element={<ElectionMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
