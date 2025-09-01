import { Report, ReportFilters, PaginatedResponse } from '@/types'
import { mockReports, createPaginatedResponse, filterReports } from '@/mocks/data'
import { simulateApiDelay } from '@/config/mock'

export const mockReportsApi = {
  // Get reports with filtering and pagination
  getReports: async (filters: ReportFilters): Promise<PaginatedResponse<Report>> => {
    await simulateApiDelay()
    
    // Apply filters to mock data
    const filteredReports = filterReports(mockReports, filters)
    
    // Create paginated response
    const page = filters.page || 1
    const limit = filters.limit || 20
    
    return createPaginatedResponse(filteredReports, page, limit)
  },

  // Get report by ID
  getReportById: async (id: string): Promise<Report> => {
    await simulateApiDelay()
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    return report
  },

  // Create new report
  createReport: async (data: any): Promise<Report> => {
    await simulateApiDelay()
    
    const newReport: Report = {
      id: (mockReports.length + 1).toString(),
      title: data.title,
      description: data.description,
      category_id: data.category_id,
      category_name: data.category_name || 'Unknown Category',
      ward_id: data.ward_id,
      ward_name: data.ward_name || 'Unknown Ward',
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      status: 'pending',
      priority: data.priority || 'medium',
      created_by: data.created_by || 'cit-001',
      created_by_name: data.created_by_name || 'Anonymous User',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      media_urls: data.media_urls || [],
      tags: data.tags || []
    }
    
    return newReport
  },

  // Update report
  updateReport: async (id: string, data: Partial<Report>): Promise<Report> => {
    await simulateApiDelay()
    
    const reportIndex = mockReports.findIndex(r => r.id === id)
    if (reportIndex === -1) {
      throw new Error('Report not found')
    }
    
    const updatedReport = {
      ...mockReports[reportIndex],
      ...data,
      updated_at: new Date().toISOString()
    }
    
    // Update resolved_at if status is resolved
    if (data.status === 'resolved' && !updatedReport.resolved_at) {
      updatedReport.resolved_at = new Date().toISOString()
    }
    
    return updatedReport
  },

  // Delete report
  deleteReport: async (id: string): Promise<void> => {
    await simulateApiDelay()
    
    const reportIndex = mockReports.findIndex(r => r.id === id)
    if (reportIndex === -1) {
      throw new Error('Report not found')
    }
    
    // In a real implementation, this would remove the report from the database
    // For mock data, we'll just return successfully
    return Promise.resolve()
  },

  // Get report timeline
  getReportTimeline: async (id: string): Promise<any[]> => {
    await simulateApiDelay()
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    return [
      {
        id: '1',
        action: 'created',
        description: 'Report created',
        timestamp: report.created_at,
        user: report.created_by_name
      },
      {
        id: '2',
        action: 'assigned',
        description: `Assigned to ${report.assigned_to_name || 'Unassigned'}`,
        timestamp: report.updated_at,
        user: 'System'
      },
      ...(report.status === 'resolved' ? [{
        id: '3',
        action: 'resolved',
        description: 'Report resolved',
        timestamp: report.resolved_at,
        user: report.assigned_to_name || 'System'
      }] : [])
    ]
  },

  // Get nearby reports
  getNearbyReports: async (id: string, limit: number = 10): Promise<Report[]> => {
    await simulateApiDelay()
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    // Filter reports within a certain radius (simplified)
    const nearbyReports = mockReports
      .filter(r => r.id !== id)
      .slice(0, limit)
    
    return nearbyReports
  },

  // Get duplicate reports
  getDuplicateReports: async (id: string): Promise<Report[]> => {
    await simulateApiDelay()
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    // Find reports with similar titles (simplified duplicate detection)
    const duplicates = mockReports.filter(r => 
      r.id !== id && 
      r.title.toLowerCase().includes(report.title.toLowerCase().split(' ')[0])
    )
    
    return duplicates.slice(0, 5) // Limit to 5 duplicates
  },

  // Merge reports
  mergeReports: async (sourceId: string, targetId: string): Promise<void> => {
    await simulateApiDelay()
    
    const sourceReport = mockReports.find(r => r.id === sourceId)
    const targetReport = mockReports.find(r => r.id === targetId)
    
    if (!sourceReport || !targetReport) {
      throw new Error('One or both reports not found')
    }
    
    // In a real implementation, this would merge the reports in the database
    // For mock data, we'll just return successfully
    return Promise.resolve()
  },

  // Escalate report
  escalateReport: async (id: string, reason: string): Promise<void> => {
    await simulateApiDelay()
    
    const report = mockReports.find(r => r.id === id)
    if (!report) {
      throw new Error('Report not found')
    }
    
    // In a real implementation, this would escalate the report
    // For mock data, we'll just return successfully
    return Promise.resolve()
  }
}
