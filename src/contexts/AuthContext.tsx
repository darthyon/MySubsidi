import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User, UserRole, AuthContextType } from '@/types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock user data based on role
    const mockUsers: Record<UserRole, User> = {
      government: {
        id: '1',
        email: email,
        name: 'Ahmad Rahman',
        role: 'government',
        organization: 'Ministry of Domestic Trade and Cost of Living (KPDN)'
      },
      service_provider: {
        id: '2',
        email: email,
        name: 'Sarah Lee',
        role: 'service_provider',
        organization: 'Petronas Dagangan Berhad'
      },
      organisation: {
        id: '3',
        email: email,
        name: 'Michael Tan',
        role: 'organisation',
        organization: 'Tesla Inc Malaysia'
      }
    }
    
    setUser(mockUsers[role])
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
