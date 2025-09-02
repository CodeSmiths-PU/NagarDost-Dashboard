import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '@/store'
import { loginAdminStaff } from '@/store/slices/adminStaffAuthSlice'
import { Lock, Eye, EyeOff, User } from 'lucide-react'
import toast from 'react-hot-toast'

// Import the image
import NagarDostIcon from '@/assets/new_icon.png'
import NagarDostLogo from '@/assets/nagardost_logo.jpg'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading: adminLoading } = useSelector((state: RootState) => state.adminStaffAuth)

  // Username password state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordField, setShowPasswordField] = useState(false)

  const handleUsernamePasswordLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter both username and password')
      return
    }

    try {
      await dispatch(loginAdminStaff({ username, password })).unwrap()
      toast.success('Login successful')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col relative bg-cover bg-center"
      style={{ backgroundImage: `url(${NagarDostIcon})` }}
    >
      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* Top-left logo */}
      <div className="absolute top-7 left-10 z-10">
        <img src={NagarDostLogo} alt="Nagar Dost Logo" className="w-40 h-40 rounded-full border border-white shadow-2xl" />
      </div>

      {/* Center login container */}
      <div className="flex flex-1 items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/55 border border-gray-200 rounded-2xl shadow-xl p-8 backdrop-blur-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">NAGAR DOST</h1>
              <p className="text-gray-600 mt-2">Central Admin Dashboard</p>
            </div>

            {/* Username Password Authentication */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md bg-white/100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} /> 
                  <input
                    type={showPasswordField ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md bg-white/100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordField(!showPasswordField)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPasswordField ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                onClick={handleUsernamePasswordLogin}
                disabled={adminLoading || !username || !password}
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adminLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
