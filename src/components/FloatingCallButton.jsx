import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <div className="floating-call-container">
      <a href="tel:0475713306" className="floating-call-btn" title="Appeler le Garage EuroPneus (04 75 71 33 06)">
        <div className="call-pulse-ring"></div>
        <Phone className="call-icon" size={22} />
        <div className="call-text desktop-call-text">
          <span className="call-label">GARAGE EUROPNEUS</span>
          <span className="call-number">04 75 71 33 06</span>
        </div>
      </a>
    </div>
  );
}
