import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import { Link } from 'react-router-dom'

export default function Home() {
  const lineText = "The complete, premium AI eyewear experience is initialization phase. Your clean landing showcase will render right here."
  const letters = Array.from(lineText)
  
  const [loopKey, setLoopKey] = useState(0)
  const [featuredProduct, setFeaturedProduct] = useState(null)

  useEffect(() => {
    console.log("--- EyeCon Product Data Loaded Successfully ---")
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
      transition: { staggerChildren: 0.025, delayChildren: 0.5 }
    }
  }

  const letterVariants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline' }
  }

  return (
    <div className="bg-black min-h-screen w-full overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative min-h-[75vh] w-full flex flex-col items-center justify-center bg-black text-white px-6 pt-32 pb-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center z-10 select-none flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black tracking-widest text-white mb-4 uppercase"
          >
            EYE<span className="text-teal-500">CON</span>
          </motion.h1>

          <div className="max-w-xl px-4 mx-auto mt-2">
            <motion.p 
              key={loopKey} 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-xs md:text-sm text-neutral-400 font-mono tracking-wide leading-relaxed"
            >
              {letters.map((char, index) => (
                <motion.span key={index} variants={letterVariants}>{char}</motion.span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="inline-block w-1.5 h-3.5 bg-teal-500 ml-1 align-middle"
              />
            </motion.p>
          </div>
        </div>
      </div>

      {/* Product Rows */}
      <section className="w-full py-16 bg-neutral-900 border-y border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">Optical Frames</h2>
          <Link to="/optical" className="text-xs font-mono text-teal-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-64 bg-neutral-950 rounded-2xl flex items-center justify-center border border-neutral-800">
              <span className="text-neutral-700 font-mono text-[10px] uppercase">Optical Slot {i + 1}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="w-full py-16 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">Sunglasses</h2>
          <Link to="/sunglasses" className="text-xs font-mono text-amber-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [-1000, 0] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-64 bg-neutral-950 rounded-2xl flex items-center justify-center border border-neutral-800">
              <span className="text-neutral-700 font-mono text-[10px] uppercase">Sun Slot {i + 1}</span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="w-full py-16 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter text-white">Prescription Lenses</h2>
          <Link to="/lens" className="text-xs font-mono text-emerald-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="min-w-[280px] h-64 bg-neutral-950 rounded-2xl flex items-center justify-center border border-neutral-800">
              <span className="text-neutral-700 font-mono text-[10px] uppercase">Lens Slot {i + 1}</span>
            </div>
          ))}
        </motion.div>
      </section>

    </div>
  )
}