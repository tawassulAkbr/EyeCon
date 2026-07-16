import React, { useState } from 'react'
import { CreditCard, ShieldCheck, Truck, Landmark, CheckCircle, Trash2, ShoppingBag, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api'

export default function Cart() {
  const { cartItems: cart, removeFromCart, clearCart, updateQuantity } = useCart()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  
  // Payment Selection State ('cod' | 'card' | 'jazzcash' | 'easypaisa')
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  // Payment Validation Input Field States
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [mobileWalletNumber, setMobileWalletNumber] = useState('')
  const [orderProcessed, setOrderProcessed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  // Parse string prices like "Rs. 1000" to numbers
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return Number(price.replace(/[^0-9]/g, ""));
  };

  // Calculate Order Totals
  const subtotal = cart?.reduce((acc, item) => acc + (parsePrice(item.price) * (item.quantity || 1)), 0) || 0
  const shipping = subtotal > 0 ? 500 : 0
  const total = subtotal + shipping

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitSuccess('')

    if (!token) {
      navigate('/auth')
      return
    }

    if (user?.role === 'admin') {
      setSubmitError('Admin accounts cannot place orders. Please use a customer account.')
      return
    }

    setIsSubmitting(true)

    try {
      const savedAddress = user?.addresses?.find((address) => address.isDefault) || user?.addresses?.[0] || {}
      const shippingAddress = {
        street: savedAddress.street || 'Main Street',
        city: savedAddress.city || 'Islamabad',
        state: savedAddress.state || 'Islamabad',
        zipCode: savedAddress.zipCode || '44000',
        country: savedAddress.country || 'Pakistan'
      }

      const backendPaymentMethod = paymentMethod === 'card' ? 'credit_card' : paymentMethod === 'cod' ? 'cod' : paymentMethod === 'jazzcash' ? 'paypal' : 'stripe'
      const orderItems = cart.map((item) => ({
        id: item.id,
        productId: item.id,
        productName: item.name,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || ''
      }))
      const response = await createOrder(token, shippingAddress, total.toString(), backendPaymentMethod, orderItems)

      if (response?.order) {
        setOrderProcessed(true)
        setSubmitSuccess(`Order placed successfully. Tracking ID: ${response.order.trackingId}`)
        if (typeof clearCart === 'function') clearCart()
        setTimeout(() => navigate(`/orders/${response.order._id}`), 800)
      }
    } catch (err) {
      setSubmitError(err.message || 'Could not place your order right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[60vh] pt-28 flex flex-col items-center justify-center bg-[#fcfcfc] px-4 font-sans text-center">
        <ShoppingBag className="w-12 h-12 text-neutral-300 mb-4 animate-pulse" />
        <h2 className="text-xl font-black tracking-tight uppercase">Your Vault Is Empty</h2>
        <p className="text-xs font-mono text-neutral-500 mt-1">Add items from the store to activate the gateway pipeline.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] text-neutral-900 pt-28 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* ========================================================= */}
        {/* LEFT PANEL: CART BASKET SUMMARY & MANIFEST REVIEW        */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h1 className="text-2xl font-black tracking-tight uppercase">Order Manifest</h1>
              <span className="text-xs font-mono bg-neutral-100 px-2 py-0.5 rounded text-neutral-500 font-bold">
                {cart.length} Unit(s)
              </span>
            </div>

            {/* Cart Items List Container */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-150">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-white border border-neutral-200" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold font-mono tracking-tight text-neutral-800 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] font-mono text-neutral-500 mt-0.5">{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* Quantity Control Toggler */}
                    <div className="flex items-center border border-neutral-200 rounded-lg bg-white overflow-hidden">
                      <button 
                        type="button" 
                        onClick={() => updateQuantity && updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        className="px-2 py-1 text-xs hover:bg-neutral-100 font-mono"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-neutral-700">{item.quantity || 1}</span>
                      <button 
                        type="button" 
                        onClick={() => updateQuantity && updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="px-2 py-1 text-xs hover:bg-neutral-100 font-mono"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart && removeFromCart(item.id)}
                      className="text-neutral-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Ledger Price Distribution breakdown */}
          <div className="pt-6 border-t border-neutral-100 space-y-2 mt-6 font-mono text-xs">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal Array:</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-500">
              <span>Logistic Shipping:</span>
              <span>Rs. {shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-900 border-t border-dashed border-neutral-200 pt-2 text-sm">
              <span className="uppercase tracking-wider">Total Ledger Amount:</span>
              <span className="text-teal-600">Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: SECURE FINANCIAL CHECKOUT GATEWAY INTERFACE   */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-teal-600">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold">Secure Settlement Pipeline</h2>
            </div>
            <span className="text-xs font-mono bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-md font-bold">
              SSL Encrypted
            </span>
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight uppercase">Select Settlement Framework</h2>
            <p className="text-xs font-mono text-neutral-500 mt-0.5">Choose your local or international payment gateway protocol.</p>
          </div>

          {/* Dynamic Gateway Architecture Options Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button" onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                paymentMethod === 'card' ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Card Node</span>
            </button>

            <button
              type="button" onClick={() => setPaymentMethod('cod')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
                paymentMethod === 'cod' ? 'border-teal-500 bg-teal-50 text-teal-600' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">C.O.D.</span>
            </button>

            <button
              type="button" onClick={() => setPaymentMethod('jazzcash')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                paymentMethod === 'jazzcash' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-black font-black text-[9px] font-mono">J</div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">JazzCash</span>
            </button>

            <button
              type="button" onClick={() => setPaymentMethod('easypaisa')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                paymentMethod === 'easypaisa' ? 'border-green-500 bg-green-50 text-green-700' : 'border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-[9px] font-mono">E</div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Easypaisa</span>
            </button>
          </div>

          {/* Conditional Sub-Form Interface Layer Render */}
          <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2 min-h-[180px]">
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Cardholder Name</label>
                  <input 
                    type="text" required placeholder="Cardholder Identity"
                    value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Card Number</label>
                  <input 
                    type="text" required placeholder="xxxx xxxx xxxx xxxx" maxLength="19"
                    value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Expiration MM/YY</label>
                    <input 
                      type="text" required placeholder="MM/YY" maxLength="5"
                      value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Security CVC</label>
                    <input 
                      type="password" required placeholder="xxx" maxLength="3"
                      value={cardDetails.cvc} onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2 px-3 text-xs font-mono focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2 text-xs font-mono">
                <p className="text-teal-600 font-bold uppercase tracking-wider text-[10px]">✓ Cash On Delivery Mode Enabled</p>
                <p className="text-neutral-500 leading-relaxed">
                  No immediate digital clearance required. Pay safely in cash upon physical verification of your luxury optics delivery.
                </p>
              </div>
            )}

            {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
              <div className="space-y-3">
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono space-y-1">
                  <p className="font-bold text-neutral-800 uppercase text-[10px]">
                    {paymentMethod === 'jazzcash' ? 'JazzCash USSD Push Protocol' : 'Easypaisa API Instant Wallet Routing'}
                  </p>
                  <p className="text-neutral-500">
                    Provide your registered mobile account number. A secure confirmation popup window authorization request will trigger instantly on your handset device.
                  </p>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Mobile Account Number</label>
                  <input 
                    type="tel" required placeholder="03xx xxxxxxx" maxLength="11"
                    value={mobileWalletNumber} onChange={(e) => setMobileWalletNumber(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            )}

            {(submitError || submitSuccess) && (
              <div className={`rounded-xl border p-3 text-xs font-mono ${submitError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                {submitError ? (
                  <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /><span>{submitError}</span></div>
                ) : (
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /><span>{submitSuccess}</span></div>
                )}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit" disabled={orderProcessed || isSubmitting}
                className={`w-full font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  orderProcessed || isSubmitting ? 'bg-emerald-600 text-white cursor-default' : 'bg-teal-500 text-white hover:bg-teal-600'
                }`}
              >
                {orderProcessed || isSubmitting ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{isSubmitting ? 'Processing Order...' : 'Order Authenticated & Dispatched'}</span>
                  </>
                ) : (
                  <>
                    <Landmark className="w-4 h-4" />
                    <span>Process Total Settlement</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}