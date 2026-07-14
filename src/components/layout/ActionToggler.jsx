import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Sparkles, Send, Paperclip } from 'lucide-react'

export default function ActionToggler() {
  const [currentIcon, setCurrentIcon] = useState('contact')
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setMessages([{
        sender: 'bot',
        text: currentIcon === 'ai' 
          ? 'Hello! Upload a photo of your face, and I will analyze your structure to recommend the perfect frames.' 
          : 'Hi! Eyecon Support here. Please let me know how I can assist you with your complaints or orders today.'
      }])
      return;
    }
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev === 'contact' ? 'ai' : 'contact'))
    }, 4000)
    return () => clearInterval(interval)
  }, [isOpen, currentIcon])

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    }
  }

  const handleSend = async () => {
    if (!input.trim() && !image) return;
    const userMsg = { sender: 'user', text: input, hasImage: !!image };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // NOTE: User must provide their Gemini API Key in .env as VITE_GEMINI_API_KEY
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'REPLACE_WITH_YOUR_GEMINI_API_KEY'; 
      
      const systemPrompt = currentIcon === 'ai' 
        ? "You are an AI Frame Matcher for Eyecon. Analyze the provided facial structure and recommend suitable glasses. Be concise."
        : "You are a customer support agent for Eyecon. Help the customer gracefully with their complaints or inquiries. Be concise and polite.";

      const parts = [];
      if (image && currentIcon === 'ai') {
        parts.push({ inlineData: { mimeType: "image/jpeg", data: image } });
      }
      parts.push({ text: `${systemPrompt}\nUser: ${input}` });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts }] })
      });
      
      const data = await response.json();
      const botMsg = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { sender: 'bot', text: botMsg }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: 'bot', text: "Connection error or missing API key." }]);
    } finally {
      setIsLoading(false);
      setImage(null);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-4 text-white overflow-hidden origin-bottom-right"
          >
            <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-3">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${currentIcon === 'ai' ? 'text-amber-400' : 'text-teal-400'}`}>
                {currentIcon === 'ai' ? <Sparkles className="w-4 h-4"/> : <MessageSquare className="w-4 h-4"/>}
                {currentIcon === 'ai' ? 'AI Frame Matcher' : 'Live Support'}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-neutral-400 hover:text-white text-lg leading-none">&times;</button>
            </div>
            
            <div ref={chatRef} className="h-64 bg-neutral-950 rounded-xl p-3 overflow-y-auto mb-3 text-xs flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`p-2.5 rounded-lg max-w-[85%] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-neutral-800 text-white self-end rounded-tr-none' 
                    : 'bg-neutral-800 text-neutral-300 self-start rounded-tl-none border border-neutral-700'
                }`}>
                  {msg.hasImage && <div className="mb-1 text-amber-500 font-bold text-[10px]">[Image Uploaded]</div>}
                  {msg.text}
                </div>
              ))}
              {isLoading && <div className="text-neutral-500 text-[10px] self-start animate-pulse">Typing...</div>}
            </div>
            
            <div className="flex items-center gap-2 relative">
              {currentIcon === 'ai' && (
                <label className="cursor-pointer p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors text-neutral-400">
                  <Paperclip className="w-4 h-4" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
              <input 
                type="text" 
                placeholder={image ? "Image ready! Add a note..." : "Type your message..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 transition-colors" 
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`p-2 rounded-lg transition-colors text-white ${currentIcon === 'ai' ? 'bg-amber-500 hover:bg-amber-400' : 'bg-teal-500 hover:bg-teal-400'} disabled:opacity-50`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-neutral-900 shadow-2xl flex items-center justify-center text-white relative group focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {currentIcon === 'contact' ? (
            <motion.div key="contact-icon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </motion.div>
          ) : (
            <motion.div key="ai-icon" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.3 }}>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute right-16 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
            {currentIcon === 'ai' ? 'AI Frame Matcher' : 'Contact Support'}
          </span>
        )}
      </motion.button>
    </div>
  )
}