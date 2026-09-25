<template>
  <div class="card group cursor-pointer" @click="goToProduct">
    <!-- Image -->
    <div class="relative aspect-square bg-brand-cream overflow-hidden">
      <img v-if="product.image" :src="product.image" :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      <div v-else class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <Cherry :size="32" class="text-brand-burgundy/15 mx-auto mb-2" />
          <p class="text-xs text-brand-cocoa-light/40 font-serif italic">Photo coming soon</p>
        </div>
      </div>
      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5">
        <span v-if="product.is_signature" class="badge-signature text-[10px] px-2 py-0.5">Signature</span>
        <span v-if="product.is_trending" class="badge-trending text-[10px] px-2 py-0.5">Trending</span>
      </div>
      <!-- Quick add (desktop hover) -->
      <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
        <button @click.stop="handleAddToCart" class="btn-primary w-full text-[11px] py-2.5">
          <Plus :size="14" />
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Info -->
    <div class="p-3 sm:p-4">
      <p v-if="categoryName" class="text-[10px] uppercase tracking-wider text-brand-cocoa-light mb-1">{{ categoryName }}</p>
      <h3 class="font-serif font-semibold text-brand-cocoa text-sm sm:text-card-title leading-snug line-clamp-2 mb-1">
        {{ product.name }}
      </h3>
      <p v-if="product.description" class="text-xs text-brand-cocoa-light line-clamp-2 mb-3 leading-relaxed">
        {{ product.description }}
      </p>
      <div class="flex items-end justify-between gap-2">
        <div>
          <span class="text-brand-burgundy font-bold text-sm sm:text-base">{{ formatCurrency(displayPrice) }}</span>
          <span v-if="product.variants && product.variants.length > 1" class="text-[10px] text-brand-cocoa-light ml-1">onwards</span>
        </div>
        <!-- Mobile add button -->
        <button @click.stop="handleAddToCart"
          class="sm:hidden w-9 h-9 rounded-full bg-brand-burgundy text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
          aria-label="Add to cart"
        >
          <Plus :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Cherry } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart.js'
import { useProductsStore } from '../../stores/products.js'
import { useUiStore } from '../../stores/ui.js'
import { formatCurrency } from '../../services/format.js'

const props = defineProps({
  product: { type: Object, required: true },
})

const router = useRouter()
const cart = useCartStore()
const productsStore = useProductsStore()
const ui = useUiStore()

const categoryName = computed(() => {
  const cat = productsStore.categories.find(c => c.id === props.product.category_id)
  return cat?.name || ''
})

const displayPrice = computed(() => {
  if (props.product.variants && props.product.variants.length > 0) {
    return Math.min(...props.product.variants.map(v => v.price))
  }
  return props.product.price
})

function goToProduct() {
  router.push({ name: 'product', params: { slug: props.product.slug } })
}

function handleAddToCart() {
  const variant = props.product.variants?.length === 1 ? props.product.variants[0] : null
  cart.addItem(props.product, variant)
  cart.openCart()
  ui.showToast(`${props.product.name} added to cart`)
}
</script>
