import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const DAILY_GOAL = 8;

export default function WaterIntakeTracker() {
  const [waterCount, setWaterCount] = useLocalStorage('waterCount', 0);

  const addCup = () => {
    if (waterCount < DAILY_GOAL) {
      setWaterCount(waterCount + 1);
    }
  };

  const removeCup = () => {
    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
    }
  };

  return (
    <div>
      <h2>Water Intake Tracker</h2>
      <p>Track your daily water intake. Goal: {DAILY_GOAL} cups.</p>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[...Array(DAILY_GOAL)].map((_, idx) => (
          <button
            key={idx}
            className={`cup-button ${idx < waterCount ? 'filled' : ''}`}
            onClick={() => {
              if (idx + 1 === waterCount) removeCup();
              else setWaterCount(idx + 1);
            }}
            aria-label={`${idx + 1} cups`}
          >
            💧
          </button>
        ))}
      </div>
      <p>
        {waterCount} / {DAILY_GOAL} cups
      </p>
      <button onClick={() => setWaterCount(0)}>Reset</button>
    </div>
  );
}
