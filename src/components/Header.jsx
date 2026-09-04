import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { TikTokIcon, InstagramIcon, FacebookIcon } from './SocialIcons';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
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
    <header className="header-wrapper-fixed">
      {/* Main Header Bar */}
      <div className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="logo" onClick={(e) => handleNavClick(e, 'hero')}>
            <Logo variant="light" height={38} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <a href="#occasions" onClick={(e) => handleNavClick(e, 'occasions')}>Véhicules d'Occasion</a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Prestations & Révision</a>
            <a href="#videos" onClick={(e) => handleNavClick(e, 'videos')}>Vidéos Atelier</a>
            <a href="#pneus" onClick={(e) => handleNavClick(e, 'pneus')}>Nos Pneus</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & Accès</a>
          </nav>

          {/* Header Action Buttons & Social Icons */}
          <div className="header-actions">
            <div className="header-social-icons desktop-only">
              <a href="https://www.tiktok.com/@garage.euro.pneus" target="_blank" rel="noopener noreferrer" title="TikTok @garage.euro.pneus" className="social-icon-btn tiktok">
                <TikTokIcon size={14} />
              </a>
              <a href="https://www.instagram.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" title="Instagram @garage.euro.pneus" className="social-icon-btn instagram">
                <InstagramIcon size={14} />
              </a>
              <a href="https://www.facebook.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" title="Facebook Garage EuroPneus" className="social-icon-btn facebook">
                <FacebookIcon size={14} />
              </a>
            </div>

            <a href="tel:0475713306" className="btn btn-primary call-btn" title="Appeler 04 75 71 33 06">
              <Phone size={15} />
              <span className="call-btn-text">04 75 71 33 06</span>
            </a>

            <button 
              className="mobile-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isOpen && (
          <div className="mobile-nav-drawer open">
            <nav className="mobile-nav-links">
              <a href="#occasions" onClick={(e) => handleNavClick(e, 'occasions')}>Véhicules d'Occasion</a>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>Prestations & Révision</a>
              <a href="#pneus" onClick={(e) => handleNavClick(e, 'pneus')}>Nos Pneus</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact & Accès</a>

              <div className="mobile-social-bar">
                <span className="social-label">Suivez-nous :</span>
                <div className="mobile-social-links">
                  <a href="https://www.tiktok.com/@garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-badge tiktok">
                    <TikTokIcon size={16} /> @garage.euro.pneus
                  </a>
                  <a href="https://www.instagram.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-badge instagram">
                    <InstagramIcon size={16} /> @garage.euro.pneus
                  </a>
                  <a href="https://www.facebook.com/garage.euro.pneus" target="_blank" rel="noopener noreferrer" className="social-badge facebook">
                    <FacebookIcon size={16} /> Facebook
                  </a>
                </div>
              </div>

              <a href="tel:0475713306" className="btn btn-primary mobile-call-link">
                <Phone size={16} />
                <span>Appeler le Garage : 04 75 71 33 06</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
