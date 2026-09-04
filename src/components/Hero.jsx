import React from 'react';
import { Shield, ChevronRight, Star, MapPin } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid container grid-2">
        <div className="hero-content">
          <div className="badge-container" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span className="badge badge-green">
              <Shield size={12} />
              Garantie & Expertise depuis 24 ans
            </span>

            {/* Clickable Average Rating Badge on Homepage */}
            <a 
              href="#avis" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('avis');
              }}
              className="hero-rating-badge"
              title="Voir les 142 avis clients Google (Note 4.8/5)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(251, 191, 36, 0.6)',
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                cursor: 'pointer',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
              }}
            >
              <span style={{ fontWeight: 900, color: '#ffffff', fontSize: '0.85rem' }}>4.8 / 5</span>
              <div style={{ display: 'flex', gap: '0.1rem', color: '#fbbf24' }}>
                <Star fill="#fbbf24" size={13} strokeWidth={0} />
                <Star fill="#fbbf24" size={13} strokeWidth={0} />
                <Star fill="#fbbf24" size={13} strokeWidth={0} />
                <Star fill="#fbbf24" size={13} strokeWidth={0} />
                <Star fill="#fbbf24" size={13} strokeWidth={0} />
              </div>
              <span style={{ fontSize: '0.75rem', color: '#e2e8f0', fontWeight: 600 }}>(142 avis Google)</span>
            </a>
          </div>
          
          <h1 className="hero-title">
            Garage <span className="text-highlight">EuroPneus</span> <br />
            L'entretien auto au juste prix
          </h1>
          
          <p className="hero-description">
            Votre garagiste spécialiste en entretien et mécanique auto & utilitaire à Mours Saint-Eusèbe. Parc d’exposition de 2200m² avec atelier mécanique, atelier préparation & recharge de clim, et un large choix de pneus au meilleur prix.
          </p>
          
          <div className="hero-actions-row">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('pneus')}
            >
              Consulter nos Marques de Pneus
              <ChevronRight size={16} />
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => scrollToSection('occasions')}
            >
              Notre Parc Occasion (2200m²)
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">2200 m²</span>
              <span className="stat-label">Atelier, Préparation & Clim</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Pièces Neuves</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">24 ans</span>
              <span className="stat-label">D'expérience</span>
            </div>
          </div>
        </div>

        {/* Real Authentic Garage Photos Gallery */}
        <div className="hero-gallery-clean">
          <div className="hero-photo-card">
            <div className="hero-photo-img-box">
              <img src="/garage-facade.jpg" alt="Garage Euro Pneus Mours - Façade et parc de véhicules" />
            </div>
            <div className="hero-photo-caption">
              <MapPin size={13} style={{ color: '#22c55e' }} />
              <span>Parc 2200m² & Façade EuroPneus</span>
            </div>
          </div>

          <div className="hero-photo-card">
            <div className="hero-photo-img-box">
              <img src="/garage-showroom.jpg" alt="Showroom intérieur Garage Euro Pneus Mours" />
            </div>
            <div className="hero-photo-caption">
              <Star size={13} fill="#fbbf24" style={{ color: '#fbbf24' }} />
              <span>Showroom Intérieur</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
