import { BarChart3 } from 'lucide-react'

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          KPI dashboards and performance metrics
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">
          This page will contain charts, graphs, and analytics powered by Recharts.
        </p>
      </div>
    </div>
  )
}

export default AnalyticsPage
