import { useState, useEffect } from 'react';
import { fetchTimeline } from '../services/api';
import Timeline from '../components/Timeline';

export default function TimelineView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeline = async () => {
      try {
        const res = await fetchTimeline();
        setData(res);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    loadTimeline();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Election Timeline</h1>
        <p className="text-slate-600 dark:text-slate-400">
          A chronoligical overview of how the electoral process unfolds over time.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div className="mt-12">
          <Timeline data={data} />
        </div>
      )}
    </div>
  );
}
