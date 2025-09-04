import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { fetchAnalyticsSummary } from '@/store/slices/analyticsSlice'
import { fetchReports } from '@/store/slices/reportsSlice'
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  MapPin,
  RefreshCw
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.auth)
  const { summary } = useSelector((state: RootState) => state.analytics)
  const { reports, isLoading } = useSelector((state: RootState) => state.reports)

  useEffect(() => {
    dispatch(fetchAnalyticsSummary())
    dispatch(fetchReports({ page: 1, limit: 5 }))
  }, [dispatch])

  const handleRefresh = () => {
    dispatch(fetchAnalyticsSummary())
    dispatch(fetchReports({ page: 1, limit: 5 }))
  }

  const stats = [
    {
      title: 'Total Reports',
      value: summary?.total_reports || 0,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Reports',
      value: summary?.pending_reports || 0,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Resolved Reports',
      value: summary?.resolved_reports || 0,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'SLA Compliance',
      value: `${summary?.sla_compliance_rate || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div
      className="min-h-screen flex flex-col relative bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('/assets/background.png')`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="p-4 bg-white/70 backdrop-blur-md rounded-lg mb-6">
          <h1 className="text-2xl font-extrabold text-foreground">Dashboard</h1>
          <p className="text-foreground font-semibold">
            Welcome back, {user?.first_name} Admin! Here's what's happening today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white/70 backdrop-blur-md rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-extrabold text-foreground mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Reports</h2>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white/70 backdrop-blur-md rounded-lg shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-extrabold text-foreground">Recent Reports</h2>
          </div>
          <div className="p-6">
            {reports.length > 0 ? (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-foreground">{report.title}</h3>
                        <p className="text-sm text-foreground">
                          {report.address || 'Location not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status.replace('_', ' ')}
                      </span>
                      <p className="text-sm text-foreground font-semibold mt-1">
                        {formatDate(report.created_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold">No reports found</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white/70 backdrop-blur-md rounded-lg shadow-sm">
            <h3 className="text-lg font-extrabold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-semibold">View All Reports</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Open Map View</span>
                </div>
              </button>
              <button className="w-full text-left p-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <span className="font-semibold">View Escalations</span>
                </div>
              </button>
            </div>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-md rounded-lg shadow-sm">
            <h3 className="text-lg font-extrabold text-foreground mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-semibold">API Status</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-green-200 text-green-900">
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-semibold">Database</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-green-200 text-green-900">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground font-semibold">Storage</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-green-200 text-green-900">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}


// Helper function for status colors
const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-200 text-yellow-900 font-extrabold',
    assigned: 'bg-blue-200 text-blue-900 font-extrabold',
    in_progress: 'bg-orange-200 text-orange-900 font-extrabold',
    resolved: 'bg-green-200 text-green-900 font-extrabold',
    closed: 'bg-gray-200 text-gray-900 font-extrabold',
    rejected: 'bg-red-200 text-red-900 font-extrabold',
    duplicate: 'bg-purple-200 text-purple-900 font-extrabold',
  }
  return colors[status as keyof typeof colors] || 'bg-gray-200 text-gray-900 font-extrabold'
}

export default DashboardPage