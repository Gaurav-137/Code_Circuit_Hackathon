import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatDate } from '../utils/dateHelpers';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MentalHealthJournal() {
  const [journal, setJournal] = useLocalStorage('journalEntries', []);
  const [entryText, setEntryText] = useState('');
  const [tags, setTags] = useState('');
  const [mood, setMood] = useState(2);

  const moods = ['😢', '😐', '🙂', '😊', '😁'];

  const addEntry = () => {
    if (!entryText.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: formatDate(new Date()),
      text: entryText,
      tags: tags.split(',').map((t) => t.trim()).filter((t) => t),
      mood,
    };
    setJournal([newEntry, ...journal]);
    setEntryText('');
    setTags('');
    setMood(2);
  };

  // Entries per day last 7 days
  const last7days = Array(7).fill(0);
  const datesLabels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    datesLabels.push(formatDate(d));
  }

  datesLabels.forEach((date, idx) => {
    journal.forEach((e) => {
      if (e.date === date) last7days[idx]++;
    });
  });

  const data = {
    labels: datesLabels,
    datasets: [
      {
        label: 'Entries per Day',
        data: last7days,
        backgroundColor: 'rgb(74, 144, 226)',
      },
    ],
  };

  return (
    <div>
      <h2>Weekly Mental Health Journal</h2>

      <textarea
        placeholder="Write your journal entry..."
        rows={4}
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />
      <label>Mood: </label>
      {moods.map((emoji, i) => (
        <button
          key={i}
          className="emoji-button"
          style={{ transform: mood === i ? 'scale(1.3)' : 'scale(1)' }}
          onClick={() => setMood(i)}
          aria-label={`Mood ${emoji}`}
        >
          {emoji}
        </button>
      ))}
      <br />
      <button onClick={addEntry} style={{ marginTop: '10px' }}>
        Add Entry
      </button>

      <h3>Entries</h3>
      {journal.length === 0 ? (
        <p>No journal entries yet.</p>
      ) : (
        journal.map(({ id, date, text, tags, mood }) => (
          <div key={id} className="journal-entry">
            <div>
              <strong>{date}</strong> {moods[mood]}{' '}
              {tags.map((tag, i) => (
                <span key={i} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
            <p>{text}</p>
          </div>
        ))
      )}

      <h3>Entries Over Last 7 Days</h3>
      <Bar data={data} />
    </div>
  );
}
