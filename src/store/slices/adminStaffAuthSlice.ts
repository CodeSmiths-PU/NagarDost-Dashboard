import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { adminStaffAuthApi } from '@/services/adminStaffAuthApi'

interface AdminStaffAuthState {
  isAuthenticated: boolean
  user: any | null
  accessToken: string | null
  refreshToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AdminStaffAuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: localStorage.getItem('admin_staff_access_token'),
  refreshToken: localStorage.getItem('admin_staff_refresh_token'),
  loading: false,
  error: null,
}

// Response types
interface LoginResponse {
  user: any
  access_token: string
  refresh_token: string
}

interface RefreshResponse {
  access_token: string
  refresh_token: string
}

// Async thunks
export const loginAdminStaff = createAsyncThunk<LoginResponse, { username: string; password: string }>(
  'adminStaffAuth/login',
  async (credentials) => {
    const response = await adminStaffAuthApi.login(credentials)
    return response
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
    setTokens: (state, action: PayloadAction<{ access_token: string; refresh_token: string }>) => {
      state.accessToken = action.payload.access_token
      state.refreshToken = action.payload.refresh_token
      state.isAuthenticated = true
      localStorage.setItem('admin_staff_access_token', action.payload.access_token)
      localStorage.setItem('admin_staff_refresh_token', action.payload.refresh_token)
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
        state.isAuthenticated = true
        state.user = action.payload.user
        state.accessToken = action.payload.access_token
        state.refreshToken = action.payload.refresh_token
        localStorage.setItem('admin_staff_access_token', action.payload.access_token)
        localStorage.setItem('admin_staff_refresh_token', action.payload.refresh_token)
      })
      .addCase(loginAdminStaff.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
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
      })
      // Logout
      .addCase(logoutAdminStaff.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.accessToken = null
        state.refreshToken = null
        localStorage.removeItem('admin_staff_access_token')
        localStorage.removeItem('admin_staff_refresh_token')
      })
  },
})

export const { clearTokens, setTokens } = adminStaffAuthSlice.actions
export default adminStaffAuthSlice.reducer
