import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AnalyticsSummary, HotspotData } from '@/types'
import { analyticsApi } from '@/services/analyticsApi'

interface AnalyticsState {
  summary: AnalyticsSummary | null
  hotspots: HotspotData[]
  isLoading: boolean
  error: string | null
}

const initialState: AnalyticsState = {
  summary: null,
  hotspots: [],
  isLoading: false,
  error: null,
}

export const fetchAnalyticsSummary = createAsyncThunk(
  'analytics/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getSummary()
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch analytics')
    }
  }
)

export const fetchHotspots = createAsyncThunk(
  'analytics/fetchHotspots',
  async (_, { rejectWithValue }) => {
    try {
      const response = await analyticsApi.getHotspots()
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch hotspots')
    }
  }
)

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch summary
      .addCase(fetchAnalyticsSummary.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAnalyticsSummary.fulfilled, (state, action: PayloadAction<AnalyticsSummary>) => {
        state.isLoading = false
        state.summary = action.payload
      })
      .addCase(fetchAnalyticsSummary.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch hotspots
      .addCase(fetchHotspots.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchHotspots.fulfilled, (state, action: PayloadAction<HotspotData[]>) => {
        state.isLoading = false
        state.hotspots = action.payload
      })
      .addCase(fetchHotspots.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = analyticsSlice.actions
export default analyticsSlice.reducer
