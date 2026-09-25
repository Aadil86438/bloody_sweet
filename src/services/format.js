/**
 * Formatting utilities
 * Centralized formatting for currency, dates, phone numbers
 */

/**
 * Format currency in INR
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0'
  return `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
}

/**
 * Format date to readable string
 */
export function formatDate(dateStr, options = {}) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  })
}

/**
 * Format date with time
 */
export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(dateStr)
}

/**
 * Format phone number for display
 */
export function formatPhone(phone) {
  if (!phone) return ''
  const clean = phone.replace(/[^0-9+]/g, '')
  if (clean.startsWith('+91') && clean.length === 13) {
    return `+91 ${clean.slice(3, 8)} ${clean.slice(8)}`
  }
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`
  }
  return clean
}

/**
 * Format order number
 */
export function formatOrderNumber(num) {
  if (!num) return ''
  return String(num).toUpperCase()
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Generate a slug from a string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Generate a unique ID
 */
export function generateId(prefix = '') {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  return prefix ? `${prefix}-${id}` : id
}
