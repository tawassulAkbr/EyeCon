import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

// Importing images
import DB1 from '../../images/sunglasses/D&B 1.png'
import DB2 from '../../images/sunglasses/D&B 2.png'
import DB3 from '../../images/sunglasses/D&B 3.png'
import DB4 from '../../images/sunglasses/D&B 4.png'
import DB5 from '../../images/sunglasses/D&B 5.png'
import DB6 from '../../images/sunglasses/D&B 6.png'
import LV1 from '../../images/sunglasses/LV 1.png'
import LV2 from '../../images/sunglasses/LV 2.png'
import LV3 from '../../images/sunglasses/LV 3.png'
import LV4 from '../../images/sunglasses/LV 4.png'
import LV5 from '../../images/sunglasses/LV 5.png'
import P1 from '../../images/sunglasses/Prada 1.png'
import P2 from '../../images/sunglasses/Prada 2.png'
import P3 from '../../images/sunglasses/Prada 3.png'
import P4 from '../../images/sunglasses/Prada 4.png'
import P5 from '../../images/sunglasses/Prada 5.png'
import RB1 from '../../images/sunglasses/RB1.png'
import RB2 from '../../images/sunglasses/RB2.png'
import RB3 from '../../images/sunglasses/RB3.png'
import RB4 from '../../images/sunglasses/RB4.png'
import RB5 from '../../images/sunglasses/RB5.png'

export const brandGroups = [
  {
    name: "Ray-Ban",
    items: [
      { name: "Ray-Ban Classic", desc: "**A timeless unisex design offering superior glare protection and iconic style.**", price: "Rs. 2500", image: RB1 },
      { name: "Ray-Ban Modern", desc: "**Sleek, lightweight unisex frames perfect for any casual or formal occasion.**", price: "Rs. 2800", image: RB2 },
      { name: "Ray-Ban Aviator", desc: "**Classic unisex aviator style providing complete UV coverage and comfort.**", price: "Rs. 3000", image: RB3 },
      { name: "Ray-Ban Bold", desc: "**Strong, durable unisex frames designed for a statement look.**", price: "Rs. 2700", image: RB4 },
      { name: "Ray-Ban Sport", desc: "**Flexible and rugged unisex sunglasses built for active lifestyles.**", price: "Rs. 2600", image: RB5 },
    ]
  },
  {
    name: "Dolce & Gabbana",
    items: [
      { name: "Dolce & Gabbana Luxury", desc: "**High-fashion unisex eyewear featuring premium craftsmanship and detailing.**", price: "Rs. 5000", image: DB1 },
      { name: "Dolce & Gabbana Elegance", desc: "**Sophisticated unisex frames that blend modern aesthetics with timeless luxury.**", price: "Rs. 5500", image: DB2 },
      { name: "Dolce & Gabbana Iconic", desc: "**Bold unisex sunglasses showcasing the signature premium design language.**", price: "Rs. 5200", image: DB3 },
      { name: "Dolce & Gabbana Minimal", desc: "**Clean, understated unisex frames for a refined and professional look.**", price: "Rs. 4800", image: DB4 },
      { name: "Dolce & Gabbana Urban", desc: "**Contemporary unisex eyewear designed for the fashion-forward individual.**", price: "Rs. 4900", image: DB5 },
      { name: "Dolce & Gabbana Chic", desc: "**Trendy, high-quality unisex frames suitable for all-day wear.**", price: "Rs. 5100", image: DB6 },
    ]
  },
  {
    name: "Louis Vuitton",
    items: [
      { name: "Louis Vuitton Prestige", desc: "**Exquisite unisex sunglasses embodying the pinnacle of luxury design.**", price: "Rs. 8000", image: LV1 },
      { name: "Louis Vuitton Signature", desc: "**Classically branded unisex frames with elite craftsmanship and finish.**", price: "Rs. 8500", image: LV2 },
      { name: "Louis Vuitton Voyager", desc: "**Modern, spacious unisex eyewear perfect for travel and high-end style.**", price: "Rs. 8200", image: LV3 },
      { name: "Louis Vuitton Horizon", desc: "**Innovative unisex sunglasses offering a futuristic look and premium comfort.**", price: "Rs. 8700", image: LV4 },
      { name: "Louis Vuitton Elite", desc: "**Top-tier unisex frames designed for those who value exclusivity.**", price: "Rs. 9000", image: LV5 },
    ]
  },
  {
    name: "Prada",
    items: [
      { name: "Prada Modernist", desc: "**Avant-garde unisex frames that challenge traditional design boundaries.**", price: "Rs. 6000", image: P1 },
      { name: "Prada Sleek", desc: "**Minimalist unisex sunglasses crafted with high-precision engineering.**", price: "Rs. 6200", image: P2 },
      { name: "Prada Heritage", desc: "**Richly textured unisex frames inspired by timeless Italian fashion.**", price: "Rs. 6500", image: P3 },
      { name: "Prada Urbanite", desc: "**Functional and stylish unisex eyewear for the bustling city lifestyle.**", price: "Rs. 6300", image: P4 },
      { name: "Prada Visionary", desc: "**Sophisticated unisex frames designed for clear vision and effortless style.**", price: "Rs. 6800", image: P5 },
    ]
  }
];

export default function Sunglasses() {
  const { addToCart } = useCart();
  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase mb-12">Designer Sunglasses</h1>
        
        {brandGroups.map((brand) => (
          <div key={brand.name} className="mb-16">
            <h2 className="text-2xl font-bold uppercase mb-8 border-l-4 border-amber-500 pl-4">{brand.name}</h2>
            
            {/* 3 items per row grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {brand.items.map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }} 
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="border border-neutral-800 bg-neutral-900 p-4 rounded-2xl hover:border-amber-500 transition-colors cursor-pointer"
                >
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-neutral-400 text-xs mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <p className="text-amber-500 font-mono mt-3">{item.price}</p>
                  <button onClick={() => addToCart({ ...item, id: `${brand.name}-${item.name}-${index}` })} className="w-full mt-4 bg-white text-black py-2 rounded-lg font-bold text-sm hover:bg-amber-500 hover:text-white transition-colors">ADD TO CART</button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}