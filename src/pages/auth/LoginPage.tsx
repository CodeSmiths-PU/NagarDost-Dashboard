import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState, AppDispatch } from '@/store'
import { loginAdminStaff } from '@/store/slices/adminStaffAuthSlice'
import { Lock, Eye, EyeOff, User, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading: adminLoading, error: authError } = useSelector((state: RootState) => state.adminStaffAuth)

  // Username password state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  // Watch for auth errors from Redux state
  useEffect(() => {
    if (authError) {
      setLoginError(authError)
    }
  }, [authError])

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      setLoginError(null)
    }
  }, [])

  const handleUsernamePasswordLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter both username and password')
      return
    }

    // Clear previous errors
    setLoginError(null)

    try {
      await dispatch(loginAdminStaff({ username, password })).unwrap()
      toast.success('Login successful')
      window.location.href = '/dashboard'
    } catch (error: any) {
      // Show toast for the error
      const errorMessage = authError || 'Invalid credentials. Please try again.'
      toast.error(errorMessage)
    }
  }

  const handleInputChange = () => {
    // Clear error when user starts typing
    if (loginError) {
      setLoginError(null)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">NagarDost</h1>
            <p className="text-muted-foreground mt-2">
              Central Admin Dashboard
            </p>
          </div>

          {/* Username Password Authentication */}
          <div className="space-y-4">
            {/* Error Message Display */}
            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertCircle className="text-destructive" size={20} />
                <p className="text-sm text-destructive">{loginError}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    handleInputChange()
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && username && password) {
                      handleUsernamePasswordLogin()
                    }
                  }}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type={showPasswordField ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    handleInputChange()
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && username && password) {
                      handleUsernamePasswordLogin()
                    }
                  }}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordField(!showPasswordField)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPasswordField ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleUsernamePasswordLogin}
              disabled={adminLoading || !username || !password}
              className="w-full bg-primary text-primary-foreground py-3 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {adminLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
