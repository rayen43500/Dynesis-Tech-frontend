'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const slides = [
  {
    id: 1,
    image: '/images/hero-slide-1.jpg',
    title: 'Digital Solutions Innovation',
    subtitle: 'Transform your business with cutting-edge technology',
    cta: 'Start Your Project',
  },
  {
    id: 2,
    image: '/images/hero-slide-2.jpg',
    title: 'Web Design Excellence',
    subtitle: 'Beautiful, responsive designs that engage your audience',
    cta: 'Explore Services',
  },
  {
    id: 3,
    image: '/images/hero-slide-3.jpg',
    title: 'Development Expertise',
    subtitle: 'Robust solutions built with modern technology',
    cta: 'View Portfolio',
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
              quality={90}
            />
            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-8 lg:px-16">
        <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-balance drop-shadow-lg">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 text-balance drop-shadow-md max-w-xl">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base py-6 px-8 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95">
                {slides[currentSlide].cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/40 hover:border-white/70 hover:bg-white/20 text-base py-6 px-8 font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              Learn More
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
