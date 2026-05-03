'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <span className="text-lg font-bold text-primary-foreground">DT</span>
              </div>
              <span className="font-bold text-foreground">Dynesis Tech</span>
            </div>
            <p className="text-sm text-foreground/60">
              Transforming ideas into powerful digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/services#web-design" className="hover:text-primary transition-colors">Web Design</Link>
              </li>
              <li>
                <Link href="/services#development" className="hover:text-primary transition-colors">Development</Link>
              </li>
              <li>
                <Link href="/services#consulting" className="hover:text-primary transition-colors">Consulting</Link>
              </li>
              <li>
                <Link href="/services#support" className="hover:text-primary transition-colors">Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-foreground">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-foreground/60">
          <p>&copy; {currentYear} Dynesis Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
