// User and Authentication Types
export interface AuthUser {
  id: string
  phone: string
  first_name?: string
  last_name?: string
  role: UserRole
  email?: string
  is_verified: boolean
  created_at: string
  updated_at: string
}

export type UserRole = 'citizen' | 'operator' | 'supervisor' | 'admin'

export interface CognitoAuthResponse {
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface OTPRequest {
  phone: string
}

export interface OTPVerificationRequest {
  phone: string
  otp_code: string
}

export interface RegistrationRequest {
  phone: string
  first_name: string
  last_name: string
  email?: string
}

export interface KYCVerificationRequest {
  user_id: string
  document_type: string
  document_number: string
  document_image: string
}

// Report Types
export interface Report {
  id: string
  title: string
  description: string
  category_id: string
  category_name: string
  ward_id: string
  ward_name: string
  address: string
  latitude: number
  longitude: number
  status: ReportStatus
  priority: ReportPriority
  assigned_to?: string
  assigned_to_name?: string
  created_by: string
  created_by_name: string
  created_at: string
  updated_at: string
  resolved_at?: string
  media_urls: string[]
  tags: string[]
}

export type ReportStatus = 'pending' | 'in_progress' | 'resolved' | 'closed' | 'escalated'

export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ReportFilters {
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
  status?: ReportStatus
  priority?: ReportPriority
  category_id?: string
  ward_id?: string
  assigned_to?: string
  created_by?: string
  date_from?: string
  date_to?: string
  search?: string
}

export interface CreateReportRequest {
  title: string
  description: string
  category_id: string
  ward_id: string
  address: string
  latitude: number
  longitude: number
  media_urls?: string[]
  tags?: string[]
}

export interface UpdateReportRequest {
  title?: string
  description?: string
  category_id?: string
  ward_id?: string
  address?: string
  latitude?: number
  longitude?: number
  status?: ReportStatus
  priority?: ReportPriority
  assigned_to?: string
  media_urls?: string[]
  tags?: string[]
}

// Analytics Types
export interface AnalyticsSummary {
  total_reports: number
  pending_reports: number
  resolved_reports: number
  sla_compliance_rate: number
  average_resolution_time: number
  reports_by_status: Record<ReportStatus, number>
  reports_by_category: Record<string, number>
  reports_by_ward: Record<string, number>
}

export interface HotspotData {
  latitude: number
  longitude: number
  report_count: number
  category: string
  ward: string
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
  }
}

// Admin Staff Types
export interface AdminStaffRefreshRequest {
  refresh_token: string
}

export interface AdminStaffLogoutRequest {
  refresh_token: string
}
