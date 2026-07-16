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
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import OrderTracking from './pages/OrderTracking'
import Wishlist from './pages/Wishlist'
import SupportCheckout from './pages/SupportCheckout' 
import PaymentGateway from './components/payment/PaymentGateway'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'

export default function App() {
  const location = useLocation()

  const hideFooterPaths = ['/auth', '/dashboard', '/admin/dashboard', '/profile']

  return (
   <CartProvider>
     <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-teal-500 selection:text-white">
        
       <Header />
        
       <main className="flex-grow">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/types/optical" element={<Optical />} />
           <Route path="/types/sunglasses" element={<Sunglasses />} />
           <Route path="/types/lens" element={<Lens />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/auth" element={<Auth />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/profile" element={<Profile />} />
           <Route path="/admin/dashboard" element={<AdminDashboard />} />
           <Route path="/orders/:orderId" element={<OrderTracking />} />
           <Route path="/wishlist" element={<Wishlist />} />
           <Route path="/payment-preview" element={<PaymentGateway totalAmount={0} />} />
           <Route path="/checkout" element={<PaymentGateway totalAmount={0} />} />
           <Route path="/contact-support" element={<SupportCheckout />} />
         </Routes>
       </main>

       {!hideFooterPaths.includes(location.pathname) && <Footer />}

       <ActionToggler />
     </div>
   </CartProvider>
  )
}