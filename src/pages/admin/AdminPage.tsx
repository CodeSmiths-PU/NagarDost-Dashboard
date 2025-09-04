import { Settings } from 'lucide-react'

const AdminPage = () => {
  return (
    <div
    className="min-h-screen bg-fixed bg-cover bg-center bg-no-repeat bg-gray-100/60 bg-blend-overlay p-6"
    style={{backgroundImage: `url('/assets/background.png')`,
        backgroundSize: '100% 100%',}}
  >

    <div  className="space-y-6 bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-md">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
        <p className="text-muted-foreground">
          System administration and configuration
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">Administration</h2>
        <p className="text-muted-foreground">
          This page will contain user management, system settings, and administrative functions.
        </p>
      </div>
    </div>
    </div>
  )
}

export default AdminPage
