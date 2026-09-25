<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text">Orders</h1>
      <div class="flex items-center gap-2 flex-wrap">
        <select v-model="filterStatus" class="input-field text-xs py-2 w-auto">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div class="relative flex-1 min-w-[200px]">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-secondary/50" />
          <input v-model="searchQuery" type="text" placeholder="Search orders..." class="input-field text-xs py-2 pl-9" />
        </div>
      </div>
    </div>

    <!-- Desktop Table -->
    <div v-if="filteredOrders.length > 0" class="hidden md:block card-admin overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-admin-border">
            <th class="text-left px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider">Order</th>
            <th class="text-left px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider">Customer</th>
            <th class="text-left px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider hidden lg:table-cell">Items</th>
            <th class="text-right px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider">Amount</th>
            <th class="text-center px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider">Status</th>
            <th class="text-right px-4 py-3 text-xs text-admin-text-secondary font-medium uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id" 
            @click="$router.push(`/admin/orders/${order.id}`)"
            class="border-b border-admin-border last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td class="px-4 py-3 font-mono text-xs text-admin-accent">{{ order.order_number }}</td>
            <td class="px-4 py-3">
              <p class="font-medium text-admin-text">{{ order.customer_name }}</p>
              <p class="text-xs text-admin-text-secondary">{{ order.customer_phone }}</p>
            </td>
            <td class="px-4 py-3 hidden lg:table-cell text-xs text-admin-text-secondary">
              {{ order.items?.length || 0 }} item{{ (order.items?.length || 0) !== 1 ? 's' : '' }}
            </td>
            <td class="px-4 py-3 text-right font-semibold text-admin-text">{{ formatCurrency(order.total) }}</td>
            <td class="px-4 py-3 text-center">
              <span class="badge text-[10px]" :class="statusClass(order.status)">{{ order.status }}</span>
            </td>
            <td class="px-4 py-3 text-right text-xs text-admin-text-secondary whitespace-nowrap">{{ formatRelativeTime(order.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div v-if="filteredOrders.length > 0" class="md:hidden space-y-2">
      <router-link v-for="order in filteredOrders" :key="order.id" :to="`/admin/orders/${order.id}`"
        class="card-admin flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-mono text-admin-accent">{{ order.order_number }}</span>
            <span class="badge text-[9px]" :class="statusClass(order.status)">{{ order.status }}</span>
          </div>
          <p class="text-sm font-medium text-admin-text truncate">{{ order.customer_name }}</p>
          <p class="text-[10px] text-admin-text-secondary">{{ order.items?.length || 0 }} items • {{ formatRelativeTime(order.created_at) }}</p>
        </div>
        <span class="font-semibold text-sm text-admin-text shrink-0">{{ formatCurrency(order.total) }}</span>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-if="filteredOrders.length === 0" class="card-admin p-12 text-center">
      <ShoppingBag :size="40" class="text-admin-text-secondary/20 mx-auto mb-3" />
      <p class="text-sm text-admin-text-secondary">No orders found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, ShoppingBag } from 'lucide-vue-next'
import { formatCurrency, formatRelativeTime } from '../../services/format.js'
import { dataService } from '../../services/dataService.js'

const filterStatus = ref('')
const searchQuery = ref('')
const rawOrders = ref([])

onMounted(async () => {
  rawOrders.value = await dataService.getOrders()
})

const filteredOrders = computed(() => {
  let orders = rawOrders.value
  if (filterStatus.value) orders = orders.filter(o => o.status === filterStatus.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    orders = orders.filter(o =>
      o.order_number?.toLowerCase().includes(q) ||
      o.customer_name?.toLowerCase().includes(q) ||
      o.customer_phone?.includes(q)
    )
  }
  return orders
})

function statusClass(status) {
  const classes = { new: 'bg-blue-50 text-blue-700', confirmed: 'bg-green-50 text-green-700', preparing: 'bg-amber-50 text-amber-700', ready: 'bg-purple-50 text-purple-700', completed: 'bg-gray-100 text-gray-600', cancelled: 'bg-red-50 text-red-700' }
  return classes[status] || 'bg-gray-100 text-gray-600'
}
</script>
