/**
 * Calculation utilities
 * All monetary calculations use integer arithmetic (paise/cents) to avoid float errors
 */

/**
 * Safe multiply for currency (avoids floating point)
 */
export function safeMultiply(price, quantity) {
  const pricePaise = Math.round(price * 100)
  return Math.round(pricePaise * quantity) / 100
}

/**
 * Safe add for currency
 */
export function safeAdd(...values) {
  const totalPaise = values.reduce((sum, v) => sum + Math.round((v || 0) * 100), 0)
  return totalPaise / 100
}

/**
 * Calculate line item total
 */
export function calculateLineTotal(price, quantity, discount = 0) {
  const subtotal = safeMultiply(price, quantity)
  if (discount > 0) {
    const discountAmount = safeMultiply(subtotal, discount / 100)
    return safeAdd(subtotal, -discountAmount)
  }
  return subtotal
}

/**
 * Calculate order totals
 */
export function calculateOrderTotals(items, deliveryFee = 0, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => {
    return safeAdd(sum, safeMultiply(item.price, item.quantity))
  }, 0)

  let discountAmount = 0
  if (discountPercent > 0) {
    discountAmount = safeMultiply(subtotal, discountPercent / 100)
  }

  const total = safeAdd(subtotal, -discountAmount, deliveryFee)

  return {
    subtotal,
    discountAmount,
    deliveryFee,
    total: Math.max(0, total),
  }
}

/**
 * Calculate estimated product cost
 */
export function calculateEstimatedCost(recipe, ingredientCosts) {
  if (!recipe || !recipe.items || !ingredientCosts) return 0

  return recipe.items.reduce((sum, item) => {
    const unitCost = ingredientCosts[item.ingredientId] || 0
    return safeAdd(sum, safeMultiply(unitCost, item.quantity))
  }, 0)
}

/**
 * Calculate estimated profit
 */
export function calculateEstimatedProfit(revenue, cost) {
  return safeAdd(revenue, -cost)
}

/**
 * Calculate profit margin percentage
 */
export function calculateMargin(revenue, cost) {
  if (!revenue || revenue === 0) return 0
  return Math.round(((revenue - cost) / revenue) * 10000) / 100
}
