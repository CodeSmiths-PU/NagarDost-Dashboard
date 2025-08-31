import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { store } from '@/store'
import { clearToken } from '@/store/slices/authSlice'
import { clearTokens, refreshAdminStaffToken } from '@/store/slices/adminStaffAuthSlice'

class ApiService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Check for admin staff token first, then regular user token
        const adminStaffToken = localStorage.getItem('admin_staff_access_token')
        const userToken = localStorage.getItem('token')
        
        if (adminStaffToken) {
          config.headers.Authorization = `Bearer ${adminStaffToken}`
        } else if (userToken) {
          config.headers.Authorization = `Bearer ${userToken}`
        }
        
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          // Try to refresh admin staff token first
          const adminStaffRefreshToken = localStorage.getItem('admin_staff_refresh_token')
          if (adminStaffRefreshToken) {
            try {
              await store.dispatch(refreshAdminStaffToken()).unwrap()
              const newToken = localStorage.getItem('admin_staff_access_token')
              if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return this.api(originalRequest)
              }
            } catch (refreshError) {
              // If refresh fails, clear admin staff tokens
              store.dispatch(clearTokens())
            }
          }

          // If no admin staff token or refresh failed, try regular user token
          const userToken = localStorage.getItem('token')
          if (userToken) {
            store.dispatch(clearToken())
            window.location.href = '/login'
          } else {
            // No tokens available, redirect to login
            window.location.href = '/login'
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.post<T>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.put<T>(url, data, config)
    return response.data
  }

  public async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.patch<T>(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config)
    return response.data
  }

  public async upload<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.api.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })

    return response.data
  }
}

export const apiService = new ApiService()
export default apiService
