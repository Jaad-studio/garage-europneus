import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_DATA = [
  {
    question: "Puis-je commander des dimensions de pneus spécifiques non affichées ?",
    answer: "Oui, tout à fait ! Nous pouvons commander toutes les dimensions de pneus (toutes marques, tous modèles de voitures et utilitaires) avec livraison express et disponibilité sous 2h en atelier. Appelez-nous au 04 75 71 33 06 pour votre commande."
  },
  {
    question: "Faut-il prendre rendez-vous pour la rénovation de mes phares ?",
    answer: "Non, la prestation de rénovation et polissage d'optiques de phares s'effectue rapidement dans notre atelier de Mours Saint-Eusèbe. Vos phares sont clairs et conformes pour le contrôle technique à partir de 60 €."
  },
  {
    question: "Qu'inclut précisément le forfait vidange toutes marques sur devis ?",
    answer: "Notre forfait vidange sur devis comprend : la main d'œuvre, l'huile de synthèse premium adaptée à votre moteur (5W30, 5W40, 0W20...), le filtre à huile neuf ainsi que le remplacement des filtres selon les préconisations constructeur. Nous travaillons sur toutes marques (Peugeot, Renault, Citroën, VW, Audi, BMW, Mercedes, Fiat, etc.)."
  },
  {
    question: "Comment obtenir un devis pour des pièces détachées neuves ?",
    answer: "Vous pouvez nous appeler ou passer directement au garage avec votre carte grise. Nous identifions précisément la référence de la pièce neuve adaptée (freinage, kit distribution, amortisseurs, filtres). Les pièces neuves sont disponibles très rapidement."
  },
  {
    question: "Quelle est la garantie appliquée sur les véhicules d'occasion ?",
    answer: "Tous les véhicules (VP et VU) présents sur notre parc d'exposition de 2200 m² sont vendus entièrement révisés par nos techniciens en atelier mécanique et préparation. Ils bénéficient d'une garantie contractuelle de 6 à 12 mois pour un achat en toute sérénité."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{ padding: '5rem 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Questions Fréquentes</h2>
          <p className="section-desc">
            Des réponses simples et transparentes sur nos pneus, l'entretien mécanique et notre parc auto.
          </p>
        </div>

        <div className="faq-accordion" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FAQ_DATA.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className="faq-item" 
                style={{ 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '8px', 
                  overflow: 'hidden', 
                  background: 'var(--bg-card)',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleAccordion(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    gap: '1rem'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} className="text-highlight" style={{ flexShrink: 0 }} />
                    {item.question}
                  </span>
                  {isOpen ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div 
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div 
                        className="faq-answer"
                        style={{
                          padding: '0 1.5rem 1.5rem 3.25rem',
                          fontSize: '0.925rem',
                          lineHeight: '1.6',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
