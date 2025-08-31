import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string[]
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { isAuthenticated: isAdminAuthenticated, user: adminUser } = useSelector((state: RootState) => state.adminStaffAuth)

  // Check if user is authenticated (either through phone OTP or username/password)
  const isUserAuthenticated = isAuthenticated || isAdminAuthenticated
  const currentUser = user || adminUser

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && currentUser && !requiredRole.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
