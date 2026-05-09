'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Search, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

const slides = [
  {
    id: 1,
    image: '/images/hero-slide-1.jpg',
    title: 'Maîtrisez la Transformation Digitale',
    subtitle: 'Solutions innovantes et performantes pour vos projets',
    ctaPrimary: 'S\'inscrire maintenant',
    ctaSecondary: 'Calendrier des sessions',
  },
  {
    id: 2,
    image: '/images/hero-slide-2.jpg',
    title: 'Excellence en Web Design',
    subtitle: 'Des designs responsifs et captivants qui convertissent',
    ctaPrimary: 'Découvrir nos projets',
    ctaSecondary: 'Demander une démo',
  },
  {
    id: 3,
    image: '/images/hero-slide-3.jpg',
    title: 'Développement Web Avancé',
    subtitle: 'Technologies modernes pour des solutions robustes et scalables',
    ctaPrimary: 'Commencer un projet',
    ctaSecondary: 'Voir le portfolio',
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={75}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-balance drop-shadow-lg leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 text-balance drop-shadow-md max-w-2xl leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Primary CTA Button */}
          <div>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white text-base py-3 px-8 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                {slides[currentSlide].ctaPrimary}
              </Button>
            </Link>
          </div>

          {/* Search Bar and Secondary CTA */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="search"
                placeholder="Chercher un service..."
                className="w-full rounded-lg border border-white/30 bg-white/95 pl-12 pr-4 py-3 text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all duration-300 text-base"
              />
            </div>

            {/* Secondary CTA Button */}
            <Button className="bg-orange-600 hover:bg-orange-700 text-white text-base py-3 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
              <Calendar className="h-5 w-5" />
              {slides[currentSlide].ctaSecondary}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Left and Right */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/60"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/30 hover:border-white/60"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Resume Autoplay on Hover */}
      <div
        onMouseEnter={() => setIsAutoPlay(true)}
        onMouseLeave={() => setIsAutoPlay(false)}
        className="absolute inset-0 z-5 cursor-pointer"
        aria-hidden="true"
      />
    </section>
  )
}
