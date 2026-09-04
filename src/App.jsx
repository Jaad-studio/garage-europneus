import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TireWidget from './components/TireWidget';
import Services from './components/Services';
import Reviews from './components/Reviews';
import CarsCatalog from './components/CarsCatalog';
import FAQ from './components/FAQ';
import ContactMap from './components/ContactMap';
import Footer from './components/Footer';
import FloatingCallButton from './components/FloatingCallButton';

import VideoShowcase from './components/VideoShowcase';

function App() {
  const [quoteRequest, setQuoteRequest] = useState(null);

  const handleRequestQuote = (details) => {
    setQuoteRequest(details);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <Header />
      
      <main>
        <Hero />

        {/* 1. Véhicules d'Occasion Section */}
        <section id="occasions">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Véhicules d'Occasion (63 Annonces)</span>
              <h2 className="section-title">Parc d'Exposition de 2200 m² avec Atelier Mécanique & Préparation</h2>
              <p className="section-desc">
                Achat & vente de véhicules d'occasion Tourisme (VP) & Utilitaires (VU). Plus de 24 ans d'expertise à Mours Saint-Eusèbe.
              </p>
            </div>
            <CarsCatalog />
          </div>
        </section>

        {/* 2. Prestations & Révision Section */}
        <section id="services" className="section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Notre Savoir-Faire</span>
              <h2 className="section-title">Révision, Vidange Toutes Marques & Prestations</h2>
              <p className="section-desc">
                Révision constructeur complète sur devis avec garantie préservée, forfaits d'entretien toutes marques, recharge climatisation auto, rénovation d'optiques de phares et pièces neuves.
              </p>
            </div>
            <Services />
          </div>
        </section>

        {/* 3. Vidéos Immersion Section */}
        <VideoShowcase />

        {/* 4. Client Reviews */}
        <Reviews />

        {/* 4. Pneumatiques Section */}
        <section id="pneus">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Pneumatiques Discount & Express</span>
              <h2 className="section-title">Toutes les plus grandes marques de pneus</h2>
              <p className="section-desc">
                Fournisseur de pneus 1er prix et grandes marques pour véhicules de tourisme (VP) et utilitaires (VU). Disponibilité sous 2h en atelier à Mours Saint-Eusèbe.
              </p>
            </div>
            <TireWidget onRequestQuote={handleRequestQuote} />
          </div>
        </section>

        <FAQ />

        <section id="contact" className="section-alt">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Contact & Accès</span>
              <h2 className="section-title">Venez chez EuroPneus Mours Saint-Eusèbe</h2>
              <p className="section-desc">
                Une question ? Un devis pour vos pneus sous 2h ou une révision ? Envoyez un message ou appelez direct au 04 75 71 33 06.
              </p>
            </div>
            <ContactMap initialQuoteRequest={quoteRequest} clearQuoteRequest={() => setQuoteRequest(null)} />
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Action Call Button */}
      <FloatingCallButton />
    </div>
  );
}

export default App;
