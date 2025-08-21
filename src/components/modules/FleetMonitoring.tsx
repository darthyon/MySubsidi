import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Filter, Eye, Truck, Activity, AlertTriangle, Gauge } from 'lucide-react'
import { fleetData } from '@/data/mockData'

const vehicleData = [
  { 
    id: 'V001', 
    plate: 'WXX 1234', 
    company: 'Express Logistics', 
    driver: 'Ahmad Rahman',
    status: 'Active', 
    location: 'Subang Jaya, Selangor',
    lastRefuel: '21/08/2024 14:30',
    fuelLevel: 85,
    todayConsumption: 45.2,
    compliance: 'Good',
    cardStatus: 'Active'
  },
  { 
    id: 'V002', 
    plate: 'JKB 5567', 
    company: 'City Transport', 
    driver: 'Sarah Lim',
    status: 'Warning', 
    location: 'KLCC, Kuala Lumpur',
    lastRefuel: '21/08/2024 13:45',
    fuelLevel: 32,
    todayConsumption: 67.8,
    compliance: 'Warning',
    cardStatus: 'Flagged'
  },
  { 
    id: 'V003', 
    plate: 'SGF 8901', 
    company: 'Rapid Bus', 
    driver: 'Kumar Selvam',
    status: 'Active', 
    location: 'Bangsar, Kuala Lumpur',
    lastRefuel: '21/08/2024 12:20',
    fuelLevel: 78,
    todayConsumption: 52.1,
    compliance: 'Excellent',
    cardStatus: 'Active'
  },
  { 
    id: 'V004', 
    plate: 'PKG 2345', 
    company: 'Express Logistics', 
    driver: 'Michelle Tan',
    status: 'Inactive', 
    location: 'Shah Alam, Selangor',
    lastRefuel: '20/08/2024 18:15',
    fuelLevel: 15,
    todayConsumption: 0,
    compliance: 'Poor',
    cardStatus: 'Suspended'
  },
  { 
    id: 'V005', 
    plate: 'KBJ 6789', 
    company: 'City Transport', 
    driver: 'Raj Patel',
    status: 'Active', 
    location: 'Petaling Jaya, Selangor',
    lastRefuel: '21/08/2024 15:10',
    fuelLevel: 92,
    todayConsumption: 38.5,
    compliance: 'Good',
    cardStatus: 'Active'
  }
]

const mapRegions = [
  { region: 'Selangor', vehicles: 12500, compliant: 11875, warning: 450, critical: 175 },
  { region: 'Kuala Lumpur', vehicles: 8900, compliant: 8455, warning: 312, critical: 133 },
  { region: 'Johor', vehicles: 7800, compliant: 7410, warning: 273, critical: 117 },
  { region: 'Penang', vehicles: 5600, compliant: 5320, warning: 196, critical: 84 },
  { region: 'Sabah', vehicles: 4200, compliant: 3990, warning: 147, critical: 63 },
  { region: 'Sarawak', vehicles: 3800, compliant: 3610, warning: 133, critical: 57 }
]

export const FleetMonitoring: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [complianceFilter, setComplianceFilter] = useState('all')

  const filteredVehicles = vehicleData.filter(vehicle => {
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || vehicle.status.toLowerCase() === statusFilter
    const matchesCompliance = complianceFilter === 'all' || vehicle.compliance.toLowerCase() === complianceFilter
    
    return matchesSearch && matchesStatus && matchesCompliance
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success'
      case 'warning': return 'warning'
      case 'inactive': return 'secondary'
      default: return 'secondary'
    }
  }

  const getComplianceColor = (compliance: string) => {
    switch (compliance.toLowerCase()) {
      case 'excellent': return 'success'
      case 'good': return 'success'
      case 'warning': return 'warning'
      case 'poor': return 'destructive'
      default: return 'secondary'
    }
  }

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return 'bg-[#33bd6a]'
    if (level > 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Fleet Monitoring</h1>
          <p className="text-muted-foreground">Real-time tracking and compliance monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
          </Button>
          <Button>
            <MapPin className="w-4 h-4 mr-2" />
            Live Map View
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehicles</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Truck className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleData.length.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all fleets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Now</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Activity className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicleData.filter(v => v.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Issues</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <AlertTriangle className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vehicleData.filter(v => v.compliance === 'Warning' || v.compliance === 'Poor').length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Fuel Level</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Gauge className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(vehicleData.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicleData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Fleet average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicle List</TabsTrigger>
          <TabsTrigger value="map">Live Map</TabsTrigger>
          <TabsTrigger value="fleets">Fleet Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by plate, company, or driver..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="warning">Warning</option>
                  <option value="inactive">Inactive</option>
                </select>
                <select 
                  value={complianceFilter}
                  onChange={(e) => setComplianceFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Compliance</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="warning">Warning</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Table */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Monitoring Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Fuel Level</TableHead>
                    <TableHead>Today's Usage</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Card Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{vehicle.plate}</p>
                          <p className="text-xs text-muted-foreground">{vehicle.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{vehicle.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getFuelLevelColor(vehicle.fuelLevel)}`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            />
                          </div>
                          <span className="text-sm">{vehicle.fuelLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{vehicle.todayConsumption}L</TableCell>
                      <TableCell>
                        <Badge variant={getComplianceColor(vehicle.compliance)}>
                          {vehicle.compliance}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={vehicle.cardStatus === 'Active' ? 'success' : 
                                       vehicle.cardStatus === 'Flagged' ? 'warning' : 'secondary'}>
                          {vehicle.cardStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">Track</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Live Vehicle Tracking Map</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 text-center h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Interactive Map View</h3>
                  <p className="text-gray-500">Real-time vehicle locations across Malaysia</p>
                  <p className="text-sm text-gray-400 mt-2">Map integration would display here</p>
                </div>
              </div>
              
              {/* Regional Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {mapRegions.slice(0, 6).map((region) => (
                  <Card key={region.region}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{region.region}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Total:</span>
                          <span className="font-medium">{region.vehicles.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">Compliant:</span>
                          <span className="font-medium text-green-600">{region.compliant.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-yellow-600">Warning:</span>
                          <span className="font-medium text-yellow-600">{region.warning}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-red-600">Critical:</span>
                          <span className="font-medium text-red-600">{region.critical}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleetData.map((fleet) => (
              <Card key={fleet.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{fleet.organisation}</CardTitle>
                  <p className="text-sm text-muted-foreground">Fleet ID: {fleet.id}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Vehicles:</span>
                      <span className="font-medium">{fleet.vehicleCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Cards:</span>
                      <span className="font-medium">{fleet.activeCards}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Usage:</span>
                      <span className="font-medium">{fleet.monthlyConsumption.toLocaleString()}L</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance:</span>
                      <Badge variant={fleet.complianceScore > 95 ? 'success' : 
                                     fleet.complianceScore > 90 ? 'warning' : 'destructive'}>
                        {fleet.complianceScore}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last updated: {fleet.lastUpdate}
                    </div>
                    <Button size="sm" className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
