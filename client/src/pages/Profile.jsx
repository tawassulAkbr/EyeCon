import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Phone, MapPin, ArrowLeft, Eye, EyeOff } from 'lucide-react'

export default function Profile() {
  const { user, token, updateProfile, changePassword, addAddress, logout } = useAuth()
  const navigate = useNavigate()
  
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('profile') // profile, password, addresses
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  // Profile form
  const [profileData, setProfileData] = useState({ name: '', email: '' })
  
  // Password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false
  })
  
  // Address form
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    isDefault: false
  })
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }
    
    if (user) {
      setProfileData({ name: user.name, email: user.email })
      if (user.addresses) setAddresses(user.addresses)
    }
  }, [token, user, navigate])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      await updateProfile(profileData.name, profileData.email)
      setMessage('Profile updated successfully!')
      setEditMode(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }
    
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword)
      setMessage('Password changed successfully!')
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        showCurrent: false,
        showNew: false,
        showConfirm: false
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAddress = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    
    try {
      await addAddress(
        addressData.street,
        addressData.city,
        addressData.state,
        addressData.zipCode,
        addressData.country,
        addressData.isDefault
      )
      setMessage('Address added successfully!')
      setAddressData({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Pakistan',
        isDefault: false
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="text-center pt-32 text-white">Loading...</div>
  }

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-teal-500 hover:text-teal-400 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-black text-white uppercase">Profile Settings</h1>
        </motion.div>

        {/* Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6"
          >
            {message}
          </motion.div>
        )}
        
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 font-bold uppercase text-sm transition-colors ${
              activeTab === 'profile'
                ? 'text-teal-500 border-b-2 border-teal-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`pb-3 font-bold uppercase text-sm transition-colors ${
              activeTab === 'password'
                ? 'text-teal-500 border-b-2 border-teal-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 font-bold uppercase text-sm transition-colors ${
              activeTab === 'addresses'
                ? 'text-teal-500 border-b-2 border-teal-500'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Addresses
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
          >
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              
              <div>
                <label className="block text-neutral-400 text-sm font-mono mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white disabled:opacity-50 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm font-mono mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!editMode}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 text-white disabled:opacity-50 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {!editMode ? (
                  <button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="flex-1 bg-teal-500 text-black font-bold py-3 rounded-lg hover:bg-teal-400 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-teal-500 text-black font-bold py-3 rounded-lg hover:bg-teal-400 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex-1 bg-neutral-800 text-white font-bold py-3 rounded-lg hover:bg-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
          >
            <form onSubmit={handlePasswordChange} className="space-y-6">
              
              <div>
                <label className="block text-neutral-400 text-sm font-mono mb-2">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type={passwordData.showCurrent ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordData({ ...passwordData, showCurrent: !passwordData.showCurrent })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {passwordData.showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm font-mono mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type={passwordData.showNew ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordData({ ...passwordData, showNew: !passwordData.showNew })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {passwordData.showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 text-sm font-mono mb-2">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type={passwordData.showConfirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 pl-10 pr-10 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordData({ ...passwordData, showConfirm: !passwordData.showConfirm })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    {passwordData.showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-black font-bold py-3 rounded-lg hover:bg-teal-400 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Updating...' : 'Change Password'}
              </button>
            </form>
          </motion.div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            
            {/* Add Address Form */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Add New Address</h2>
              
              <form onSubmit={handleAddAddress} className="space-y-4">
                
                <div>
                  <label className="block text-neutral-400 text-sm font-mono mb-2">Street Address</label>
                  <input
                    type="text"
                    value={addressData.street}
                    onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                    required
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 text-sm font-mono mb-2">City</label>
                    <input
                      type="text"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-sm font-mono mb-2">State/Province</label>
                    <input
                      type="text"
                      value={addressData.state}
                      onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 text-sm font-mono mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={addressData.zipCode}
                      onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 text-sm font-mono mb-2">Country</label>
                    <input
                      type="text"
                      value={addressData.country}
                      onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                      required
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={addressData.isDefault}
                    onChange={(e) => setAddressData({ ...addressData, isDefault: e.target.checked })}
                    className="w-4 h-4 accent-teal-500"
                  />
                  <span className="text-white font-mono text-sm">Set as default address</span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-500 text-black font-bold py-3 rounded-lg hover:bg-teal-400 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Address'}
                </button>
              </form>
            </div>

            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Saved Addresses</h2>
                <div className="space-y-3">
                  {addresses.map((addr, idx) => (
                    <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-white">{addr.street}</p>
                          <p className="text-neutral-400 text-sm">{addr.city}, {addr.state} {addr.zipCode}</p>
                          <p className="text-neutral-500 text-xs mt-1">{addr.country}</p>
                        </div>
                        {addr.isDefault && (
                          <span className="bg-teal-500 text-black text-xs font-bold px-3 py-1 rounded-full">Default</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
