export type UserRole = 'government' | 'service_provider' | 'organisation'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organization: string
  avatar?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isLoading: boolean
}
