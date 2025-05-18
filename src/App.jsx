import React, { useState } from 'react';

// Minimal dummy components for testing:
const MoodTracker = () => <div><h2>Mood Tracker Component</h2></div>;
const WaterIntakeTracker = () => <div><h2>Water Intake Tracker Component</h2></div>;
const BreathingAnimation = () => <div><h2>Breathing Animation Component</h2></div>;

export default function App() {
  const [activeTab, setActiveTab] = useState('mood');

  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20 }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1>Health & Wellness Dashboard</h1>
        <nav style={{ marginTop: 10 }}>
          <button
            onClick={() => setActiveTab('mood')}
            style={{ marginRight: 10, padding: 10 }}
          >
            Mood
          </button>
          <button
            onClick={() => setActiveTab('water')}
            style={{ marginRight: 10, padding: 10 }}
          >
            Water
          </button>
          <button onClick={() => setActiveTab('breathing')} style={{ padding: 10 }}>
            Breathing
          </button>
        </nav>
      </header>

      <main style={{ minHeight: 400, border: '1px solid #ddd', padding: 20 }}>
        {activeTab === 'mood' && <MoodTracker />}
        {activeTab === 'water' && <WaterIntakeTracker />}
        {activeTab === 'breathing' && <BreathingAnimation />}
      </main>
    </div>
  );
}
