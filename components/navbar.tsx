'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Search, Phone, Globe, User, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  const navLinks = [
    { href: '#services', label: 'Services', external: true },
    { href: '#portfolio', label: 'Portfolio', external: true },
    { href: '#about', label: 'À propos', external: true },
    { href: '/blog', label: 'Blog', external: false },
    { href: '/contact', label: 'Contact', external: false },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Top Info Bar - Proximity grouping for better visual hierarchy */}
      <div className="hidden lg:block bg-background border-b border-border/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between text-xs text-foreground/60">
            <div />
            <div className="flex items-center gap-8">
              {/* Phone - Grouped as one unit */}
              <a href="tel:+33123456789" className="flex items-center gap-2.5 hover:text-primary transition-colors duration-200">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+33 1 23 45 67 89</span>
              </a>
              {/* Language - Separate visual group */}
              <div className="flex items-center gap-2.5 pl-6 border-l border-border/30">
                <Globe className="h-4 w-4" />
                <button className="hover:text-primary transition-colors duration-200 font-medium">FR / EN</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Visual hierarchy with clear grouping */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/90 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Logo - Clear visual anchor (left) */}
            <Link href="/" className="flex items-center space-x-2.5 flex-shrink-0 hover:opacity-80 transition-opacity">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md">
                <span className="text-lg font-bold text-white">DT</span>
              </div>
              <span className="hidden text-base font-bold text-foreground sm:inline">Dynesis Tech</span>
            </Link>

            {/* Search Bar - Desktop (centered, clearly separated) */}
            <div className="hidden md:flex flex-1 max-w-md items-center">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <input
                  type="search"
                  placeholder="Chercher un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border/70 bg-card/80 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Desktop Navigation Links - Grouped menu items */}
            <div className="hidden lg:flex items-center space-x-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions - Clear visual separation and hierarchy */}
            <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-border/30">
              <Link href="/login" className="flex items-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all duration-200">
                <User className="h-4 w-4" />
                <span>Se connecter</span>
              </Link>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                  S&apos;inscrire
                </Button>
              </Link>
            </div>

            {/* Mobile: Search + Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="rounded-lg p-2 hover:bg-primary/5 transition-all"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-foreground/70" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="rounded-lg p-2 hover:bg-primary/5 transition-all"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="border-t border-border py-4 lg:hidden bg-background/50 backdrop-blur">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground/70 hover:text-primary'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="space-y-2 border-t border-border px-4 py-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full font-semibold">
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </Button>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    S&apos;inscrire
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
