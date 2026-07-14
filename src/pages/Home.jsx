import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products as opticalProducts } from './Optical' 
import { lenses as lensProducts } from './Lens'
import { brandGroups } from './Sunglasses' 

export default function Home() {
  const [typeKey, setTypeKey] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTypeKey((prev) => prev + 1);
    }, 8000); // Re-type every 8 seconds
    return () => clearInterval(interval);
  }, []);

  const allSunglasses = brandGroups ? brandGroups.flatMap(brand => brand.items) : [];

  return (
    <div className="bg-black min-h-screen w-full overflow-hidden text-white">
      {/* Hero Section */}
      <div className="relative min-h-[75vh] w-full flex flex-col items-center justify-center bg-black text-white px-6 pt-32 pb-12">
        <h1 className="text-5xl md:text-7xl font-black tracking-widest uppercase mb-4">
          EYE<span className="text-teal-500">CON</span>
        </h1>
        <div key={typeKey} className="flex flex-col items-center justify-center overflow-hidden max-w-xl text-center min-h-[4rem]">
          <div className="flex flex-wrap justify-center">
            {Array.from("The complete, premium AI eyewear experience").map((letter, index) => (
              <motion.span
                key={`l1-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: index * 0.05 }}
                className="text-neutral-400 font-mono text-sm md:text-base"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center mt-1">
            {Array.from("is initialization phase.").map((letter, index) => (
              <motion.span
                key={`l2-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: (41 + index) * 0.05 }}
                className="text-neutral-400 font-mono text-sm md:text-base"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Optical Frames Row */}
      <section className="w-full py-16 bg-neutral-900 border-y border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter">Optical Frames</h2>
          <Link to="/types/optical" className="text-xs font-mono text-teal-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {opticalProducts.map((p, i) => (
            <div key={i} className="min-w-[280px] bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
              <h3 className="font-bold text-sm truncate">{p.name}</h3>
              <p className="text-teal-500 font-mono text-xs">{p.price}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Sunglasses Row */}
      <section className="w-full py-16 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter">Sunglasses</h2>
          <Link to="/types/sunglasses" className="text-xs font-mono text-amber-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [-1000, 0] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {allSunglasses.map((p, i) => (
            <div key={i} className="min-w-[280px] bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
              <h3 className="font-bold text-sm truncate">{p.name}</h3>
              <p className="text-amber-500 font-mono text-xs">{p.price}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Prescription Lenses Row */}
      <section className="w-full py-16 bg-neutral-900 border-b border-neutral-800 overflow-hidden">
        <div className="flex justify-between items-end px-8 mb-8">
          <h2 className="text-xl font-black uppercase tracking-tighter">Prescription Lenses</h2>
          <Link to="/types/lens" className="text-xs font-mono text-emerald-500 hover:underline">VIEW ALL →</Link>
        </div>
        <motion.div className="flex gap-6 px-8" animate={{ x: [0, -1000] }} transition={{ repeat: Infinity, duration: 40, ease: "linear" }}>
          {lensProducts.map((p, i) => (
            <div key={i} className="min-w-[280px] bg-neutral-950 p-4 rounded-2xl border border-neutral-800">
              <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded-lg mb-2" />
              <h3 className="font-bold text-sm truncate">{p.name}</h3>
              <p className="text-emerald-500 font-mono text-xs">{p.price}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  )
}