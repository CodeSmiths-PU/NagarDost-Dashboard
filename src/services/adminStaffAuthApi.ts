import apiService from './api'

// Types for admin staff authentication
interface AdminStaffLoginRequest {
  username: string
  password: string
}

interface AdminStaffLoginResponse {
  user: any
  access_token: string
  refresh_token: string
}

interface AdminStaffRefreshResponse {
  access_token: string
  refresh_token: string
}

interface AdminStaffLogoutResponse {
  message: string
}

interface AdminStaffProfileResponse {
  user: any
}

interface AdminStaffChangePasswordRequest {
  old_password: string
  new_password: string
}

interface AdminStaffChangePasswordResponse {
  message: string
}

export const adminStaffAuthApi = {
  // Admin staff login with username/password
  login: async (credentials: AdminStaffLoginRequest): Promise<AdminStaffLoginResponse> => {
    return apiService.post<AdminStaffLoginResponse>('/admin-staff/login', credentials)
  },

  // Refresh access token
  refreshToken: async (refreshToken: string): Promise<AdminStaffRefreshResponse> => {
    return apiService.post<AdminStaffRefreshResponse>('/admin-staff/refresh', { 
      refresh_token: refreshToken 
    })
  },

  // Admin staff logout
  logout: async (refreshToken: string): Promise<AdminStaffLogoutResponse> => {
    return apiService.post<AdminStaffLogoutResponse>('/admin-staff/logout', { 
      refresh_token: refreshToken 
    })
  },

  // Get admin staff profile
  getProfile: async (): Promise<AdminStaffProfileResponse> => {
    return apiService.get<AdminStaffProfileResponse>('/admin-staff/profile')
  },

  // Change admin staff password
  changePassword: async (data: AdminStaffChangePasswordRequest): Promise<AdminStaffChangePasswordResponse> => {
    return apiService.patch<AdminStaffChangePasswordResponse>('/admin-staff/change-password', data)
  },
}
