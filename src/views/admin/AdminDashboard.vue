<template>
  <div>
    <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text mb-6">Dashboard</h1>

    <!-- Today's Metrics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      <div v-for="metric in todayMetrics" :key="metric.label" class="metric-card">
        <p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">{{ metric.label }}</p>
        <p class="text-xl sm:text-2xl font-bold" :class="metric.color || 'text-admin-text'">{{ metric.value }}</p>
        <p v-if="metric.sub" class="text-[10px] text-admin-text-secondary mt-1">{{ metric.sub }}</p>
      </div>
    </div>

    <!-- Needs Attention -->
    <div v-if="alerts.length > 0" class="mb-8">
      <h2 class="font-serif font-semibold text-admin-text text-lg mb-3">Needs Attention</h2>
      <div class="space-y-2">
        <div v-for="alert in alerts" :key="alert.text" 
          class="card-admin flex items-center gap-3 px-4 py-3 text-sm"
          :class="alert.urgent ? 'border-l-4 border-l-admin-warning' : ''"
        >
          <component :is="alert.icon" :size="18" class="shrink-0" :class="alert.iconClass" />
          <span class="text-admin-text">{{ alert.text }}</span>
        </div>
      </div>
    </div>

    <!-- Today's Orders -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-serif font-semibold text-admin-text text-lg">Today's Orders</h2>
        <router-link to="/admin/orders" class="text-xs text-admin-accent hover:underline">View all →</router-link>
      </div>
      <div v-if="todayOrders.length > 0" class="space-y-2">
        <router-link v-for="order in todayOrders" :key="order.id" :to="`/admin/orders/${order.id}`"
          class="card-admin flex items-center gap-3 sm:gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-xs font-mono text-admin-text-secondary">{{ order.order_number }}</span>
              <span class="badge text-[9px]" :class="statusClass(order.status)">{{ order.status }}</span>
            </div>
            <p class="text-sm font-medium text-admin-text truncate">{{ order.customer_name }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-sm font-bold text-admin-text">{{ formatCurrency(order.total) }}</p>
            <p class="text-[10px] text-admin-text-secondary">{{ formatRelativeTime(order.created_at) }}</p>
          </div>
        </router-link>
      </div>
      <div v-else class="card-admin p-8 text-center">
        <ShoppingBag :size="32" class="text-admin-text-secondary/20 mx-auto mb-2" />
        <p class="text-sm text-admin-text-secondary">No orders today yet.</p>
      </div>
    </div>

    <!-- Business Snapshot -->
    <div>
      <h2 class="font-serif font-semibold text-admin-text text-lg mb-3">Business Snapshot</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div v-for="snap in snapshotMetrics" :key="snap.label" class="metric-card">
          <p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">{{ snap.label }}</p>
          <p class="text-lg font-bold text-admin-text">{{ snap.value }}</p>
          <p v-if="snap.change" class="text-[10px] mt-1"
            :class="snap.changeUp ? 'text-admin-success' : 'text-admin-danger'"
          >
            {{ snap.changeUp ? '↑' : '↓' }} {{ snap.change }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ShoppingBag, AlertTriangle, Package } from 'lucide-vue-next'
import { demoOrders, demoQuotes, demoExpenses, demoStock } from '../../services/mockData.js'
import { formatCurrency, formatRelativeTime } from '../../services/format.js'

const allOrders = computed(() => {
  const stored = JSON.parse(localStorage.getItem('bs_orders') || '[]')
  return [...demoOrders, ...stored]
})

const todayOrders = computed(() => allOrders.value.slice(0, 5))

const todayMetrics = computed(() => {
  const totalSales = allOrders.value.reduce((s, o) => s + (o.total || 0), 0)
  return [
    { label: "Today's Sales", value: formatCurrency(totalSales), color: 'text-admin-success' },
    { label: "Today's Orders", value: allOrders.value.length, color: 'text-admin-text' },
    { label: 'Est. Product Cost', value: formatCurrency(Math.round(totalSales * 0.35)), color: 'text-admin-text', sub: 'estimated' },
    { label: 'Est. Profit', value: formatCurrency(Math.round(totalSales * 0.45)), color: 'text-admin-success', sub: 'estimated' },
  ]
})

const alerts = computed(() => {
  const items = []
  const newOrders = allOrders.value.filter(o => o.status === 'new')
  if (newOrders.length > 0) {
    items.push({ text: `${newOrders.length} new order${newOrders.length > 1 ? 's' : ''} awaiting confirmation`, icon: ShoppingBag, iconClass: 'text-admin-warning', urgent: true })
  }
  const allQuotes = [...demoQuotes, ...JSON.parse(localStorage.getItem('bs_quotes') || '[]')]
  const newQuotes = allQuotes.filter(q => q.status === 'new')
  if (newQuotes.length > 0) {
    items.push({ text: `${newQuotes.length} new quote request${newQuotes.length > 1 ? 's' : ''}`, icon: AlertTriangle, iconClass: 'text-admin-info', urgent: false })
  }
  const lowStock = demoStock.filter(s => s.status === 'low')
  if (lowStock.length > 0) {
    items.push({ text: `${lowStock.map(s => s.name).join(', ')} running low`, icon: Package, iconClass: 'text-admin-danger', urgent: true })
  }
  return items
})

const snapshotMetrics = computed(() => [
  { label: 'Sales This Month', value: formatCurrency(28500), change: '₹5,200 vs last month', changeUp: true },
  { label: 'Orders This Month', value: '47', change: '12 more', changeUp: true },
  { label: 'Est. Profit', value: formatCurrency(12800), change: '₹2,100 vs last month', changeUp: true },
  { label: 'Avg Order Value', value: formatCurrency(606), change: '₹45 higher', changeUp: true },
])

function statusClass(status) {
  const classes = {
    new: 'bg-blue-50 text-blue-700',
    confirmed: 'bg-green-50 text-green-700',
    preparing: 'bg-amber-50 text-amber-700',
    ready: 'bg-purple-50 text-purple-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-50 text-red-700',
  }
  return classes[status] || 'bg-gray-100 text-gray-600'
}
</script>
