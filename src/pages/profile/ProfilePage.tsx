import { User } from 'lucide-react'

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-foreground mb-2">User Profile</h2>
        <p className="text-muted-foreground">
          This page will contain user profile information and account settings.
        </p>
      </div>
    </div>
  )
}

export default ProfilePage
