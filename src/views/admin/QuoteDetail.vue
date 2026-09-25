<template>
  <div>
    <button @click="$router.push('/admin/quotes')" class="btn-ghost text-xs mb-4"><ArrowLeft :size="14" /> Back to Quotes</button>
    <div v-if="quote">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="font-serif font-bold text-xl text-admin-text">{{ quote.quote_number }}</h1>
          <p class="text-xs text-admin-text-secondary">{{ formatDateTime(quote.created_at) }}</p>
        </div>
        <span class="badge self-start" :class="qStatusClass(quote.status)">{{ quote.status }}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="lg:col-span-2 space-y-4">
          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Request Details</h2>
            <dl class="space-y-2 text-sm">
              <div class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Type</dt><dd class="text-admin-text capitalize">{{ quote.request_type }}</dd></div>
              <div class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Quantity</dt><dd class="text-admin-text">{{ quote.quantity }}</dd></div>
              <div v-if="quote.event_date" class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Event Date</dt><dd class="text-admin-text">{{ formatDate(quote.event_date) }}</dd></div>
              <div v-if="quote.budget" class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Budget</dt><dd class="text-admin-text">{{ quote.budget }}</dd></div>
              <div v-if="quote.location" class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Location</dt><dd class="text-admin-text">{{ quote.location }}</dd></div>
              <div v-if="quote.requirements" class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Requirements</dt><dd class="text-admin-text">{{ quote.requirements }}</dd></div>
              <div v-if="quote.message" class="flex gap-2"><dt class="text-admin-text-secondary w-28 shrink-0">Message</dt><dd class="text-admin-text italic">{{ quote.message }}</dd></div>
            </dl>
          </div>

          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Your Quote</h2>
            <div class="space-y-3">
              <div>
                <label class="input-label">Quoted Amount</label>
                <input v-model.number="quotedAmount" type="number" class="input-field" placeholder="Enter amount" />
              </div>
              <div>
                <label class="input-label">Owner Notes</label>
                <textarea v-model="ownerNotes" rows="3" class="input-field" placeholder="Internal notes..."></textarea>
              </div>
              <button @click="saveQuote" class="btn-primary text-xs">Save & Update Quote</button>
            </div>
          </div>

          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Update Status</h2>
            <div class="flex flex-wrap gap-2">
              <button v-for="s in statuses" :key="s" @click="updateStatus(s)"
                class="px-3 py-1.5 text-xs rounded-brand border font-medium transition-all"
                :class="quote.status === s ? 'border-admin-accent bg-admin-accent text-white' : 'border-admin-border text-admin-text-secondary hover:border-admin-accent'"
              >{{ s }}</button>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Customer</h2>
            <div class="space-y-2 text-sm">
              <p class="font-medium text-admin-text">{{ quote.customer_name }}</p>
              <p class="text-admin-text-secondary">{{ quote.customer_phone }}</p>
              <p v-if="quote.customer_email" class="text-admin-text-secondary">{{ quote.customer_email }}</p>
            </div>
          </div>
          <button @click="whatsappCustomer" class="btn-whatsapp w-full text-xs"><MessageCircle :size="14" />WhatsApp Customer</button>
          <button @click="convertToOrder" class="btn-primary w-full text-xs">Convert to Order</button>
        </div>
      </div>
    </div>
    <div v-else class="card-admin p-12 text-center">
      <p class="text-admin-text-secondary">Quote not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, MessageCircle } from 'lucide-vue-next'
import { demoQuotes } from '../../services/mockData.js'
import { formatCurrency, formatDateTime, formatDate } from '../../services/format.js'
import { createWhatsAppURL } from '../../services/whatsapp.js'
import { useUiStore } from '../../stores/ui.js'

const route = useRoute()
const router = useRouter()
const ui = useUiStore()
const statuses = ['new', 'contacted', 'quoted', 'accepted', 'declined', 'converted_to_order']

const quote = computed(() => {
  const stored = JSON.parse(localStorage.getItem('bs_quotes') || '[]')
  return [...demoQuotes, ...stored].find(q => q.id === route.params.id) || null
})

const quotedAmount = ref(quote.value?.quoted_amount || null)
const ownerNotes = ref(quote.value?.owner_notes || '')

function qStatusClass(s) {
  const c = { new: 'bg-blue-50 text-blue-700', contacted: 'bg-amber-50 text-amber-700', quoted: 'bg-purple-50 text-purple-700', accepted: 'bg-green-50 text-green-700', declined: 'bg-red-50 text-red-700', converted_to_order: 'bg-green-100 text-green-800' }
  return c[s] || 'bg-gray-100 text-gray-600'
}

function saveQuote() {
  if (quote.value) { quote.value.quoted_amount = quotedAmount.value; quote.value.owner_notes = ownerNotes.value; ui.showToast('Quote updated') }
}

function updateStatus(s) {
  if (quote.value) { quote.value.status = s; ui.showToast(`Quote marked as ${s}`) }
}

function whatsappCustomer() {
  if (!quote.value) return
  const msg = `Hello ${quote.value.customer_name},\n\nRegarding your quote request ${quote.value.quote_number}:\n\n${quotedAmount.value ? `Our quoted amount: ${formatCurrency(quotedAmount.value)}` : 'We are reviewing your request.'}\n\nThank you,\nBLOODY Sweet by fafa`
  const url = createWhatsAppURL(msg, `91${quote.value.customer_phone}`)
  if (url) window.open(url, '_blank')
}

function convertToOrder() {
  if (!quote.value) return
  const orderNum = `BS-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
  const order = {
    id: orderNum, order_number: orderNum, customer_name: quote.value.customer_name,
    customer_phone: quote.value.customer_phone, delivery_type: 'pickup', address: quote.value.location || '',
    requested_date: quote.value.event_date || '', notes: quote.value.requirements,
    items: [{ product_name: quote.value.request_type, variant_name: null, quantity: 1, unit_price: quotedAmount.value || 0 }],
    subtotal: quotedAmount.value || 0, delivery_fee: 0, total: quotedAmount.value || 0,
    status: 'confirmed', payment_status: 'pending', created_at: new Date().toISOString(),
  }
  const orders = JSON.parse(localStorage.getItem('bs_orders') || '[]')
  orders.push(order)
  localStorage.setItem('bs_orders', JSON.stringify(orders))
  quote.value.status = 'converted_to_order'
  ui.showToast('Quote converted to order!')
  router.push(`/admin/orders/${orderNum}`)
}
</script>
