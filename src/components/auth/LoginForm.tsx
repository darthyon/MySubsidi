import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/types/auth'
import { Shield, Building2, Truck } from 'lucide-react'

const roleConfig = {
  government: {
    label: 'Government Official',
    icon: Shield,
    description: 'Track subsidy usage'
  },
  service_provider: {
    label: 'Service Provider',
    icon: Building2,
    description: 'Fuel station operators'
  },
  organisation: {
    label: 'Organisation',
    icon: Truck,
    description: 'Logistic companies'
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('government')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password, selectedRole)
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Image */}
      <div className="hidden lg:block relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/18942492/pexels-photo-18942492.jpeg"
          alt="Logistics truck on highway"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20" />
        
        {/* Title moved to top left */}
        <div className="absolute top-6 left-6 text-white">
          <div className="flex items-center mb-2">
            <Shield className="h-6 w-6 mr-2 text-blue-400 fill-blue-400" />
            <h1 className="text-2xl font-bold">MySubsidi Portal</h1>
          </div>
          <p className="text-sm opacity-90">Malaysia's Digital Fuel Subsidy Management System</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex flex-col space-y-2 text-center mb-6">
            <h2 className="text-4xl font-bold tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <Card className="w-full border-0 shadow-none">
            <CardHeader className="space-y-1 pb-4">
              <h3 className="text-lg font-semibold">Sign in to your account</h3>
              <CardDescription>
                Choose your role and enter your credentials below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Role Selection - 3x1 Grid (3 roles in single row) */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select your role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(roleConfig).map(([role, config]) => {
                    const IconComponent = config.icon
                    const isSelected = selectedRole === role
                    return (
                      <div
                        key={role}
                        className={`relative flex flex-col cursor-pointer select-none items-center rounded-lg border p-3 transition-all hover:bg-accent text-center ${
                          isSelected
                            ? 'border-primary bg-accent'
                            : 'border-border'
                        }`}
                        onClick={() => setSelectedRole(role as UserRole)}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg mb-2 ${
                          isSelected 
                            ? 'bg-primary' 
                            : 'bg-gray-100'
                        }`}>
                          <IconComponent className={`h-4 w-4 ${
                            isSelected 
                              ? 'text-white' 
                              : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="text-xs font-medium mb-1">{config.label}</div>
                        <div className="text-xs text-muted-foreground leading-tight">{config.description}</div>
                        <div className={`absolute top-2 right-2 h-3 w-3 rounded-full border ${
                          isSelected
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}>
                          {isSelected && (
                            <div className="h-full w-full rounded-full bg-white scale-50" />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-9"
                  />
                  <div className="flex justify-end">
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full h-9 mt-4" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full h-9">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
          </Card>

          <p className="px-2 text-center text-xs text-muted-foreground mt-4">
            By signing in, you agree to our{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
