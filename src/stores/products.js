import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products as mockProducts, categories as mockCategories } from '../services/mockData.js'
import { dataService } from '../services/dataService.js'

export const useProductsStore = defineStore('products', () => {
  const products = ref([...mockProducts])
  const categories = ref([...mockCategories])
  const loading = ref(false)
  const error = ref(null)

  const availableProducts = computed(() => products.value.filter(p => p.is_available))
  const trendingProducts = computed(() => products.value.filter(p => p.is_trending && p.is_available))
  const signatureProducts = computed(() => products.value.filter(p => p.is_signature && p.is_available))

  function getProductBySlug(slug) {
    return products.value.find(p => p.slug === slug) || null
  }

  function getProductById(id) {
    return products.value.find(p => p.id === id) || null
  }

  function getProductsByCategory(categoryId) {
    return availableProducts.value.filter(p => p.category_id === categoryId)
  }

  function getCategoryBySlug(slug) {
    return categories.value.find(c => c.slug === slug) || null
  }

  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const data = await dataService.getProducts()
      if (data && data.length > 0) {
        products.value = data
      }
    } catch (err) {
      error.value = 'Failed to load products'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    loading.value = true
    try {
      const data = await dataService.getCategories()
      if (data && data.length > 0) {
        categories.value = data
      }
    } catch (err) {
      error.value = 'Failed to load categories'
    } finally {
      loading.value = false
    }
  }

  // Admin actions
  function updateProduct(id, updates) {
    const index = products.value.findIndex(p => p.id === id)
    if (index > -1) {
      products.value[index] = { ...products.value[index], ...updates }
    }
  }

  function addProduct(product) {
    products.value.push(product)
  }

  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
  }

  return {
    products, categories, loading, error,
    availableProducts, trendingProducts, signatureProducts,
    getProductBySlug, getProductById, getProductsByCategory, getCategoryBySlug,
    fetchProducts, fetchCategories,
    updateProduct, addProduct, deleteProduct,
  }
})
