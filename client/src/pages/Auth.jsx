import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ArrowLeft, Phone, MapPin, AlertCircle } from 'lucide-react'

export default function Auth() {
  const navigate = useNavigate()
  const { login, register, forgotPassword } = useAuth()
  const [authMode, setAuthMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form States
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    confirmAddress: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      if (authMode === 'login') {
  await login(formData.email, formData.password)
  navigate('/')
}
else if (authMode === 'register') {
        // Validation Check: Passwords match
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match.")
        }
        
        // Register
        await register(formData.name, formData.email, formData.password, {
          phone: formData.phone,
          address: formData.address,
          confirmAddress: formData.confirmAddress
        })
        navigate('/')
      } else if (authMode === 'forgot') {
        await forgotPassword(formData.email)
        setError('')
        setAuthMode('login')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-neutral-950 text-white overflow-hidden">
      
      {/* LEFT SIDE: Immersive Premium Minimal Brand Panel (Hidden on small mobile screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 bg-gradient-to-br from-neutral-900 to-black border-r border-neutral-800">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="z-10">
          <span className="text-xs font-mono tracking-widest text-teal-400 uppercase">Premium AI Eyewear System</span>
        </div>

        <div className="z-10 max-w-md space-y-4">
          <h2 className="text-4xl font-black tracking-tight leading-none uppercase">
            SIGHT RECOGNIZED.<br />PERFORMANCE <span className="text-teal-500">OPTIMIZED.</span>
          </h2>
          <p className="text-xs text-neutral-400 font-mono leading-relaxed">
            Gain unified secure vault clearing to preview your tailored frames profile, calibrate prescription adjustments, and unlock virtual 3D face-landmark mapping pipelines.
          </p>
        </div>

        <div className="z-10 text-[10px] font-mono text-neutral-600">
          &copy; {new Date().getFullYear()} EYECON Inc. All rights secured.
        </div>
      </div>

      {/* RIGHT SIDE: The Dedicated Authentication Interaction Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-16 lg:px-24 relative bg-black/40 backdrop-blur-md overflow-y-auto py-12">
        
        <div className="max-w-md w-full mx-auto space-y-6">
          
          {/* Section Dynamic Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-wider uppercase">
              {authMode === 'login' && 'Login'}
              {authMode === 'register' && 'Register Account'}
              {authMode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-xs font-mono text-neutral-500">
              {authMode === 'login' && 'Enter your parameters to access your catalog dashboard.'}
              {authMode === 'register' && 'Register to unlock tailored frame suggestions and shipping management.'}
              {authMode === 'forgot' && 'Provide your security account email address to receive a recovery reset link.'}
            </p>
          </div>

          {/* Core Interactive Form Sheet */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500 rounded-lg p-3 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-xs text-red-500">{error}</p>
              </motion.div>
            )}

            <AnimatePresence mode="popLayout">
              {/* 1. Name Field (Only on Register Mode) */}
              {authMode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="relative"
                >
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="" 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* 2. Global Email Field (Used in all modes) */}
              <motion.div layout>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="" 
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors"
                  />
                </div>
              </motion.div>

              {/* 3. Contact Number (Only on Register Mode) */}
              {authMode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="relative"
                >
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="" 
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* 4. Shipping Address Fields (Only on Register Mode) */}
              {authMode === 'register' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="relative"
                  >
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Shipping Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                      <textarea 
                        name="address"
                        required
                        rows="2"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pt-2.5 pb-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors resize-none"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="relative"
                  >
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Confirm Shipping Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                      <textarea 
                        name="confirmAddress"
                        required
                        rows="2"
                        value={formData.confirmAddress}
                        onChange={handleInputChange}
                        placeholder="" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pt-2.5 pb-3 pl-10 pr-4 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors resize-none"
                      />
                    </div>
                  </motion.div>
                </>
              )}

              {/* 5. Password Field (Hidden in forgot mode) */}
              {authMode !== 'forgot' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="space-y-4"
                >
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">Secure Password</label>
                      {authMode === 'login' && (
                        <button 
                          type="button" 
                          onClick={() => setAuthMode('forgot')}
                          className="text-[10px] font-mono text-teal-500 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="" 
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password (Only on Register Mode) */}
                  {authMode === 'register' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="" 
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-10 pr-12 text-xs font-mono focus:outline-none focus:border-teal-500 text-white transition-colors"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Core Interaction Buttons */}
            <motion.div layout className="pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-teal-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    {authMode === 'login' && 'Login'}
                    {authMode === 'register' && 'Register Account'}
                    {authMode === 'forgot' && 'Send Reset Link'}
                    <ArrowRight className="w-3 h-3" />
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Action Toggle Footer Links */}
          <motion.div layout className="pt-4 border-t border-neutral-900 text-center">
            {authMode === 'forgot' ? (
              <button 
                type="button" 
                onClick={() => setAuthMode('login')}
                className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3 h-3" /> Back to Login
              </button>
            ) : (
              <p className="text-xs font-mono text-neutral-500">
                {authMode === 'login' ? "New to the collective ecosystem?" : "Already possess credential verification?"}{' '}
                <button 
                  type="button" 
                  onClick={() => {
                    setAuthMode(authMode === 'login' ? 'register' : 'login')
                    setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '', address: '', confirmAddress: '' })
                  }}
                  className="text-teal-400 font-bold hover:underline ml-1"
                >
                  {authMode === 'login' ? 'Register Account' : 'Login'}
                </button>
              </p>
            )}
          </motion.div>

        </div>
      </div>

    </div>
  )
}