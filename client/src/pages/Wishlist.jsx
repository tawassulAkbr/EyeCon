import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react'

export default function Wishlist() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { addToCart } = require('../context/CartContext').useCart()
  
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }

    // Fetch wishlist
    setLoading(true)
    fetch('http://localhost:8000/api/wishlist', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.wishlist && data.wishlist.items) {
          setWishlistItems(data.wishlist.items)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching wishlist:', err)
        setError('Failed to load wishlist')
        setLoading(false)
      })
  }, [token, navigate])

  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        setWishlistItems(wishlistItems.filter(item => item._id !== productId))
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err)
    }
  }

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      id: item._id
    })
  }

  if (loading) {
    return <div className="text-center pt-32 text-white">Loading wishlist...</div>
  }

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-teal-500 hover:text-teal-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-black text-white uppercase">My Wishlist</h1>
          <p className="text-neutral-400 mt-1">{wishlistItems.length} items saved</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center"
          >
            <Heart className="w-16 h-16 text-neutral-700 mx-auto mb-4 opacity-50" />
            <p className="text-neutral-400 text-lg mb-6">Your wishlist is empty</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => navigate('/types/optical')}
                className="bg-teal-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors"
              >
                Browse Optical Frames
              </button>
              <button
                onClick={() => navigate('/types/lens')}
                className="bg-emerald-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-emerald-400 transition-colors"
              >
                Browse Lenses
              </button>
              <button
                onClick={() => navigate('/types/sunglasses')}
                className="bg-amber-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-amber-400 transition-colors"
              >
                Browse Sunglasses
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-teal-500 transition-colors group"
              >
                {/* Image Placeholder */}
                <div className="w-full h-40 bg-neutral-800 rounded-lg mb-4 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                  <Heart className="w-12 h-12 text-neutral-600" />
                </div>

                {/* Item Details */}
                <div className="mb-4">
                  <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-neutral-400 text-sm line-clamp-2">{item.desc || item.description}</p>
                </div>

                {/* Price and Category */}
                <div className="mb-4">
                  <p className="text-teal-500 font-bold font-mono text-lg">
                    {item.price}
                  </p>
                  {item.category && (
                    <p className="text-neutral-500 text-xs font-mono uppercase mt-1">
                      {item.category}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-teal-500 text-black py-2 rounded-lg font-bold text-sm hover:bg-teal-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="flex-1 bg-red-500/20 text-red-500 py-2 rounded-lg font-bold text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 border border-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick Navigation */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/cart')}
              className="bg-teal-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-teal-400 transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Go to Cart
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-neutral-900 border border-neutral-800 text-white px-6 py-3 rounded-lg font-bold hover:border-teal-500 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
