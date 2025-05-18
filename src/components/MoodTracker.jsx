import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { getDaysInMonth, getFirstDayOfMonth, formatDate } from '../utils/dateHelpers';

const moods = [
  { emoji: '😢', label: 'Sad', colorClass: 'mood-1' },
  { emoji: '😐', label: 'Meh', colorClass: 'mood-2' },
  { emoji: '🙂', label: 'Okay', colorClass: 'mood-3' },
  { emoji: '😊', label: 'Good', colorClass: 'mood-4' },
  { emoji: '😁', label: 'Great', colorClass: 'mood-5' },
];

export default function MoodTracker() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const [selectedMood, setSelectedMood] = useState(null);
  const [moodData, setMoodData] = useLocalStorage('moodData', {});

  const saveMood = (moodIndex) => {
    const dateKey = formatDate(today);
    setMoodData({ ...moodData, [dateKey]: moodIndex });
    setSelectedMood(moodIndex);
  };

  useEffect(() => {
    const todayKey = formatDate(today);
    if (moodData[todayKey] !== undefined) {
      setSelectedMood(moodData[todayKey]);
    }
  }, [moodData, today]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${d
      .toString()
      .padStart(2, '0')}`;
    daysArray.push(moodData[dateKey]);
  }

  return (
    <div>
      <h2>Mood Tracker</h2>
      <p>Select your mood for today:</p>
      <div>
        {moods.map((mood, idx) => (
          <button
            key={idx}
            className="emoji-button"
            onClick={() => saveMood(idx)}
            aria-label={mood.label}
            style={{ transform: selectedMood === idx ? 'scale(1.3)' : 'scale(1)' }}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      <h3>Monthly Mood Calendar</h3>
      <div className="color-coded-calendar">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} style={{ fontWeight: 'bold', textAlign: 'center' }}>
            {d}
          </div>
        ))}

        {daysArray.map((moodIndex, i) => {
          if (moodIndex === null) {
            return <div key={i} className="color-coded-day empty"></div>;
          } else {
            return (
              <div
                key={i}
                className={`color-coded-day ${moods[moodIndex]?.colorClass || ''}`}
                title={moods[moodIndex]?.label || 'No mood logged'}
              >
                {i - firstDay + 1}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
