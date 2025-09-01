import apiService from './api'
import { 
  CognitoAuthResponse, 
  AuthUser, 
  RegistrationRequest,
  KYCVerificationRequest 
} from '@/types'

export const authApi = {
  // Request OTP
  requestOTP: async (phone: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/otp/request', { phone })
  },

  // Verify OTP and login
  verifyOTP: async (phone: string, otp: string): Promise<CognitoAuthResponse & { user: AuthUser }> => {
    return apiService.post<CognitoAuthResponse & { user: AuthUser }>('/auth/otp/verify', { 
      phone, 
      otp_code: otp 
    })
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthUser> => {
    return apiService.get<AuthUser>('/auth/me')
  },

  // Logout
  logout: async (): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/logout')
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<CognitoAuthResponse> => {
    return apiService.post<CognitoAuthResponse>('/auth/refresh', { refresh_token: refreshToken })
  },

  // Register new user
  register: async (data: RegistrationRequest): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/register', data)
  },

  // Verify KYC
  verifyKYC: async (data: KYCVerificationRequest): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/kyc/verify', data)
  },

  // Change password
  changePassword: async (oldPassword: string, newPassword: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    })
  },

  // Forgot password
  forgotPassword: async (phone: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/forgot-password', { phone })
  },

  // Reset password
  resetPassword: async (phone: string, otp: string, newPassword: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>('/auth/reset-password', {
      phone,
      otp_code: otp,
      new_password: newPassword,
    })
  },
}
