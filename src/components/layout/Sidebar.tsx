import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutDashboard, 
  DollarSign, 
  Truck, 
  CreditCard, 
  Shield, 
  FileText, 
  Settings,
  LogOut,
  Bell,
  Activity
} from 'lucide-react'

interface SidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

const governmentModules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'subsidy-allocation', label: 'Subsidy Allocation', icon: DollarSign },
  { id: 'fleet-monitoring', label: 'Fleet Monitoring', icon: Truck },
  { id: 'card-control', label: 'Digital Fleet Cards', icon: CreditCard },
  { id: 'compliance', label: 'Compliance & Audit', icon: Shield },
  { id: 'reports', label: 'Reports & Insights', icon: FileText },
  { id: 'integration', label: 'Integration Health', icon: Activity },
]

const otherRoleModules = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: DollarSign },
  { id: 'fleet', label: 'Fleet Management', icon: Truck },
  { id: 'reports', label: 'Reports', icon: FileText },
]

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const { user, logout } = useAuth()
  
  const modules = user?.role === 'government' ? governmentModules : otherRoleModules

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">MySubsidi</h1>
            <p className="text-xs text-muted-foreground">Fuel Subsidy Portal</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">{user?.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.organization}</p>
          </div>
        </div>
        <Badge variant="secondary" className="mt-2 text-xs">
          {user?.role.replace('_', ' ').toUpperCase()}
        </Badge>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {modules.map((module) => {
          const Icon = module.icon
          return (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeModule === module.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{module.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
