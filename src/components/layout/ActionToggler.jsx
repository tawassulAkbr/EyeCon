import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles } from 'lucide-react'

export default function ActionToggler() {
  const [currentIcon, setCurrentIcon] = useState('contact') // contact | ai

  // Interval manager to switch states dynamically back and forth
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev === 'contact' ? 'ai' : 'contact'))
    }, 4000) // Toggles smoothly every 4 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-neutral-900 shadow-2xl flex items-center justify-center text-white relative group focus:outline-none"
        onClick={() => alert(currentIcon === 'ai' ? 'Launching AI Facial Analyzer...' : 'Opening Live Support Chat...')}
      >
        <AnimatePresence mode="wait">
          {currentIcon === 'contact' ? (
            <motion.div
              key="contact-icon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </motion.div>
          ) : (
            <motion.div
              key="ai-icon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Text Banner Tooltip (Aligned to the left of the button now) */}
        <span className="absolute right-16 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          {currentIcon === 'ai' ? 'AI Frame Matcher' : 'Contact Support'}
        </span>
      </motion.button>
    </div>
  )
}