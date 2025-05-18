import React from 'react';

export default function BreathingAnimation() {
  return (
    <div>
      <h2>Breathing Animation</h2>
      <p>Follow the circle to breathe in and out smoothly.</p>

      <div className="breathing-container">
        <div className="breathing-circle" />
      </div>

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Inhale (4s) → Hold (4s) → Exhale (4s) → Hold (4s) loop
      </p>
    </div>
  );
}
