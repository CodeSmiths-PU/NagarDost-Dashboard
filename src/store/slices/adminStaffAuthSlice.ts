import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { adminStaffAuthApi } from '@/services/adminStaffAuthApi'

// Import the type from the API service
type AdminStaffLoginResponse = Awaited<ReturnType<typeof adminStaffAuthApi.login>>

interface AdminStaffAuthState {
  isAuthenticated: boolean
  user: any | null
  accessToken: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AdminStaffAuthState = {
  isAuthenticated: localStorage.getItem('admin_staff_access_token') ? true : false,
  user: localStorage.getItem('admin_staff_user') ? JSON.parse(localStorage.getItem('admin_staff_user') || '{}') : null,
  accessToken: localStorage.getItem('admin_staff_access_token'),
  refreshToken: localStorage.getItem('admin_staff_refresh_token'),
  loading: false,
  error: null,
}

// Response types
interface RefreshResponse {
  access_token: string
  refresh_token: string
}

interface RefreshResponse {
  access_token: string
  refresh_token: string
}

// Async thunks
export const loginAdminStaff = createAsyncThunk<AdminStaffLoginResponse, { username: string; password: string }>(
  'adminStaffAuth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await adminStaffAuthApi.login(credentials)
      
      return response
    } catch (error: any) {
      // Extract the actual error message from the API response
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error)
      } else if (error.message) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue('Login failed. Please try again.')
      }
    }
  }
)

export const refreshAdminStaffToken = createAsyncThunk<RefreshResponse, void>(
  'adminStaffAuth/refreshToken',
  async () => {
    const refreshToken = localStorage.getItem('admin_staff_refresh_token')
    if (!refreshToken) throw new Error('No refresh token available')
    
    const response = await adminStaffAuthApi.refreshToken(refreshToken)
    return response
  }
)

export const logoutAdminStaff = createAsyncThunk(
  'adminStaffAuth/logout',
  async () => {
    const refreshToken = localStorage.getItem('admin_staff_refresh_token')
    if (refreshToken) {
      try {
        await adminStaffAuthApi.logout(refreshToken)
        localStorage.removeItem('admin_staff_access_token')
        localStorage.removeItem('admin_staff_refresh_token')
        localStorage.removeItem('admin_staff_user')
        window.location.href = '/login'
      } catch (error) {
        // Continue with logout even if API call fails
      }
    }
  }
)

const adminStaffAuthSlice = createSlice({
  name: 'adminStaffAuth',
  initialState,
  reducers: {
    clearTokens: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('admin_staff_access_token')
      localStorage.removeItem('admin_staff_refresh_token')
    },
    setTokens: (state, action: PayloadAction<{ access_token: string; refresh_token: string, user: any }>) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.user = action.payload.user
      localStorage.setItem('admin_staff_access_token', action.payload.access_token)
      localStorage.setItem('admin_staff_refresh_token', action.payload.refresh_token)
      localStorage.setItem('admin_staff_user', JSON.stringify(action.payload.user))
      state.isAuthenticated = true
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdminStaff.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginAdminStaff.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.data.user
        state.accessToken = action.payload.data.access_token
        state.refreshToken = action.payload.data.refresh_token
        
        localStorage.setItem('admin_staff_access_token', action.payload.data.access_token)
        localStorage.setItem('admin_staff_refresh_token', action.payload.data.refresh_token)
        localStorage.setItem('admin_staff_user', JSON.stringify(action.payload.data.user))
        state.isAuthenticated = true
      })
      .addCase(loginAdminStaff.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || action.error.message || 'Login failed'
      })
      // Refresh token
      .addCase(refreshAdminStaffToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        localStorage.setItem('admin_staff_access_token', action.payload.access_token)
        localStorage.setItem('admin_staff_refresh_token', action.payload.refresh_token)
      })
      .addCase(refreshAdminStaffToken.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        state.user = null
        localStorage.removeItem('admin_staff_access_token')
        localStorage.removeItem('admin_staff_refresh_token')
        localStorage.removeItem('admin_staff_user')
      })
      // Logout
      .addCase(logoutAdminStaff.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        localStorage.removeItem('admin_staff_access_token')
        localStorage.removeItem('admin_staff_refresh_token')
        localStorage.removeItem('admin_staff_user')
      })
  },
})

export const { clearTokens, setTokens } = adminStaffAuthSlice.actions
export default adminStaffAuthSlice.reducer
