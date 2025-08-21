import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { AlertTriangle, Search, Download, Eye, FileText } from 'lucide-react'
import { anomalies } from '@/data/mockData'

const auditTrail = [
  {
    id: 'AT001',
    user: 'Ahmad Rahman (KPDN)',
    action: 'Suspended fleet card FC-005678',
    timestamp: '21/08/2024 15:45',
    details: 'Unusual consumption pattern detected',
    category: 'Card Management'
  },
  {
    id: 'AT002',
    user: 'Sarah Lim (Shell Malaysia)',
    action: 'Updated fuel allocation for Selangor region',
    timestamp: '21/08/2024 14:30',
    details: 'Increased allocation by RM 5M due to demand surge',
    category: 'Allocation'
  },
  {
    id: 'AT003',
    user: 'System Auto',
    action: 'Flagged transaction TXN-789012',
    timestamp: '21/08/2024 13:15',
    details: 'Location anomaly: Refueling outside designated route',
    category: 'Fraud Detection'
  },
  {
    id: 'AT004',
    user: 'Kumar Selvam (Express Logistics)',
    action: 'Submitted compliance report',
    timestamp: '21/08/2024 12:00',
    details: 'Monthly fleet compliance documentation',
    category: 'Reporting'
  },
  {
    id: 'AT005',
    user: 'Michelle Tan (IoT Solutions)',
    action: 'Updated device firmware for 150 vehicles',
    timestamp: '21/08/2024 11:30',
    details: 'Security patch v2.1.3 deployed',
    category: 'Device Management'
  }
]

const complianceReports = [
  {
    id: 'CR001',
    company: 'Express Logistics',
    reportType: 'Monthly Compliance',
    submissionDate: '20/08/2024',
    status: 'Approved',
    score: 96.5,
    issues: 2,
    reviewer: 'Ahmad Rahman'
  },
  {
    id: 'CR002',
    company: 'City Transport',
    reportType: 'Incident Report',
    submissionDate: '19/08/2024',
    status: 'Under Review',
    score: 88.2,
    issues: 5,
    reviewer: 'Siti Nurhaliza'
  },
  {
    id: 'CR003',
    company: 'Rapid Bus',
    reportType: 'Quarterly Audit',
    submissionDate: '18/08/2024',
    status: 'Approved',
    score: 98.1,
    issues: 1,
    reviewer: 'Ahmad Rahman'
  }
]

export const Compliance: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')

  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesSearch = anomaly.serviceProvider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || anomaly.severity.toLowerCase() === severityFilter
    
    return matchesSearch && matchesSeverity
  })

  const totalAnomalies = anomalies.length
  const highSeverity = anomalies.filter(a => a.severity === 'High').length
  const resolvedAnomalies = anomalies.filter(a => a.status === 'Resolved').length
  const avgComplianceScore = Math.round(complianceReports.reduce((sum, report) => sum + report.score, 0) / complianceReports.length)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance & Audit</h1>
          <p className="text-muted-foreground">Automated anomaly detection and compliance monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Audit Report
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Anomalies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAnomalies}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highSeverity}</div>
            <p className="text-xs text-muted-foreground">Require immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedAnomalies}</div>
            <p className="text-xs text-muted-foreground">{Math.round((resolvedAnomalies/totalAnomalies)*100)}% resolution rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{avgComplianceScore}%</div>
            <p className="text-xs text-muted-foreground">Across all companies</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="anomalies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="anomalies" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search anomalies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                <select 
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md text-sm"
                >
                  <option value="all">All Severities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Anomalies Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Detected Anomalies</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anomaly ID</TableHead>
                    <TableHead>Company/Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAnomalies.map((anomaly) => (
                    <TableRow key={anomaly.id}>
                      <TableCell className="font-medium">{anomaly.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{anomaly.serviceProvider}</p>
                          <p className="text-xs text-muted-foreground">{anomaly.vehicleId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{anomaly.type}</TableCell>
                      <TableCell>
                        <Badge variant={
                          anomaly.severity === 'High' ? 'destructive' : 
                          anomaly.severity === 'Medium' ? 'warning' : 'secondary'
                        }>
                          {anomaly.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{anomaly.description}</p>
                      </TableCell>
                      <TableCell>{anomaly.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={
                          anomaly.status === 'Resolved' ? 'success' :
                          anomaly.status === 'Investigating' ? 'warning' : 'secondary'
                        }>
                          {anomaly.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">Investigate</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Issues</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {complianceReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.company}</TableCell>
                      <TableCell>{report.reportType}</TableCell>
                      <TableCell>{report.submissionDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${
                            report.score > 95 ? 'text-green-600' :
                            report.score > 85 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {report.score}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={report.issues === 0 ? 'success' : 
                                       report.issues < 3 ? 'warning' : 'destructive'}>
                          {report.issues} issues
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          report.status === 'Approved' ? 'success' :
                          report.status === 'Under Review' ? 'warning' : 'secondary'
                        }>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.reviewer}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Audit ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrail.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.category}</Badge>
                      </TableCell>
                      <TableCell>{entry.timestamp}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{entry.details}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
