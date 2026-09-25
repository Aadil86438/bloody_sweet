import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(true)

  function init() {
    const saved = localStorage.getItem('bs_auth')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        user.value = data.user
        isAuthenticated.value = true
      } catch {
        localStorage.removeItem('bs_auth')
      }
    }
    loading.value = false
  }

  async function login(pinOrEmail, password = null) {
    // If only PIN provided (or PIN 1101)
    const inputPin = password || pinOrEmail
    if (inputPin === '1101' || pinOrEmail === '1101') {
      const userData = { email: 'admin@bloodysweetbyfafa.com', role: 'admin', name: 'Owner' }
      user.value = userData
      isAuthenticated.value = true
      localStorage.setItem('bs_auth', JSON.stringify({ user: userData }))
      return { success: true }
    }
    return { success: false, error: 'Incorrect PIN. Enter 1101.' }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('bs_auth')
  }

  init()

  return { user, isAuthenticated, loading, login, logout, init }
})
