import React from 'react';
import { Star, MessageSquareCheck, ShieldCheck } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    author: "Alexandre R.",
    date: "Il y a 2 semaines",
    rating: 5,
    text: "Équipe très professionnelle et service rapide. Les tarifs pour mes pneus Michelin étaient de loin les meilleurs de la région de Romans. Montage impeccable, je recommande vivement !",
    service: "Montage Pneus"
  },
  {
    id: 2,
    author: "Marine D.",
    date: "Il y a 1 mois",
    rating: 5,
    text: "J'ai déposé ma Clio pour un forfait vidange complet et la rénovation de mes phares jaunis. La différence est impressionnante, mes phares sont comme neufs et le prix de 60€ est très correct. Sans rendez-vous, c'est super pratique.",
    service: "Vidange & Rénovation Optiques"
  },
  {
    id: 3,
    author: "Stéphane B. (Artisan)",
    date: "Il y a 3 mois",
    rating: 5,
    text: "Achat d'un utilitaire d'occasion Peugeot Partner pour mon activité professionnelle. Véhicule livré révisé, propre et garanti. Très bon accueil et conseils avisés. Une adresse de confiance depuis longtemps.",
    service: "Achat Véhicule Occasion"
  }
];

export default function Reviews() {
  return (
    <section id="avis" className="section-alt reviews-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Avis de nos clients</span>
          <h2 className="section-title">Confiance & Transparence</h2>
          <p className="section-desc">
            Découvrez les retours d'expérience vérifiés de nos clients à Mours Saint Eusèbe et Romans-sur-Isère.
          </p>
        </div>

        <div className="reviews-layout">
          {/* Aggregate Rating Box */}
          <div className="glass-card rating-aggregate-card chrome-accent">
            <div className="google-badge-row">
              <span className="g-blue">G</span>
              <span className="g-red">o</span>
              <span className="g-yellow">o</span>
              <span className="g-blue">g</span>
              <span className="g-green">l</span>
              <span className="g-red">e</span>
              <span className="g-text">Avis</span>
            </div>

            <div className="aggregate-score">4.8</div>

            <div className="aggregate-stars">
              <Star fill="#fbbf24" size={22} strokeWidth={0} />
              <Star fill="#fbbf24" size={22} strokeWidth={0} />
              <Star fill="#fbbf24" size={22} strokeWidth={0} />
              <Star fill="#fbbf24" size={22} strokeWidth={0} />
              <Star fill="#fbbf24" size={22} strokeWidth={0} />
            </div>

            <p className="aggregate-count">
              Basé sur 142 évaluations clients Google
            </p>

            <div className="verified-badge-pill">
              <ShieldCheck size={15} />
              <span>Avis 100% Vérifiés</span>
            </div>
          </div>

          {/* Testimonial List */}
          <div className="reviews-cards-list">
            {REVIEWS_DATA.map(review => (
              <div key={review.id} className="glass-card review-item-card">
                <div className="review-item-header">
                  <div>
                    <h4 className="review-author">{review.author}</h4>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <div className="review-stars-row">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} fill="#fbbf24" size={15} strokeWidth={0} />
                    ))}
                  </div>
                </div>

                <p className="review-text-content">
                  "{review.text}"
                </p>

                <div className="review-item-footer">
                  <span className="badge badge-green">
                    Prestation : {review.service}
                  </span>
                  <span className="review-source">
                    <MessageSquareCheck size={13} className="text-green" /> Avis certifié Google
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
