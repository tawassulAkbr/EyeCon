import React, { useState } from 'react'
import { CreditCard, ShieldCheck, Truck, Landmark, CheckCircle } from 'lucide-react'

export default function PaymentGateway({ totalAmount = 0, onOrderSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '', name: '' })
  const [mobileWalletNumber, setMobileWalletNumber] = useState('')
  const [orderProcessed, setOrderProcessed] = useState(false)

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setOrderProcessed(true)
    if (onOrderSuccess) {
      setTimeout(() => {
        onOrderSuccess()
        setOrderProcessed(false)
      }, 2000)
    }
  }

  return (
    /* Increased top padding (pt-24) to clear the header navigation entirely */
    <div className="min-h-screen w-full pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans flex justify-center">
      
      {/* Centered Gateway Card Window */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-md space-y-6 max-w-3xl w-full mt-8">
        
        <div className="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="text-xs font-mono uppercase tracking-widest font-bold">Secure Settlement Pipeline</h2>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Payment Verification Gateway</h1>
            <p className="text-xs font-mono text-neutral-500 mt-0.5">Select a localized transaction ledger option to process your order amount.</p>
          </div>
          
          <div>
            <span className="text-xs font-mono bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap block text-center">
              SSL Encrypted
            </span>
          </div>
        </div>

        {/* 4 Methods Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button" onClick={() => setPaymentMethod('card')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
              paymentMethod === 'card' ? 'border-teal-500 bg-teal-50 text-teal-600 shadow-sm' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 text-neutral-700'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Card Node</span>
          </button>

          <button
            type="button" onClick={() => setPaymentMethod('cod')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-center transition-all ${
              paymentMethod === 'cod' ? 'border-teal-500 bg-teal-50 text-teal-600 shadow-sm' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 text-neutral-700'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">C.O.D.</span>
          </button>

          <button
            type="button" onClick={() => setPaymentMethod('jazzcash')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
              paymentMethod === 'jazzcash' ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 text-neutral-700'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-black font-black text-[9px] font-mono">J</div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">JazzCash</span>
          </button>

          <button
            type="button" onClick={() => setPaymentMethod('easypaisa')}
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
              paymentMethod === 'easypaisa' ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 text-neutral-700'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-[9px] font-mono">E</div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Easypaisa</span>
          </button>
        </div>

        {/* Execution Form Wrapper */}
        <form onSubmit={handlePaymentSubmit} className="space-y-4 pt-2 min-h-[200px]">
          {paymentMethod === 'card' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Cardholder Name</label>
                <input 
                  type="text" required placeholder="Cardholder Identity"
                  value={cardDetails.name} onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Card Number</label>
                <input 
                  type="text" required placeholder="xxxx xxxx xxxx xxxx" maxLength="19"
                  value={cardDetails.number} onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Expiration MM/YY</label>
                  <input 
                    type="text" required placeholder="MM/YY" maxLength="5"
                    value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Security CVC</label>
                  <input 
                    type="password" required placeholder="xxx" maxLength="3"
                    value={cardDetails.cvc} onChange={(e) => setCardDetails({...cardDetails, cvc: e.target.value})}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2 text-xs font-mono animate-fadeIn">
              <p className="text-teal-600 font-bold uppercase tracking-wider text-[10px]">✓ Cash On Delivery Enabled</p>
              <p className="text-neutral-500 leading-relaxed">
                No digital trace execution needed. Hand settle the billing amount with the shipping carrier directly upon optical package receipt.
              </p>
            </div>
          )}

          {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono">
                <p className="font-bold text-neutral-800 uppercase text-[10px] mb-1">
                  {paymentMethod === 'jazzcash' ? 'JazzCash Mobile Push Link' : 'Easypaisa API Payment Node'}
                </p>
                <p className="text-neutral-500 leading-relaxed">
                  Input your 11-digit mobile identity. A secure authentication pin-entry prompt overlay window will show up on your mobile handset device instantly.
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

          <div className="pt-4">
            <button
              type="submit" disabled={orderProcessed}
               className={`w-full font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                orderProcessed ? 'bg-emerald-600 text-white cursor-default' : 'bg-teal-500 text-white hover:bg-teal-600 shadow-sm'
              }`}
            >
              {orderProcessed ? (
                <>
                  <CheckCircle className="w-4 h-4 animate-pulse" />
                  <span>Verifying Transaction Ledger...</span>
                </>
              ) : (
                <>
                  <Landmark className="w-4 h-4" />
                  <span>Clear Total Settlement</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}