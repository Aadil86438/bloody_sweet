<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="bg-brand-cocoa py-12 sm:py-16">
      <div class="container-content text-center">
        <p class="text-brand-rose/50 text-xs tracking-[0.3em] uppercase font-medium mb-2">Explore</p>
        <h1 class="font-serif text-section text-brand-cream mb-3">Our Menu</h1>
        <p class="text-brand-cream/50 text-sm max-w-md mx-auto">Every item handcrafted with the finest ingredients, made fresh daily.</p>
      </div>
    </section>

    <!-- Filters + Grid -->
    <section class="section-padding bg-brand-ivory">
      <div class="container-content">
        <!-- Category filters -->
        <div class="flex flex-wrap gap-2 mb-8 justify-center">
          <button @click="activeCategory = null"
            class="px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-colors"
            :class="!activeCategory ? 'bg-brand-burgundy text-white' : 'bg-white text-brand-cocoa-light border border-brand-cream hover:border-brand-burgundy hover:text-brand-burgundy'"
          >
            All
          </button>
          <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id"
            class="px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase transition-colors"
            :class="activeCategory === cat.id ? 'bg-brand-burgundy text-white' : 'bg-white text-brand-cocoa-light border border-brand-cream hover:border-brand-burgundy hover:text-brand-burgundy'"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- Search -->
        <div class="max-w-md mx-auto mb-8">
          <div class="relative">
            <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-brand-cocoa-light/50" />
            <input v-model="searchQuery" type="text" placeholder="Search products..."
              class="input-field pl-10 bg-white"
            />
          </div>
        </div>

        <!-- Product Grid -->
        <div v-if="filteredProducts.length > 0" class="product-grid">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-16">
          <Package :size="48" class="text-brand-cocoa-light/20 mx-auto mb-4" />
          <h3 class="font-serif text-lg text-brand-cocoa mb-1">No products found</h3>
          <p class="text-sm text-brand-cocoa-light">Try a different category or search term.</p>
          <button @click="activeCategory = null; searchQuery = ''" class="btn-ghost mt-4 text-xs">
            View All Products
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Package } from 'lucide-vue-next'
import ProductCard from '../../components/product/ProductCard.vue'
import { useProductsStore } from '../../stores/products.js'

const route = useRoute()
const productsStore = useProductsStore()
const activeCategory = ref(route.query.category || null)
const searchQuery = ref('')

const categories = computed(() => productsStore.categories)

const filteredProducts = computed(() => {
  let products = productsStore.availableProducts
  if (activeCategory.value) {
    products = products.filter(p => p.category_id === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    )
  }
  return products
})

onMounted(() => {
  if (route.query.category) {
    activeCategory.value = route.query.category
  }
})
</script>
