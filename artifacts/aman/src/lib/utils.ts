import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('ar-SA', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date(dateString))
}

export function formatTime(dateString: string) {
  return new Intl.DateTimeFormat('ar-SA', {
    timeStyle: 'short'
  }).format(new Date(dateString))
}
