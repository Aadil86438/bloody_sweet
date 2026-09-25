<template>
  <div class="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-burgundy flex items-center justify-center">
          <span class="text-brand-cream font-serif font-bold text-xl">BS</span>
        </div>
        <h1 class="font-serif font-bold text-xl text-brand-cocoa">Owner Login</h1>
        <p class="text-xs text-brand-cocoa-light mt-1">Enter PIN code to access Admin Panel</p>
      </div>

      <form @submit.prevent="handleLogin" class="card p-6 sm:p-8 space-y-4">
        <div>
          <label class="input-label text-center block text-sm font-semibold mb-2">Owner Access PIN</label>
          <input v-model="pin" type="password" maxlength="6" autofocus
            class="input-field text-center text-2xl tracking-[0.3em] font-mono py-3" 
            placeholder="••••" 
          />
        </div>

        <p v-if="loginError" class="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-brand text-center font-medium">{{ loginError }}</p>

        <button type="submit" :disabled="loading" class="btn-primary w-full text-sm">
          <Loader2 v-if="loading" :size="16" class="animate-spin" />
          {{ loading ? 'Unlocking...' : 'Unlock Admin Panel' }}
        </button>
      </form>

      <p class="text-center text-xs text-brand-cocoa-light/50 mt-6">
        <router-link to="/" class="hover:text-brand-burgundy transition-colors">← Back to website</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '../../stores/auth.js'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const pin = ref('')
const loginError = ref('')
const loading = ref(false)

async function handleLogin() {
  loginError.value = ''
  if (!pin.value) { loginError.value = 'Please enter PIN code'; return }

  loading.value = true
  try {
    const result = await auth.login(pin.value)
    if (result.success) {
      const redirect = route.query.redirect || '/admin'
      router.push(redirect)
    } else {
      loginError.value = result.error
    }
  } catch {
    loginError.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
