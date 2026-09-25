/**
 * WhatsApp Utility Service — BLOODY Sweet by fafa
 * Premium, high-converting pre-filled WhatsApp templates
 */

const BRAND_NAME = 'BLOODY Sweet by fafa'
const BRAND_PHONE = '8643839796'
const STORE_URL = 'https://bloody-sweet.vercel.app'

export function getWhatsAppNumber() {
  return import.meta.env.VITE_WHATSAPP_NUMBER || '918643839796'
}

export function createWhatsAppURL(message, phoneNumber = null) {
  const phone = phoneNumber || getWhatsAppNumber()
  if (!phone) return null
  const cleanPhone = phone.replace(/[^0-9]/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

export function openWhatsApp(message) {
  const url = createWhatsAppURL(message)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }
  return false
}

/**
 * High-Converting General Contact Inquiry
 */
export function openWhatsAppContact() {
  const msg = `👋 *Hello BLOODY Sweet by fafa!*

I visited your official store website (${STORE_URL}) and would like to know more about your fresh handcrafted sweets, Tres Leches cakes, and catering services.

📌 *Store Contact:* ${BRAND_PHONE} (Manager: Saleem Basha)

Please share your latest daily availability & recommendations. Thank you!`

  return openWhatsApp(msg)
}

/**
 * Executive Order Message for Cart Checkout
 */
export function createOrderMessage(items, total = null, deliveryType = 'Pickup') {
  let message = `🛒 *NEW ORDER REQUEST — ${BRAND_NAME}*\n\n`
  message += `Hello Saleem Bhai! I would like to place an order from your website:\n\n`
  message += `📋 *ORDER ITEMS:*\n`

  items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.productName}*`
    if (item.variantName) message += ` (${item.variantName})`
    message += ` × ${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}\n`
  })

  if (total !== null) {
    message += `\n💰 *Total Amount:* ₹${Number(total).toLocaleString('en-IN')}\n`
  }
  message += `📦 *Order Type:* ${deliveryType.toUpperCase()}\n`
  message += `\nPlease confirm availability and delivery/pickup details.\n\nThank you!`
  return message
}

/**
 * Single Product Quick Order Message
 */
export function createProductOrderMessage(product, variant = null, quantity = 1) {
  const price = variant ? variant.price : product.price
  const total = price * quantity

  let message = `🍰 *QUICK ORDER — ${BRAND_NAME}*\n\n`
  message += `Hello! I would like to order directly from your store:\n\n`
  message += `✨ *Product:* ${product.name}\n`
  if (variant) message += `🏷️ *Size / Option:* ${variant.name}\n`
  message += `🔢 *Quantity:* ${quantity}\n`
  message += `💵 *Total Amount:* ₹${total.toLocaleString('en-IN')}\n\n`
  message += `Please confirm availability and dispatch details. Thank you!`
  return message
}

/**
 * Catering & Event Quote WhatsApp Inquiry
 */
export function createCateringQuoteMessage(details = {}) {
  let message = `👑 *CATERING & PARTY QUOTE INQUIRY — ${BRAND_NAME}*\n\n`
  message += `Hello Saleem Bhai! I would like to request a custom catering quote for an upcoming event:\n\n`
  if (details.requestType) message += `🎉 *Occasion:* ${details.requestType.toUpperCase()}\n`
  if (details.date) message += `📅 *Event Date:* ${details.date}\n`
  if (details.quantity) message += `👥 *Guests / Quantity:* ${details.quantity}\n`
  if (details.budget) message += `💰 *Budget Target:* ${details.budget}\n`
  if (details.requirements) message += `📝 *Requirements:* ${details.requirements}\n`
  message += `\nPlease provide your platter options & estimate. Thank you!`
  return message
}
