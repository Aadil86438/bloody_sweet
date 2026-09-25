<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text">Stock</h1>
      <button @click="showAddForm = true" class="btn-primary text-xs self-start"><Plus :size="14" /> Add Stock</button>
    </div>

    <div class="space-y-2">
      <div v-for="item in stock" :key="item.id" class="card-admin flex items-center gap-3 px-4 py-3">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-admin-text">{{ item.name }}</p>
          <p class="text-xs text-admin-text-secondary">{{ item.current_stock }} {{ item.unit }} • Min: {{ item.min_level }} {{ item.unit }}</p>
        </div>
        <span class="badge text-[10px]" :class="item.status === 'low' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'">
          {{ item.status === 'low' ? 'LOW' : 'OK' }}
        </span>
      </div>
    </div>

    <!-- Add Stock Modal -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="showAddForm" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div class="absolute inset-0 bg-black/40" @click="showAddForm = false"></div>
          <div class="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-sm p-6 safe-bottom animate-slide-up">
            <h3 class="font-serif font-bold text-lg mb-4">Add Stock</h3>
            <div class="space-y-3">
              <div><label class="input-label">Item Name</label><input v-model="newStock.name" class="input-field" placeholder="e.g. Milk" /></div>
              <div class="grid grid-cols-2 gap-3">
                <div><label class="input-label">Quantity</label><input v-model.number="newStock.quantity" type="number" class="input-field" /></div>
                <div><label class="input-label">Unit</label><input v-model="newStock.unit" class="input-field" placeholder="kg, L, pcs" /></div>
              </div>
              <div><label class="input-label">Purchase Cost (₹)</label><input v-model.number="newStock.cost" type="number" class="input-field" /></div>
              <button @click="addStock" class="btn-primary w-full text-xs">Add Stock Entry</button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus } from 'lucide-vue-next'
import { demoStock } from '../../services/mockData.js'
import { useUiStore } from '../../stores/ui.js'

const ui = useUiStore()
const stock = ref([...demoStock])
const showAddForm = ref(false)
const newStock = reactive({ name: '', quantity: 0, unit: '', cost: 0 })

function addStock() {
  if (!newStock.name || !newStock.quantity) return
  const existing = stock.value.find(s => s.name.toLowerCase() === newStock.name.toLowerCase())
  if (existing) {
    existing.current_stock += newStock.quantity
    existing.status = existing.current_stock >= existing.min_level ? 'ok' : 'low'
  } else {
    stock.value.push({ id: `stk-${Date.now()}`, name: newStock.name, current_stock: newStock.quantity, unit: newStock.unit, min_level: 5, status: 'ok' })
  }
  ui.showToast(`Stock updated: ${newStock.name}`)
  showAddForm.value = false
  Object.assign(newStock, { name: '', quantity: 0, unit: '', cost: 0 })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
