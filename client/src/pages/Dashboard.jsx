import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Heart, LogOut, Edit2, Eye, Sparkles, PackageCheck, Clock3 } from 'lucide-react'

export default function Dashboard() {
  const { user, logout, token, loading, getProfile } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }
    
    // Fetch user's orders
    setOrdersLoading(true)
    fetch('http://localhost:8000/api/orders', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.orders) setOrders(data.orders)
        setOrdersLoading(false)
      })
      .catch(err => {
        console.error('Error fetching orders:', err)
        setOrdersLoading(false)
      })

    // Fetch wishlist count
    fetch('http://localhost:8000/api/wishlist', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.wishlist) setWishlistCount(data.wishlist.items.length)
      })
      .catch(err => console.error('Error fetching wishlist:', err))
  }, [token, navigate])

  if (loading) return <div className="text-center pt-32 text-white">Loading...</div>

  if (!user) {
    return <div className="text-center pt-32 text-white">Please log in to view dashboard</div>
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-black text-white uppercase">Dashboard</h1>
              <p className="text-neutral-400 mt-2">Welcome, {user.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-500 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-teal-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-sm">Total Orders</p>
                  <p className="text-white text-2xl font-bold mt-1">{orders.length}</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-teal-500" />
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-sm">Wishlist Items</p>
                  <p className="text-white text-2xl font-bold mt-1">{wishlistCount}</p>
                </div>
                <Heart className="w-8 h-8 text-emerald-500" />
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-amber-500 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-500 text-sm">Member Since</p>
                  <p className="text-white text-sm font-mono mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="w-8 h-8 bg-amber-500 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-teal-500 transition-colors"
          >
            <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-neutral-500 text-xs uppercase font-mono mb-1">Email</p>
                <p className="text-white break-all">{user.email}</p>
              </div>
              
              {user.phone && (
                <div>
                  <p className="text-neutral-500 text-xs uppercase font-mono mb-1">Phone</p>
                  <p className="text-white">{user.phone}</p>
                </div>
              )}

              {user.addresses && user.addresses.length > 0 && (
                <div>
                  <p className="text-neutral-500 text-xs uppercase font-mono mb-2">Default Address</p>
                  <div className="bg-neutral-800 rounded-lg p-3 border border-neutral-700">
                    <p className="text-white text-sm">{user.addresses[0].street}</p>
                    <p className="text-neutral-400 text-sm">{user.addresses[0].city}, {user.addresses[0].state}</p>
                    <p className="text-neutral-400 text-sm">{user.addresses[0].zipCode}</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => navigate('/profile')}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500 text-teal-500 py-2 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Orders</h2>
            
            {ordersLoading ? (
              <div className="text-center py-8 text-neutral-400">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center">
                <ShoppingBag className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                <p className="text-neutral-400 mb-4">No orders yet</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-teal-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-teal-400 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    whileHover={{ y: -5 }}
                    className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 hover:border-teal-500 transition-colors cursor-pointer"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-neutral-500 text-xs font-mono">Order #{order._id.slice(-8)}</p>
                        <p className="text-white font-mono text-sm mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        order.status === 'shipped' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-neutral-700 text-neutral-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-neutral-400 text-sm">{order.items.length} items</p>
                      <div>
                        <p className="text-[11px] font-mono text-teal-500 uppercase tracking-widest">Tracking</p>
                        <p className="text-teal-500 font-mono font-bold">{order.trackingId || 'Pending'}</p>
                      </div>
                      <p className="text-teal-500 font-mono font-bold">
                        Rs. {Number(order.totalPrice || 0).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <button
            onClick={() => navigate('/wishlist')}
            className="bg-neutral-900 border border-neutral-800 hover:border-emerald-500 rounded-lg p-6 text-center transition-colors group"
          >
            <Heart className="w-8 h-8 text-emerald-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-bold">My Wishlist</p>
            <p className="text-neutral-500 text-sm mt-1">{wishlistCount} items saved</p>
          </button>

          <button
            onClick={() => navigate('/types/optical')}
            className="bg-neutral-900 border border-neutral-800 hover:border-teal-500 rounded-lg p-6 text-center transition-colors group"
          >
            <Eye className="w-8 h-8 text-teal-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-bold">Shop Optical</p>
            <p className="text-neutral-500 text-sm mt-1">Premium frames</p>
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-lg p-6 text-center transition-colors group"
          >
            <ShoppingBag className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-white font-bold">My Cart</p>
            <p className="text-neutral-500 text-sm mt-1">View & checkout</p>
          </button>
        </motion.div>
      </div>
    </div>
  )
}
