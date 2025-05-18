import React from 'react';

export default function HealthDashboard() {
  return (
    <div>
      <h2>Health Dashboard</h2>
      <p>
        This is a simulated dashboard that could aggregate data from wearables like heart rate,
        steps, and sleep, overlaying various graphs and metrics.
      </p>
      <p>
        For demo, you can use the other individual trackers. Future work could include syncing
        real devices.
      </p>

      {/* Placeholder: could integrate charts here in the future */}
      <div
        style={{
          border: '2px dashed #4a90e2',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '20px',
          color: '#4a90e2',
        }}
      >
        Wearable Sync + Graph Overlays Coming Soon!
      </div>
    </div>
  );
}
