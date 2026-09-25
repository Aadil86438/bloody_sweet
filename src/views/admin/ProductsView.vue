<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text">Products</h1>
    </div>

    <div v-if="products.length > 0" class="space-y-2">
      <div v-for="p in products" :key="p.id"
        class="card-admin flex items-center gap-3 sm:gap-4 px-4 py-3"
      >
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-brand bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
          <img v-if="p.image" :src="p.image" :alt="p.name" class="w-full h-full object-cover" />
          <Package v-else :size="18" class="text-admin-text-secondary/30" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <p class="text-sm font-medium text-admin-text truncate">{{ p.name }}</p>
            <span v-if="p.is_signature" class="badge-signature text-[9px]">Signature</span>
            <span v-if="p.is_trending" class="badge-trending text-[9px]">Trending</span>
          </div>
          <p class="text-xs text-admin-text-secondary">{{ getCategoryName(p.category_id) }} • {{ formatCurrency(p.price) }}</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <button @click="toggleAvailable(p)" class="p-2 rounded-brand transition-colors"
            :class="p.is_available ? 'text-admin-success hover:bg-green-50' : 'text-admin-danger hover:bg-red-50'"
            :title="p.is_available ? 'Available' : 'Out of stock'"
          >
            <Eye v-if="p.is_available" :size="16" />
            <EyeOff v-else :size="16" />
          </button>
          <button @click="toggleTrending(p)" class="p-2 rounded-brand hover:bg-gray-100 transition-colors"
            :class="p.is_trending ? 'text-admin-accent' : 'text-admin-text-secondary/40'"
            title="Toggle trending"
          >
            <TrendingUp :size="16" />
          </button>
        </div>
      </div>
    </div>

    <div v-else class="card-admin p-12 text-center">
      <Package :size="40" class="text-admin-text-secondary/20 mx-auto mb-3" />
      <p class="text-sm text-admin-text-secondary">No products yet. Add your first product.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Package, Eye, EyeOff, TrendingUp } from 'lucide-vue-next'
import { useProductsStore } from '../../stores/products.js'
import { useUiStore } from '../../stores/ui.js'
import { formatCurrency } from '../../services/format.js'

const productsStore = useProductsStore()
const ui = useUiStore()

const products = computed(() => productsStore.products)

function getCategoryName(catId) {
  return productsStore.categories.find(c => c.id === catId)?.name || ''
}

function toggleAvailable(p) {
  productsStore.updateProduct(p.id, { is_available: !p.is_available })
  ui.showToast(p.is_available ? `${p.name} marked out of stock` : `${p.name} marked available`)
}

function toggleTrending(p) {
  productsStore.updateProduct(p.id, { is_trending: !p.is_trending })
  ui.showToast(p.is_trending ? `${p.name} removed from trending` : `${p.name} marked as trending`)
}
</script>
