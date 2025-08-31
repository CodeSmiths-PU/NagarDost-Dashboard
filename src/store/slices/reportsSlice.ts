import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Report, ReportFilters, ReportStatus, PaginatedResponse } from '@/types'
import { reportsApi } from '@/services/reportsApi'

interface ReportsState {
  reports: Report[]
  currentReport: Report | null
  filters: ReportFilters
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  isLoading: boolean
  error: string | null
}

const initialState: ReportsState = {
  reports: [],
  currentReport: null,
  filters: {
    page: 1,
    limit: 20,
    sort_by: 'created_at',
    sort_order: 'desc',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
}

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (filters: ReportFilters, { rejectWithValue }) => {
    try {
      const response = await reportsApi.getReports(filters)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports')
    }
  }
)

export const fetchReportById = createAsyncThunk(
  'reports/fetchReportById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await reportsApi.getReportById(id)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch report')
    }
  }
)

export const updateReport = createAsyncThunk(
  'reports/updateReport',
  async ({ id, data }: { id: string; data: Partial<Report> }, { rejectWithValue }) => {
    try {
      const response = await reportsApi.updateReport(id, data)
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update report')
    }
  }
)

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ReportFilters>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    setCurrentReport: (state, action: PayloadAction<Report | null>) => {
      state.currentReport = action.payload
    },
    updateReportInList: (state, action: PayloadAction<Report>) => {
      const index = state.reports.findIndex(report => report.id === action.payload.id)
      if (index !== -1) {
        state.reports[index] = action.payload
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reports
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<PaginatedResponse<Report>>) => {
        state.isLoading = false
        state.reports = action.payload.data
        state.pagination = {
          page: action.payload.pagination.page,
          limit: action.payload.pagination.limit,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.total_pages,
        }
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch report by ID
      .addCase(fetchReportById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchReportById.fulfilled, (state, action: PayloadAction<Report>) => {
        state.isLoading = false
        state.currentReport = action.payload
      })
      .addCase(fetchReportById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update report
      .addCase(updateReport.fulfilled, (state, action: PayloadAction<Report>) => {
        // Update in list
        const index = state.reports.findIndex(report => report.id === action.payload.id)
        if (index !== -1) {
          state.reports[index] = action.payload
        }
        // Update current report if it's the same
        if (state.currentReport?.id === action.payload.id) {
          state.currentReport = action.payload
        }
      })
      .addCase(updateReport.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { 
  setFilters, 
  clearFilters, 
  setCurrentReport, 
  updateReportInList, 
  clearError 
} = reportsSlice.actions

export default reportsSlice.reducer
