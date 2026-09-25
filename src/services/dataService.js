import { supabase, isSupabaseConfigured } from './supabase.js'
import { products as initialProducts, categories as initialCategories, demoOrders, demoQuotes } from './mockData.js'

export const dataService = {
  // PRODUCTS
  async getProducts() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('sort_order', { ascending: true })
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase getProducts fallback to mockData:', err)
      }
    }
    const local = localStorage.getItem('bs_products')
    return local ? JSON.parse(local) : initialProducts
  },

  async getCategories() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('sort_order', { ascending: true })
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase getCategories fallback to mockData:', err)
      }
    }
    return initialCategories
  },

  // ORDERS
  async getOrders() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
        if (!error && data) return data
      } catch (err) {
        console.warn('Supabase getOrders fallback to localStorage:', err)
      }
    }
    const local = localStorage.getItem('bs_orders')
    return local ? JSON.parse(local) : demoOrders
  },

  async createOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('bs_orders') || JSON.stringify(demoOrders))
    orders.unshift(orderData)
    localStorage.setItem('bs_orders', JSON.stringify(orders))

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('orders').insert([orderData])
      } catch (err) {
        console.error('Supabase createOrder error:', err)
      }
    }
    return orderData
  },

  async updateOrderStatus(id, status) {
    const orders = JSON.parse(localStorage.getItem('bs_orders') || '[]')
    const idx = orders.findIndex(o => o.id === id || o.order_number === id)
    if (idx !== -1) {
      orders[idx].status = status
      localStorage.setItem('bs_orders', JSON.stringify(orders))
    }

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('orders').update({ status }).eq('id', id)
      } catch (err) {
        console.error('Supabase updateOrderStatus error:', err)
      }
    }
  },

  // QUOTES
  async getQuotes() {
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false })
        if (!error && data) return data
      } catch (err) {
        console.warn('Supabase getQuotes fallback to localStorage:', err)
      }
    }
    const local = localStorage.getItem('bs_quotes')
    return local ? JSON.parse(local) : demoQuotes
  },

  async createQuote(quoteData) {
    const quotes = JSON.parse(localStorage.getItem('bs_quotes') || JSON.stringify(demoQuotes))
    quotes.unshift(quoteData)
    localStorage.setItem('bs_quotes', JSON.stringify(quotes))

    if (isSupabaseConfigured()) {
      try {
        await supabase.from('quotes').insert([quoteData])
      } catch (err) {
        console.error('Supabase createQuote error:', err)
      }
    }
    return quoteData
  },

  async updateQuoteStatus(id, status, quotedAmount = null, notes = '') {
    const quotes = JSON.parse(localStorage.getItem('bs_quotes') || '[]')
    const idx = quotes.findIndex(q => q.id === id || q.quote_number === id)
    if (idx !== -1) {
      quotes[idx].status = status
      if (quotedAmount !== null) quotes[idx].quoted_amount = quotedAmount
      if (notes) quotes[idx].owner_notes = notes
      localStorage.setItem('bs_quotes', JSON.stringify(quotes))
    }

    if (isSupabaseConfigured()) {
      try {
        const updateObj = { status }
        if (quotedAmount !== null) updateObj.quoted_amount = quotedAmount
        if (notes) updateObj.owner_notes = notes
        await supabase.from('quotes').update(updateObj).eq('id', id)
      } catch (err) {
        console.error('Supabase updateQuoteStatus error:', err)
      }
    }
  },
}
