import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BarChart3, Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [updatingOrderId, setUpdatingOrderId] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }

    // Check if user is admin
    if (!user || user.role !== 'admin') {
      setError('Access denied. Admin privileges required.')
      return
    }

    // Fetch admin stats
    fetchAdminData()
  }, [token, user, navigate])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      
      // Fetch dashboard stats
      const statsRes = await fetch('http://localhost:8000/api/admin/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const statsData = await statsRes.json()
      if (statsRes.ok) setStats(statsData)

      // Fetch all users
      const usersRes = await fetch('http://localhost:8000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const usersData = await usersRes.json()
      if (usersRes.ok) setUsers(usersData.users || [])

      // Fetch all orders
      const ordersRes = await fetch('http://localhost:8000/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const ordersData = await ordersRes.json()
      if (ordersRes.ok) setOrders(ordersData.orders || [])

      setLoading(false)
    } catch (err) {
      console.error('Error fetching admin data:', err)
      setError('Failed to load admin data')
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingOrderId(orderId)
    setStatusMessage('')

    try {
      const response = await fetch(`http://localhost:8000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to update order status')

      setOrders((prev) => prev.map((order) => order._id === orderId ? { ...order, status } : order))
      setStatusMessage(`Order status updated to ${status}.`)
    } catch (err) {
      setStatusMessage(err.message || 'Could not update order status')
    } finally {
      setUpdatingOrderId(null)
    }
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen pt-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <p className="text-red-500 font-bold">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="text-red-500 hover:text-red-400 mt-2 text-sm"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center pt-32 text-white">Loading admin dashboard...</div>
  }

  return (
    <div className="bg-black min-h-screen pt-32 px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-4xl font-black text-white uppercase">Admin Dashboard</h1>
            <p className="text-neutral-400 mt-2">System overview and management</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-bold"
          >
            Logout
          </button>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: ShoppingBag, label: 'Total Orders', value: stats.totalOrders, color: 'teal' },
              { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'emerald' },
              { icon: TrendingUp, label: 'Total Revenue', value: `Rs. ${Number(stats.totalRevenue || 0).toLocaleString()}`, color: 'amber' },
              { icon: BarChart3, label: 'Total Products', value: stats.totalProducts, color: 'rose' },
            ].map((stat, idx) => {
              const Icon = stat.icon
              const colorClass = {
                teal: 'border-teal-500 text-teal-500',
                emerald: 'border-emerald-500 text-emerald-500',
                amber: 'border-amber-500 text-amber-500',
                rose: 'border-rose-500 text-rose-500'
              }[stat.color]
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-neutral-900 border rounded-lg p-6 hover:border-opacity-100 border-opacity-50 transition-all ${colorClass}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-500 text-sm font-mono">{stat.label}</p>
                      <p className="text-white text-3xl font-black mt-2">{stat.value}</p>
                    </div>
                    <Icon className="w-8 h-8 opacity-50" />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
          {statusMessage && <p className="mb-4 text-sm text-teal-500">{statusMessage}</p>}
          
          {orders.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Order ID</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Customer</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Tracking</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Items</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Total</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((order) => (
                    <tr key={order._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 px-4 text-white font-mono text-sm">{order._id.slice(-8)}</td>
                      <td className="py-3 px-4 text-white">{order.userId?.name || 'Unknown'}</td>
                      <td className="py-3 px-4 text-neutral-400 text-sm font-mono">{order.trackingId || '—'}</td>
                      <td className="py-3 px-4 text-neutral-400 text-sm">{order.items?.length || 0}</td>
                      <td className="py-3 px-4 text-teal-500 font-bold">Rs. {Number(order.totalPrice || 0).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-500' :
                            order.status === 'shipped' ? 'bg-blue-500/20 text-blue-500' :
                            order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-neutral-700 text-neutral-400'
                          }`}>
                            {order.status}
                          </span>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                            disabled={updatingOrderId === order._id}
                            className="bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-white"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Registered Users</h2>
          
          {users.length === 0 ? (
            <p className="text-neutral-400 text-center py-8">No users registered</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-neutral-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Name</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Email</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Role</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Orders</th>
                    <th className="text-left py-3 px-4 text-neutral-500 font-mono text-sm">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 10).map((u) => (
                    <tr key={u._id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 px-4 text-white">{u.name}</td>
                      <td className="py-3 px-4 text-neutral-400 text-sm break-all">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === 'admin' ? 'bg-rose-500/20 text-rose-500' : 'bg-neutral-700 text-neutral-400'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white">{u.orders?.length || 0}</td>
                      <td className="py-3 px-4 text-neutral-400 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
