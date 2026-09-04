import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Search, ShieldCheck, Car, Fuel, Gauge, Calendar, Sparkles, CheckCircle2, ChevronRight, Tag, ChevronLeft } from 'lucide-react';

const BOUTIQUE_URL = "https://www.leboncoin.fr/boutique/17552/garage_euro_pneus_distribution.htm";

// 10 Authentic active vehicle ads pulled from Garage Euro Pneus Distribution inventory on LeBonCoin
const ALL_CARS_STOCK = [
  {
    id: 'real-car-1',
    brand: 'Volkswagen',
    title: 'Volkswagen Golf Sportsvan 1.0 TSI 110CH BlueMotion Connect',
    category: 'Berline & Citadine',
    price: 12800,
    year: 2018,
    km: '93 239 km',
    fuel: 'Essence',
    gearbox: 'Manuelle',
    power: '110 ch (6 CV)',
    badge: 'Crit\'Air 1 - Révisée',
    promoCarteGrise: true,
    image: '/cars/car-1.png',
    specs: ['Écran Tactile GPS', 'Radars avant/arrière', 'Climatisation Bi-zone', 'Jantes Alliage'],
    desc: 'Golf Sportsvan 1.0 TSI 110ch BlueMotion Connect en parfait état. Révisée et garantie chez EuroPneus Mours.'
  },
  {
    id: 'real-car-2',
    brand: 'Citroën',
    title: 'DS 3 1.2 PureTech 110ch S&S BVM So Chic',
    category: 'Berline & Citadine',
    price: 9900,
    year: 2016,
    km: '82 580 km',
    fuel: 'Essence',
    gearbox: 'Manuelle',
    power: '110 ch (6 CV)',
    badge: 'So Chic - Révisée',
    promoCarteGrise: true,
    image: '/cars/car-2.png',
    specs: ['Feux LED Vision', 'Toit bicolore', 'Bluetooth', 'Radars de recul'],
    desc: 'Superbe DS3 1.2 PureTech 110ch So Chic, révisée entièrement chez EuroPneus Mours. Contrôle technique OK.'
  },
  {
    id: 'real-car-3',
    brand: 'Peugeot',
    title: 'Peugeot 308 1.5 BlueHDi 130ch B.A',
    category: 'Berline & Citadine',
    price: 9900,
    year: 2020,
    km: '168 910 km',
    fuel: 'Diesel',
    gearbox: 'Automatique',
    power: '130 ch (7 CV)',
    badge: 'Boîte Automatique',
    promoCarteGrise: true,
    image: '/cars/car-3.png',
    specs: ['Boîte Automatique', 'GPS 3D Connecté', 'i-Cockpit', 'Climatisation Automatique'],
    desc: 'Peugeot 308 1.5 BlueHDi 130ch boîte automatique. Véhicule révisé et sous garantie chez EuroPneus.'
  },
  {
    id: 'real-car-4',
    brand: 'Peugeot',
    title: 'Peugeot 308 SW 1.5 BlueHDi 130CH S&S Active Business EAT8',
    category: 'Berline & Citadine',
    price: 9900,
    year: 2021,
    km: '159 922 km',
    fuel: 'Diesel',
    gearbox: 'Automatique (EAT8)',
    power: '130 ch (7 CV)',
    badge: 'Break - Boîte EAT8',
    promoCarteGrise: true,
    image: '/cars/car-4.png',
    specs: ['Grand Coffre Break', 'Boîte EAT8', 'GPS Navigation', 'Régulateur/Limiteur'],
    desc: 'Break Peugeot 308 SW 1.5 BlueHDi 130ch EAT8. Très grand volume de chargement, idéal famille ou pro. Garantie 12 mois.'
  },
  {
    id: 'real-car-5',
    brand: 'Peugeot',
    title: 'Peugeot 2008 Urban Cross 1.2 THP Puretech 110CH',
    category: 'SUV & Crossover',
    price: 7500,
    year: 2016,
    km: '132 090 km',
    fuel: 'Essence',
    gearbox: 'Manuelle',
    power: '110 ch (6 CV)',
    badge: 'Urban Cross - Crossover',
    promoCarteGrise: true,
    image: '/cars/car-5.png',
    specs: ['Finition Urban Cross', 'Grip Control', 'Toit Panoramique', 'Jantes Alliage'],
    desc: 'Crossover Peugeot 2008 Urban Cross 110ch essence. Position de conduite haute et révision complète effectuée.'
  },
  {
    id: 'real-car-6',
    brand: 'Peugeot',
    title: 'Peugeot 2008 1.2 PureTech 82CH Style',
    category: 'SUV & Crossover',
    price: 8500,
    year: 2016,
    km: '111 463 km',
    fuel: 'Essence',
    gearbox: 'Manuelle',
    power: '82 ch (4 CV)',
    badge: 'Style - Crossover',
    promoCarteGrise: true,
    image: '/cars/car-6.png',
    specs: ['Écran Tactile Bluetooth', 'Climatisation', 'Barres de toit', 'Régulateur de vitesse'],
    desc: 'Peugeot 2008 1.2 PureTech 82ch finition Style. Véhicule révisé et garanti 12 mois chez EuroPneus Mours.'
  },
  {
    id: 'real-car-7',
    brand: 'Peugeot',
    title: 'Peugeot 108 VTi 72ch S&S BVM5 Access',
    category: 'Berline & Citadine',
    price: 7900,
    year: 2019,
    km: '47 018 km',
    fuel: 'Essence',
    gearbox: 'Manuelle',
    power: '72 ch (4 CV)',
    badge: 'Faible Kilométrage',
    promoCarteGrise: false,
    image: '/cars/car-7.png',
    specs: ['47 000 km d\'origine', 'Climatisation', 'Très faible consommation', 'Idéal Jeune Permis'],
    desc: 'Citadine Peugeot 108 très récente avec seulement 47 000 km. Économique et révisée.'
  },
  {
    id: 'real-car-8',
    brand: 'Peugeot',
    title: 'Peugeot 308 SW 1.6 BlueHDi 100CH Active',
    category: 'Berline & Citadine',
    price: 7200,
    year: 2017,
    km: '173 941 km',
    fuel: 'Diesel',
    gearbox: 'Manuelle',
    power: '100 ch (5 CV)',
    badge: 'Break Spacieux',
    promoCarteGrise: false,
    image: '/cars/car-8.png',
    specs: ['Grand Coffre 610L', 'GPS Écran Tactile', 'Climatisation', 'Régulateur/Limiteur'],
    desc: 'Peugeot 308 SW break très spacieux et économique. Révisé et garanti chez EuroPneus.'
  },
  {
    id: 'real-car-9',
    brand: 'Audi',
    title: 'Audi A1 Sportback 1.4 TFSI 125ch Ambition Luxe S tronic 7',
    category: 'Berline & Citadine',
    price: 13900,
    year: 2016,
    km: '99 414 km',
    fuel: 'Essence',
    gearbox: 'Automatique (S tronic 7)',
    power: '125 ch (6 CV)',
    badge: 'Ambition Luxe - Boîte S tronic',
    promoCarteGrise: true,
    image: '/cars/car-9.png',
    specs: ['Finition Ambition Luxe', 'Boîte S tronic 7', 'GPS MMI Touch', 'Jantes Alliage 17"'],
    desc: 'Superbe Audi A1 Sportback finition haut de gamme Ambition Luxe avec boîte auto S tronic. Révisée et garantie.'
  },
  {
    id: 'real-car-10',
    brand: 'Mercedes-Benz',
    title: 'MERCEDES Classe C 200 d 2.2 136ch Business Exécutive Plus 9G-Tronic',
    category: 'Berline & Citadine',
    price: 20900,
    year: 2018,
    km: '79 059 km',
    fuel: 'Diesel',
    gearbox: 'Automatique (9G-Tronic)',
    power: '136 ch (7 CV)',
    badge: 'Business Exécutive - 9G-Tronic',
    promoCarteGrise: true,
    image: '/cars/car-10.png',
    specs: ['Boîte 9G-Tronic', 'Intérieur Cuir Luxe', 'GPS Navigation Pro', 'Feux LED High Performance'],
    desc: 'Mercedes Classe C 200d Business Exécutive Plus 9G-Tronic. État remarquable, 79 000 km certifiés. Garantie 12 mois.'
  }
];

export default function CarsCatalog() {
  const [selectedBrand, setSelectedBrand] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const brands = ['Tous', 'Peugeot', 'Citroën', 'Volkswagen', 'Audi', 'Mercedes-Benz'];

  // Filter cars logic (Limit to 10 active vehicles for main site view)
  const filteredCars = useMemo(() => {
    const filtered = ALL_CARS_STOCK.filter(car => {
      const matchesBrand = 
        selectedBrand === 'Tous' ? true :
        selectedBrand === 'Utilitaire (VU)' ? car.category === 'Utilitaire (VU)' :
        car.brand === selectedBrand;

      const matchesSearch = 
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.fuel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.gearbox.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.year.toString().includes(searchQuery);

      return matchesBrand && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'year-desc') return b.year - a.year;
      return 0;
    });

    // Return maximum 10 cars
    return filtered.slice(0, 10);
  }, [selectedBrand, searchQuery, sortOption]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReserveClick = (carTitle) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="catalog-wrapper">


      {/* Filter and Search Bar */}
      <div className="catalog-filter-bar glass-card" style={{ padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
        <div className="filter-controls-grid">
          {/* Brand Filter Tabs */}
          <div className="brand-tabs-list">
            {brands.map(brand => (
              <button
                key={brand}
                className={`brand-tab-chip ${selectedBrand === brand ? 'active' : ''}`}
                onClick={() => handleBrandChange(brand)}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Search & Sort input */}
          <div className="search-sort-row">
            <div className="search-input-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher par modèle, puissance, diesel, essence, 2020..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="catalog-search-input"
              />
            </div>

            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="catalog-sort-select"
            >
              <option value="default">Tri par Défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="year-desc">Plus récents d'abord</option>
            </select>
          </div>
        </div>
      </div>

      {/* Showing count indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Affichage des <strong>{filteredCars.length}</strong> plus récentes occasions sur le parc
        </span>
      </div>

      {/* Car Listings Grid */}
      {filteredCars.length === 0 ? (
        <div className="glass-card empty-catalog-box" style={{ padding: '3rem', textAlign: 'center' }}>
          <h4>Aucun véhicule ne correspond à votre recherche "{searchQuery}".</h4>
          <p>Consultez la boutique complète LeBonCoin pour voir l'intégralité du stock du garage.</p>
          <button className="btn btn-secondary" style={{ marginTop: '1rem', marginRight: '0.5rem' }} onClick={() => { setSelectedBrand('Tous'); setSearchQuery(''); }}>
            Réinitialiser les filtres
          </button>
          <a href={BOUTIQUE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary leboncoin-button" style={{ marginTop: '1rem' }}>
            Voir la Boutique LeBonCoin
          </a>
        </div>
      ) : (
        <>
          <div className="cars-grid">
            {filteredCars.map(car => (
              <div key={car.id} className="glass-card car-card chrome-accent">
                {/* Top Badges */}
                <div className="car-card-top-badges">
                  {car.badge && (
                    <span className="badge badge-green car-badge">
                      <ShieldCheck size={12} /> {car.badge}
                    </span>
                  )}
                </div>

                {/* Photo Dropzone Placeholder */}
                <div className="car-photo-wrapper">
                  {car.image ? (
                    <img src={car.image} alt={car.title} className="car-photo" />
                  ) : (
                    <div className="car-photo-placeholder">
                      <div className="placeholder-icon-box">
                        <Car size={36} className="placeholder-car-icon" />
                      </div>
                      <span className="placeholder-title">{car.brand} {car.title.split(' ')[1]}</span>
                      <span className="placeholder-sub">📷 Photo en attente d'envoi</span>
                      <div className="placeholder-tag">Véhicule dispo en parc</div>
                    </div>
                  )}
                  <div className="car-price-overlay">
                    {car.price.toLocaleString('fr-FR')} € {car.category === 'Utilitaire (VU)' ? 'HT' : ''}
                  </div>
                </div>

                {/* Car Content & Specs */}
                <div className="car-card-body">
                  <div className="car-header">
                    <span className="car-brand-tag">{car.brand}</span>
                    <h4 className="car-card-title">{car.title}</h4>
                  </div>

                  {/* Specs Pill Grid */}
                  <div className="car-specs-grid">
                    <div className="spec-pill">
                      <Calendar size={13} />
                      <span>{car.year}</span>
                    </div>
                    <div className="spec-pill">
                      <Gauge size={13} />
                      <span>{car.km}</span>
                    </div>
                    <div className="spec-pill">
                      <Fuel size={13} />
                      <span>{car.fuel}</span>
                    </div>
                    <div className="spec-pill">
                      <Tag size={13} />
                      <span>{car.gearbox}</span>
                    </div>
                  </div>

                  <p className="car-desc-snippet">{car.desc}</p>

                  {/* Action Buttons */}
                  <div className="car-card-actions">
                    <button 
                      className="btn btn-primary car-reserve-btn"
                      onClick={() => handleReserveClick(car.title)}
                    >
                      <span>Réserver / Essayer</span>
                      <ChevronRight size={16} />
                    </button>

                    <a 
                      href={BOUTIQUE_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary car-lbc-btn"
                      title="Voir la fiche LeBonCoin"
                    >
                      <span>LeBonCoin</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prominent VOIR + Button to LeBonCoin Boutique */}
          <div className="glass-card chrome-accent" style={{ marginTop: '3rem', padding: '2.5rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)', border: '1px solid rgba(255, 110, 20, 0.4)', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.6rem' }}>
              Vous cherchez un autre modèle parmi nos 63 véhicules ?
            </h3>
            <p style={{ fontSize: '1rem', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto 1.75rem auto' }}>
              Découvrez l'intégralité de notre parc d'occasions révisées & garanties avec photos et fiches détaillées sur notre boutique officielle LeBonCoin.
            </p>
            <a 
              href={BOUTIQUE_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary leboncoin-button"
              style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', fontWeight: 900, borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}
            >
              <span>Voir + (Boutique LeBonCoin EuroPneus)</span>
              <ArrowUpRight size={22} />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
