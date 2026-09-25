<template>
  <div class="min-h-screen bg-brand-ivory">
    <div class="container-narrow section-padding text-center">
      <!-- Success icon -->
      <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
        <CheckCircle :size="40" class="text-green-500" />
      </div>

      <h1 class="font-serif font-bold text-2xl sm:text-3xl text-brand-cocoa mb-2">Order Received!</h1>
      <p class="text-brand-cocoa-light text-sm sm:text-base mb-2">Thank you for choosing BLOODY Sweet.</p>
      <p v-if="order" class="text-xs text-brand-cocoa-light mb-8">
        Order <span class="font-semibold text-brand-burgundy">{{ order.order_number }}</span>
      </p>

      <!-- Order details -->
      <div v-if="order" class="card max-w-lg mx-auto text-left p-5 sm:p-6 mb-8">
        <h2 class="font-serif font-semibold text-brand-cocoa mb-4">Order Details</h2>
        <div class="space-y-3 text-sm">
          <div v-for="item in order.items" :key="item.product_name" class="flex justify-between gap-4">
            <div class="min-w-0">
              <p class="font-medium text-brand-cocoa truncate">{{ item.product_name }}</p>
              <p v-if="item.variant_name" class="text-xs text-brand-cocoa-light">{{ item.variant_name }}</p>
            </div>
            <div class="text-right shrink-0">
              <p class="text-brand-cocoa">× {{ item.quantity }}</p>
              <p class="text-xs text-brand-cocoa-light">{{ formatCurrency(item.unit_price * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <div class="border-t border-brand-cream mt-4 pt-4 space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-brand-cocoa-light">Subtotal</span>
            <span class="font-medium">{{ formatCurrency(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between font-bold text-brand-cocoa text-base">
            <span>Total</span>
            <span class="text-brand-burgundy">{{ formatCurrency(order.total) }}</span>
          </div>
        </div>

        <div class="border-t border-brand-cream mt-4 pt-4 space-y-2 text-sm text-brand-cocoa-light">
          <div class="flex justify-between"><span>Customer</span><span class="text-brand-cocoa">{{ order.customer_name }}</span></div>
          <div class="flex justify-between"><span>Phone</span><span class="text-brand-cocoa">{{ order.customer_phone }}</span></div>
          <div class="flex justify-between"><span>Type</span><span class="text-brand-cocoa capitalize">{{ order.delivery_type }}</span></div>
          <div v-if="order.address" class="flex justify-between"><span>Address</span><span class="text-brand-cocoa text-right max-w-[60%]">{{ order.address }}</span></div>
          <div class="flex justify-between"><span>Status</span><span class="text-green-600 font-medium capitalize">{{ order.status }}</span></div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <button v-if="order" @click="downloadInvoice" class="btn-primary text-xs flex-1 flex items-center justify-center gap-2">
          <Download :size="16" /> Download PDF Receipt
        </button>
        <button @click="whatsappUs" class="btn-whatsapp flex-1 text-xs">
          <MessageCircle :size="16" /> WhatsApp Us
        </button>
        <router-link to="/menu" class="btn-secondary text-xs">
          Continue Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle, MessageCircle, Download } from 'lucide-vue-next'
import { formatCurrency } from '../../services/format.js'
import { openWhatsAppContact } from '../../services/whatsapp.js'
import { downloadOrderPDF } from '../../services/pdf.js'

const route = useRoute()

const order = computed(() => {
  const orders = JSON.parse(localStorage.getItem('bs_orders') || '[]')
  return orders.find(o => o.id === route.params.id || o.order_number === route.params.id) || null
})

function whatsappUs() { openWhatsAppContact() }
function downloadInvoice() {
  if (order.value) {
    downloadOrderPDF(order.value)
  }
}
</script>
