import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    const millions = amount / 1000000
    if (millions >= 10) {
      return `RM ${millions.toFixed(0)}mil`
    } else {
      return `RM ${millions.toFixed(2)}mil`
    }
  } else if (amount >= 1000) {
    const thousands = amount / 1000
    if (thousands >= 10) {
      return `RM ${thousands.toFixed(0)}K`
    } else {
      return `RM ${thousands.toFixed(2)}K`
    }
  } else if (amount >= 100) {
    return `RM ${amount.toFixed(0)}`
  } else if (amount >= 1) {
    return `RM ${amount.toFixed(2)}`
  } else {
    return `RM ${amount.toFixed(2)}`
  }
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
