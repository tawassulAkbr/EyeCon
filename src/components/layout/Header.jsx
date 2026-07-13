import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, ChevronDown, Glasses, Sun, Eye } from 'lucide-react'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  // Eyewear category navigation details
  const categories = [
    { name: 'Optical Frames', href: '/types/optical', icon: Glasses, desc: 'Prescription & clear glasses' },
    { name: 'Sunglasses', href: '/types/sunglasses', icon: Sun, desc: 'Premium UV protection styles' },
    { name: 'Contact Lenses', href: '/types/lens', icon: Eye, desc: 'Daily, monthly & custom lenses' }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Identity Branding Logo */}
        <Link to="/" className="text-2xl font-black tracking-wider text-neutral-900">
          EYE<span className="text-teal-600">CON</span>
        </Link>

        {/* Global Navigation Engine Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Interactive Hover Expand Types Matrix Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors py-2">
              <span>Types</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-1 w-80 bg-white border border-neutral-100 rounded-xl shadow-xl p-4 grid gap-2"
                >
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          navigate(cat.href)
                          setIsDropdownOpen(false)
                        }}
                        className="flex items-start space-x-3 p-3 rounded-lg text-left hover:bg-neutral-50 transition-colors group w-full"
                      >
                        <div className="p-2 bg-teal-50 text-teal-600 rounded-md group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-neutral-800">{cat.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{cat.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/contact-support" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Contact & Support
          </Link>
          <Link to="/payment-preview" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            Payment Gateway
          </Link>
        </nav>

        {/* Global Functional Action Elements */}
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full" />
          </Link>

          <Link 
            to="/auth" 
            className="flex items-center space-x-2 px-4 py-2 border border-neutral-200 rounded-lg hover:border-neutral-900 text-sm font-medium transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Login / Register</span>
          </Link>
        </div>

      </div>
    </header>
  )
}