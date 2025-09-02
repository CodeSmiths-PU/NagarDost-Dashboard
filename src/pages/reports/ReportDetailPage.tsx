import { useParams } from 'react-router-dom'
import { FileText } from 'lucide-react'

const ReportDetailPage = () => {
  const { id } = useParams()

  return (
    <div
    className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-gray-100/60 bg-blend-overlay p-6"
    style={{ backgroundImage: "url('/assets/background.jpg')" }}
  >

    <div  className="space-y-6 bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Report Details</h1>
        <p className="text-muted-foreground">
          View and manage report #{id}
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Report Details</h2>
        <p className="text-muted-foreground">
          This page will show detailed information about the report, timeline, and actions.
        </p>
      </div>
      </div>
    </div>
  )
}

export default ReportDetailPage
