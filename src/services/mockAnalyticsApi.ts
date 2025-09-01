import { AnalyticsSummary, HotspotData } from '@/types'
import { mockAnalyticsSummary, mockHotspots } from '@/mocks/data'
import { simulateApiDelay } from '@/config/mock'

export const mockAnalyticsApi = {
  // Get analytics summary
  getSummary: async (): Promise<AnalyticsSummary> => {
    await simulateApiDelay()
    return mockAnalyticsSummary
  },

  // Get hotspots data
  getHotspots: async (): Promise<HotspotData[]> => {
    await simulateApiDelay()
    return mockHotspots
  },

  // Get department performance
  getDepartmentPerformance: async (): Promise<any[]> => {
    await simulateApiDelay()
    return [
      {
        department: 'Roads & Transport',
        total_reports: 456,
        resolved_reports: 412,
        resolution_rate: 90.4,
        avg_resolution_time: 2.1
      },
      {
        department: 'Water Supply',
        total_reports: 234,
        resolved_reports: 198,
        resolution_rate: 84.6,
        avg_resolution_time: 1.8
      },
      {
        department: 'Street Lighting',
        total_reports: 189,
        resolved_reports: 175,
        resolution_rate: 92.6,
        avg_resolution_time: 1.5
      },
      {
        department: 'Sanitation',
        total_reports: 167,
        resolved_reports: 145,
        resolution_rate: 86.8,
        avg_resolution_time: 2.3
      },
      {
        department: 'Drainage',
        total_reports: 145,
        resolved_reports: 128,
        resolution_rate: 88.3,
        avg_resolution_time: 2.7
      }
    ]
  },

  // Get user performance
  getUserPerformance: async (): Promise<any[]> => {
    await simulateApiDelay()
    return [
      {
        user: 'John Smith',
        total_assigned: 45,
        resolved: 42,
        resolution_rate: 93.3,
        avg_resolution_time: 1.8
      },
      {
        user: 'Sarah Davis',
        total_assigned: 38,
        resolved: 35,
        resolution_rate: 92.1,
        avg_resolution_time: 2.1
      },
      {
        user: 'Mike Johnson',
        total_assigned: 32,
        resolved: 28,
        resolution_rate: 87.5,
        avg_resolution_time: 2.4
      },
      {
        user: 'Emily Wilson',
        total_assigned: 29,
        resolved: 26,
        resolution_rate: 89.7,
        avg_resolution_time: 2.0
      },
      {
        user: 'David Brown',
        total_assigned: 25,
        resolved: 22,
        resolution_rate: 88.0,
        avg_resolution_time: 2.2
      }
    ]
  },

  // Get trends data
  getTrends: async (_metric: string, period: string): Promise<any[]> => {
    await simulateApiDelay()
    
    const generateTrendData = (_metric: string, period: string) => {
      const data = []
      const periods = period === 'daily' ? 30 : period === 'weekly' ? 12 : 6
      
      for (let i = 0; i < periods; i++) {
        const date = new Date()
        if (period === 'daily') {
          date.setDate(date.getDate() - (periods - i - 1))
        } else if (period === 'weekly') {
          date.setDate(date.getDate() - (periods - i - 1) * 7)
        } else {
          date.setMonth(date.getMonth() - (periods - i - 1))
        }
        
        data.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 100) + 20
        })
      }
      
      return data
    }
    
    return generateTrendData(_metric, period)
  },

  // Get SLA breaches
  getSLABreaches: async (): Promise<any[]> => {
    await simulateApiDelay()
    return [
      {
        report_id: '1',
        title: 'Pothole on Main Street',
        category: 'Road Issues',
        assigned_to: 'John Smith',
        sla_deadline: '2024-01-17T10:30:00Z',
        days_overdue: 2,
        priority: 'high'
      },
      {
        report_id: '4',
        title: 'Garbage Not Collected',
        category: 'Garbage Collection',
        assigned_to: 'Unassigned',
        sla_deadline: '2024-01-18T09:00:00Z',
        days_overdue: 1,
        priority: 'high'
      },
      {
        report_id: '7',
        title: 'Street Light Pole Damaged',
        category: 'Street Lighting',
        assigned_to: 'Unassigned',
        sla_deadline: '2024-01-19T11:45:00Z',
        days_overdue: 0,
        priority: 'high'
      }
    ]
  }
}
