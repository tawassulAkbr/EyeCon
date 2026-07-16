import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, Truck, Eye } from 'lucide-react'

export default function PreDashboardFlyer() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 sm:p-10 shadow-2xl shadow-teal-500/10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-teal-400">
            <Sparkles className="h-3.5 w-3.5" />
            Eyewear Experience Ready
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl font-black uppercase leading-tight">
            Welcome to your <span className="text-teal-400">Eyecon</span> control center.
          </h1>

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-neutral-400 leading-7">
            Your account is now set up. From here you can track orders, save favorites, view your profile, and enjoy a smoother checkout experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-teal-400"
            >
              Continue to Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/')}
              className="rounded-full border border-neutral-700 px-5 py-3 text-sm font-semibold text-neutral-300 transition hover:border-teal-500 hover:text-white"
            >
              Browse Products
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-[2rem] border border-neutral-800 bg-neutral-900/80 p-6 sm:p-8"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-black/40 p-4">
              <div className="rounded-full bg-teal-500/15 p-2 text-teal-400">
                <Eye className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Premium eyewear collection</p>
                <p className="text-sm text-neutral-400">Browse optical frames, lenses, and sunglasses with ease.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-black/40 p-4">
              <div className="rounded-full bg-emerald-500/15 p-2 text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Secure account access</p>
                <p className="text-sm text-neutral-400">Keep your profile, address, and order history protected.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-neutral-800 bg-black/40 p-4">
              <div className="rounded-full bg-amber-500/15 p-2 text-amber-400">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-white">Live order tracking</p>
                <p className="text-sm text-neutral-400">Watch each update from confirmation to delivery.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
