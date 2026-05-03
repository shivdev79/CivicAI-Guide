import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const target = new Date(targetDate);
    if (now >= target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: differenceInDays(target, now),
      hours: differenceInHours(target, now) % 24,
      minutes: differenceInMinutes(target, now) % 60,
      seconds: differenceInSeconds(target, now) % 60
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex space-x-4 justify-center my-6">
      <TimeBox value={timeLeft.days} label="Days" />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center glass-card px-4 py-3 min-w-[80px]">
      <span className="text-3xl font-bold text-primary-500 font-mono">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">{label}</span>
    </div>
  );
}
