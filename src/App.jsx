import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import ActionToggler from './components/layout/ActionToggler'
import Home from './pages/Home'
import Optical from './pages/Optical'
import Sunglasses from './pages/Sunglasses'
import Lens from './pages/Lens'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import SupportCheckout from './pages/SupportCheckout' 
import PaymentGateway from './components/payment/PaymentGateway' // Imported our standalone module
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()

  // Define paths where you don't want the footer to show up
  const hideFooterPaths = ['/auth']

  return (
    <CartProvider>
      {/* Changed bg-[#fcfcfc] to bg-neutral-50 to stop white cards from blending into the background */}
      <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-teal-500 selection:text-white">
        
        {/* Global Application Header Navigation Shell */}
        <Header />
        
        {/* View routing core engine - flex-grow pushes footer downward smoothly */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/types/optical" element={<Optical />} />
            <Route path="/types/sunglasses" element={<Sunglasses />} />
            <Route path="/types/lens" element={<Lens />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Dedicated path for the pure transactional framework */}
           <Route path="/payment-preview" element={<PaymentGateway totalAmount={0} />} />
  <Route path="/checkout" element={<PaymentGateway totalAmount={0} />} />
            {/* Dedicated path for your clean contact system window */}
            <Route path="/contact-support" element={<SupportCheckout />} />
          </Routes>
        </main>

        {/* Dynamic Footer Route Check */}
        {!hideFooterPaths.includes(location.pathname) && <Footer />}

        {/* Floating Corner Context Interface Switcher */}
        <ActionToggler />
      </div>
    </CartProvider>
  )
}