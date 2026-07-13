import React from 'react'
//import { Mail, Phone, MapPin, Instagram, Twitter, FacebookIcon, Linkedin, ArrowUpRight } from 'lucide-react'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-neutral-950 text-neutral-400 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 space-y-12">
        
        {/* TOP LAYER: Brand & Information Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Column 1: Brand Identifier */}
          <div className="space-y-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-xl font-black tracking-widest text-white uppercase">EYECON</span>
              <span className="text-[10px] font-mono tracking-widest text-teal-400 uppercase">Premium AI Eyewear System</span>
            </div>
            <p className="text-xs font-mono text-neutral-500 leading-relaxed max-w-sm">
              Engineered with advanced 3D facial landmark mapping pipelines to calibrate, customize, and deliver premium bespoke optical frames tailored exactly to your architecture.
            </p>
          </div>

          {/* Column 2: Quick Links Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Navigation</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#catalog" className="hover:text-teal-400 transition-colors inline-flex items-center gap-0.5 group">Frames Catalog <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#lens-tech" className="hover:text-teal-400 transition-colors inline-flex items-center gap-0.5 group">Lens Blueprint <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#virtual-tryon" className="hover:text-teal-400 transition-colors inline-flex items-center gap-0.5 group">AI Virtual Calibration <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors inline-flex items-center gap-0.5 group">Our Ecosystem <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a></li>
            </ul>
          </div>

          {/* Column 3: Contact Parameters */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Contact Node</h4>
            <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <span>+92 (300) 123-4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-neutral-600 flex-shrink-0" />
                <a href="mailto:support@optivibe.com" className="hover:text-teal-400 transition-colors">support@optivibe.com</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-600 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">Sector H-9, Islamabad,<br />44000, Pakistan</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Infrastructure */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">Social Matrix</h4>
            <p className="text-xs font-mono text-neutral-500 leading-relaxed">
              Join our global collective network for technical frame drops and system updates.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-teal-500 transition-all duration-300" aria-label="Instagram Profile">
                <span className="text-[10px] font-bold">IG</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-teal-500 transition-all duration-300" aria-label="Twitter Profile">
                <span className="text-[10px] font-bold">X</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-teal-500 transition-all duration-300" aria-label="Facebook Profile">
                <span className="text-[10px] font-bold">FB</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-teal-500 transition-all duration-300" aria-label="LinkedIn Profile">
                <span className="text-[10px] font-bold">IN</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM LAYER: Legal System Clearing */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-neutral-600">
          <div>
            &copy; {currentYear} OPTI-VIBE Inc. All system protocols secured.
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy Architecture</a>
            <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms of Interface</a>
            <a href="#cookies" className="hover:text-neutral-400 transition-colors">Encryption Protocols</a>
          </div>
        </div>

      </div>
    </footer>
  )
}