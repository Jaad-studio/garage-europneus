import React from 'react';
import { Clock, CheckCircle2, Phone, ShieldCheck, Wrench } from 'lucide-react';

const TIRE_BRANDS = [
  { name: "Michelin", category: "Premium" },
  { name: "Continental", category: "Premium" },
  { name: "Goodyear", category: "Premium" },
  { name: "Pirelli", category: "Premium" },
  { name: "Hankook", category: "Qualité Supérieure" },
  { name: "Kleber", category: "Qualité Supérieure" },
  { name: "Evergreen", category: "Économique" },
  { name: "CEAT", category: "Économique" },
  { name: "Westlake", category: "Économique" },
  { name: "Taurus", category: "Économique" },
  { name: "1er Prix Eco", category: "Budget" }
];

export default function TireWidget({ onRequestQuote }) {
  return (
    <div className="tire-widget-container">
      {/* Highlight Banner: Disponibilité 2h */}
      <div className="glass-card chrome-accent" style={{ padding: '1.5rem 2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(34, 197, 94, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#22c55e', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)' }}>
            <Clock size={26} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>⚡ Pneus disponibles sous 2h !</h3>
            <p style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '0.15rem' }}>
              Livraison express sous 2 heures avec montage, équilibrage & valves en atelier à Mours Saint-Eusèbe.
            </p>
          </div>
        </div>

        <a href="tel:0475713306" className="btn btn-primary" style={{ padding: '0.7rem 1.2rem', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
          <Phone size={15} />
          <span>Commander : 04 75 71 33 06</span>
        </a>
      </div>

      {/* Brand Catalog Showcase - Compact List */}
      <div className="glass-card grid-tarifs-card" style={{ padding: '1.75rem 2rem' }}>
        <div className="results-header" style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 className="card-heading-title" style={{ fontSize: '1.3rem', fontWeight: 900, color: '#ffffff' }}>
              Marques de Pneus Disponibles au Garage
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
              Tourisme (VP), Utilitaires (VU), 4x4 et SUV toutes dimensions.
            </p>
          </div>
          <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
            <ShieldCheck size={13} /> Toutes Tailles & Profils
          </span>
        </div>

        {/* Compact Brands List */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.5rem' }}>
          {TIRE_BRANDS.map((brand, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.55rem', 
                background: 'rgba(30, 41, 59, 0.95)', 
                border: '1px solid rgba(255, 255, 255, 0.18)', 
                padding: '0.5rem 0.9rem', 
                borderRadius: '30px', 
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              <CheckCircle2 size={15} style={{ color: '#4ade80', flexShrink: 0 }} />
              <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#ffffff' }}>{brand.name}</span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', background: 'rgba(255, 255, 255, 0.08)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {brand.category}
              </span>
            </div>
          ))}
        </div>

        <div className="tire-disclaimer-info" style={{ marginTop: '1rem', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '10px', padding: '1rem' }}>
          <Wrench size={18} className="text-green" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
            <strong>Montage, Équilibrage & Valves sur place :</strong> Pour connaître le tarif exact selon la dimension de vos jantes et obtenir votre devis sous 2h, contactez direct l'atelier au <a href="tel:0475713306" className="phone-inline" style={{ color: '#4ade80', fontWeight: 800, textDecoration: 'underline' }}>04 75 71 33 06</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
