import React from 'react'
import { motion } from 'framer-motion'

// Corrected imports matching your file system
import l1 from '../../images/lens/L1-AmberAmbition.png'
import l2 from '../../images/lens/L2-AquaticAllure.png'
import l3 from '../../images/lens/L3-BluenBreeze.png'
import l4 from '../../images/lens/L4-Brown.png'
import l5 from '../../images/lens/L5-Green.png'
import l6 from '../../images/lens/L6-Grey.png'
import l7 from '../../images/lens/L7-Violet.png'
import l8 from '../../images/lens/L8-Honey.png'
import l9 from '../../images/lens/L9-Hazel.png'
import l10 from '../../images/lens/L10-Purple.png'
import l11 from '../../images/lens/L11-Black.png'
import l12 from '../../images/lens/L12-RedBrown.png'
import l13 from '../../images/lens/L13-Sapphire.png'
import l14 from '../../images/lens/L14-Turquoise.png'

export default function Lens() {
  const lenses = [
    { name: "Amber Ambition", desc: "Warm, golden tones for a bright look.", price: "Rs. 1500", image: l1 },
    { name: "Aquatic Allure", desc: "Refreshing deep ocean blue.", price: "Rs. 1500", image: l2 },
    { name: "Blue n Breeze", desc: "Light, breezy tones for daily wear.", price: "Rs. 1500", image: l3 },
    { name: "Brown", desc: "Classic earthy, natural brown.", price: "Rs. 1200", image: l4 },
    { name: "Green", desc: "Vibrant and striking forest green.", price: "Rs. 1200", image: l5 },
    { name: "Grey", desc: "Sophisticated neutral grey.", price: "Rs. 1200", image: l6 },
    { name: "Violet", desc: "Elegant and playful violet accents.", price: "Rs. 1800", image: l7 },
    { name: "Honey", desc: "Warm, soft radiant honey tones.", price: "Rs. 1400", image: l8 },
    { name: "Hazel", desc: "Deep blend of golden brown.", price: "Rs. 1400", image: l9 },
    { name: "Purple", desc: "Bold and royal purple finish.", price: "Rs. 1800", image: l10 },
    { name: "Black", desc: "Classic deep black contrast.", price: "Rs. 1300", image: l11 },
    { name: "Red Brown", desc: "Rich, warm reddish-brown hue.", price: "Rs. 1500", image: l12 },
    { name: "Sapphire", desc: "Intense, high-impact blue sapphire.", price: "Rs. 1900", image: l13 },
    { name: "Turquoise", desc: "Vibrant and exotic tropical blue.", price: "Rs. 1900", image: l14 },
  ];

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-white mb-12">Prescription Lenses</h1>
        
        {/* 3 columns on desktop, responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lenses.map((lens, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }} 
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border border-neutral-800 bg-neutral-900 p-4 rounded-2xl hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <img 
                src={lens.image} 
                alt={lens.name} 
                className="w-full h-48 object-cover object-center rounded-xl mb-3" 
              />
              <h3 className="text-white font-bold text-md">{lens.name}</h3>
              <p className="text-neutral-400 text-sm mt-1">{lens.desc}</p>
              <p className="text-emerald-500 font-mono mt-2">{lens.price}</p>
              <button className="w-full mt-3 bg-white text-black py-1.5 rounded-lg font-bold text-sm hover:bg-emerald-500 hover:text-white transition-colors">
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}