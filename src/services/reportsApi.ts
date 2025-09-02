import apiService from './api'
import { 
  Report, 
  ReportFilters, 
  CreateReportRequest, 
  UpdateReportRequest,
  PaginatedResponse 
} from '@/types'
import { shouldUseMockData } from '@/config/mock'
import { mockReportsApi } from './mockReportsApi'

export const reportsApi = {
  // Get all reports with filters
  getReports: async (filters: ReportFilters): Promise<PaginatedResponse<Report>> => {
    if (shouldUseMockData()) {
      return mockReportsApi.getReports(filters)
    }
    
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })

    return apiService.get<PaginatedResponse<Report>>(`/reports?${params.toString()}`)
  },

  // Get report by ID
  getReportById: async (id: string): Promise<Report> => {
    if (shouldUseMockData()) {
      return mockReportsApi.getReportById(id)
    }
    return apiService.get<Report>(`/reports/${id}`)
  },

  // Create new report
  createReport: async (data: CreateReportRequest): Promise<Report> => {
    if (shouldUseMockData()) {
      return mockReportsApi.createReport(data)
    }
    return apiService.post<Report>('/reports', data)
  },

  // Update report
  updateReport: async (id: string, data: UpdateReportRequest): Promise<Report> => {
    if (shouldUseMockData()) {
      return mockReportsApi.updateReport(id, data)
    }
    return apiService.patch<Report>(`/reports/${id}`, data)
  },

  // Delete report
  deleteReport: async (id: string): Promise<{ message: string }> => {
    if (shouldUseMockData()) {
      await mockReportsApi.deleteReport(id)
      return { message: 'Report deleted successfully' }
    }
    return apiService.delete<{ message: string }>(`/reports/${id}`)
  },

  // Bulk update reports
  bulkUpdateReports: async (ids: string[], data: Partial<UpdateReportRequest>): Promise<{ message: string }> => {
    return apiService.patch<{ message: string }>('/reports/bulk', {
      report_ids: ids,
      ...data,
    })
  },

  // Get reports by status
  getReportsByStatus: async (status: string): Promise<Report[]> => {
    return apiService.get<Report[]>(`/reports/status/${status}`)
  },

  // Get reports by category
  getReportsByCategory: async (categoryId: string): Promise<Report[]> => {
    return apiService.get<Report[]>(`/reports/category/${categoryId}`)
  },

  // Get reports by ward
  getReportsByWard: async (wardId: string): Promise<Report[]> => {
    return apiService.get<Report[]>(`/reports/ward/${wardId}`)
  },

  // Get duplicate reports
  getDuplicateReports: async (reportId: string): Promise<Report[]> => {
    if (shouldUseMockData()) {
      return mockReportsApi.getDuplicateReports(reportId)
    }
    return apiService.get<Report[]>(`/reports/${reportId}/duplicates`)
  },

  // Merge duplicate reports
  mergeDuplicateReports: async (primaryId: string, duplicateIds: string[]): Promise<{ message: string }> => {
    if (shouldUseMockData()) {
      await mockReportsApi.mergeReports(primaryId, duplicateIds[0])
      return { message: 'Reports merged successfully' }
    }
    return apiService.post<{ message: string }>('/reports/merge', {
      primary_report_id: primaryId,
      duplicate_report_ids: duplicateIds,
    })
  },

  // Get report timeline
  getReportTimeline: async (reportId: string): Promise<any[]> => {
    if (shouldUseMockData()) {
      return mockReportsApi.getReportTimeline(reportId)
    }
    return apiService.get<any[]>(`/reports/${reportId}/timeline`)
  },

  // Add comment to report
  addComment: async (reportId: string, comment: string): Promise<{ message: string }> => {
    return apiService.post<{ message: string }>(`/reports/${reportId}/comments`, {
      comment,
    })
  },

  // Get report comments
  getComments: async (reportId: string): Promise<any[]> => {
    return apiService.get<any[]>(`/reports/${reportId}/comments`)
  },

  // Export reports
  exportReports: async (filters: ReportFilters, format: 'csv' | 'pdf' = 'csv'): Promise<Blob> => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })
    params.append('format', format)

    const response = await apiService.get(`/reports/export?${params.toString()}`, {
      responseType: 'blob',
    })
    
    return response as Blob
  },
}
