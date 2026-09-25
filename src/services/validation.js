/**
 * Validation utilities
 * Centralized form validation
 */

export const validators = {
  required(value, fieldName = 'This field') {
    if (value === null || value === undefined) return `${fieldName} is required`
    if (typeof value === 'string' && !value.trim()) return `${fieldName} is required`
    return null
  },

  phone(value) {
    if (!value) return null
    const clean = value.replace(/[^0-9+]/g, '')
    if (clean.length < 10) return 'Please enter a valid phone number'
    if (clean.length > 13) return 'Phone number is too long'
    return null
  },

  email(value) {
    if (!value) return null
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return null
  },

  minLength(value, min, fieldName = 'This field') {
    if (!value) return null
    if (value.length < min) return `${fieldName} must be at least ${min} characters`
    return null
  },

  maxLength(value, max, fieldName = 'This field') {
    if (!value) return null
    if (value.length > max) return `${fieldName} must be no more than ${max} characters`
    return null
  },

  positiveNumber(value, fieldName = 'Value') {
    if (value === null || value === undefined || value === '') return null
    const num = Number(value)
    if (isNaN(num)) return `${fieldName} must be a number`
    if (num < 0) return `${fieldName} cannot be negative`
    return null
  },

  price(value) {
    if (value === null || value === undefined || value === '') return 'Price is required'
    const num = Number(value)
    if (isNaN(num)) return 'Price must be a valid number'
    if (num < 0) return 'Price cannot be negative'
    return null
  },

  quantity(value) {
    if (value === null || value === undefined || value === '') return 'Quantity is required'
    const num = Number(value)
    if (isNaN(num) || !Number.isInteger(num)) return 'Quantity must be a whole number'
    if (num <= 0) return 'Quantity must be greater than 0'
    return null
  },

  fileSize(file, maxSizeMB = 5) {
    if (!file) return null
    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > maxSizeMB) return `File size must be less than ${maxSizeMB}MB`
    return null
  },

  fileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) {
    if (!file) return null
    if (!allowedTypes.includes(file.type)) {
      return `Allowed file types: ${allowedTypes.map(t => t.split('/')[1].toUpperCase()).join(', ')}`
    }
    return null
  },

  date(value) {
    if (!value) return null
    const date = new Date(value)
    if (isNaN(date.getTime())) return 'Please enter a valid date'
    return null
  },

  futureDate(value) {
    if (!value) return null
    const date = new Date(value)
    if (isNaN(date.getTime())) return 'Please enter a valid date'
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return 'Date must be in the future'
    return null
  },
}

/**
 * Validate a form object against rules
 * @param {Object} data - Form data
 * @param {Object} rules - Validation rules { fieldName: [validatorFn, ...] }
 * @returns {{ valid: boolean, errors: Object }}
 */
export function validateForm(data, rules) {
  const errors = {}
  let valid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const rule of fieldRules) {
      const error = rule(data[field])
      if (error) {
        errors[field] = error
        valid = false
        break
      }
    }
  }

  return { valid, errors }
}
