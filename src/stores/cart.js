import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('bs_cart') || '[]'))
  const isOpen = ref(false)

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + Math.round(item.price * item.quantity * 100) / 100
    }, 0)
  })

  const deliveryFee = ref(0)

  const total = computed(() => Math.round((subtotal.value + deliveryFee.value) * 100) / 100)

  function addItem(product, variant = null, quantity = 1) {
    const existingIndex = items.value.findIndex(
      item => item.productId === product.id && item.variantId === (variant?.id || null)
    )

    if (existingIndex > -1) {
      items.value[existingIndex].quantity += quantity
    } else {
      items.value.push({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        variantId: variant?.id || null,
        variantName: variant?.name || null,
        price: variant?.price || product.price,
        quantity,
        slug: product.slug,
      })
    }
    saveToStorage()
  }

  function updateQuantity(itemId, quantity) {
    const item = items.value.find(i => i.id === itemId)
    if (item) {
      if (quantity <= 0) {
        removeItem(itemId)
      } else {
        item.quantity = quantity
        saveToStorage()
      }
    }
  }

  function removeItem(itemId) {
    items.value = items.value.filter(i => i.id !== itemId)
    saveToStorage()
  }

  function clearCart() {
    items.value = []
    saveToStorage()
  }

  function openCart() { isOpen.value = true }
  function closeCart() { isOpen.value = false }
  function toggleCart() { isOpen.value = !isOpen.value }

  function saveToStorage() {
    localStorage.setItem('bs_cart', JSON.stringify(items.value))
  }

  return {
    items, isOpen, itemCount, subtotal, deliveryFee, total,
    addItem, updateQuantity, removeItem, clearCart,
    openCart, closeCart, toggleCart,
  }
})
