import React, { useState } from 'react'
import { Mail, MessageSquare, ShieldAlert, CheckCircle } from 'lucide-react'

export default function SupportCheckout() {
  const [ticket, setTicket] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setTicket({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    // Changed pt-12 to pt-24 to clear the header, added bg-neutral-50 to the page background
    <div className="min-h-screen w-full bg-neutral-50 py-24 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center">
      
      {/* Added shadow-md and border-neutral-200 to give it definition */}
      <div className="max-w-3xl w-full bg-white border border-neutral-200 rounded-2xl p-8 shadow-md space-y-6">
        
        <div className="border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-2 text-teal-600 mb-1">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold">Customer Core Registry</h2>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Contact System Support</h1>
          <p className="text-xs font-mono text-neutral-500 mt-0.5">Submit structural application tickets or warranty inquiries directly to our team.</p>
        </div>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3 font-mono">
            <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800">Transmission Dispatched</h3>
            <p className="text-xs text-neutral-500 max-w-sm">Your support node identity has been logged. A representative will reach out shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Full Name</label>
                <input 
                  type="text" required placeholder="User Identity"
                  value={ticket.name} onChange={(e) => setTicket({...ticket, name: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Email Address</label>
                <input 
                  type="email" required placeholder="name@domain.com"
                  value={ticket.email} onChange={(e) => setTicket({...ticket, email: e.target.value})}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Inquiry Subject</label>
              <input 
                type="text" required placeholder="Ticket Category Header"
                value={ticket.subject} onChange={(e) => setTicket({...ticket, subject: e.target.value})}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-1">Message Body</label>
              <textarea 
                required rows="5" placeholder="Describe the behavior or request logs..."
                value={ticket.message} onChange={(e) => setTicket({...ticket, message: e.target.value})}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-3.5 text-xs font-mono focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl hover:bg-teal-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Route Ticket To Agent</span>
            </button>
          </form>
        )}
      </div>
    </div>
  )
}