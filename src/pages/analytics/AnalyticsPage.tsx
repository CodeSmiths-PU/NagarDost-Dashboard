import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store'
import { fetchAnalyticsSummary, fetchHotspots } from '@/store/slices/analyticsSlice'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock,
  MapPin,
  AlertTriangle
} from 'lucide-react'

const AnalyticsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { summary, hotspots } = useSelector((state: RootState) => state.analytics)

  useEffect(() => {
    dispatch(fetchAnalyticsSummary())
    dispatch(fetchHotspots())
  }, [dispatch])

  const stats = [
    {
      title: 'Total Reports',
      value: summary?.total_reports || 0,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'SLA Compliance',
      value: `${summary?.sla_compliance_rate || 0}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Avg Resolution Time',
      value: `${summary?.average_resolution_time || 0} days`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Active Hotspots',
      value: hotspots.length,
      icon: MapPin,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ]

  return (
    <div
    className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-gray-100/60 bg-blend-overlay p-6"
    style={{backgroundImage: `url('/assets/background.png')`,
        backgroundSize: '100% 100%',}}
  >
    <div  className="space-y-6 bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          KPI dashboards and performance metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground mt-1">
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

      {/* Reports by Status Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Reports by Status</h3>
          {summary?.reports_by_status ? (
            <div className="space-y-3">
              {Object.entries(summary.reports_by_status).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground capitalize">
                    {status.replace('_', ' ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${(count / summary.total_reports) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8 text-right">
                      {count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>

        {/* Reports by Category Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Reports by Category</h3>
          {summary?.reports_by_category ? (
            <div className="space-y-3">
              {Object.entries(summary.reports_by_category)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: `${(count / summary.total_reports) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8 text-right">
                      {count}
                    </span>
                  </div>
                  </div>
                
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Hotspots Map Placeholder */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Hotspots Map</h3>
        <div className="bg-muted rounded-lg p-8 text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium text-foreground mb-2">Interactive Map</h4>
          <p className="text-muted-foreground">
            This will display an interactive map showing report hotspots and their density.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            {hotspots.length} hotspots detected
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Department Performance</h3>
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Department performance metrics will be displayed here</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Performance</h3>
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">User performance metrics will be displayed here</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">SLA Breaches</h3>
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">SLA breach analysis will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AnalyticsPage
