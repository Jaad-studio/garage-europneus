import React from 'react';
import { Wrench, Sparkles, Eye, Package, ShieldCheck, CarFront, Snowflake } from 'lucide-react';

const SERVICES_DATA = [
  {
    icon: <CarFront size={32} className="service-icon-svg" />,
    title: "Révision Constructeur & Maintenance",
    description: "Révision complète conforme au carnet d'entretien constructeur avec préservation intégrale de votre garantie. Vidange huile de synthèse, filtres neufs et diagnostic valise électronique.",
    price: "Sur Devis",
    bullets: [
      "Garantie constructeur 100% préservée",
      "Passage Valise Diagnostic Multi-marques",
      "50 points de contrôle sécurité inclus"
    ],
    badge: "Révision Constructeur",
    featured: true
  },
  {
    icon: <Wrench size={32} className="service-icon-svg" />,
    title: "Forfaits Vidange Toutes Marques",
    description: "Entretien et vidange professionnelle pour toutes marques et tous modèles de véhicules (Peugeot, Renault, Citroën, Volkswagen, Audi, BMW, Mercedes, Fiat, Toyota, Ford...).",
    price: "Sur Devis",
    bullets: [
      "Huile de synthèse premium (5W30 / 5W40 / 0W20)",
      "Main d'œuvre & réinitialisation compteur vidange",
      "Remplacement filtres huile, air & habitacle"
    ],
    badge: "Toutes Marques Auto & VU",
    videoSrc: "/videos/video-2.mp4",
    videoTitle: "Entretien mécanique toutes marques"
  },
  {
    icon: <Snowflake size={32} className="service-icon-svg" />,
    title: "Recharge Climatisation Auto",
    description: "Entretien, diagnostic et recharge complète de votre système de climatisation automobile (gaz R134a et R1234yf). Contrôle d'étanchéité et traitement antibactérien de l'habitacle.",
    price: "Sur Devis",
    bullets: [
      "Recharge gaz R134a & R1234yf dernière génération",
      "Contrôle d'étanchéité & tirage au vide du circuit",
      "Traitement antibactérien & désinfection habitacle"
    ],
    badge: "Clim Auto & Confort",
    videoSrc: "/videos/video-4.mp4",
    videoTitle: "Entretien et recharge de climatisation"
  },
  {
    icon: <Sparkles size={32} className="service-icon-svg" />,
    title: "Nettoyage & Lavage en Profondeur",
    description: "Nettoyage méticuleux intérieur et extérieur en profondeur. Remettez votre véhicule entre nos mains pour un éclat comme neuf avec devis sur mesure !",
    price: "Sur Devis",
    bullets: [
      "Aspiration complète habitacle & coffre",
      "Lavage haute pression carrosserie & jantes",
      "Shampouinage des tissus et traitement plastiques"
    ],
    badge: "Nettoyage Habitacle & Carrosserie",
    videoSrc: "/videos/video-3.mp4",
    videoTitle: "Nettoyage complet auto"
  },
  {
    icon: <Eye size={32} className="service-icon-svg" />,
    title: "Rénovation Optiques de Phares",
    description: "Restauration complète de vos optiques de phares ternis ou jaunis. Plus économique que le remplacement ! Améliore votre visibilité nocturne et passe le contrôle technique.",
    price: "À partir de 60€",
    bullets: [
      "Prestation rapide en atelier",
      "Indispensable pour le Contrôle Technique",
      "Ponçage, polissage et vernis de protection UV"
    ],
    badge: "Sécurité & Visibilité"
  },
  {
    icon: <Package size={32} className="service-icon-svg" />,
    title: "Pièces Neuves Toutes Marques",
    description: "Vente et pose de pièces détachées neuves garanties pour tout type de véhicule. Identification précise des références et livraison rapide.",
    price: "Sur Devis",
    bullets: [
      "Kits distribution & Freinage (plaquettes/disques/tambours)",
      "Tous filtres (huile, air, carburant, gasoil)",
      "Pièces neuves garanties constructeur"
    ],
    badge: "Pièces Neuves"
  }
];

export default function Services() {
  return (
    <div className="services-grid-wrapper">
      <div className="grid-2 services-list">
        {SERVICES_DATA.map((srv, idx) => (
          <div key={idx} className={`glass-card service-card ${srv.featured ? 'service-featured-card' : ''}`}>
            <div className="service-header-row">
              <div className="service-icon-bg">
                {srv.icon}
              </div>
              <span className={`badge ${srv.featured ? 'badge-green' : 'badge-cyan'} service-badge`}>
                {srv.badge}
              </span>
            </div>

            <h3 className="service-card-title">{srv.title}</h3>
            
            <div className="service-price-badge">
              <span className="price-label">Tarif : </span>
              <span className="price-amount">{srv.price}</span>
            </div>

            <p className="service-card-desc">{srv.description}</p>

            <ul className="service-bullets">
              {srv.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="bullet-item">
                  <ShieldCheck size={16} className="bullet-check-icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="services-cta-banner glass-card chrome-accent">
        <div className="cta-banner-content">
          <h4>Besoin d'une Révision Auto, recharge clim, vidange toutes marques ou pièces neuves ?</h4>
          <p>Profitez du savoir-faire d'EuroPneus, à votre service depuis 24 ans à Mours Saint-Eusèbe dans la Drôme.</p>
        </div>
        <div className="cta-banner-action">
          <a href="tel:0475713306" className="btn btn-primary">
            <Wrench size={16} />
            <span>Devis Gratuit & RDV : 04 75 71 33 06</span>
          </a>
        </div>
      </div>
    </div>
  );
}
