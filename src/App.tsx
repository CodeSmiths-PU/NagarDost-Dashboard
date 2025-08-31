import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getCurrentUser } from '@/store/slices/authSlice'
import { AppDispatch } from '@/store'

// Layout components
import Layout from '@/components/layout/Layout'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

// Pages
import LoginPage from '@/pages/auth/LoginPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import ReportsPage from '@/pages/reports/ReportsPage'
import ReportDetailPage from '@/pages/reports/ReportDetailPage'
import MapPage from '@/pages/map/MapPage'
import AnalyticsPage from '@/pages/analytics/AnalyticsPage'
import AdminPage from '@/pages/admin/AdminPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import NotFoundPage from '@/pages/NotFoundPage'

// Loading component
import LoadingSpinner from '@/components/ui/LoadingSpinner'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, isLoading, token } = useSelector((state: RootState) => state.auth)
  const { isAuthenticated: isAdminAuthenticated, loading: adminLoading } = useSelector((state: RootState) => state.adminStaffAuth)

  // Check if user is authenticated (either through phone OTP or username/password)
  const isUserAuthenticated = isAuthenticated || isAdminAuthenticated

  useEffect(() => {
    // Check if user is authenticated on app load
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, token, isAuthenticated])

  if (isLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        isUserAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />

      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="reports/:id" element={<ReportDetailPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
