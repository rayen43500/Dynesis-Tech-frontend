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
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-10 items-center justify-between text-xs text-foreground/70">
            <div />
            <div className="flex items-center gap-6">
              <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <button className="hover:text-primary transition-colors">FR / EN</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <span className="text-lg font-bold text-white">DT</span>
              </div>
              <span className="hidden text-lg font-bold text-foreground sm:inline">Dynesis Tech</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                <input
                  type="search"
                  placeholder="Chercher un service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/50 pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all">
                <User className="h-4 w-4" />
                <span>Se connecter</span>
              </Link>
              <Link href="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg">
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
