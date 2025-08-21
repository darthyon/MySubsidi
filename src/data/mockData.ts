// Malaysia-specific mock data for the MySubsidi portal

export const serviceProviders = [
  'Petronas',
  'Shell',
  'Caltex',
  'Petron'
]

export const subsidyRecipients = [
  'Tesla Inc',
  'Superlorry Sdn Bhd',
  'MYHaulage Berhad',
  'EcoTrans Logistics',
  'Jaya Movers',
  'BumiFleet Sdn Bhd',
  'LajuTransport Berhad'
]

// Alias for backward compatibility
export const malaysianCompanies = subsidyRecipients

// Regional data placeholder (empty since we removed regional analysis)
export const regionalData: any[] = []

export const vehiclePlates = [
  'WXX 1234', 'JKB 5567', 'SGF 8901', 'PKG 2345', 'KBJ 6789',
  'WMN 3456', 'JHG 7890', 'SGK 1234', 'PKA 5678', 'KBA 9012',
  'WKL 3456', 'JDT 7890', 'SGP 1234', 'PKB 5678', 'KBC 9012'
]

export const subsidyData = {
  totalAllocated: 2500000000, // RM 2.5 billion
  totalUsed: 1875000000,     // RM 1.875 billion
  remaining: 625000000,      // RM 625 million
  projectedDepletionDate: '15/03/2024',
  monthlyBurnRate: 208333333 // RM 208.3 million per month
}

export const kpiData = {
  activeCards: 45678,
  suspendedCards: 1234,
  activeOrganisations: 156,
  totalOrganisations: 162,
  complianceScore: 94.5,
  suspiciousTransactions: 23,
  apiHealthScore: 98.2
}

export const serviceProviderData = [
  { 
    provider: 'Petronas', 
    subsidyUsage: 445.2, 
    transactions: 12450, 
    fuelCardsDistributed: 8950,
    apiHealth: 98.5 
  },
  { 
    provider: 'Shell', 
    subsidyUsage: 312.8, 
    transactions: 9876, 
    fuelCardsDistributed: 6780,
    apiHealth: 97.2 
  },
  { 
    provider: 'Caltex', 
    subsidyUsage: 278.5, 
    transactions: 8234, 
    fuelCardsDistributed: 5920,
    apiHealth: 96.8 
  },
  { 
    provider: 'Petron', 
    subsidyUsage: 198.7, 
    transactions: 6543, 
    fuelCardsDistributed: 4350,
    apiHealth: 95.1 
  }
]

export const organisationEnrollment = [
  { organisation: 'Tesla Inc', serviceProvider: 'Petronas', fleets: 45, vehicles: 180, sector: 'Technology' },
  { organisation: 'Superlorry Sdn Bhd', serviceProvider: 'Shell', fleets: 38, vehicles: 152, sector: 'Logistics' },
  { organisation: 'MYHaulage Berhad', serviceProvider: 'Caltex', fleets: 52, vehicles: 208, sector: 'Transport' },
  { organisation: 'EcoTrans Logistics', serviceProvider: 'Petron', fleets: 29, vehicles: 116, sector: 'Logistics' },
  { organisation: 'Jaya Movers', serviceProvider: 'Petronas', fleets: 33, vehicles: 132, sector: 'Moving Services' },
  { organisation: 'BumiFleet Sdn Bhd', serviceProvider: 'Shell', fleets: 41, vehicles: 164, sector: 'Fleet Management' },
  { organisation: 'LajuTransport Berhad', serviceProvider: 'Caltex', fleets: 47, vehicles: 188, sector: 'Public Transport' }
]

export const anomalies = [
  {
    id: 'AN001',
    organisation: 'Tesla Inc',
    serviceProvider: 'Petronas',
    vehicleId: 'WXX 1234',
    type: 'Unusual Fuel Consumption',
    severity: 'High',
    timestamp: '21/08/2024 14:30',
    description: 'Vehicle consumed 150% more fuel than average',
    status: 'Investigating'
  },
  {
    id: 'AN002',
    organisation: 'Superlorry Sdn Bhd',
    serviceProvider: 'Shell',
    vehicleId: 'JKB 5567',
    type: 'Location Anomaly',
    severity: 'Medium',
    timestamp: '21/08/2024 13:15',
    description: 'Refueling outside designated route',
    status: 'Unresolved'
  },
  {
    id: 'AN003',
    organisation: 'MYHaulage Berhad',
    serviceProvider: 'Caltex',
    vehicleId: 'SGF 8901',
    type: 'Time Pattern Anomaly',
    severity: 'Low',
    timestamp: '21/08/2024 12:45',
    description: 'Refueling at unusual hours',
    status: 'Resolved'
  }
]

export const transactionHistory = [
  {
    id: 'TXN001',
    cardId: 'FC-001234',
    vehicleId: 'WXX 1234',
    organisation: 'Tesla Inc',
    serviceProvider: 'Petronas',
    station: 'Petronas Subang Jaya',
    amount: 125.50,
    liters: 45.2,
    timestamp: '21/08/2024 14:30',
    status: 'Approved'
  },
  {
    id: 'TXN002',
    cardId: 'FC-005678',
    vehicleId: 'JKB 5567',
    organisation: 'Superlorry Sdn Bhd',
    serviceProvider: 'Shell',
    station: 'Shell KLCC',
    amount: 89.75,
    liters: 32.3,
    timestamp: '21/08/2024 13:45',
    status: 'Flagged'
  },
  {
    id: 'TXN003',
    cardId: 'FC-009012',
    vehicleId: 'SGF 8901',
    organisation: 'MYHaulage Berhad',
    serviceProvider: 'Caltex',
    station: 'Caltex Bangsar',
    amount: 156.20,
    liters: 56.1,
    timestamp: '21/08/2024 12:20',
    status: 'Approved'
  }
]

export const fleetData = [
  {
    id: 'FL001',
    organisation: 'Tesla Inc',
    serviceProvider: 'Petronas',
    vehicleCount: 180,
    activeCards: 175,
    monthlyConsumption: 45678.90,
    complianceScore: 96.5,
    lastUpdate: '21/08/2024 15:30'
  },
  {
    id: 'FL002',
    organisation: 'Superlorry Sdn Bhd',
    serviceProvider: 'Shell',
    vehicleCount: 152,
    activeCards: 148,
    monthlyConsumption: 38945.20,
    complianceScore: 92.1,
    lastUpdate: '21/08/2024 15:25'
  },
  {
    id: 'FL003',
    organisation: 'MYHaulage Berhad',
    serviceProvider: 'Caltex',
    vehicleCount: 208,
    activeCards: 202,
    monthlyConsumption: 52341.75,
    complianceScore: 98.2,
    lastUpdate: '21/08/2024 15:20'
  }
]

export const apiHealthData = [
  { service: 'Petronas API', status: 'Online', latency: 45, uptime: 99.9 },
  { service: 'Shell API', status: 'Online', latency: 52, uptime: 99.7 },
  { service: 'Caltex API', status: 'Warning', latency: 125, uptime: 98.5 },
  { service: 'Petron API', status: 'Online', latency: 38, uptime: 99.8 }
]
