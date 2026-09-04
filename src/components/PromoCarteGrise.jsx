import React, { useState, useEffect } from 'react';
import { Gift, Clock, Sparkles, CheckCircle, ArrowRight, ShieldAlert, Phone } from 'lucide-react';

export default function PromoCarteGrise({ onSelectPromo }) {
  // 15 days countdown simulator or timer display
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 23, minutes: 59, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="promotion" className="promo-section">
      <div className="container">
        <div className="promo-card glass-card chrome-accent">
          <div className="promo-badge-tag">
            <Sparkles size={14} />
            <span>Offre Exclusive Limitée (15 Jours)</span>
          </div>

          <div className="promo-grid">
            <div className="promo-info">
              <div className="promo-header">
                <span className="promo-sub">PROMOTION FLASH D'ÉTÉ</span>
                <h2 className="promo-title">
                  Carte Grise <span className="highlight-gold">OFFERTE</span> sur les 15 Prochains Jours !
                </h2>
              </div>

              <p className="promo-desc">
                Pour tout achat d'un véhicule d'occasion dans notre parc de 3000 m² ou pour l'exécution d'une Révision Constructeur Complète chez EuroPneus Mours, les frais de dossier et d'établissement de votre <strong>Carte Grise vous sont entièrement OFFERTS</strong> !
              </p>

              <div className="promo-features">
                <div className="promo-feature-item">
                  <CheckCircle size={18} className="text-green" />
                  <span>Demande & Démarche d'immatriculation 100% prise en charge SIV</span>
                </div>
                <div className="promo-feature-item">
                  <CheckCircle size={18} className="text-green" />
                  <span>Valable sur tous les Véhicules d'Occasion & Forfaits Révision</span>
                </div>
                <div className="promo-feature-item">
                  <CheckCircle size={18} className="text-green" />
                  <span>Service agréé préfecture en direct au garage</span>
                </div>
              </div>

              <div className="promo-cta-group">
                <button className="btn btn-primary promo-btn" onClick={() => scrollToSection('contact')}>
                  <Gift size={18} />
                  <span>J'en Profite Maintenant</span>
                  <ArrowRight size={16} />
                </button>
                <a href="tel:0475713306" className="btn btn-secondary promo-btn-outline">
                  <Phone size={16} />
                  <span>04 75 71 33 06</span>
                </a>
              </div>
            </div>

            <div className="promo-timer-box chrome-timer-panel">
              <div className="timer-header">
                <Clock size={20} className="text-gold" />
                <span>OFFRE VALABLE ENCORE</span>
              </div>

              <div className="countdown-timer">
                <div className="timer-block">
                  <span className="timer-number">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="timer-label">Jours</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                  <span className="timer-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="timer-label">Heures</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                  <span className="timer-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="timer-label">Min</span>
                </div>
                <span className="timer-sep">:</span>
                <div className="timer-block">
                  <span className="timer-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="timer-label">Sec</span>
                </div>
              </div>

              <div className="timer-footer">
                <ShieldAlert size={14} />
                <span>Offre valable dans la limite des créneaux disponibles pendant 15 jours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
