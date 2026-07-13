import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import ActionToggler from './components/layout/ActionToggler'
import Home from './pages/Home'
import Optical from './pages/Optical'
import Sunglasses from './pages/Sunglasses'
import Lens from './pages/Lens'
import Cart from './pages/Cart'
import Auth from './pages/Auth'

export default function App() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-neutral-900 selection:bg-teal-500 selection:text-white">
      {/* Global Application Header Navigation Shell */}
      <Header />
      
      {/* View routing core engine */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/types/optical" element={<Optical />} />
          <Route path="/types/sunglasses" element={<Sunglasses />} />
          <Route path="/types/lens" element={<Lens />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      {/* Floating Corner Context Interface Switcher */}
      <ActionToggler />
    </div>
  )
}