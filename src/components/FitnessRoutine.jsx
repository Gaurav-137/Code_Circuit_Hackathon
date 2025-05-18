import React, { useState, useRef } from 'react';

const exercises = [
  { id: 1, name: 'Jumping Jacks', duration: 30 },
  { id: 2, name: 'Push Ups', duration: 45 },
  { id: 3, name: 'Squats', duration: 40 },
  { id: 4, name: 'Plank', duration: 60 },
];

export default function FitnessRoutine() {
  const [completed, setCompleted] = useState({});
  const [timers, setTimers] = useState({});
  const timerRefs = useRef({});

  const toggleComplete = (id) => {
    setCompleted((prev) => {
      const newCompleted = { ...prev };
      if (newCompleted[id]) {
        delete newCompleted[id];
      } else {
        newCompleted[id] = true;
      }
      return newCompleted;
    });
  };

  const startTimer = (id, duration) => {
    if (timerRefs.current[id]) return;

    setTimers((prev) => ({ ...prev, [id]: duration }));

    timerRefs.current[id] = setInterval(() => {
      setTimers((prev) => {
        const timeLeft = prev[id] - 1;
        if (timeLeft <= 0) {
          clearInterval(timerRefs.current[id]);
          delete timerRefs.current[id];
          return { ...prev, [id]: 0 };
        }
        return { ...prev, [id]: timeLeft };
      });
    }, 1000);
  };

  const stopTimer = (id) => {
    if (timerRefs.current[id]) {
      clearInterval(timerRefs.current[id]);
      delete timerRefs.current[id];
      setTimers((prev) => ({ ...prev, [id]: 0 }));
    }
  };

  return (
    <div>
      <h2>Fitness Routine Checklist</h2>
      <ul className="fitness-routine-list">
        {exercises.map(({ id, name, duration }) => (
          <li key={id}>
            <div>
              <input
                type="checkbox"
                checked={!!completed[id]}
                onChange={() => toggleComplete(id)}
              />
              <span style={{ marginLeft: 8 }}>{name}</span>
            </div>

            <div>
              <span className="timer">{timers[id] ? timers[id] + 's' : ''}</span>
              {timers[id] && timers[id] > 0 ? (
                <button onClick={() => stopTimer(id)}>Stop</button>
              ) : (
                <button onClick={() => startTimer(id, duration)}>Start {duration}s</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
