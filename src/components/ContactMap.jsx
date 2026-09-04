import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Navigation, MessageSquare, Calendar } from 'lucide-react';
import BookingSystem from './BookingSystem';

export default function ContactMap({ initialQuoteRequest, clearQuoteRequest }) {
  const [activeTab, setActiveTab] = useState('message'); // 'message' or 'booking'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Général',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialQuoteRequest) {
      setActiveTab('message'); // Switch to message tab to display the pre-filled quote
      setFormData(prev => ({
        ...prev,
        subject: initialQuoteRequest.type,
        message: initialQuoteRequest.message
      }));
    }
  }, [initialQuoteRequest]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting contact message:", formData);
    setSubmitted(true);
    if (clearQuoteRequest) {
      clearQuoteRequest();
    }
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'Général',
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="contact-grid grid-2">
      {/* Interactive Form Card (Contact Message OR Booking Wizard) */}
      <div className="glass-card contact-form-card" style={{ padding: '2rem' }}>
        {/* Form Tab Switcher */}
        <div className="catalog-filters" style={{ marginBottom: '1.75rem', display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <button
            className={`filter-tab-btn ${activeTab === 'message' ? 'active' : ''}`}
            onClick={() => setActiveTab('message')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexGrow: 1, justifyContent: 'center' }}
          >
            <MessageSquare size={14} />
            <span>Envoyer un message</span>
          </button>
          
          <button
            className={`filter-tab-btn ${activeTab === 'booking' ? 'active' : ''}`}
            onClick={() => setActiveTab('booking')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexGrow: 1, justifyContent: 'center' }}
          >
            <Calendar size={14} />
            <span>Prendre RDV en ligne</span>
          </button>
        </div>

        {activeTab === 'message' ? (
          <>
            {initialQuoteRequest && (
              <div className="quote-banner">
                <span className="quote-banner-tag">Formulaire pré-rempli</span>
                <p>Demande pour : <strong>{initialQuoteRequest.title}</strong></p>
              </div>
            )}

            {submitted ? (
              <div className="form-success-message">
                <CheckCircle2 size={44} className="text-success" />
                <h3>Message envoyé !</h3>
                <p>L'équipe d'EuroPneus vous recontactera très rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Nom / Prénom</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-input" 
                    required 
                    placeholder="Ex. Jean Dupont"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Téléphone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-input" 
                      required 
                      placeholder="Ex. 06 12 34 56 78"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input" 
                      required 
                      placeholder="Ex. jean.dupont@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Sujet de votre demande</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="Général">Demande de Renseignements</option>
                    <option value="Pneus">Commande de Pneus Discount</option>
                    <option value="Mecanique">Entretien & Réparation Mécanique</option>
                    <option value="Vehicule">Renseignements Véhicule d'Occasion</option>
                    <option value="Pieces">Commande de Pièces Détachées</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message / Détails</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-textarea" 
                    rows="4" 
                    required
                    placeholder="Décrivez votre demande..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  <Send size={16} />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </>
        ) : (
          <BookingSystem />
        )}
      </div>

      {/* Info & Map display */}
      <div className="contact-info-column">
        {/* Info Cards */}
        <div className="contact-details-grid">
          <div className="glass-card info-item-card">
            <MapPin size={24} className="info-icon orange" />
            <div className="info-text-box">
              <h4>Adresse du garage</h4>
              <p>2, Rue Anders Celcius</p>
              <p>26540 Mours Saint Eusèbe</p>
              <p className="sub-area">Secteur Romans-sur-Isère - Drôme (26)</p>
            </div>
          </div>

          <div className="glass-card info-item-card">
            <Clock size={24} className="info-icon cyan" />
            <div className="info-text-box">
              <h4>Horaires d'ouverture</h4>
              <p>Lundi au Vendredi : 8h30 - 12h00 / 14h00 - 18h00</p>
              <p className="closed-day">Samedi & Dimanche : Fermé</p>
            </div>
          </div>
        </div>

        {/* Real Interactive Google Maps Card */}
        <div className="glass-card custom-map-card" style={{ height: '240px' }}>
          <div className="map-view" style={{ height: '100%', position: 'relative' }}>
            <iframe 
              title="Plan de localisation EuroPneus"
              width="100%" 
              height="180px" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight="0" 
              marginWidth="0" 
              src="https://maps.google.com/maps?q=2%20Rue%20Anders%20Celcius%2026540%20Mours%20Saint%20Eus%C3%A8be&t=&z=14&ie=UTF8&iwloc=&output=embed"
              style={{ border: 0, display: 'block' }}
            ></iframe>
            
            <div className="map-footer-row" style={{ borderTop: '1px solid var(--border-color)', height: '60px' }}>
              <div className="map-info">
                <span>2, Rue Anders Celcius - Mours</span>
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=2+Rue+Anders+Celcius+26540+Mours+Saint+Eusebe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm gps-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Navigation size={12} />
                <span>Itinéraire GPS</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
