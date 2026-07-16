import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import frame1 from '../../images/frames/f1.jfif'
import frame2 from '../../images/frames/f2.jfif'
import frame3 from '../../images/frames/f3.jfif'
import frame4 from '../../images/frames/f4.jfif'
import frame5 from '../../images/frames/f5.jfif'
import frame6 from '../../images/frames/f6.jfif'
import frame7 from '../../images/frames/f7.jfif'
import frame8 from '../../images/frames/f8.jfif'
import frame9 from '../../images/frames/f9.jfif'
import frame10 from '../../images/frames/f10.jfif'
import frame11 from '../../images/frames/f11.jfif'
import frame12 from '../../images/frames/f12.jfif'
import frame13 from '../../images/frames/f13.jfif'
import frame14 from '../../images/frames/f14.jfif'
import frame15 from '../../images/frames/f15.jfif'
import frame16 from '../../images/frames/f16.jfif'
import frame17 from '../../images/frames/f17.jfif'
import frame18 from '../../images/frames/f18.jfif'
import frame19 from '../../images/frames/f19.jfif'
import frame20 from '../../images/frames/f20.jfif'
import frame21 from '../../images/frames/f21.jfif'
import frame22 from '../../images/frames/f22.jfif'
import frame23 from '../../images/frames/f23.jfif'
import frame24 from '../../images/frames/f24.jfif'
import frame25 from '../../images/frames/f25.jfif'

export const products = [
    { name: "Classic Blue Frame", desc: "Premium lightweight frame with reinforced hinges.", price: "Rs. 1000", image: frame1 },
    { name: "Classic Black Frame", desc: "Premium lightweight round frame.", price: "Rs. 750", image: frame2 },
    { name: "Classic Brown Frame", desc: "Premium metallic brown frame in 3 piece.", price: "Rs. 1500", image: frame3 },
    { name: "Ocean White Frame", desc: "Premium lightweight frame with nice look.", price: "Rs. 1200", image: frame4 },
    { name: "Black Classic Frame", desc: "An old fashioned classic frame with a modern twist.", price: "Rs. 500", image: frame5 },
    { name: "Classic Black Frame", desc: "Premium classic frame in a oval shape.", price: "Rs. 1100", image: frame6 },
    { name: "Classic Blue Frame", desc: "Premium classic frame in a rectangular shape.", price: "Rs. 900", image: frame7 },
    { name: "Classic transparent Frame", desc: "Premium lightweight transparent frame.", price: "Rs. 500", image: frame8 },
    { name: "Classic Black Frame", desc: "Premium old fashioned black frame with blue legs.", price: "Rs. 500", image: frame9 },
    { name: "Classic black Frame", desc: "Premium quality 3 piece metallic frame.", price: "Rs. 1500", image: frame10 },
    { name: "Classic Brown Frame", desc: "An old fashioned frame for elders", price: "Rs. 300", image: frame11 },
    { name: "Classic Black Frame", desc: "Premium rectangular frame for bossy look.", price: "Rs. 2000", image: frame12 },
    { name: "Classic Black Frame", desc: "An oval shaped frame for a smarter look.", price: "Rs. 600", image: frame13 },
    { name: "Classic Blue Frame", desc: "Premium lightweight frame with reinforced hinges.", price: "Rs. 1000", image: frame14 },
    { name: "Classic Navy-Blue Frame", desc: "Premium navy blue frame with transparent look.", price: "Rs. 1300", image: frame15 },
    { name: "Classic Brown Frame", desc: "Premium brown frame in a tiger shape color", price: "Rs. 800", image: frame16 },
    { name: "Classic Black Frame", desc: "Premium lightweight double-shaded frame with reinforced hinges.", price: "Rs. 500", image: frame17 },
    { name: "Classic White Frame", desc: "Premium lightweight frame with reinforced hinges.", price: "Rs. 1000", image: frame18 },
    { name: "Classic Black Frame", desc: "Premium lightweight black frame for looking smarter.", price: "Rs. 1000", image: frame19 },
    { name: "Classic White Frame", desc: "Premium oval shaped frame to look cool.", price: "Rs. 1000", image: frame20 },
    { name: "Classic Blue Frame", desc: "Premium lightweight frame for children.", price: "Rs. 2500", image: frame21 },
    { name: "Classic Blue Frame", desc: "Premium lightweight frame with reinforced hinges.", price: "Rs. 1000", image: frame22 },
    { name: "Classic Black/White Frame", desc: "Premium lightweight frame for professors.", price: "Rs. 1200", image: frame23 },
    { name: "Classic black Frame", desc: "Premium lightweight frame for clear vision.", price: "Rs. 1000", image: frame24 },
    { name: "Classic Blue Frame", desc: "Premium lightweight frame for babies.", price: "Rs. 2000", image: frame25 },
  ];

export default function Optical() {
  const { addToCart } = useCart();
  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black uppercase text-white mb-12">Optical Frames</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }} 
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="border border-neutral-800 bg-neutral-900 p-4 rounded-2xl hover:border-teal-500 transition-colors cursor-pointer"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-xl mb-4" 
              />
              <h3 className="text-white font-bold">{product.name}</h3>
              <p className="text-neutral-400 text-sm mt-1">{product.desc}</p>
              <p className="text-teal-500 font-mono mt-2">{product.price}</p>
              <button onClick={() => addToCart({ ...product, id: `${product.name}-${index}` })} className="w-full mt-4 bg-white text-black py-2 rounded-lg font-bold text-sm hover:bg-teal-500 hover:text-white transition-colors">
                ADD TO CART
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

