import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatDate } from '../utils/dateHelpers';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SleepTracker() {
  const [sleepData, setSleepData] = useLocalStorage('sleepData', {});
  const [hours, setHours] = useState('');
  const todayKey = formatDate(new Date());

  const addSleep = () => {
    if (!hours || isNaN(hours) || hours < 0) return;
    const updated = { ...sleepData, [todayKey]: Number(hours) };
    setSleepData(updated);
    setHours('');
  };

  // Prepare data for last 7 days
  const dates = [];
  const values = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = formatDate(d);
    dates.push(key.slice(5));
    values.push(sleepData[key] || 0);
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Hours of Sleep',
        data: values,
        fill: false,
        borderColor: 'rgb(74, 144, 226)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: { y: { min: 0, max: 12 } },
  };

  return (
    <div>
      <h2>Sleep Tracker</h2>
      <div>
        <input
          type="number"
          placeholder="Hours slept today"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="0"
          max="24"
          step="0.1"
        />
        <button onClick={addSleep}>Log Sleep</button>
      </div>

      <h3>Last 7 Days Sleep</h3>
      <div className="sleep-graph">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
