<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text">Money</h1>
      <button @click="showAddExpense = true" class="btn-primary text-xs self-start"><Plus :size="14" /> Add Expense</button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      <div class="metric-card"><p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">Sales</p><p class="text-xl font-bold text-admin-success">{{ formatCurrency(totalSales) }}</p></div>
      <div class="metric-card"><p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">Est. Product Cost</p><p class="text-xl font-bold text-admin-text">{{ formatCurrency(estCost) }}</p></div>
      <div class="metric-card"><p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">Expenses</p><p class="text-xl font-bold text-admin-danger">{{ formatCurrency(totalExpenses) }}</p></div>
      <div class="metric-card"><p class="text-xs text-admin-text-secondary uppercase tracking-wider mb-1">Est. Profit</p><p class="text-xl font-bold" :class="estProfit >= 0 ? 'text-admin-success' : 'text-admin-danger'">{{ formatCurrency(estProfit) }}</p><p class="text-[10px] text-admin-text-secondary mt-1">estimated</p></div>
    </div>

    <!-- Recent Expenses -->
    <h2 class="font-serif font-semibold text-admin-text text-lg mb-3">Recent Expenses</h2>
    <div class="space-y-2">
      <div v-for="exp in expenses" :key="exp.id" class="card-admin flex items-center gap-3 px-4 py-3">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-admin-text">{{ exp.description }}</p>
          <p class="text-xs text-admin-text-secondary">{{ exp.category }} • {{ formatDate(exp.date) }} • {{ exp.payment_method }}</p>
        </div>
        <span class="font-semibold text-sm text-admin-danger shrink-0">-{{ formatCurrency(exp.amount) }}</span>
      </div>
    </div>

    <!-- Add Expense Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="showAddExpense" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div class="absolute inset-0 bg-black/40" @click="showAddExpense = false"></div>
          <div class="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-sm p-6 safe-bottom animate-slide-up max-h-[85vh] overflow-y-auto">
            <h3 class="font-serif font-bold text-lg mb-4">Add Expense</h3>
            <div class="space-y-3">
              <div><label class="input-label">Category</label>
                <select v-model="newExpense.category" class="input-field">
                  <option value="">Select category</option>
                  <option v-for="c in expenseCategories" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
              <div><label class="input-label">Amount (₹)</label><input v-model.number="newExpense.amount" type="number" class="input-field" /></div>
              <div><label class="input-label">Date</label><input v-model="newExpense.date" type="date" class="input-field" /></div>
              <div><label class="input-label">Payment Method</label>
                <select v-model="newExpense.payment_method" class="input-field">
                  <option value="cash">Cash</option><option value="upi">UPI</option><option value="card">Card</option><option value="bank">Bank Transfer</option>
                </select>
              </div>
              <div><label class="input-label">Description</label><textarea v-model="newExpense.description" rows="2" class="input-field" placeholder="What was this expense for?"></textarea></div>
              <button @click="addExpense" class="btn-primary w-full text-xs">Add Expense</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import { demoOrders, demoExpenses } from '../../services/mockData.js'
import { formatCurrency, formatDate } from '../../services/format.js'
import { useUiStore } from '../../stores/ui.js'

const ui = useUiStore()
const expenses = ref([...demoExpenses])
const showAddExpense = ref(false)
const expenseCategories = ['Ingredients', 'Packaging', 'Delivery', 'Electricity', 'Rent', 'Marketing', 'Equipment', 'Other']

const allOrders = computed(() => {
  const stored = JSON.parse(localStorage.getItem('bs_orders') || '[]')
  return [...demoOrders, ...stored]
})

const totalSales = computed(() => allOrders.value.reduce((s, o) => s + (o.total || 0), 0))
const estCost = computed(() => Math.round(totalSales.value * 0.35))
const totalExpenses = computed(() => expenses.value.reduce((s, e) => s + (e.amount || 0), 0))
const estProfit = computed(() => totalSales.value - estCost.value - totalExpenses.value)

const newExpense = reactive({ category: '', amount: 0, date: new Date().toISOString().split('T')[0], payment_method: 'cash', description: '' })

function addExpense() {
  if (!newExpense.category || !newExpense.amount) return
  expenses.value.unshift({ id: `exp-${Date.now()}`, ...JSON.parse(JSON.stringify(newExpense)), created_at: new Date().toISOString() })
  ui.showToast('Expense added')
  showAddExpense.value = false
  Object.assign(newExpense, { category: '', amount: 0, date: new Date().toISOString().split('T')[0], payment_method: 'cash', description: '' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
