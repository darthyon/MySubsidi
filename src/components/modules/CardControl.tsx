import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreditCard, Download, Activity, Flag, XCircle } from 'lucide-react'

const cardData = [
  {
    id: 'FC-001234',
    vehicleId: 'WXX 1234',
    company: 'Express Logistics',
    driver: 'Ahmad Rahman',
    status: 'Active',
    issueDate: '15/01/2024',
    expiryDate: '15/01/2025',
    monthlyLimit: 5000,
    monthlyUsed: 3250,
    lastTransaction: '21/08/2024 14:30',
    transactionCount: 45,
    flagged: false
  },
  {
    id: 'FC-005678',
    vehicleId: 'JKB 5567',
    company: 'City Transport',
    driver: 'Sarah Lim',
    status: 'Flagged',
    issueDate: '20/02/2024',
    expiryDate: '20/02/2025',
    monthlyLimit: 4500,
    monthlyUsed: 4890,
    lastTransaction: '21/08/2024 13:45',
    transactionCount: 67,
    flagged: true
  },
  {
    id: 'FC-009012',
    vehicleId: 'SGF 8901',
    company: 'Rapid Bus',
    driver: 'Kumar Selvam',
    status: 'Active',
    issueDate: '10/03/2024',
    expiryDate: '10/03/2025',
    monthlyLimit: 6000,
    monthlyUsed: 4125,
    lastTransaction: '21/08/2024 12:20',
    transactionCount: 38,
    flagged: false
  },
  {
    id: 'FC-003456',
    vehicleId: 'PKG 2345',
    company: 'Express Logistics',
    driver: 'Michelle Tan',
    status: 'Suspended',
    issueDate: '05/04/2024',
    expiryDate: '05/04/2025',
    monthlyLimit: 4000,
    monthlyUsed: 0,
    lastTransaction: '18/08/2024 16:45',
    transactionCount: 0,
    flagged: true
  },
  {
    id: 'FC-007890',
    vehicleId: 'KBJ 6789',
    company: 'City Transport',
    driver: 'Raj Patel',
    status: 'Active',
    issueDate: '12/05/2024',
    expiryDate: '12/05/2025',
    monthlyLimit: 5500,
    monthlyUsed: 2875,
    lastTransaction: '21/08/2024 15:10',
    transactionCount: 32,
    flagged: false
  }
]

export const CardControl: React.FC = () => {
  const totalCards = cardData.length
  const activeCards = cardData.filter(c => c.status === 'Active').length
  const flaggedCards = cardData.filter(c => c.status === 'Flagged').length
  const suspendedCards = cardData.filter(c => c.status === 'Suspended').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Digital Fleet Card</h1>
          <p className="text-muted-foreground">Manage and monitor digital fuel cards</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            Issue New Card
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cards</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <CreditCard className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Issued cards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Cards</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Activity className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCards}</div>
            <p className="text-xs text-muted-foreground">{Math.round((activeCards/totalCards)*100)}% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Flagged Cards</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <Flag className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flaggedCards}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended Cards</CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <XCircle className="w-4 h-4 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suspendedCards}</div>
            <p className="text-xs text-muted-foreground">Blocked cards</p>
          </CardContent>
        </Card>
      </div>

      {/* ... */}
    </div>
  )
}
