import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { endpoints } from '../../shared/api/endpoints';
import { LoadingState } from '../../shared/ui/feedback/LoadingState';
import { ArrowRight, ExternalLink, Sparkles, Layers, ShieldCheck, Cpu } from 'lucide-react';
import './portfolio-page.css';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  overview: string;
  technologies: string[];
  coverImageUrl: string;
  clientName?: string;
  liveUrl?: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Plateforme FinTech & Paiements Distribués',
    category: 'Fintech & SaaS',
    overview: 'Architecture microservices traitant +50k transactions/sec avec réconciliation automatique et conformité bancaire PCI-DSS.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    clientName: 'Fintech Europe'
  },
  {
    id: 'proj-2',
    title: 'Moteur d\'Inférence IA & RAG Entreprise',
    category: 'Intelligence Artificielle',
    overview: 'Système d\'analyse sémantique et génération augmentée connectant +100k documents d\'entreprise à des LLMs sécurisés.',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'Vector DB', 'Docker'],
    coverImageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    clientName: 'Groupe Industriel'
  },
  {
    id: 'proj-3',
    title: 'Application Mobile & Synchronisation Hors-ligne',
    category: 'Mobile & IoT',
    overview: 'Application mobile cross-platform avec persistance locale, synchronisation temps réel WebSocket et biométrie.',
    technologies: ['React Native', 'TypeScript', 'GraphQL', 'SQLite'],
    coverImageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    clientName: 'HealthTech'
  },
  {
    id: 'proj-4',
    title: 'Smart Contracts & Protocole de Traçabilité Web3',
    category: 'Web3 & Blockchain',
    overview: 'Infrastructure décentralisée pour la certification d\'actifs numériques et la gouvernance automatisée multi-signature.',
    technologies: ['Solidity', 'Ethers.js', 'Hardhat', 'IPFS'],
    coverImageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
    clientName: 'SupplyChain Web3'
  },
  {
    id: 'proj-5',
    title: 'Refonte Cloud & Observabilité Zero-Downtime',
    category: 'Cloud & DevOps',
    overview: 'Migration vers Kubernetes multi-régions avec déploiement continu ArgoCD, monitoring Prometheus & Grafana.',
    technologies: ['Kubernetes', 'Terraform', 'ArgoCD', 'Prometheus'],
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    clientName: 'E-commerce Scale-up'
  },
  {
    id: 'proj-6',
    title: 'Design System & Plateforme Design-to-Code',
    category: 'Design & Frontend',
    overview: 'Composants modulaires accessibles, thémage dynamique et pipeline d\'intégration Figma vers Storybook automatisé.',
    technologies: ['Figma', 'TypeScript', 'Storybook', 'Tailwind'],
    coverImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    clientName: 'Media Group'
  }
];

function getLocalized(value: { en?: string; fr?: string } | string | undefined, lang: string): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return lang.startsWith('fr') ? value.fr || value.en || '' : value.en || value.fr || '';
}

export function PortfolioPage() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const query = useQuery({
    queryKey: ['public', 'portfolio'],
    queryFn: async () => {
      try {
        const res = await endpoints.public.portfolio.list({ limit: 50 });
        return res.data?.data || [];
      } catch {
        return [];
      }
    }
  });

  const projects: ProjectItem[] = useMemo(() => {
    const apiData = query.data || [];
    if (apiData.length > 0) {
      return apiData.map((doc: any, idx: number) => ({
        id: String(doc._id || idx),
        title: getLocalized(doc.projectTitle, lang) || doc.title || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].title,
        category: doc.category || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].category,
        overview: getLocalized(doc.projectOverview, lang) || doc.overview || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].overview,
        technologies: Array.isArray(doc.technologies) && doc.technologies.length > 0 
          ? doc.technologies 
          : DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].technologies,
        coverImageUrl: doc.coverImageUrl || doc.mediaUrl || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].coverImageUrl,
        clientName: doc.clientName || DEFAULT_PROJECTS[idx % DEFAULT_PROJECTS.length].clientName,
        liveUrl: doc.liveUrl || doc.projectUrl
      }));
    }
    return DEFAULT_PROJECTS;
  }, [query.data, lang]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());
  }, [projects, activeCategory]);

  return (
    <div className="portfolio-page-root">
      {/* Hero Header */}
      <header className="portfolio-hero">
        <div className="portfolio-hero__tag-wrap">
          <span className="portfolio-hero__tag">
            {lang.startsWith('fr') ? '(C) — NOS RÉALISATIONS' : '(C) — OUR WORK'}
          </span>
          <div className="portfolio-hero__tag-line" aria-hidden="true" />
        </div>

        <h1 className="portfolio-hero__title">
          Des projets conçus pour <br />
          <span className="portfolio-hero__title-accent">performer et évoluer.</span>
        </h1>

        <p className="portfolio-hero__sub">
          Découvrez une sélection de plateformes web, applications mobiles, solutions d'intelligence artificielle et architectures cloud déployées avec succès pour nos clients.
        </p>

        {/* Filter Categories */}
        <div className="portfolio-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`portfolio-filter-btn ${activeCategory === cat ? 'portfolio-filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? (lang.startsWith('fr') ? 'Tous les projets' : 'All Projects') : cat}
            </button>
          ))}
        </div>
      </header>

      {/* Grid of Projects */}
      <div className="portfolio-grid-container">
        {query.isLoading ? (
          <LoadingState label={t('public.portfolio.loading', 'Chargement du portfolio...')} />
        ) : (
          <div className="portfolio-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="portfolio-card">
                <div className="portfolio-card__cover-link">
                  <img
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="portfolio-card__img"
                    loading="lazy"
                  />
                  <span className="portfolio-card__badge">{project.category}</span>
                </div>

                <div className="portfolio-card__body">
                  <h2 className="portfolio-card__title">{project.title}</h2>
                  <p className="portfolio-card__overview">{project.overview}</p>

                  <div className="portfolio-card__techs">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="portfolio-card__tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="portfolio-card__footer">
                    <span className="portfolio-card__client">{project.clientName}</span>
                    <Link to="/contact" className="portfolio-card__cta">
                      <span>{lang.startsWith('fr') ? 'Discuter du projet' : 'Discuss project'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Banner */}
      <section className="portfolio-cta-banner">
        <div className="portfolio-cta-banner__container">
          <h2 className="portfolio-cta-banner__title">
            Vous avez un projet ambitieux en tête ?
          </h2>
          <p className="portfolio-cta-banner__sub">
            Notre équipe d'experts est prête à concevoir et déployer votre vision technologique.
          </p>
          <div className="portfolio-cta-banner__actions">
            <Link to="/contact" className="tech-btn tech-btn--primary">
              DÉMARRER MON PROJET <span className="tech-btn__arrow">→</span>
            </Link>
            <Link to="/work-with-us" className="tech-btn tech-btn--secondary">
              DEMANDER UN DEVIS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
