import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { FileText, Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts'

const reportTemplates = [
  {
    id: 'RPT001',
    name: 'Monthly Subsidy Usage Report',
    description: 'Comprehensive monthly analysis of subsidy consumption by region and company',
    category: 'Financial',
    frequency: 'Monthly',
    lastGenerated: '20/08/2024',
    status: 'Active'
  },
  {
    id: 'RPT002',
    name: 'Fleet Compliance Summary',
    description: 'Vehicle compliance scores and anomaly detection summary',
    category: 'Compliance',
    frequency: 'Weekly',
    lastGenerated: '19/08/2024',
    status: 'Active'
  },
  {
    id: 'RPT003',
    name: 'Digital Card Transaction Analysis',
    description: 'Analysis of digital fleet card usage patterns and fraud detection',
    category: 'Security',
    frequency: 'Daily',
    lastGenerated: '21/08/2024',
    status: 'Active'
  },
  {
    id: 'RPT004',
    name: 'Regional Performance Dashboard',
    description: 'State-wise performance metrics and allocation efficiency',
    category: 'Performance',
    frequency: 'Quarterly',
    lastGenerated: '15/07/2024',
    status: 'Scheduled'
  }
]

const customReports = [
  {
    id: 'CR001',
    name: 'Selangor Anomaly Investigation',
    createdBy: 'Ahmad Rahman',
    createdDate: '20/08/2024',
    parameters: 'Region: Selangor, Date Range: 01/08/2024 - 20/08/2024',
    status: 'Completed',
    downloadUrl: '#'
  },
  {
    id: 'CR002',
    name: 'Express Logistics Audit Report',
    createdBy: 'Siti Nurhaliza',
    createdDate: '18/08/2024',
    parameters: 'Company: Express Logistics, Full Audit',
    status: 'In Progress',
    downloadUrl: null
  }
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

const subsidyByRegion = [
  { region: 'Selangor', amount: 425, percentage: 22.7 },
  { region: 'Johor', amount: 380, percentage: 20.3 },
  { region: 'Penang', amount: 275, percentage: 14.7 },
  { region: 'Sabah', amount: 320, percentage: 17.1 },
  { region: 'Sarawak', amount: 295, percentage: 15.8 },
  { region: 'Others', amount: 180, percentage: 9.6 }
]

const monthlyTrend = [
  { month: 'Jan', subsidy: 195.2, transactions: 45678, compliance: 94.2 },
  { month: 'Feb', subsidy: 201.8, transactions: 47234, compliance: 93.8 },
  { month: 'Mar', subsidy: 198.5, transactions: 46891, compliance: 94.5 },
  { month: 'Apr', subsidy: 205.1, transactions: 48567, compliance: 95.1 },
  { month: 'May', subsidy: 210.2, transactions: 49123, compliance: 94.8 },
  { month: 'Jun', subsidy: 208.7, transactions: 48789, compliance: 95.3 },
  { month: 'Jul', subsidy: 195.4, transactions: 46234, compliance: 94.9 },
  { month: 'Aug', subsidy: 187.9, transactions: 44567, compliance: 95.2 }
]

export const Reports: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last-30-days')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedCompany, setSelectedCompany] = useState('all')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Insights</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and analytical insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Custom Query Builder
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="builder">Query Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Frequency:</span>
                      <span className="font-medium">{template.frequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Generated:</span>
                      <span className="font-medium">{template.lastGenerated}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge variant={template.status === 'Active' ? 'success' : 'secondary'}>
                        {template.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" className="flex-1">Generate Now</Button>
                      <Button size="sm" variant="outline">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Custom Reports</CardTitle>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Create New Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customReports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">Created by {report.createdBy} on {report.createdDate}</p>
                      </div>
                      <Badge variant={report.status === 'Completed' ? 'success' : 'warning'}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{report.parameters}</p>
                    <div className="flex space-x-2">
                      {report.downloadUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm" variant="outline">Duplicate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Query Builder</CardTitle>
              <p className="text-sm text-muted-foreground">Build custom reports with advanced filtering and analysis</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Data Source</label>
                    <select className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm">
                      <option>Subsidy Transactions</option>
                      <option>Fleet Data</option>
                      <option>Compliance Records</option>
                      <option>Anomaly Detection</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Report Type</label>
                    <select className="w-full mt-1 px-3 py-2 border border-input rounded-md text-sm">
                      <option>Summary Report</option>
                      <option>Detailed Analysis</option>
                      <option>Trend Analysis</option>
                      <option>Comparative Study</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Filters</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <Input placeholder="Date Range" />
                    <Input placeholder="Region/State" />
                    <Input placeholder="Company" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Metrics to Include</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {['Subsidy Usage', 'Transaction Count', 'Compliance Score', 'Anomalies', 'Fleet Size', 'Card Usage', 'Regional Distribution', 'Trend Analysis'].map((metric) => (
                      <label key={metric} className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        <span>{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button>Generate Report</Button>
                  <Button variant="outline">Preview</Button>
                  <Button variant="outline">Save Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
