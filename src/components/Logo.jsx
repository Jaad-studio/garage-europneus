import React from 'react';

export default function Logo({ variant = 'dark', height = 45 }) {
  const brandGreen = '#22c55e'; // Kelly Green
  const textColor = variant === 'light' ? '#ffffff' : '#ffffff';
  const secondaryTextColor = variant === 'light' ? '#cbd5e1' : '#e2e8f0';

  return (
    <div className="brand-logo-container" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
      {/* Official transparent emblem */}
      <img 
        src="/logo-europneus-transparent.png" 
        alt="Garage EuroPneus Emblem" 
        style={{ 
          height: `${height * 1.15}px`, 
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }} 
      />

      {/* Centered Text Logo: GARAGE EURO PNEUS */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <span style={{ 
          fontFamily: "Impact, 'Arial Black', sans-serif", 
          fontSize: `${height * 0.48}px`, 
          fontWeight: 900, 
          letterSpacing: '0.04em',
          color: textColor,
          lineHeight: 1.05,
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}>
          <span style={{ color: brandGreen }}>G</span>ARAGE <span style={{ color: brandGreen }}>E</span>URO <span style={{ color: brandGreen }}>P</span>NEUS
        </span>
        <span style={{ 
          fontFamily: "Impact, 'Arial Black', sans-serif", 
          fontSize: `${height * 0.2}px`, 
          fontWeight: 800, 
          letterSpacing: '0.06em',
          color: secondaryTextColor,
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          marginTop: '0.1rem',
          textAlign: 'center'
        }}>
          <span style={{ color: brandGreen }}>A</span>CHAT - <span style={{ color: brandGreen }}>V</span>ENTE - <span style={{ color: brandGreen }}>R</span>EPRISE - <span style={{ color: brandGreen }}>E</span>NTRETIEN
        </span>
      </div>
    </div>
  );
}
