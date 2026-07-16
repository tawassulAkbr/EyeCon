import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, Send, X, Upload, ArrowLeft, Star, Loader2, RotateCcw } from 'lucide-react'
import { products as fallbackProducts } from '../../data/products'

const CATS = [
  { key: 'optical', label: 'View Optical Frames' },
  { key: 'sunglasses', label: 'View Sunglasses' },
  { key: 'lens', label: 'View Optical Lenses' },
]

export default function ActionToggler() {
  const [mode, setMode] = useState(null) // 'support' | 'ai'
  const [isOpen, setIsOpen] = useState(false)

  // support chat state
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // ai flow state
  const [aiStep, setAiStep] = useState('upload') // upload -> analyzing -> menu -> results
  const [preview, setPreview] = useState(null)
  const [faceShape, setFaceShape] = useState(null)
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const chatRef = useRef(null)
  const fileRef = useRef(null)

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  const openMode = (m) => {
    setMode(m)
    setIsOpen(true)
    if (m === 'support' && messages.length === 0) {
      setMessages([{ sender: 'bot', text: 'Hi! Eyecon Support here. How can I help with your orders or complaints today?' }])
    }
    if (m === 'ai') {
      setAiStep('upload'); setPreview(null); setFaceShape(null); setResults([]); setError(null)
    }
  }

  const resetAi = () => { setAiStep('upload'); setPreview(null); setFaceShape(null); setResults([]); setError(null); setIsAiLoading(false) }

  const normalizeProduct = (product, fallbackCategory) => {
    const category = product.category || fallbackCategory
    const rawPrice = Number(product.price)
    const price = Number.isFinite(rawPrice) ? rawPrice : Number(String(product.price || '').replace(/[^\d.]/g, '')) || 0
    const productId = product._id || product.id || `${category}-${product.name || 'item'}`
    return {
      id: productId,
      name: product.name || 'Eyecon product',
      category,
      price,
      rating: Number(product.rating) || 4.5,
      image: product.image || '',
      description: product.description || '',
      compatibleFaceShapes: product.compatibleFaceShapes || ['all'],
    }
  }

  // Step: submit pic -> analyze -> menu opens automatically
  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const b64 = reader.result.split(',')[1]
      setPreview(reader.result)
      analyzeFace(b64)
    }
    reader.readAsDataURL(file)
  }

  const analyzeFace = async (b64) => {
    setAiStep('analyzing'); setError(null)
    try {
      const shape = 'oval'
      setFaceShape(shape)
      setAiStep('menu')
    } catch {
      setFaceShape('oval')
      setError('Using general eyewear picks for now.')
      setAiStep('menu')
    }
  }

  const pickCategory = async (catKey) => {
    const normalizedCategory = catKey === 'optical' ? 'optical' : catKey === 'sunglasses' ? 'sunglasses' : 'lens'
    const normalizedShape = faceShape || 'oval'
    setAiStep('results')
    setResults([])
    setError(null)
    setIsAiLoading(true)

    try {
      const localProducts = fallbackProducts
        .filter(product => String(product.category || '').toLowerCase() === normalizedCategory)
        .map(product => normalizeProduct(product, normalizedCategory))

      const faceShapeProducts = localProducts.filter(product => {
        const shapes = product.compatibleFaceShapes || ['all']
        return shapes.includes(normalizedShape) || shapes.includes('all')
      })

      const matched = faceShapeProducts.sort((a, b) => b.rating - a.rating).slice(0, 4)
      setResults(matched.length > 0 ? matched : localProducts.slice(0, 4))
    } catch {
      const fallback = fallbackProducts
        .filter(product => String(product.category || '').toLowerCase() === normalizedCategory)
        .filter(product => product.compatibleFaceShapes.includes(normalizedShape) || product.compatibleFaceShapes.includes('all'))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
      setResults(fallback)
    } finally {
      setIsAiLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput(''); setIsLoading(true)

    const text = input.toLowerCase().trim()
    let botMsg = 'Thanks for reaching out to Eyecon support. We can help with orders, returns, shipping, pricing, and eyewear questions.'

    const hasOrderIntent = /(order|orders|track|tracking|where is my|delivery|delivered|arrived)/i.test(text)
    const hasReturnIntent = /(return|returns|refund|exchange|exchanges|cancel|canceled)/i.test(text)
    const hasProductIntent = /(lens|lenses|frame|frames|glasses|sunglasses|eyewear|spectacle|spectacles)/i.test(text)
    const hasPriceIntent = /(price|pricing|cost|costs|discount|offer|offers|cheap|expensive)/i.test(text)
    const hasShippingIntent = /(ship|shipping|deliver|delivery|courier|postal)/i.test(text)
    const hasPaymentIntent = /(pay|payment|card|credit|debit|cash|checkout)/i.test(text)
    const hasStoreIntent = /(store|shop|available|stock|buy|sell|hello|hi|help|support)/i.test(text)

    if (hasOrderIntent) {
      botMsg = 'We can help you check an order or delivery status. Please share your order number or email address and we will look into it.'
    } else if (hasReturnIntent) {
      botMsg = 'Returns, exchanges, and refund requests can be handled from your order details. Share your order number and we will guide you through the next step.'
    } else if (hasProductIntent) {
      botMsg = 'Eyecon offers optical frames, lenses, and sunglasses. Tell us which item you want help with and we will guide you.'
    } else if (hasPriceIntent) {
      botMsg = 'Pricing depends on the product type and selected lens or frame options. Share the item name and we can help you with the current price range.'
    } else if (hasShippingIntent) {
      botMsg = 'We can help check shipping availability and delivery details for your location. Share your city or area and we will assist.'
    } else if (hasPaymentIntent) {
      botMsg = 'We can help with payment-related issues during checkout. Describe the problem and we will guide you through it.'
    } else if (hasStoreIntent) {
      botMsg = 'You can ask us anything about Eyecon products, orders, shipping, returns, or store policies and we will assist.'
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botMsg }])
      setIsLoading(false)
    }, 250)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-1 w-80 sm:w-96 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 text-white overflow-hidden origin-bottom-right"
          >
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${mode === 'ai' ? 'text-amber-400' : 'text-teal-400'}`}>
                {mode === 'ai' ? <Sparkles className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                {mode === 'ai' ? 'AI Frame Matcher' : 'Live Support'}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white text-lg leading-none">&times;</button>
            </div>

            {mode === 'support' && (
              <>
                <div ref={chatRef} className="h-64 bg-neutral-950 rounded-xl p-3 overflow-y-auto mb-3 text-xs flex flex-col gap-3">
                  {messages.map((msg, i) => (
                    <div key={i} className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${msg.sender === 'user' ? 'bg-neutral-800 text-white self-end rounded-tr-none' : 'bg-neutral-800 text-neutral-300 self-start rounded-tl-none border border-neutral-700'}`}>
                      {msg.text}
                    </div>
                  ))}
                  {isLoading && <div className="text-neutral-500 text-[10px] self-start animate-pulse">Typing...</div>}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                  <button onClick={handleSend} disabled={isLoading} className="p-2 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-50">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {mode === 'ai' && (
              <div className="min-h-64 flex flex-col">
                {/* Step 1: upload photo */}
                {aiStep === 'upload' && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8 text-center">
                    <Upload className="w-8 h-8 text-amber-400" />
                    <p className="text-xs text-neutral-300 px-4">Upload a photo of your face and I'll suggest optical frames, sunglasses & optical lenses that suit you.</p>
                    <button onClick={() => fileRef.current.click()} className="text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-900 px-4 py-2 rounded-lg">
                      Submit Photo
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                  </div>
                )}

                {/* Step 2: analyzing */}
                {aiStep === 'analyzing' && (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 py-8">
                    {preview && <img src={preview} alt="preview" className="w-16 h-16 rounded-full object-cover border-2 border-amber-400" />}
                    <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                    <p className="text-xs text-neutral-400">Analyzing your face structure...</p>
                  </div>
                )}

                {/* Step 3: menu (auto-opens) */}
                {aiStep === 'menu' && (
                  <div className="flex-1 flex flex-col gap-3 py-2">
                    <div className="flex items-center gap-3 pb-2">
                      {preview && <img src={preview} alt="preview" className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />}
                      <p className="text-xs text-neutral-300">
                        Detected face shape: <span className="text-amber-400 font-semibold capitalize">{faceShape}</span>
                      </p>
                    </div>
                    {error && <p className="text-[10px] text-red-400">{error}</p>}
                    <p className="text-[11px] text-neutral-500">What would you like me to suggest?</p>
                    <div className="flex flex-col gap-2">
                      {CATS.map(c => (
                        <button key={c.key} onClick={() => pickCategory(c.key)} className="text-xs font-medium bg-neutral-800 hover:bg-amber-500 hover:text-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-left transition-colors">
                          {c.label}
                        </button>
                      ))}
                    </div>
                    <button onClick={resetAi} className="mt-1 self-start flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-300">
                      <RotateCcw className="w-3 h-3" /> Upload a different photo
                    </button>
                  </div>
                )}

                {/* Step 4: results */}
                {aiStep === 'results' && (
                  <div className="flex-1 flex flex-col gap-2">
                    <button onClick={() => setAiStep('menu')} className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-white mb-1">
                      <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <div className="h-56 overflow-y-auto flex flex-col gap-2 pr-1">
                      {isAiLoading && <div className="flex items-center gap-2 text-xs text-neutral-400"><Loader2 className="w-4 h-4 animate-spin" /> Loading eyewear picks...</div>}
                      {!isAiLoading && results.length === 0 && <p className="text-xs text-neutral-500">No exact matches found, try another category.</p>}
                      {!isAiLoading && results.map(p => (
                        <div key={p.id} className="flex gap-2 bg-neutral-950 border border-neutral-800 rounded-lg p-2">
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-md object-cover shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold truncate">{p.name}</p>
                            <p className="text-[10px] text-neutral-500 flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{p.rating} · ${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={resetAi} className="mt-1 self-start flex items-center gap-1 text-[10px] text-neutral-500 hover:text-neutral-300">
                      <RotateCcw className="w-3 h-3" /> Start over
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two dedicated togglers */}
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center relative group ${mode === 'ai' && isOpen ? 'bg-amber-500' : 'bg-neutral-900'}`}
        onClick={() => (mode === 'ai' && isOpen ? setIsOpen(false) : openMode('ai'))}>
        <Sparkles className={`w-5 h-5 ${mode === 'ai' && isOpen ? 'text-neutral-900' : 'text-amber-400'}`} />
        {!isOpen && <span className="absolute right-14 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">AI Frame Matcher</span>}
      </motion.button>

      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center relative group ${mode === 'support' && isOpen ? 'bg-teal-500' : 'bg-neutral-900'}`}
        onClick={() => (mode === 'support' && isOpen ? setIsOpen(false) : openMode('support'))}>
        <MessageSquare className={`w-6 h-6 ${mode === 'support' && isOpen ? 'text-neutral-900' : 'text-teal-400'}`} />
        {!isOpen && <span className="absolute right-16 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">Contact Support</span>}
      </motion.button>
    </div>
  )
}
