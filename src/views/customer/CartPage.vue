<template>
  <div class="min-h-screen bg-brand-ivory">
    <div class="container-content section-padding">
      <h1 class="font-serif text-2xl sm:text-3xl text-brand-cocoa mb-8 text-center">Your Cart</h1>

      <div v-if="cart.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cart.items" :key="item.id"
            class="card p-4 sm:p-5 flex gap-4"
          >
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-brand bg-brand-cream shrink-0 overflow-hidden flex items-center justify-center">
              <img v-if="item.productImage" :src="item.productImage" :alt="item.productName" class="w-full h-full object-cover" />
              <Package v-else :size="24" class="text-brand-cocoa-light/30" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between gap-2">
                <div class="min-w-0">
                  <h3 class="font-serif font-semibold text-brand-cocoa text-sm sm:text-base truncate">{{ item.productName }}</h3>
                  <p v-if="item.variantName" class="text-xs text-brand-cocoa-light mt-0.5">{{ item.variantName }}</p>
                </div>
                <button @click="cart.removeItem(item.id)" class="shrink-0 p-1 text-brand-cocoa-light/50 hover:text-red-500 transition-colors" aria-label="Remove">
                  <Trash2 :size="16" />
                </button>
              </div>
              <div class="flex items-center justify-between mt-3">
                <div class="flex items-center gap-2">
                  <button @click="cart.updateQuantity(item.id, item.quantity - 1)"
                    class="w-8 h-8 rounded-full border border-brand-cream flex items-center justify-center hover:border-brand-burgundy transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus :size="14" />
                  </button>
                  <span class="text-sm font-medium w-6 text-center">{{ item.quantity }}</span>
                  <button @click="cart.updateQuantity(item.id, item.quantity + 1)"
                    class="w-8 h-8 rounded-full border border-brand-cream flex items-center justify-center hover:border-brand-burgundy transition-colors"
                    aria-label="Increase"
                  >
                    <Plus :size="14" />
                  </button>
                </div>
                <span class="font-semibold text-brand-burgundy text-sm">{{ formatCurrency(item.price * item.quantity) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="card p-5 sm:p-6 sticky top-24">
            <h3 class="font-serif font-semibold text-brand-cocoa text-lg mb-4">Order Summary</h3>
            <div class="space-y-3 text-sm border-b border-brand-cream pb-4 mb-4">
              <div class="flex justify-between">
                <span class="text-brand-cocoa-light">Subtotal</span>
                <span class="font-medium text-brand-cocoa">{{ formatCurrency(cart.subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-cocoa-light">Delivery</span>
                <span class="text-brand-cocoa-light text-xs">Calculated at checkout</span>
              </div>
            </div>
            <div class="flex justify-between text-lg font-bold text-brand-cocoa mb-6">
              <span>Total</span>
              <span class="text-brand-burgundy">{{ formatCurrency(cart.subtotal) }}</span>
            </div>

            <!-- Order form -->
            <div class="space-y-4">
              <div>
                <label class="input-label">Your Name *</label>
                <input v-model="form.name" type="text" class="input-field" placeholder="Enter your name" />
                <p v-if="errors.name" class="input-error">{{ errors.name }}</p>
              </div>
              <div>
                <label class="input-label">Phone Number *</label>
                <input v-model="form.phone" type="tel" class="input-field" placeholder="Your phone number" />
                <p v-if="errors.phone" class="input-error">{{ errors.phone }}</p>
              </div>
              <div>
                <label class="input-label">Delivery Type *</label>
                <div class="flex gap-2">
                  <button @click="form.deliveryType = 'pickup'"
                    class="flex-1 px-4 py-2.5 rounded-brand border text-sm font-medium transition-all"
                    :class="form.deliveryType === 'pickup' ? 'border-brand-burgundy bg-brand-burgundy text-white' : 'border-brand-cream bg-white text-brand-cocoa hover:border-brand-burgundy'"
                  >
                    Pickup
                  </button>
                  <button @click="form.deliveryType = 'delivery'"
                    class="flex-1 px-4 py-2.5 rounded-brand border text-sm font-medium transition-all"
                    :class="form.deliveryType === 'delivery' ? 'border-brand-burgundy bg-brand-burgundy text-white' : 'border-brand-cream bg-white text-brand-cocoa hover:border-brand-burgundy'"
                  >
                    Delivery
                  </button>
                </div>
              </div>
              <div v-if="form.deliveryType === 'delivery'">
                <label class="input-label">Delivery Address *</label>
                <textarea v-model="form.address" rows="2" class="input-field" placeholder="Enter delivery address"></textarea>
                <p v-if="errors.address" class="input-error">{{ errors.address }}</p>
              </div>
              <div>
                <label class="input-label">Preferred Date</label>
                <input v-model="form.date" type="date" class="input-field" />
              </div>
              <div>
                <label class="input-label">Notes</label>
                <textarea v-model="form.notes" rows="2" class="input-field" placeholder="Any special instructions..."></textarea>
              </div>

              <button @click="placeOrder" :disabled="submitting"
                class="btn-primary w-full text-xs sm:text-sm"
              >
                <Loader2 v-if="submitting" :size="16" class="animate-spin" />
                {{ submitting ? 'Placing Order...' : 'Place Order' }}
              </button>
              <button @click="orderOnWhatsApp" class="btn-whatsapp w-full text-xs sm:text-sm">
                <MessageCircle :size="16" />
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty cart -->
      <div v-else class="text-center py-16">
        <ShoppingBag :size="56" class="text-brand-cocoa-light/15 mx-auto mb-4" />
        <h2 class="font-serif text-xl text-brand-cocoa mb-2">Your cart is empty</h2>
        <p class="text-sm text-brand-cocoa-light mb-6">Explore our menu and add something delicious.</p>
        <router-link to="/menu" class="btn-primary text-xs">Explore Menu</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Package, Minus, Plus, Trash2, ShoppingBag, MessageCircle, Loader2 } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'
import { formatCurrency } from '../../services/format.js'
import { createOrderMessage, openWhatsApp } from '../../services/whatsapp.js'
import { validators, validateForm } from '../../services/validation.js'
import { dataService } from '../../services/dataService.js'

const router = useRouter()
const cart = useCartStore()
const ui = useUiStore()

const form = reactive({
  name: '', phone: '', deliveryType: 'pickup', address: '', date: '', notes: '',
})
const errors = reactive({})
const submitting = ref(false)

function validate() {
  const rules = {
    name: [v => validators.required(v, 'Name')],
    phone: [v => validators.required(v, 'Phone'), v => validators.phone(v)],
  }
  if (form.deliveryType === 'delivery') {
    rules.address = [v => validators.required(v, 'Address')]
  }
  const result = validateForm(form, rules)
  Object.keys(errors).forEach(k => delete errors[k])
  Object.assign(errors, result.errors)
  return result.valid
}

async function placeOrder() {
  if (!validate() || submitting.value) return
  submitting.value = true

  try {
    const orderNumber = `BS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
    
    const order = {
      id: orderNumber,
      order_number: orderNumber,
      customer_name: form.name,
      customer_phone: form.phone,
      delivery_type: form.deliveryType,
      address: form.address,
      requested_date: form.date,
      notes: form.notes,
      items: cart.items.map(i => ({
        product_name: i.productName,
        variant_name: i.variantName,
        quantity: i.quantity,
        unit_price: i.price,
      })),
      subtotal: cart.subtotal,
      total: cart.total,
      status: 'new',
      payment_status: 'pending',
      created_at: new Date().toISOString(),
    }
    
    await dataService.createOrder(order)
    cart.clearCart()
    router.push({ name: 'order-confirmation', params: { id: orderNumber } })
  } catch {
    ui.showToast('Something went wrong. Please try again.', 'error')
  } finally {
    submitting.value = false
  }
}

function orderOnWhatsApp() {
  const message = createOrderMessage(cart.items, cart.total)
  openWhatsApp(message)
}
</script>
