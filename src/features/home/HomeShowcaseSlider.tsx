import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IMAGES_PER_SLIDE = 3;

export function HomeShowcaseSlider({
  images,
  backgroundImage,
  backgroundVideo
}: {
  images: string[];
  backgroundImage?: string;
  backgroundVideo?: string;
}) {
  const visibleImages = images.filter(Boolean);
  const slideCount = visibleImages.length;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideCount);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  if (!visibleImages.length) return null;

  const slides = Array.from({ length: slideCount }, (_, slideIndex) =>
    Array.from({ length: Math.min(IMAGES_PER_SLIDE, visibleImages.length) }, (_, imageOffset) =>
      visibleImages[(slideIndex + imageOffset) % visibleImages.length]
    )
  );

  function showPrevious() {
    setActiveSlide((current) => (current - 1 + slideCount) % slideCount);
  }

  function showNext() {
    setActiveSlide((current) => (current + 1) % slideCount);
  }

  const hasBg = Boolean(backgroundImage || backgroundVideo);

  return (
    <section
      className="home-showcase"
      aria-label="Galerie de réalisations"
    >
      <header
        className={`home-showcase__header${hasBg ? ' home-showcase__header--has-background' : ''}`}
        style={backgroundImage && !backgroundVideo ? { backgroundImage: `url("${backgroundImage}")` } : undefined}
      >
        {backgroundVideo ? (
          <div className="home-showcase__bg-video-wrap" aria-hidden="true">
            <video
              className="home-showcase__bg-video"
              src={backgroundVideo}
              poster={backgroundImage || undefined}
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="home-showcase__bg-video-overlay" />
          </div>
        ) : null}
        <p className="home-showcase__eyebrow">Nos expertises</p>
        <h2>Des solutions digitales conçues pour votre entreprise.</h2>
        <div className="home-showcase__proof" aria-label="Étapes d'expertise">
          {['STRATEGY', 'DESIGN', 'DEVELOPMENT', 'SECURITY', 'CLOUD', 'SCALE'].map((step, index) => (
            <React.Fragment key={step}>
              {index > 0 ? <span aria-hidden>→</span> : null}
              <strong>{step}</strong>
            </React.Fragment>
          ))}
        </div>
      </header>
      <div className="home-showcase__separator" aria-hidden />
      <div className="home-showcase__viewport">
        <div
          className="home-showcase__track"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div className="home-showcase__slide" key={slideIndex}>
              <div className="home-showcase__grid">
                {slide.map((image, index) => (
                  <Link to="/services" className="home-showcase__item" key={`${image}-${index}`}>
                    <figure>
                      <img src={image} alt="" loading={slideIndex === 0 ? 'eager' : 'lazy'} />
                      <figcaption>{['WEB', 'MOBILE', 'AI', 'CLOUD', 'SECURITY', 'UI/UX'][(slideIndex + index) % 6]}</figcaption>
                    </figure>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {slideCount > 1 ? (
        <div className="home-showcase__controls">
          <button type="button" className="home-showcase__arrow" onClick={showPrevious} aria-label="Images précédentes">
            <ChevronLeft size={18} />
          </button>
          <div className="home-showcase__dots" aria-label="Navigation de la galerie">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                type="button"
                key={index}
                className={`home-showcase__dot${index === activeSlide ? ' home-showcase__dot--active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Afficher la diapositive ${index + 1}`}
              />
            ))}
          </div>
          <button type="button" className="home-showcase__arrow" onClick={showNext} aria-label="Images suivantes">
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </section>
  );
}
