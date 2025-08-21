import React, { useState } from 'react'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import LoginForm from '@/components/auth/LoginForm'
import { Sidebar } from '@/components/layout/Sidebar'
import { GovernmentDashboard } from '@/components/dashboard/GovernmentDashboard'
import { SubsidyAllocation } from '@/components/modules/SubsidyAllocation'
import { FleetMonitoring } from '@/components/modules/FleetMonitoring'
import { CardControl } from '@/components/modules/CardControl'
import { Compliance } from '@/components/modules/Compliance'
import { Reports } from '@/components/modules/Reports'

const AppContent: React.FC = () => {
  const { user } = useAuth()
  const [activeModule, setActiveModule] = useState('dashboard')

  if (!user) {
    return <LoginForm />
  }

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <GovernmentDashboard />
      case 'subsidy-allocation':
        return <SubsidyAllocation />
      case 'fleet-monitoring':
        return <FleetMonitoring />
      case 'card-control':
        return <CardControl />
      case 'compliance':
        return <Compliance />
      case 'reports':
        return <Reports />
      case 'integration':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Integration Health</h1>
            <p className="text-muted-foreground">API connectivity and system health monitoring</p>
          </div>
        )
      default:
        return <GovernmentDashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-auto">
        {renderModule()}
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
