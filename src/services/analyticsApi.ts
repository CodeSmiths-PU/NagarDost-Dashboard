import apiService from './api'
import { AnalyticsSummary, HotspotData } from '@/types'

export const analyticsApi = {
  // Get analytics summary
  getSummary: async (): Promise<AnalyticsSummary> => {
    return apiService.get<AnalyticsSummary>('/analytics/summary')
  },

  // Get hotspots
  getHotspots: async (): Promise<HotspotData[]> => {
    return apiService.get<HotspotData[]>('/analytics/hotspots')
  },

  // Get reports by status over time
  getReportsByStatusOverTime: async (days: number = 30): Promise<any[]> => {
    return apiService.get<any[]>(`/analytics/reports-by-status?days=${days}`)
  },

  // Get reports by category over time
  getReportsByCategoryOverTime: async (days: number = 30): Promise<any[]> => {
    return apiService.get<any[]>(`/analytics/reports-by-category?days=${days}`)
  },

  // Get SLA compliance data
  getSLACompliance: async (days: number = 30): Promise<any> => {
    return apiService.get<any>(`/analytics/sla-compliance?days=${days}`)
  },

  // Get resolution time trends
  getResolutionTimeTrends: async (days: number = 30): Promise<any[]> => {
    return apiService.get<any[]>(`/analytics/resolution-time-trends?days=${days}`)
  },

  // Get ward performance
  getWardPerformance: async (): Promise<any[]> => {
    return apiService.get<any[]>('/analytics/ward-performance')
  },

  // Get department performance
  getDepartmentPerformance: async (): Promise<any[]> => {
    return apiService.get<any[]>('/analytics/department-performance')
  },

  // Get operator performance
  getOperatorPerformance: async (): Promise<any[]> => {
    return apiService.get<any[]>('/analytics/operator-performance')
  },

  // Get escalation trends
  getEscalationTrends: async (days: number = 30): Promise<any[]> => {
    return apiService.get<any[]>(`/analytics/escalation-trends?days=${days}`)
  },

  // Get duplicate detection stats
  getDuplicateStats: async (): Promise<any> => {
    return apiService.get<any>('/analytics/duplicate-stats')
  },

  // Get user engagement metrics
  getUserEngagement: async (): Promise<any> => {
    return apiService.get<any>('/analytics/user-engagement')
  },

  // Export analytics report
  exportAnalyticsReport: async (type: string, format: 'csv' | 'pdf' = 'csv'): Promise<Blob> => {
    const response = await apiService.get(`/analytics/export/${type}?format=${format}`, {
      responseType: 'blob',
    })
    
    return response as Blob
  },

  // Get real-time metrics
  getRealTimeMetrics: async (): Promise<any> => {
    return apiService.get<any>('/analytics/real-time')
  },

  // Get predictive analytics
  getPredictiveAnalytics: async (): Promise<any> => {
    return apiService.get<any>('/analytics/predictive')
  },
}
