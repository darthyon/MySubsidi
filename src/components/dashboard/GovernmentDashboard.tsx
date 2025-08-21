import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Bell, DollarSign, CreditCard, Building2, Shield, AlertTriangle, TrendingUp, Activity } from 'lucide-react'
import { KPICard } from './KPICard'
import { subsidyData, kpiData, serviceProviderData, anomalies, apiHealthData } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

// Blue color palette from darkest to lightest (WCAG compliant)
const blueColorPalette = [
  '#1E40AF',  // Darkest blue
  '#1D4ED8',  // Dark-medium blue  
  '#2563EB',  // Medium-dark blue
  '#3B82F6',  // Medium blue
  '#60A5FA'   // Lightest blue (still WCAG compliant)
]

// Function to assign colors based on data values (highest = darkest, lowest = lightest)
const assignColorsBasedOnValue = (data: Array<{name: string, value: number}>) => {
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  return sortedData.map((item, index) => ({
    ...item,
    color: blueColorPalette[index] || blueColorPalette[blueColorPalette.length - 1]
  }))
}

// Simple horizontal bar data
const horizontalBarBaseData = [
  { name: 'Petronas', value: 45600000 },
  { name: 'Shell', value: 38200000 },
  { name: 'BHPetrol', value: 29800000 },
  { name: 'Caltex', value: 22400000 },
  { name: 'Petron', value: 18900000 }
]

// Fleet Card Distribution data
const fleetCardBaseData = [
  { name: 'Shell', value: 2840 },
  { name: 'Petronas', value: 1520 },
  { name: 'BHPetrol', value: 1180 },
  { name: 'Caltex', value: 680 },
  { name: 'Petron', value: 180 }
]

// Simple donut chart component
const DonutChart: React.FC<{ data: Array<{name: string, value: number, color: string}> }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const size = 200  // Made bigger for left section
  const strokeWidth = 30  // Increased thickness
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  
  let cumulativePercentage = 0
  
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
            const strokeDashoffset = -((cumulativePercentage / 100) * circumference)
            cumulativePercentage += percentage
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 hover:opacity-80"
              >
                <title>{`${item.name}: ${item.value.toLocaleString()} cards (${percentage.toFixed(1)}%)`}</title>
              </circle>
            )
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Cards</div>
        </div>
      </div>
    </div>
  )
}

export const GovernmentDashboard: React.FC = () => {
  const [selectedGranularity, setSelectedGranularity] = useState('month')
  const [selectedPeriod, setSelectedPeriod] = useState('august')
  const [fleetCardGranularity, setFleetCardGranularity] = useState('month')
  const [fleetCardPeriod, setFleetCardPeriod] = useState('august')
  const [notificationOpen, setNotificationOpen] = useState(false)
  
  const cardCoveragePercentage = ((kpiData.activeCards / (kpiData.activeCards + kpiData.suspendedCards)) * 100).toFixed(1)
  const organisationCoveragePercentage = ((kpiData.activeOrganisations / kpiData.totalOrganisations) * 100).toFixed(1)
  
  const months = [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ]
  
  const quarters = [
    { value: 'q1', label: 'Q1' },
    { value: 'q2', label: 'Q2' },
    { value: 'q3', label: 'Q3' },
    { value: 'q4', label: 'Q4' }
  ]
  
  const years = [
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
    { value: '2024', label: '2024' },
    { value: '2025', label: '2025' }
  ]
  
  const getPeriodOptions = (granularity: string) => {
    switch (granularity) {
      case 'month': return months
      case 'quarter': return quarters
      case 'year': return years
      default: return months
    }
  }
  
  const getPeriodLabel = (granularity: string, period: string) => {
    const options = getPeriodOptions(granularity)
    return options.find(option => option.value === period)?.label || 'August'
  }
  
  const handleGranularityChange = (granularity: string, setPeriod: (period: string) => void) => {
    switch (granularity) {
      case 'month': setPeriod('august'); break
      case 'quarter': setPeriod('q3'); break
      case 'year': setPeriod('2025'); break
    }
  }
  
  const horizontalBarData = assignColorsBasedOnValue(horizontalBarBaseData)
  const fleetCardData = assignColorsBasedOnValue(fleetCardBaseData)
  
  const highestProvider = horizontalBarData[0]
  const highestUsage = (highestProvider.value / 1000000).toFixed(1)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your fuel subsidy program.</p>
        </div>
        <div className="relative">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2"
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          
          {/* Notification dropdown */}
          {notificationOpen && (
            <div className="absolute top-full right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Suspicious transaction detected</p>
                      <p className="text-xs text-gray-500">Vehicle JKB 5567 exceeded daily limit</p>
                      <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">API health alert</p>
                      <p className="text-xs text-gray-500">Caltex API showing degraded performance</p>
                      <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">Monthly report ready</p>
                      <p className="text-xs text-gray-500">Subsidy allocation report for August</p>
                      <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-blue-600 hover:text-blue-700"
                  onClick={() => {
                    setNotificationOpen(false)
                    // Navigate to notifications page
                    console.log('Navigate to notifications page')
                  }}
                >
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Subsidy Allocated"
          value={formatCurrency(subsidyData.totalAllocated)}
          subtitle={`${formatCurrency(subsidyData.totalUsed)} used`}
          trend="neutral"
          trendValue={`${((subsidyData.totalUsed / subsidyData.totalAllocated) * 100).toFixed(1)}% used`}
          status="info"
          icon={<DollarSign className="w-4 h-4 text-gray-600" />}
        />
        <KPICard
          title="Digital Fleet Cards"
          value={kpiData.activeCards.toLocaleString()}
          subtitle={`${kpiData.suspendedCards} suspended`}
          trend="up"
          trendValue={`${cardCoveragePercentage}% coverage`}
          status="success"
          icon={<CreditCard className="w-4 h-4 text-gray-600" />}
        />
        <KPICard
          title="Active Organisations"
          value={kpiData.activeOrganisations}
          subtitle={`of ${kpiData.totalOrganisations} total`}
          trend="up"
          trendValue={`${organisationCoveragePercentage}% coverage`}
          status="success"
          icon={<Building2 className="w-4 h-4 text-gray-600" />}
        />
        <KPICard
          title="Compliance Score"
          value={`${kpiData.complianceScore}%`}
          subtitle="System-wide compliance"
          trend="up"
          trendValue="+2.1% this month"
          status="success"
          icon={<Shield className="w-4 h-4 text-gray-600" />}
        />
        <KPICard
          title="Suspicious Transactions"
          value={kpiData.suspiciousTransactions}
          subtitle="Detected today"
          trend="down"
          trendValue="-15% vs yesterday"
          status="warning"
          icon={<AlertTriangle className="w-4 h-4 text-gray-600" />}
        />
      </div>

      {/* 2x2 Grid: Subsidy Usage Chart and Another Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <div>
                  <CardTitle>Subsidy Usage (ℓ)</CardTitle>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={selectedGranularity === 'month' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setSelectedGranularity('month')
                      handleGranularityChange('month', setSelectedPeriod)
                    }}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={selectedGranularity === 'quarter' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setSelectedGranularity('quarter')
                      handleGranularityChange('quarter', setSelectedPeriod)
                    }}
                  >
                    Quarter
                  </Button>
                  <Button 
                    variant={selectedGranularity === 'year' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setSelectedGranularity('year')
                      handleGranularityChange('year', setSelectedPeriod)
                    }}
                  >
                    Year
                  </Button>
                </div>
                <select 
                  className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 w-auto min-w-0"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  {getPeriodOptions(selectedGranularity).map((period) => (
                    <option key={period.value} value={period.value}>{period.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {horizontalBarData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="w-16 text-sm text-gray-600 text-right">{entry.name}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
                    <div 
                      className="h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-200 hover:opacity-90 cursor-pointer"
                      style={{ width: `${(entry.value / Math.max(...horizontalBarData.map(d => d.value))) * 100}%`, backgroundColor: entry.color }}
                      title={`${entry.name}: ${(entry.value / 1000000).toFixed(1)}M ℓ (${((entry.value / Math.max(...horizontalBarData.map(d => d.value))) * 100).toFixed(1)}%)`}
                    >
                      <span className="text-xs text-white font-medium">
                        {(entry.value / 1000000).toFixed(1)}M
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Highest usage indicator */}
            <div className="flex items-center justify-center mt-6 p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">
                <span className="font-bold text-blue-900">Petronas</span> leads with <span className="font-bold text-blue-900">{(horizontalBarData[0].value / 1000000).toFixed(1)}M ℓ</span> usage worth RM{(horizontalBarData[0].value * 0.001).toFixed(1)} million
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-gray-600" />
                <div>
                  <CardTitle>Fleet Card Distribution</CardTitle>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={fleetCardGranularity === 'month' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setFleetCardGranularity('month')
                      handleGranularityChange('month', setFleetCardPeriod)
                    }}
                  >
                    Month
                  </Button>
                  <Button 
                    variant={fleetCardGranularity === 'quarter' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setFleetCardGranularity('quarter')
                      handleGranularityChange('quarter', setFleetCardPeriod)
                    }}
                  >
                    Quarter
                  </Button>
                  <Button 
                    variant={fleetCardGranularity === 'year' ? 'default' : 'outline'} 
                    size="sm" 
                    onClick={() => {
                      setFleetCardGranularity('year')
                      handleGranularityChange('year', setFleetCardPeriod)
                    }}
                  >
                    Year
                  </Button>
                </div>
                <select 
                  className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm text-gray-700 w-auto min-w-0"
                  value={fleetCardPeriod}
                  onChange={(e) => setFleetCardPeriod(e.target.value)}
                >
                  {getPeriodOptions(fleetCardGranularity).map((period) => (
                    <option key={period.value} value={period.value}>{period.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {/* Left Section - Donut Chart */}
              <div className="flex items-center justify-center">
                <DonutChart 
                  data={fleetCardData} 
                />
              </div>
              
              {/* Right Section - Legend */}
              <div className="flex flex-col justify-center space-y-3">
                {fleetCardData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.value.toLocaleString()}</span>
                  </div>
                ))}
                
                {/* Total Summary */}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-sm text-gray-700">Total Cards</span>
                    <span className="text-sm text-gray-900">
                      {fleetCardData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Fleet card leader indicator */}
            <div className="flex items-center justify-center mt-4 p-3 bg-blue-50 rounded-lg">
              <Activity className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm text-gray-700">
                <span className="font-bold text-blue-900">Shell</span> leads with <span className="font-bold text-blue-900">{fleetCardData[0].value.toLocaleString()}</span> <span className="font-bold text-blue-900">cards</span> distributed to 30 organisations
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2x2 Grid: API Health Panel and Fraud Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Health Panel</CardTitle>
            <p className="text-sm text-muted-foreground">Real-time service provider API status</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {apiHealthData.map((api, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      api.status === 'Online' ? 'bg-green-500' :
                      api.status === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{api.service}</p>
                      <p className="text-sm text-muted-foreground">{api.uptime}% uptime</p>
                    </div>
                  </div>
                  <Badge variant={
                    api.status === 'Online' ? 'default' :
                    api.status === 'Warning' ? 'secondary' : 'destructive'
                  } className={
                    api.status === 'Online' ? 'bg-green-100 text-green-800 border-green-200' : ''
                  }>
                    {api.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Risks</CardTitle>
            <p className="text-sm text-muted-foreground">Recent anomalies requiring attention</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organisation/Vehicle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {anomalies.map((anomaly, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{anomaly.organisation}/{anomaly.vehicleId}</TableCell>
                    <TableCell>{anomaly.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        anomaly.severity === 'High' ? 'destructive' :
                        anomaly.severity === 'Medium' ? 'default' : 'secondary'
                      }>
                        {anomaly.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Investigate</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="text-center text-muted-foreground">
        MySubsidi Dashboard - Fully Operational
      </div>
    </div>
  )
}
