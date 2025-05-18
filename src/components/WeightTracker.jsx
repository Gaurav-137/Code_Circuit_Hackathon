import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
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

export default function WeightTracker() {
  const [weightLogs, setWeightLogs] = useLocalStorage('weightLogs', []);
  const [weightInput, setWeightInput] = useState('');
  const [dateInput, setDateInput] = useState('');

  const addWeight = () => {
    if (!weightInput || isNaN(weightInput) || !dateInput) return;

    const exists = weightLogs.findIndex((log) => log.date === dateInput);
    let newLogs = [...weightLogs];

    if (exists >= 0) {
      newLogs[exists] = { date: dateInput, weight: Number(weightInput) };
    } else {
      newLogs.push({ date: dateInput, weight: Number(weightInput) });
    }

    newLogs.sort((a, b) => new Date(a.date) - new Date(b.date));
    setWeightLogs(newLogs);
    setWeightInput('');
    setDateInput('');
  };

  const data = {
    labels: weightLogs.map((log) => log.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightLogs.map((log) => log.weight),
        borderColor: 'rgb(74, 144, 226)',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <h2>Weight Tracking Dashboard</h2>

      <div>
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weightInput}
          onChange={(e) => setWeightInput(e.target.value)}
          min="0"
          step="0.1"
        />
        <button onClick={addWeight}>Add/Update Weight</button>
      </div>

      {weightLogs.length === 0 ? (
        <p>No weight records logged.</p>
      ) : (
        <div style={{ maxWidth: '100%', height: '300px', marginTop: '20px' }}>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
}
