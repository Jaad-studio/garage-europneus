import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Car, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const SERVICES = [
  { id: 'revision', name: 'Révision Constructeur Complète', desc: 'Vidange, filtres, diag électronique & garantie préservée' },
  { id: 'pneus', name: 'Montage & Équilibrage Pneus', desc: 'Sélection EuroPneus, Kleber, Michelin...' },
  { id: 'vidange', name: 'Forfait Vidange & Entretien', desc: 'Huile 5W30/5W40 + Filtres' },
  { id: 'lavage', name: 'Lavage Auto en Profondeur', desc: 'Nettoyage intérieur & extérieur' },
  { id: 'phares', name: 'Restauration Phares / Optiques', desc: 'Rénovation sans rendez-vous' },
  { id: 'mecanique', name: 'Mécanique Générale / Diagnostic', desc: 'Suspension, Freinage, Courroie...' }
];

const TIME_SLOTS = [
  '08h00 - 10h00',
  '10h00 - 12h00',
  '14h00 - 16h00',
  '16h00 - 18h00'
];

export default function BookingSystem() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: ''
  });
  const [bookingId, setBookingId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2 && (!selectedDate || !selectedTime)) return;
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to save booking
    const generatedId = 'EP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setStep(4);
  };

  // Get tomorrow's date for minimum calendar selection date
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="booking-wizard">
      {step < 4 && (
        <div className="booking-steps-indicator">
          <div className={`step-node ${step >= 1 ? 'active' : ''}`}>1. Prestation</div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`step-node ${step >= 2 ? 'active' : ''}`}>2. Date & Heure</div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
          <div className={`step-node ${step >= 3 ? 'active' : ''}`}>3. Coordonnées</div>
        </div>
      )}

      {step === 1 && (
        <div className="booking-step-content animate-fade-in">
          <h4>Sélectionnez votre prestation :</h4>
          <div className="booking-services-grid">
            {SERVICES.map(srv => (
              <div 
                key={srv.id} 
                className={`booking-service-card ${selectedService === srv.name ? 'selected' : ''}`}
                onClick={() => setSelectedService(srv.name)}
              >
                <div className="service-radio"></div>
                <div className="service-details">
                  <h5>{srv.name}</h5>
                  <p>{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="booking-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={!selectedService}
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="booking-step-content animate-fade-in">
          <h4>Choisissez le jour et l'horaire :</h4>
          <div className="booking-datetime-layout">
            <div className="form-group date-picker-group">
              <label className="form-label"><CalendarIcon size={14} /> Date du rendez-vous</label>
              <input 
                type="date" 
                className="form-input"
                min={getMinDate()}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="time-slots-group">
              <label className="form-label"><Clock size={14} /> Créneaux horaires disponibles</label>
              <div className="time-slots-grid">
                {TIME_SLOTS.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot-btn ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="booking-actions">
            <button className="btn btn-secondary" onClick={handlePrev}>
              <ChevronLeft size={16} />
              <span>Retour</span>
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
            >
              <span>Continuer</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="booking-step-content animate-fade-in">
          <h4>Saisissez vos informations :</h4>
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label"><User size={14} /> Nom complet</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  required 
                  placeholder="Ex. Jean Dupont"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">📞 Téléphone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="form-input" 
                  required 
                  placeholder="Ex. 06 12 34 56 78"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">✉ E-mail</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  required 
                  placeholder="Ex. jean@email.com"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label"><Car size={14} /> Véhicule (Marque, Modèle, Immat)</label>
                <input 
                  type="text" 
                  name="vehicle" 
                  className="form-input" 
                  required 
                  placeholder="Ex. Peugeot 208 - AA-123-AA"
                  value={customerInfo.vehicle}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="booking-summary-box">
              <h5>Récapitulatif de votre réservation :</h5>
              <ul>
                <li><strong>Prestation :</strong> {selectedService}</li>
                <li><strong>Date :</strong> {selectedDate.split('-').reverse().join('/')}</li>
                <li><strong>Horaire :</strong> {selectedTime}</li>
              </ul>
            </div>

            <div className="booking-actions">
              <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                <ChevronLeft size={16} />
                <span>Retour</span>
              </button>
              <button type="submit" className="btn btn-primary">
                Confirmer le rendez-vous
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 4 && (
        <div className="booking-success-content animate-fade-in">
          <CheckCircle2 size={56} className="text-success" />
          <h3>Rendez-vous pré-enregistré !</h3>
          <p>
            Votre demande de réservation a été enregistrée avec la référence <strong>{bookingId}</strong>.
          </p>
          
          <div className="success-recap-box">
            <ul>
              <li><strong>Prestation :</strong> {selectedService}</li>
              <li><strong>Date & Heure :</strong> Le {selectedDate.split('-').reverse().join('/')} à {selectedTime}</li>
              <li><strong>Véhicule :</strong> {customerInfo.vehicle}</li>
              <li><strong>Client :</strong> {customerInfo.name} ({customerInfo.phone})</li>
            </ul>
          </div>
          
          <p className="success-note">
            L'équipe d'EuroPneus va valider votre créneau et vous envoyer un e-mail/SMS de confirmation dans les plus brefs délais. Merci de votre confiance !
          </p>
          
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setStep(1);
              setSelectedService('');
              setSelectedDate('');
              setSelectedTime('');
              setCustomerInfo({ name: '', phone: '', email: '', vehicle: '' });
            }}
          >
            Prendre un autre rendez-vous
          </button>
        </div>
      )}
    </div>
  );
}
