<template>
  <div>
    <button @click="$router.push('/admin/orders')" class="btn-ghost text-xs mb-4"><ArrowLeft :size="14" /> Back to Orders</button>
    <div v-if="order">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 class="font-serif font-bold text-xl text-admin-text">{{ order.order_number }}</h1>
          <p class="text-xs text-admin-text-secondary">{{ formatDateTime(order.created_at) }}</p>
        </div>
        <span class="badge self-start" :class="statusClass(order.status)">{{ order.status }}</span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="lg:col-span-2 space-y-4">
          <!-- Items -->
          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Order Items</h2>
            <div class="space-y-3">
              <div v-for="item in order.items" :key="item.product_name" class="flex justify-between gap-3 text-sm">
                <div class="min-w-0">
                  <p class="font-medium text-admin-text">{{ item.product_name }}</p>
                  <p v-if="item.variant_name" class="text-xs text-admin-text-secondary">{{ item.variant_name }}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-admin-text">× {{ item.quantity }}</p>
                  <p class="text-xs text-admin-text-secondary">{{ formatCurrency(item.unit_price * item.quantity) }}</p>
                </div>
              </div>
            </div>
            <div class="border-t border-admin-border mt-4 pt-3 space-y-1 text-sm">
              <div class="flex justify-between"><span class="text-admin-text-secondary">Subtotal</span><span>{{ formatCurrency(order.subtotal) }}</span></div>
              <div v-if="order.delivery_fee" class="flex justify-between"><span class="text-admin-text-secondary">Delivery</span><span>{{ formatCurrency(order.delivery_fee) }}</span></div>
              <div class="flex justify-between font-bold text-base"><span>Total</span><span class="text-admin-accent">{{ formatCurrency(order.total) }}</span></div>
            </div>
          </div>

          <!-- Update Status -->
          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Update Status</h2>
            <div class="flex flex-wrap gap-2">
              <button v-for="s in statuses" :key="s" @click="updateStatus(s)"
                class="px-3 py-1.5 text-xs rounded-brand border font-medium transition-all"
                :class="order.status === s ? 'border-admin-accent bg-admin-accent text-white' : 'border-admin-border text-admin-text-secondary hover:border-admin-accent'"
              >{{ s }}</button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-4">
          <div class="card-admin p-4 sm:p-5">
            <h2 class="font-semibold text-admin-text text-sm mb-3">Customer</h2>
            <div class="space-y-2 text-sm">
              <p class="text-admin-text font-medium">{{ order.customer_name }}</p>
              <p class="text-admin-text-secondary">{{ order.customer_phone }}</p>
              <p class="text-admin-text-secondary capitalize">{{ order.delivery_type }}</p>
              <p v-if="order.address" class="text-admin-text-secondary">{{ order.address }}</p>
              <p v-if="order.notes" class="text-admin-text-secondary italic text-xs mt-2 bg-gray-50 p-2 rounded">{{ order.notes }}</p>
            </div>
          </div>
          <div class="space-y-2">
            <button @click="whatsappCustomer" class="btn-whatsapp w-full text-xs"><MessageCircle :size="14" />WhatsApp Customer</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="card-admin p-12 text-center">
      <p class="text-admin-text-secondary">Order not found.</p>
      <router-link to="/admin/orders" class="btn-ghost text-xs mt-4">Back to Orders</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, MessageCircle } from 'lucide-vue-next'
import { demoOrders } from '../../services/mockData.js'
import { formatCurrency, formatDateTime } from '../../services/format.js'
import { createWhatsAppURL } from '../../services/whatsapp.js'
import { useUiStore } from '../../stores/ui.js'

const route = useRoute()
const ui = useUiStore()
const statuses = ['new', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']

const order = computed(() => {
  const stored = JSON.parse(localStorage.getItem('bs_orders') || '[]')
  const all = [...demoOrders, ...stored]
  return all.find(o => o.id === route.params.id) || null
})

function statusClass(status) {
  const c = { new: 'bg-blue-50 text-blue-700', confirmed: 'bg-green-50 text-green-700', preparing: 'bg-amber-50 text-amber-700', ready: 'bg-purple-50 text-purple-700', completed: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-50 text-red-700' }
  return c[status] || ''
}

function updateStatus(s) {
  if (order.value) { order.value.status = s; ui.showToast(`Order marked as ${s}`) }
}

function whatsappCustomer() {
  if (!order.value) return
  const msg = `Hello ${order.value.customer_name},\n\nRegarding your order ${order.value.order_number}:\n\nYour order is currently: ${order.value.status}\n\nThank you,\nBLOODY Sweet by fafa`
  const url = createWhatsAppURL(msg, `91${order.value.customer_phone}`)
  if (url) window.open(url, '_blank')
}
</script>
