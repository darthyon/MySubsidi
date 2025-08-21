import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { DollarSign, TrendingUp, Download, Search } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { malaysianCompanies } from '@/data/mockData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const allocationData = [
  { organisation: 'Tesla Inc', allocated: 125000000, used: 98750000, remaining: 26250000, utilization: 79 },
  { organisation: 'Superlorry Sdn Bhd', allocated: 95000000, used: 82650000, remaining: 12350000, utilization: 87 },
  { organisation: 'MYHaulage Berhad', allocated: 75000000, used: 63750000, remaining: 11250000, utilization: 85 },
  { organisation: 'EcoTrans Logistics', allocated: 85000000, used: 68000000, remaining: 17000000, utilization: 80 },
  { organisation: 'Jaya Movers', allocated: 65000000, used: 55250000, remaining: 9750000, utilization: 85 },
]

const historicalTrend = [
  { month: 'Jan 2024', allocated: 208.3, used: 195.2 },
  { month: 'Feb 2024', allocated: 208.3, used: 201.8 },
  { month: 'Mar 2024', allocated: 208.3, used: 198.5 },
  { month: 'Apr 2024', allocated: 208.3, used: 205.1 },
  { month: 'May 2024', allocated: 208.3, used: 210.2 },
  { month: 'Jun 2024', allocated: 208.3, used: 208.7 },
  { month: 'Jul 2024', allocated: 208.3, used: 195.4 },
  { month: 'Aug 2024', allocated: 208.3, used: 187.9 },
]

export const SubsidyAllocation: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrganisation, setSelectedOrganisation] = useState('all')

  const filteredData = allocationData.filter(item => {
    const matchesSearch = item.organisation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesOrganisation = selectedOrganisation === 'all' || item.organisation === selectedOrganisation
    
    return matchesSearch && matchesOrganisation
  })

  const totalAllocated = allocationData.reduce((sum, item) => sum + item.allocated, 0)
  const totalUsed = allocationData.reduce((sum, item) => sum + item.used, 0)
  const totalRemaining = allocationData.reduce((sum, item) => sum + item.remaining, 0)
  const avgUtilization = Math.round(allocationData.reduce((sum, item) => sum + item.utilization, 0) / allocationData.length)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Subsidy Allocation</h1>
          <p className="text-muted-foreground">Monitor and manage fuel subsidy allocations by organisation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <DollarSign className="w-4 h-4 mr-2" />
            Adjust Allocation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Allocated</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
            <p className="text-xs text-muted-foreground">Across all organisations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Used</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalUsed)}</div>
            <p className="text-xs text-muted-foreground">Current consumption</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <DollarSign className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRemaining)}</div>
            <p className="text-xs text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Utilization</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground">Across all allocations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Allocations</TabsTrigger>
          <TabsTrigger value="historical">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search organisation..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <select 
                  value={selectedOrganisation}
                  onChange={(e) => setSelectedOrganisation(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Organisations</option>
                  {malaysianCompanies.map((organisation: string) => (
                    <option key={organisation} value={organisation}>{organisation}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Allocation Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subsidy Allocations by Organisation</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Organisation</TableHead>
                    <TableHead>Allocated</TableHead>
                    <TableHead>Used</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Utilization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.organisation}</TableCell>
                      <TableCell>{formatCurrency(item.allocated)}</TableCell>
                      <TableCell>{formatCurrency(item.used)}</TableCell>
                      <TableCell>{formatCurrency(item.remaining)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                item.utilization > 90 ? 'bg-red-500' :
                                item.utilization > 75 ? 'bg-orange-500' : 'bg-[#33bd6a]'
                              }`}
                              style={{ width: `${item.utilization}%` }}
                            />
                          </div>
                          <span className="text-sm">{item.utilization}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          item.utilization > 90 ? 'destructive' :
                          item.utilization > 75 ? 'warning' : 'success'
                        }>
                          {item.utilization > 90 ? 'Critical' :
                           item.utilization > 75 ? 'Warning' : 'Normal'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span>Historical Allocation vs Usage Trend</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`RM ${value}M`, '']} />
                  <Line type="monotone" dataKey="allocated" stroke="#3b82f6" strokeWidth={2} name="Allocated" />
                  <Line type="monotone" dataKey="used" stroke="#33bd6a" strokeWidth={2} name="Used" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
