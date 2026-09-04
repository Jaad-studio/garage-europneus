import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Shield } from 'lucide-react';
import Logo from './Logo';
import { TikTokIcon, InstagramIcon, FacebookIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top-row">
        <div className="footer-brand-box">
          <div style={{ marginBottom: '1.25rem' }}>
            <Logo variant="light" height={36} />
          </div>
          <p className="footer-tagline">
            Votre garagiste de confiance dans la Drôme à Mours Saint-Eusèbe depuis 24 ans. Pneus toutes marques disponibles sous 2h, révision constructeur sur devis, pièces neuves et parc d'exposition 2200m² avec atelier mécanique et préparation.
          </p>
          
          <div className="social-follow-box">
            <h5 className="social-title">Suivez-nous sur les réseaux :</h5>
            <div className="social-buttons-list">
              <a href="https://www.tiktok.com/@garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-footer-btn tiktok" title="TikTok @garage.euro.pneus">
                <TikTokIcon size={18} />
                <span>TikTok</span>
              </a>
              <a href="https://www.instagram.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-footer-btn instagram" title="Instagram @garage.euro.pneus">
                <InstagramIcon size={18} />
                <span>Instagram</span>
              </a>
              <a href="https://www.facebook.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-footer-btn facebook" title="Facebook Garage EuroPneus">
                <FacebookIcon size={18} />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <div className="badge badge-cyan footer-badge" style={{ marginTop: '1rem' }}>
            <Shield size={12} />
            Occasions & Pneus garantis
          </div>
        </div>

        <div className="footer-links-box">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#" onClick={scrollToTop}>Accueil</a></li>
            <li><a href="#occasions" onClick={(e) => handleNavClick(e, 'occasions')}>Véhicules d'Occasion</a></li>
            <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Révision & Prestations</a></li>
            <li><a href="#pneus" onClick={(e) => handleNavClick(e, 'pneus')}>Nos Pneus</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & Plan d'accès</a></li>
          </ul>
        </div>

        <div className="footer-contact-box">
          <h4>Garage EuroPneus</h4>
          <ul>
            <li className="footer-contact-item">
              <MapPin size={16} className="text-highlight" />
              <span>2, Rue Anders Celsius, 26540 Mours Saint-Eusèbe</span>
            </li>
            <li className="footer-contact-item">
              <Phone size={16} className="text-highlight" />
              <a href="tel:0475713306" className="footer-link">04 75 71 33 06</a>
            </li>
            <li className="footer-contact-item">
              <Mail size={16} className="text-highlight" />
              <a href="mailto:garageeuropneus@hotmail.fr" className="footer-link">garageeuropneus@hotmail.fr</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-row">
        <div className="container bottom-container">
          <p className="copyright-text">
            © {new Date().getFullYear()} Garage EuroPneus. Tous droits réservés. 
            <span className="legal-divider">|</span> 
            <a href="#legal" className="footer-sublink">Mentions Légales</a>
          </p>
          
          <div className="footer-credits">
            <span>Infographie & Web Design : <a href="http://www.faureeric.com" target="_blank" rel="noopener noreferrer" className="credit-link">www.faureeric.com</a></span>
            <span className="credit-separator">•</span>
            <span>Imprimés moins chers : <a href="http://www.numeerix.com" target="_blank" rel="noopener noreferrer" className="credit-link">www.numeerix.com</a></span>
          </div>

          <a href="#" className="btn btn-secondary back-to-top-btn" onClick={scrollToTop} aria-label="Retour en haut">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
