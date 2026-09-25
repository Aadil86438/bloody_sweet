<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text">Quotes</h1>
      <div class="flex items-center gap-2">
        <select v-model="filterStatus" class="input-field text-xs py-2 w-auto">
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>
    </div>

    <div v-if="filteredQuotes.length > 0" class="space-y-2">
      <router-link v-for="q in filteredQuotes" :key="q.id" :to="`/admin/quotes/${q.id}`"
        class="card-admin flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
      >
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-0.5">
            <span class="text-xs font-mono text-admin-accent">{{ q.quote_number }}</span>
            <span class="badge text-[9px]" :class="qStatusClass(q.status)">{{ q.status }}</span>
          </div>
          <p class="text-sm font-medium text-admin-text truncate">{{ q.customer_name }}</p>
          <p class="text-xs text-admin-text-secondary">{{ q.request_type }} • {{ q.quantity }}</p>
        </div>
        <div class="text-right shrink-0">
          <p v-if="q.quoted_amount" class="font-semibold text-admin-text">{{ formatCurrency(q.quoted_amount) }}</p>
          <p v-else class="text-xs text-admin-text-secondary">Not quoted</p>
          <p class="text-[10px] text-admin-text-secondary">{{ formatRelativeTime(q.created_at) }}</p>
        </div>
      </router-link>
    </div>

    <div v-else class="card-admin p-12 text-center">
      <MessageSquareQuote :size="40" class="text-admin-text-secondary/20 mx-auto mb-3" />
      <p class="text-sm text-admin-text-secondary">No quote requests yet.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MessageSquareQuote } from 'lucide-vue-next'
import { demoQuotes } from '../../services/mockData.js'
import { formatCurrency, formatRelativeTime } from '../../services/format.js'

const filterStatus = ref('')

const allQuotes = computed(() => {
  const stored = JSON.parse(localStorage.getItem('bs_quotes') || '[]')
  return [...demoQuotes, ...stored].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
})

const filteredQuotes = computed(() => {
  if (!filterStatus.value) return allQuotes.value
  return allQuotes.value.filter(q => q.status === filterStatus.value)
})

function qStatusClass(s) {
  const c = { new: 'bg-blue-50 text-blue-700', contacted: 'bg-amber-50 text-amber-700', quoted: 'bg-purple-50 text-purple-700', accepted: 'bg-green-50 text-green-700', declined: 'bg-red-50 text-red-700', converted_to_order: 'bg-green-100 text-green-800' }
  return c[s] || 'bg-gray-100 text-gray-600'
}
</script>
