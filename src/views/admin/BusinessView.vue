<template>
  <div>
    <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text mb-6">Business Analytics</h1>

    <!-- Period selector -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button v-for="p in periods" :key="p.id" @click="activePeriod = p.id"
        class="px-4 py-2 rounded-full text-xs font-medium transition-colors"
        :class="activePeriod === p.id ? 'bg-admin-accent text-white' : 'bg-white border border-admin-border text-admin-text-secondary hover:border-admin-accent'"
      >{{ p.label }}</button>
    </div>

    <!-- Metrics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      <div v-for="m in metrics" :key="m.label" class="metric-card">
        <p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">{{ m.label }}</p>
        <p class="text-xl font-bold text-admin-text">{{ m.value }}</p>
        <p v-if="m.change" class="text-[10px] mt-1" :class="m.positive ? 'text-admin-success' : 'text-admin-danger'">
          {{ m.positive ? '↑' : '↓' }} {{ m.change }}
        </p>
      </div>
    </div>

    <!-- Top Products -->
    <h2 class="font-serif font-semibold text-admin-text text-lg mb-3">Top Products</h2>
    <div class="card-admin overflow-hidden mb-8">
      <div v-for="(p, i) in topProducts" :key="p.name" class="flex items-center gap-3 px-4 py-3 border-b border-admin-border last:border-b-0">
        <span class="w-6 h-6 rounded-full bg-brand-blush flex items-center justify-center text-xs font-bold text-brand-burgundy shrink-0">{{ i + 1 }}</span>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-admin-text truncate">{{ p.name }}</p>
          <p class="text-xs text-admin-text-secondary">{{ p.orders }} orders</p>
        </div>
        <span class="text-sm font-semibold text-admin-text shrink-0">{{ formatCurrency(p.revenue) }}</span>
      </div>
    </div>

    <!-- Insight -->
    <div class="card-admin p-4 sm:p-5 border-l-4 border-l-admin-success">
      <p class="text-sm text-admin-text">
        <span class="font-semibold">Good news!</span> Sales increased by ₹5,200 compared with last month. Muttā Mittai continues to be the best seller.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { formatCurrency } from '../../services/format.js'

const activePeriod = ref('month')
const periods = [
  { id: 'today', label: 'Today' }, { id: 'week', label: 'This Week' },
  { id: 'month', label: 'This Month' }, { id: 'custom', label: 'Custom' },
]

const metrics = computed(() => [
  { label: 'Sales', value: formatCurrency(28500), change: '₹5,200 vs last month', positive: true },
  { label: 'Orders', value: '47', change: '12 more orders', positive: true },
  { label: 'Est. Product Cost', value: formatCurrency(9975), change: null },
  { label: 'Est. Profit', value: formatCurrency(12825), change: '₹2,100 vs last month', positive: true },
])

const topProducts = [
  { name: 'Muttā Mittai', orders: 22, revenue: 7700 },
  { name: 'Rasmali Tres Leches', orders: 15, revenue: 1800 },
  { name: 'Fudge Brownie', orders: 18, revenue: 900 },
  { name: 'Red Velvet Brownie', orders: 12, revenue: 840 },
  { name: 'Mango Milk', orders: 10, revenue: 400 },
]
</script>
