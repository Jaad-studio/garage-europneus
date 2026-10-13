import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Search, ShieldCheck, Car, Fuel, Gauge, Calendar, Sparkles, CheckCircle2, ChevronRight, Tag, ChevronLeft, Plus } from 'lucide-react';
import carsStockData from '../data/carsStock.json';

const BOUTIQUE_URL = "https://www.leboncoin.fr/boutique/17552/garage_euro_pneus_distribution.htm";

const ALL_CARS_STOCK = carsStockData && carsStockData.length > 0 ? carsStockData : [];

export default function CarsCatalog() {
  const [selectedBrand, setSelectedBrand] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [visibleCount, setVisibleCount] = useState(12);

  // Dynamic brand tabs from available stock
  const brands = useMemo(() => {
    const list = ['Tous'];
    const brandSet = new Set();
    ALL_CARS_STOCK.forEach(car => {
      if (car.brand) brandSet.add(car.brand);
    });
    Array.from(brandSet).sort().forEach(b => list.push(b));
    if (ALL_CARS_STOCK.some(c => c.category === 'Utilitaire (VU)')) {
      list.push('Utilitaire (VU)');
    }
    return list;
  }, []);

  // Filter cars logic
  const filteredCars = useMemo(() => {
    return ALL_CARS_STOCK.filter(car => {
      const matchesBrand = 
        selectedBrand === 'Tous' ? true :
        selectedBrand === 'Utilitaire (VU)' ? car.category === 'Utilitaire (VU)' :
        car.brand === selectedBrand;

      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        car.title.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.fuel.toLowerCase().includes(q) ||
        car.gearbox.toLowerCase().includes(q) ||
        car.year.toString().includes(q);

      return matchesBrand && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'year-desc') return b.year - a.year;
      return 0;
    });
  }, [selectedBrand, searchQuery, sortOption]);

  const displayedCars = useMemo(() => {
    return filteredCars.slice(0, visibleCount);
  }, [filteredCars, visibleCount]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setVisibleCount(12);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(12);
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
          Affichage de <strong>{displayedCars.length}</strong> sur <strong>{filteredCars.length}</strong> véhicule(s) en stock sur parc
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
            {displayedCars.map(car => (
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
                    <img 
                      src={car.image} 
                      alt={car.title} 
                      className="car-photo" 
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div 
                    className="car-photo-placeholder" 
                    style={{ display: car.image ? 'none' : 'flex' }}
                  >
                    <div className="placeholder-icon-box">
                      <Car size={36} className="placeholder-car-icon" />
                    </div>
                    <span className="placeholder-title">{car.brand}</span>
                    <span className="placeholder-sub">📷 Garage Euro Pneus</span>
                    <div className="placeholder-tag">Véhicule dispo en parc</div>
                  </div>
                  <div className="car-price-overlay">
                    {typeof car.price === 'number' ? car.price.toLocaleString('fr-FR') : car.price} € {car.category === 'Utilitaire (VU)' ? 'TTC' : ''}
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

                  {/* Highlights/Options tags */}
                  {car.specs && car.specs.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      {car.specs.map((s, idx) => (
                        <span key={idx} style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#e2e8f0' }}>
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  )}

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
                      href={car.url || BOUTIQUE_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-secondary car-lbc-btn"
                      title="Voir l'annonce complète sur LeBonCoin"
                    >
                      <span>LeBonCoin</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button if filtered has more than visibleCount */}
          {filteredCars.length > visibleCount && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="btn btn-secondary"
                style={{ padding: '0.85rem 2rem', fontSize: '0.95rem', borderRadius: '30px', gap: '0.5rem', display: 'inline-flex', alignItems: 'center' }}
                onClick={() => setVisibleCount(prev => prev + 12)}
              >
                <Plus size={18} />
                <span>Afficher plus de véhicules ({filteredCars.length - visibleCount} restants)</span>
              </button>
            </div>
          )}

          {/* Prominent VOIR + Button to LeBonCoin Boutique */}
          <div className="glass-card chrome-accent" style={{ marginTop: '3rem', padding: '2.5rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)', border: '1px solid rgba(255, 110, 20, 0.4)', borderRadius: '16px', boxShadow: '0 15px 35px rgba(0,0,0,0.5)' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', marginBottom: '0.6rem' }}>
              Vous cherchez un autre modèle parmi nos {ALL_CARS_STOCK.length > 0 ? ALL_CARS_STOCK.length : '64'} véhicules ?
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
