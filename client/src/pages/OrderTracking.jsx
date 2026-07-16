import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, XCircle } from 'lucide-react'

export default function OrderTracking() {
  const { orderId } = useParams()
  const { token } = useAuth()
  const navigate = useNavigate()
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelLoading, setCancelLoading] = useState(false)
  const [cancelMessage, setCancelMessage] = useState('')

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }

    // Fetch order details
    fetch(`http://localhost:8000/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.order) {
          setOrder(data.order)
        } else {
          setError('Order not found')
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching order:', err)
        setError('Failed to load order details')
        setLoading(false)
      })
  }, [orderId, token, navigate])

  const handleCancelOrder = async () => {
    if (!window.confirm('Cancel this order?')) return

    setCancelLoading(true)
    setCancelMessage('')

    try {
      const res = await fetch(`http://localhost:8000/api/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Could not cancel order')

      setOrder(prev => prev ? { ...prev, status: 'cancelled' } : prev)
      setCancelMessage('Order cancelled successfully.')
    } catch (err) {
      setCancelMessage(err.message || 'Failed to cancel order')
    } finally {
      setCancelLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center pt-32 text-white">Loading order details...</div>
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen pt-32 px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-teal-500 hover:text-teal-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-lg">
            <p className="font-bold">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="bg-black min-h-screen pt-32 px-8">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-teal-500 hover:text-teal-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <p className="text-neutral-400">Order not found</p>
        </div>
      </div>
    )
  }

  // Timeline steps
  const timelineSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock },
    { status: 'processing', label: 'Processing', icon: CheckCircle },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: Package }
  ]

  const currentStepIndex = timelineSteps.findIndex(step => step.status === order.status)
  const isCancelled = order.status === 'cancelled'

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-3xl mx-auto">
        
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
          <h1 className="text-3xl font-black text-white uppercase">Order Tracking</h1>
          <p className="text-neutral-400 mt-1">Order #{order._id.slice(-8)}</p>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
            order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-500' :
            order.status === 'processing' ? 'bg-yellow-500/20 text-yellow-500' :
            order.status === 'cancelled' ? 'bg-red-500/20 text-red-500' :
            'bg-neutral-700 text-neutral-400'
          }`}>
            {order.status ? (order.status.charAt(0).toUpperCase() + order.status.slice(1)) : 'Pending'}
          </span>
          {order.status === 'pending' && (
            <button
              onClick={handleCancelOrder}
              disabled={cancelLoading}
              className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500/20 disabled:opacity-60"
            >
              <XCircle className="w-4 h-4" />
              {cancelLoading ? 'Cancelling...' : 'Cancel Order'}
            </button>
          )}
        </motion.div>

        {cancelMessage && (
          <div className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            cancelMessage.includes('success') ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-red-500/30 bg-red-500/10 text-red-400'
          }`}>
            {cancelMessage}
          </div>
        )}

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-8">Delivery Status</h2>
          {isCancelled ? (
            <p className="text-sm text-red-500 mb-4">This order was cancelled and will not be shipped.</p>
          ) : null}
          
          <div className="space-y-4">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon
              const isCompleted = idx <= currentStepIndex
              const isCurrent = idx === currentStepIndex
              
              return (
                <div key={step.status} className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-teal-500 border-teal-500'
                      : 'bg-neutral-800 border-neutral-700'
                  }`}>
                    <Icon className={`w-5 h-5 ${isCompleted ? 'text-black' : 'text-neutral-600'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-bold ${isCompleted ? 'text-white' : 'text-neutral-600'}`}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-teal-500 text-sm font-mono mt-1">In Progress</p>
                    )}
                  </div>
                  
                  {idx < timelineSteps.length - 1 && (
                    <div className={`absolute left-5 top-12 w-0.5 h-8 ${
                      isCompleted ? 'bg-teal-500' : 'bg-neutral-700'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          
          {/* Shipping Address */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-500" />
              Shipping Address
            </h2>
            
            {order.shippingAddress ? (
              <div className="space-y-2 text-neutral-400">
                <p className="text-white font-bold">{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                <p>{order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
              </div>
            ) : (
              <p className="text-neutral-500">No shipping address provided</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-500" />
              Contact Information
            </h2>
            
            <div className="space-y-3">
              {order.userId ? (
                <>
                  <div>
                    <p className="text-neutral-500 text-xs font-mono mb-1">Name</p>
                    <p className="text-white">{order.userId.name}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-xs font-mono mb-1">Email</p>
                    <p className="text-white break-all text-sm">{order.userId.email}</p>
                  </div>
                  {order.userId.phone && (
                    <div>
                      <p className="text-neutral-500 text-xs font-mono mb-1">Phone</p>
                      <p className="text-white">{order.userId.phone}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-neutral-500">Contact information unavailable</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-white mb-6">Order Items</h2>
          <div className="mb-6 rounded-xl border border-teal-500/20 bg-teal-500/10 p-4 text-sm text-teal-400">
            <p className="font-mono uppercase tracking-widest text-[10px]">Tracking ID</p>
            <p className="font-bold text-white mt-1">{order.trackingId || 'Generating...'}</p>
          </div>
          
          <div className="space-y-4">
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center pb-4 border-b border-neutral-800 last:border-0">
                  <div>
                    <p className="text-white font-bold">{item.productName || item.name}</p>
                    <p className="text-neutral-500 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-teal-500 font-mono font-bold">
                    Rs. {item.price ? Number(item.price).toLocaleString() : '0'}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-neutral-500">No items in this order</p>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t border-neutral-800 space-y-2">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal:</span>
              <span className="text-white">Rs. {Number(order.totalPrice || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Shipping:</span>
              <span className="text-white">Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-white pt-2 border-t border-neutral-800">
              <span>Total:</span>
              <span className="text-teal-500">Rs. {Number(order.totalPrice || 0).toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center text-neutral-400 text-sm"
        >
          <p>
            Order placed on <span className="text-white font-bold">{new Date(order.createdAt).toLocaleString()}</span>
          </p>
          {order.expectedDelivery && (
            <p className="mt-2">
              Expected delivery: <span className="text-white font-bold">{new Date(order.expectedDelivery).toLocaleDateString()}</span>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
