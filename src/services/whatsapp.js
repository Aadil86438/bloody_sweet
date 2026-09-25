/**
 * WhatsApp utility service
 * Centralizes all WhatsApp message generation and URL creation
 */

const BRAND_NAME = 'BLOODY Sweet by fafa'

/**
 * Get the configured WhatsApp number
 */
export function getWhatsAppNumber() {
  return import.meta.env.VITE_WHATSAPP_NUMBER || '918643839796'
}

/**
 * Generate a WhatsApp URL with a prefilled message
 */
export function createWhatsAppURL(message, phoneNumber = null) {
  const phone = phoneNumber || getWhatsAppNumber()
  if (!phone) {
    console.warn('WhatsApp number not configured')
    return null
  }
  
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

/**
 * Generate a prefilled order message for WhatsApp
 */
export function createOrderMessage(items, total = null) {
  let message = `Hello ${BRAND_NAME},\n\nI'd like to order:\n\n`

  items.forEach(item => {
    message += `${item.productName}`
    if (item.variantName) message += ` — ${item.variantName}`
    message += ` × ${item.quantity}\n`
  })

  if (total !== null) {
    message += `\nEstimated total: ${formatCurrency(total)}\n`
  }

  message += `\nPlease confirm availability and delivery/pickup details.\n\nThank you.`
  return message
}

/**
 * Generate a single product WhatsApp order message
 */
export function createProductOrderMessage(product, variant = null, quantity = 1) {
  let message = `Hello ${BRAND_NAME},\n\nI'd like to order:\n\n`
  message += product.name
  if (variant) message += ` — ${variant.name}`
  message += ` × ${quantity}\n`
  
  const price = variant ? variant.price : product.price
  const total = Math.round(price * quantity * 100) / 100
  message += `\nEstimated total: ${formatCurrency(total)}\n`
  message += `\nPlease confirm availability and delivery/pickup details.\n\nThank you.`
  return message
}

/**
 * Open WhatsApp with a message
 */
export function openWhatsApp(message) {
  const url = createWhatsAppURL(message)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }
  return false
}

/**
 * Quick WhatsApp contact
 */
export function openWhatsAppContact() {
  return openWhatsApp(`Hello ${BRAND_NAME},\n\nI'd like to know more about your products and services.\n\nThank you.`)
}

function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}
