import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {products} from '../data/products'

export default function Home() {
  const lineText = "The complete, premium AI eyewear experience is initialization phase. Your clean landing showcase will render right here."
  const letters = Array.from(lineText)
  
  const [loopKey, setLoopKey] = useState(0)

    useEffect(() => {
    console.log("--- EyeCon Product Data Loaded Successfully ---")
    console.log(products)
  }, [])

  useEffect(() => {
    const totalCycleTime = (letters.length * 25) + 500 + 4000
    const interval = setInterval(() => {
      setLoopKey((prev) => prev + 1)
    }, totalCycleTime)
    return () => clearInterval(interval)
  }, [letters.length])

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * products.length)
      setFeaturedProduct(products[randomIndex])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.5
      }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, display: 'none' },
    visible: {
      opacity: 1,
      display: 'inline'
    }
  }

  return (
    // Reduced the vertical padding and height behavior of the container wrapper
    <div className="relative min-h-[75vh] w-full flex flex-col items-center justify-center bg-radial from-neutral-900 to-black text-white px-6 pt-32 pb-12 overflow-hidden">
      
      {/* Background radial soft light orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Display Frame Container */}
      <div className="text-center z-10 select-none flex flex-col items-center justify-center">
        {/* Central Display Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-widest text-white mb-4 uppercase"
        >
          EYE<span className="text-teal-500">CON</span>
        </motion.h1>

        {/* Vertically shortened text area (min-h removed, using clean margin tracking) */}
        <div className="max-w-xl px-4 mx-auto mt-2">
          <motion.p 
            key={loopKey} 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-xs md:text-sm text-neutral-400 font-mono tracking-wide leading-relaxed"
          >
            {letters.map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
            
            {/* Blinking Typing Indicator Cursor */}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="inline-block w-1.5 h-3.5 bg-teal-500 ml-1 align-middle"
            />
          </motion.p>
        </div>
      </div>

    </div>
  )
}

