'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand - Clear identity anchor */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md">
                <span className="text-lg font-bold text-primary-foreground">DT</span>
              </div>
              <span className="font-semibold text-foreground">Dynesis Tech</span>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Transforming ideas into powerful digital solutions.
            </p>
          </div>

          {/* Quick Links - Grouped navigation */}
          <div className="space-y-5">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors duration-200 font-medium">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors duration-200">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors duration-200">Portfolio</Link>
              </li>
            </ul>
          </div>

          {/* Services - Grouped offerings */}
          <div className="space-y-5">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/services#web-design" className="hover:text-primary transition-colors duration-200">Web Design</Link>
              </li>
              <li>
                <Link href="/services#development" className="hover:text-primary transition-colors duration-200">Development</Link>
              </li>
              <li>
                <Link href="/services#consulting" className="hover:text-primary transition-colors duration-200">Consulting</Link>
              </li>
              <li>
                <Link href="/services#support" className="hover:text-primary transition-colors duration-200">Support</Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social - Action-oriented grouping */}
          <div className="space-y-5">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">Connect</h3>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors duration-200">Contact Us</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors duration-200">Blog</Link>
              </li>
            </ul>
            {/* Social Links - Visually grouped together */}
            <div className="pt-2 flex space-x-4">
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-200" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-200" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-200" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/50 hover:text-primary transition-colors duration-200" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Clear separation */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-foreground/50">
          <p>&copy; {currentYear} Dynesis Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
