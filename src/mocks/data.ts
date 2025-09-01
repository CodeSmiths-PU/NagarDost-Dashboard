import { 
  AnalyticsSummary, 
  HotspotData, 
  Report, 
  ReportStatus, 
  ReportPriority,
  PaginatedResponse 
} from '@/types'

// Mock Analytics Summary Data
export const mockAnalyticsSummary: AnalyticsSummary = {
  total_reports: 1247,
  pending_reports: 89,
  resolved_reports: 1158,
  sla_compliance_rate: 92.8,
  average_resolution_time: 2.3,
  reports_by_status: {
    pending: 89,
    in_progress: 156,
    resolved: 892,
    closed: 266,
    escalated: 12,
  },
  reports_by_category: {
    'Road Issues': 456,
    'Water Supply': 234,
    'Street Lighting': 189,
    'Garbage Collection': 167,
    'Drainage': 145,
    'Public Safety': 56,
  },
  reports_by_ward: {
    'Ward 1': 234,
    'Ward 2': 189,
    'Ward 3': 167,
    'Ward 4': 145,
    'Ward 5': 123,
    'Ward 6': 98,
    'Ward 7': 87,
    'Ward 8': 76,
    'Ward 9': 65,
    'Ward 10': 54,
  }
}

// Mock Hotspots Data
export const mockHotspots: HotspotData[] = [
  {
    latitude: 12.9716,
    longitude: 77.5946,
    report_count: 45,
    category: 'Road Issues',
    ward: 'Ward 1'
  },
  {
    latitude: 12.9789,
    longitude: 77.5917,
    report_count: 32,
    category: 'Water Supply',
    ward: 'Ward 2'
  },
  {
    latitude: 12.9654,
    longitude: 77.5876,
    report_count: 28,
    category: 'Street Lighting',
    ward: 'Ward 3'
  },
  {
    latitude: 12.9832,
    longitude: 77.5998,
    report_count: 24,
    category: 'Garbage Collection',
    ward: 'Ward 4'
  },
  {
    latitude: 12.9567,
    longitude: 77.5834,
    report_count: 19,
    category: 'Drainage',
    ward: 'Ward 5'
  }
]

// Mock Reports Data
export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues on Main Street near the intersection with Park Avenue.',
    category_id: 'road-issues',
    category_name: 'Road Issues',
    ward_id: 'ward-1',
    ward_name: 'Ward 1',
    address: 'Main Street, Near Park Avenue',
    latitude: 12.9716,
    longitude: 77.5946,
    status: 'in_progress',
    priority: 'high',
    assigned_to: 'op-001',
    assigned_to_name: 'John Smith',
    created_by: 'cit-001',
    created_by_name: 'Alice Johnson',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-16T14:20:00Z',
    media_urls: ['https://example.com/image1.jpg'],
    tags: ['pothole', 'traffic', 'main-street']
  },
  {
    id: '2',
    title: 'Broken Street Light',
    description: 'Street light not working on Oak Street, making it unsafe for pedestrians at night.',
    category_id: 'street-lighting',
    category_name: 'Street Lighting',
    ward_id: 'ward-2',
    ward_name: 'Ward 2',
    address: 'Oak Street, Near Community Park',
    latitude: 12.9789,
    longitude: 77.5917,
    status: 'pending',
    priority: 'medium',
    created_by: 'cit-002',
    created_by_name: 'Bob Wilson',
    created_at: '2024-01-16T08:15:00Z',
    updated_at: '2024-01-16T08:15:00Z',
    media_urls: ['https://example.com/image2.jpg'],
    tags: ['street-light', 'safety', 'oak-street']
  },
  {
    id: '3',
    title: 'Water Pipeline Leak',
    description: 'Water leaking from underground pipeline causing water wastage and road damage.',
    category_id: 'water-supply',
    category_name: 'Water Supply',
    ward_id: 'ward-3',
    ward_name: 'Ward 3',
    address: 'Elm Street, Near Water Tank',
    latitude: 12.9654,
    longitude: 77.5876,
    status: 'resolved',
    priority: 'urgent',
    assigned_to: 'op-002',
    assigned_to_name: 'Sarah Davis',
    created_by: 'cit-003',
    created_by_name: 'Carol Brown',
    created_at: '2024-01-14T16:45:00Z',
    updated_at: '2024-01-15T11:30:00Z',
    resolved_at: '2024-01-15T11:30:00Z',
    media_urls: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'],
    tags: ['water-leak', 'pipeline', 'urgent']
  },
  {
    id: '4',
    title: 'Garbage Not Collected',
    description: 'Garbage bins not emptied for the past 3 days, causing foul smell and health hazard.',
    category_id: 'garbage-collection',
    category_name: 'Garbage Collection',
    ward_id: 'ward-4',
    ward_name: 'Ward 4',
    address: 'Pine Street, Near Shopping Center',
    latitude: 12.9832,
    longitude: 77.5998,
    status: 'pending',
    priority: 'high',
    created_by: 'cit-004',
    created_by_name: 'David Miller',
    created_at: '2024-01-16T09:00:00Z',
    updated_at: '2024-01-16T09:00:00Z',
    media_urls: ['https://example.com/image5.jpg'],
    tags: ['garbage', 'health-hazard', 'pine-street']
  },
  {
    id: '5',
    title: 'Drainage Blockage',
    description: 'Drainage system blocked causing water logging during rains.',
    category_id: 'drainage',
    category_name: 'Drainage',
    ward_id: 'ward-5',
    ward_name: 'Ward 5',
    address: 'Cedar Street, Near School',
    latitude: 12.9567,
    longitude: 77.5834,
    status: 'in_progress',
    priority: 'medium',
    assigned_to: 'op-003',
    assigned_to_name: 'Mike Johnson',
    created_by: 'cit-005',
    created_by_name: 'Emma Wilson',
    created_at: '2024-01-15T14:20:00Z',
    updated_at: '2024-01-16T10:15:00Z',
    media_urls: ['https://example.com/image6.jpg'],
    tags: ['drainage', 'water-logging', 'cedar-street']
  },
  {
    id: '6',
    title: 'Broken Traffic Signal',
    description: 'Traffic signal not working properly at busy intersection.',
    category_id: 'public-safety',
    category_name: 'Public Safety',
    ward_id: 'ward-1',
    ward_name: 'Ward 1',
    address: 'Main Street & Park Avenue Intersection',
    latitude: 12.9720,
    longitude: 77.5950,
    status: 'resolved',
    priority: 'urgent',
    assigned_to: 'op-001',
    assigned_to_name: 'John Smith',
    created_by: 'cit-006',
    created_by_name: 'Frank Garcia',
    created_at: '2024-01-13T12:30:00Z',
    updated_at: '2024-01-14T16:45:00Z',
    resolved_at: '2024-01-14T16:45:00Z',
    media_urls: ['https://example.com/image7.jpg'],
    tags: ['traffic-signal', 'safety', 'intersection']
  },
  {
    id: '7',
    title: 'Street Light Pole Damaged',
    description: 'Street light pole bent and hanging dangerously.',
    category_id: 'street-lighting',
    category_name: 'Street Lighting',
    ward_id: 'ward-2',
    ward_name: 'Ward 2',
    address: 'Maple Street, Near Library',
    latitude: 12.9795,
    longitude: 77.5925,
    status: 'pending',
    priority: 'high',
    created_by: 'cit-007',
    created_by_name: 'Grace Lee',
    created_at: '2024-01-16T11:45:00Z',
    updated_at: '2024-01-16T11:45:00Z',
    media_urls: ['https://example.com/image8.jpg'],
    tags: ['street-light', 'dangerous', 'maple-street']
  },
  {
    id: '8',
    title: 'Road Construction Debris',
    description: 'Construction debris left on road after completion of work.',
    category_id: 'road-issues',
    category_name: 'Road Issues',
    ward_id: 'ward-3',
    ward_name: 'Ward 3',
    address: 'Birch Street, Construction Site',
    latitude: 12.9660,
    longitude: 77.5880,
    status: 'resolved',
    priority: 'medium',
    assigned_to: 'op-002',
    assigned_to_name: 'Sarah Davis',
    created_by: 'cit-008',
    created_by_name: 'Henry Taylor',
    created_at: '2024-01-14T10:15:00Z',
    updated_at: '2024-01-15T09:30:00Z',
    resolved_at: '2024-01-15T09:30:00Z',
    media_urls: ['https://example.com/image9.jpg'],
    tags: ['construction', 'debris', 'birch-street']
  }
]

// Helper function to create paginated response
export const createPaginatedResponse = <T>(
  data: T[], 
  page: number = 1, 
  limit: number = 20
): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      total_pages: Math.ceil(data.length / limit)
    }
  }
}

// Helper function to filter reports
export const filterReports = (
  reports: Report[], 
  filters: any
): Report[] => {
  let filteredReports = [...reports]

  // Filter by status
  if (filters.status) {
    filteredReports = filteredReports.filter(report => report.status === filters.status)
  }

  // Filter by priority
  if (filters.priority) {
    filteredReports = filteredReports.filter(report => report.priority === filters.priority)
  }

  // Filter by category
  if (filters.category_id) {
    filteredReports = filteredReports.filter(report => report.category_id === filters.category_id)
  }

  // Filter by ward
  if (filters.ward_id) {
    filteredReports = filteredReports.filter(report => report.ward_id === filters.ward_id)
  }

  // Filter by assigned_to
  if (filters.assigned_to) {
    filteredReports = filteredReports.filter(report => report.assigned_to === filters.assigned_to)
  }

  // Filter by date range
  if (filters.date_from) {
    filteredReports = filteredReports.filter(report => 
      new Date(report.created_at) >= new Date(filters.date_from)
    )
  }

  if (filters.date_to) {
    filteredReports = filteredReports.filter(report => 
      new Date(report.created_at) <= new Date(filters.date_to)
    )
  }

  // Search functionality
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredReports = filteredReports.filter(report =>
      report.title.toLowerCase().includes(searchTerm) ||
      report.description.toLowerCase().includes(searchTerm) ||
      report.address.toLowerCase().includes(searchTerm)
    )
  }

  // Sort functionality
  if (filters.sort_by) {
    filteredReports.sort((a, b) => {
      const aValue = a[filters.sort_by as keyof Report]
      const bValue = b[filters.sort_by as keyof Report]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sort_order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return filters.sort_order === 'asc' ? aValue - bValue : bValue - aValue
      }
      
      return 0
    })
  }

  return filteredReports
}
