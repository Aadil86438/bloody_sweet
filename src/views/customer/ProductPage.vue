<template>
  <div class="min-h-screen bg-brand-ivory">
    <div v-if="product" class="container-content section-padding">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-xs text-brand-cocoa-light mb-6 flex-wrap">
        <router-link to="/" class="hover:text-brand-burgundy transition-colors">Home</router-link>
        <ChevronRight :size="12" />
        <router-link to="/menu" class="hover:text-brand-burgundy transition-colors">Menu</router-link>
        <ChevronRight :size="12" />
        <span class="text-brand-cocoa font-medium">{{ product.name }}</span>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Image -->
        <div class="aspect-square bg-brand-cream rounded-brand-lg overflow-hidden">
          <img v-if="product.image" :src="product.image" :alt="product.name"
            class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center">
            <div class="text-center">
              <Cherry :size="48" class="text-brand-burgundy/10 mx-auto mb-3" />
              <p class="text-sm text-brand-cocoa-light/40 font-serif italic">Photo coming soon</p>
            </div>
          </div>
        </div>

        <!-- Details -->
        <div class="flex flex-col">
          <div class="flex flex-wrap gap-2 mb-3">
            <span v-if="product.is_signature" class="badge-signature">Signature</span>
            <span v-if="product.is_trending" class="badge-trending">Trending</span>
          </div>

          <h1 class="font-serif font-bold text-2xl sm:text-3xl text-brand-cocoa mb-2">{{ product.name }}</h1>
          <p v-if="categoryName" class="text-xs uppercase tracking-wider text-brand-cocoa-light mb-4">{{ categoryName }}</p>
          <p class="text-brand-cocoa-light text-sm sm:text-base leading-relaxed mb-6">{{ product.description }}</p>

          <!-- Variants -->
          <div v-if="product.variants && product.variants.length > 0" class="mb-6">
            <label class="input-label">Select Variant</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="variant in product.variants" :key="variant.id"
                @click="selectedVariant = variant"
                class="px-4 py-2.5 rounded-brand border text-sm font-medium transition-all"
                :class="selectedVariant?.id === variant.id
                  ? 'border-brand-burgundy bg-brand-burgundy text-white'
                  : 'border-brand-cream bg-white text-brand-cocoa hover:border-brand-burgundy'"
              >
                {{ variant.name }} — {{ formatCurrency(variant.price) }}
              </button>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-6">
            <span class="text-2xl font-bold text-brand-burgundy">{{ formatCurrency(currentPrice) }}</span>
          </div>

          <!-- Quantity -->
          <div class="mb-6">
            <label class="input-label">Quantity</label>
            <div class="flex items-center gap-3">
              <button @click="quantity = Math.max(1, quantity - 1)"
                class="w-10 h-10 rounded-brand border border-brand-cream flex items-center justify-center hover:border-brand-burgundy transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus :size="16" />
              </button>
              <span class="text-lg font-semibold text-brand-cocoa w-8 text-center">{{ quantity }}</span>
              <button @click="quantity++"
                class="w-10 h-10 rounded-brand border border-brand-cream flex items-center justify-center hover:border-brand-burgundy transition-colors"
                aria-label="Increase quantity"
              >
                <Plus :size="16" />
              </button>
            </div>
          </div>

          <!-- Availability -->
          <div v-if="!product.is_available" class="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-brand text-sm text-red-700">
            Currently unavailable
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 mt-auto pt-4">
            <button @click="addToCart" :disabled="!product.is_available"
              class="btn-primary flex-1 text-xs sm:text-sm">
              <ShoppingBag :size="16" />
              Add to Order
            </button>
            <button @click="orderOnWhatsApp" class="btn-whatsapp flex-1 text-xs sm:text-sm">
              <MessageCircle :size="16" />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0" class="mt-16">
        <h2 class="font-serif text-xl sm:text-2xl text-brand-cocoa text-center mb-8">You might also like</h2>
        <div class="product-grid">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="container-content section-padding text-center">
      <Cherry :size="48" class="text-brand-cocoa-light/20 mx-auto mb-4" />
      <h1 class="font-serif text-2xl text-brand-cocoa mb-2">Product not found</h1>
      <p class="text-brand-cocoa-light text-sm mb-6">The product you're looking for doesn't exist.</p>
      <router-link to="/menu" class="btn-primary text-xs">Back to Menu</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Cherry, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-vue-next'
import ProductCard from '../../components/product/ProductCard.vue'
import { useProductsStore } from '../../stores/products.js'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'
import { formatCurrency } from '../../services/format.js'
import { createProductOrderMessage, openWhatsApp } from '../../services/whatsapp.js'

const route = useRoute()
const productsStore = useProductsStore()
const cart = useCartStore()
const ui = useUiStore()

const quantity = ref(1)
const selectedVariant = ref(null)

const product = computed(() => productsStore.getProductBySlug(route.params.slug))

const categoryName = computed(() => {
  if (!product.value) return ''
  const cat = productsStore.categories.find(c => c.id === product.value.category_id)
  return cat?.name || ''
})

const currentPrice = computed(() => {
  if (selectedVariant.value) return selectedVariant.value.price
  return product.value?.price || 0
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.availableProducts
    .filter(p => p.category_id === product.value.category_id && p.id !== product.value.id)
    .slice(0, 4)
})

// Auto-select first variant
watch(product, (p) => {
  if (p?.variants?.length > 0) {
    selectedVariant.value = p.variants[0]
  }
}, { immediate: true })

function addToCart() {
  if (!product.value) return
  cart.addItem(product.value, selectedVariant.value, quantity.value)
  cart.openCart()
  ui.showToast(`${product.value.name} added to cart`)
}

function orderOnWhatsApp() {
  if (!product.value) return
  const msg = createProductOrderMessage(product.value, selectedVariant.value, quantity.value)
  openWhatsApp(msg)
}
</script>
