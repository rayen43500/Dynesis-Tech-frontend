'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/98 backdrop-blur-lg supports-[backdrop-filter]:bg-card/80 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <span className="text-lg font-bold text-primary-foreground">DT</span>
            </div>
            <span className="hidden text-xl font-bold text-foreground sm:inline">Dynesis Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme + auth + CTA (desktop) */}
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-primary/5 hover:text-primary"
            >
              Connexion
            </Link>
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile: theme + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
          <div className="border-t border-border py-4 md:hidden bg-card/50 backdrop-blur">
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
            <div className="space-y-2 px-4 py-4">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full font-semibold">
                  Connexion
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
