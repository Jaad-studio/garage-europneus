import React, { useRef, useState } from 'react';
import { Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const VIDEOS_DATA = [
  {
    id: 1,
    title: "Montage & Équilibrage Pneumatiques",
    subtitle: "Démonstration de montage et équilibrage de précision sur toutes marques de pneus au garage.",
    src: "/videos/video-1.mp4",
    badge: "Pneumatiques Toutes Marques",
    tag: "Atelier Pneus"
  },
  {
    id: 2,
    title: "Entretien Mécanique Toutes Marques",
    subtitle: "Vidange, filtres MANN-FILTER et révision complète réalisée par nos mécaniciens qualifiés.",
    src: "/videos/video-2.mp4",
    badge: "Révision & Vidange",
    tag: "Mécanique Auto"
  },
  {
    id: 3,
    title: "Nettoyage Complet de Votre Auto",
    subtitle: "Nettoyage et shampouinage haute pression en profondeur à Mours Saint-Eusèbe.",
    src: "/videos/video-3.mp4",
    badge: "Nettoyage & Préparation",
    tag: "Lavage & Éclat"
  },
  {
    id: 4,
    title: "Entretien & Recharge de Climatisation",
    subtitle: "Station de tirage au vide, diagnostic d'étanchéité et recharge de climatisation auto.",
    src: "/videos/video-4.mp4",
    badge: "Climatisation Auto",
    tag: "Confort Clim"
  }
];

export default function VideoShowcase() {
  const scrollContainerRef = useRef(null);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const togglePlay = (id, e) => {
    const videoEl = document.getElementById(`story-video-${id}`);
    if (videoEl) {
      if (videoEl.paused) {
        // Pause all other videos
        VIDEOS_DATA.forEach(v => {
          if (v.id !== id) {
            const otherVid = document.getElementById(`story-video-${v.id}`);
            if (otherVid) otherVid.pause();
          }
        });
        videoEl.play();
        setPlayingVideoId(id);
      } else {
        videoEl.pause();
        setPlayingVideoId(null);
      }
    }
  };

  return (
    <section id="videos" className="video-showcase-section" style={{ padding: '4.5rem 0', background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 29, 0.98) 100%)', position: 'relative' }}>
      <div className="container">
        <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
              <Sparkles size={13} style={{ marginRight: '0.35rem' }} />
              Stories & Démonstrations en Direct
            </span>
            <h2 className="section-title" style={{ fontSize: '2.1rem', fontWeight: 900 }}>
              L'Atelier EuroPneus en <span className="text-highlight">Format Reel</span> 📱
            </h2>
            <p className="section-desc" style={{ maxWidth: '640px', marginTop: '0.35rem' }}>
              Glissez et découvrez nos interventions réelles filmées au garage à Mours Saint-Eusèbe.
            </p>
          </div>

          {/* Swipe / Scroll Controls Buttons */}
          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button 
              onClick={() => handleScroll('left')} 
              aria-label="Vidéo précédente"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={() => handleScroll('right')} 
              aria-label="Vidéo suivante"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 18px rgba(34, 197, 94, 0.45)'
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Stories Horizontal Reel Slider Container */}
        <div 
          ref={scrollContainerRef}
          className="stories-reel-container"
          style={{ 
            display: 'flex', 
            gap: '1.35rem', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingBottom: '1rem',
            paddingTop: '0.5rem',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {VIDEOS_DATA.map((vid) => {
            const isPlaying = playingVideoId === vid.id;
            return (
              <div 
                key={vid.id} 
                className="story-card glass-card"
                style={{ 
                  flex: '0 0 280px', 
                  scrollSnapAlign: 'start', 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255, 255, 255, 0.18)', 
                  background: 'rgba(30, 41, 59, 0.95)',
                  position: 'relative',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Reel Smartphone Ratio Container 9:16 */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '150%', background: '#000000', overflow: 'hidden' }}>
                  <video 
                    id={`story-video-${vid.id}`}
                    preload="auto"
                    poster={`/videos/frame-${vid.id}.png`}
                    playsInline 
                    muted 
                    loop
                    onPlay={() => setPlayingVideoId(vid.id)}
                    onPause={() => setPlayingVideoId(null)}
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={(e) => togglePlay(vid.id, e)}
                  >
                    <source src={`${vid.src}#t=0.5`} type="video/mp4" />
                  </video>

                  {/* Glass Top Gradient & Badge */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70px', background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
                  
                  <div style={{ position: 'absolute', top: '0.85rem', left: '0.85rem', zIndex: 3, pointerEvents: 'none' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.25rem 0.6rem', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
                      <ShieldCheck size={12} /> {vid.badge}
                    </span>
                  </div>

                  {/* Play / Pause Interactive Floating Button */}
                  <button
                    onClick={(e) => togglePlay(vid.id, e)}
                    aria-label={isPlaying ? "Mettre en pause" : "Lire la vidéo"}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(255, 255, 255, 0.3)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 4,
                      opacity: isPlaying ? 0.35 : 0.95,
                      transition: 'opacity 0.25s ease, transform 0.25s ease',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.5)'
                    }}
                  >
                    {isPlaying ? <Pause size={24} fill="#ffffff" /> : <Play size={24} fill="#ffffff" style={{ marginLeft: '3px' }} />}
                  </button>

                  {/* Bottom Gradient Overlay */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '110px', background: 'linear-gradient(0deg, rgba(15,23,42,0.95) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
                </div>

                {/* Reel Info Footer */}
                <div style={{ padding: '1.1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flexGrow: 1, background: 'rgba(15, 23, 42, 0.95)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4ade80', letterSpacing: '0.05em', uppercase: 'true' }}>
                      {vid.tag}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>HD • 1080p</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.3 }}>
                    {vid.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, marginTop: '0.1rem' }}>
                    {vid.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Swipe Hint Indicator */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <span>👈 Faites défiler ou swipez pour voir toutes les vidéos 👉</span>
        </div>
      </div>
    </section>
  );
}
