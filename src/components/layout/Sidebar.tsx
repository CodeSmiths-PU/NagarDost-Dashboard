import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '@/store'
import { toggleSidebar } from '@/store/slices/uiSlice'
import { 
  Home, 
  FileText, 
  Map, 
  BarChart3, 
  Settings, 
  Users, 
  Menu,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state: RootState) => state.ui)
  const { user } = useSelector((state: RootState) => state.auth)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['operator', 'supervisor', 'admin'] },
    { name: 'Reports', href: '/reports', icon: FileText, roles: ['operator', 'supervisor', 'admin'] },
    { name: 'Map', href: '/map', icon: Map, roles: ['operator', 'supervisor', 'admin'] },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['supervisor', 'admin'] },
    { name: 'Admin', href: '/admin', icon: Settings, roles: ['admin'] },
  ]

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  )

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(toggleSidebar())}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            {sidebarOpen ? (
              <h1 className="text-xl font-bold text-foreground">NagarDost</h1>
            ) : (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">N</span>
              </div>
            )}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-md hover:bg-muted"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>

          {/* User info */}
          {sidebarOpen && user && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-medium text-sm">
                    {user.first_name?.[0] || user.phone[0]}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Sidebar
