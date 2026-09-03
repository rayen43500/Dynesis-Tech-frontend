import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { cn } from '../../utils/cn';

const FEATURED_DEVELOPER = {
  name: 'Amira B.',
  role: 'Senior Full-Stack Engineer',
  location: 'Paris, France',
  accentColor: '#15803d', // matches accent token
  glowColor: 'rgba(21, 128, 61, 0.35)',
  gradient: 'linear-gradient(145deg, rgba(21,128,61,0.08), rgba(15,23,42,0))',
  techPills: ['React', 'TypeScript', 'Node.js', 'AWS', 'AI Engineering', 'Machine Learning']
};

export function HomeHero() {
  const { t } = useTranslation();
  const dev = FEATURED_DEVELOPER;

  return (
    <section className="grid items-center gap-10 py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-16">
      {/* Left side: headline + copy */}
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dev.accentColor }} />
          <span className="ml-2">Premium Engineering Teams, On Demand</span>
        </div>

        <h1 className="text-[32px] leading-tight tracking-tight sm:text-[38px]">
          <span className="block">Build calm, reliable digital</span>
          <span className="block">
            products with{' '}
            <span style={{ color: dev.accentColor }}>vetted senior engineers</span>.
          </span>
        </h1>

        <p className="max-w-[520px] text-sm leading-relaxed text-muted sm:text-[15px]">
          Dynesis Tech pairs you with hand-selected experts like {dev.name}, combining deep technology experience with
          a human-centered delivery model for modern SaaS, AI and enterprise systems.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/work-with-us"
            className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent2"
          >
            {t('nav.workWithUs')}
          </Link>
          <Link
            to="/developers"
            className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-surface2 px-4 text-sm font-medium text-text transition-colors hover:bg-surface"
          >
            Meet our developers
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 text-xs text-muted">
          <span>Trusted expertise in:</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dev.accentColor }} />
            <span>Fintech</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dev.accentColor }} />
            <span>SaaS Platforms</span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dev.accentColor }} />
            <span>AI Products</span>
          </span>
        </div>
      </div>

      {/* Right side: featured developer avatar + floating pills */}
      <div className="relative flex items-center justify-center">
        <div
          className="relative h-[260px] w-[260px] rounded-[32px] border border-border bg-surface2 shadow-md md:h-[290px] md:w-[290px]"
          style={{
            backgroundImage: dev.gradient
          }}
        >
          <div
            aria-hidden
            className="absolute inset-[-16%] rounded-[40px] blur-3xl"
            style={{ background: dev.glowColor }}
          />

          <div className="relative flex h-full flex-col justify-end p-5">
            <div className="mb-5 h-[130px] w-full rounded-2xl bg-gradient-to-br from-surface via-surface2 to-surface shadow-sm" />

            <div className="space-y-1.5">
              <div className="text-sm font-normal tracking-tight">{dev.name}</div>
              <div className="text-xs text-muted">{dev.role}</div>
              <div className="text-xs text-muted">{dev.location}</div>
            </div>
          </div>
        </div>

        {/* floating tech pills */}
        <div className="pointer-events-none absolute inset-0">
          {dev.techPills.map((pill, index) => {
            const positions = [
              'top-[10%] left-[-4%]',
              'top-[24%] right-[-4%]',
              'bottom-[18%] left-[-2%]',
              'bottom-[8%] right-[-2%]',
              'top-[52%] right-[-6%]',
              'top-[52%] left-[-6%]'
            ];

            return (
              <motion.div
                key={pill}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  y: [0, -4, 0],
                  scale: 1
                }}
                transition={{
                  delay: 0.08 * index,
                  duration: 2.6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                className={cn(
                  'absolute rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted shadow-sm',
                  positions[index % positions.length]
                )}
                style={{
                  borderColor: dev.accentColor + '33'
                }}
              >
                <span
                  aria-hidden
                  className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: dev.accentColor }}
                />
                {pill}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

