<template>
  <div class="min-h-screen bg-admin-bg flex flex-col">
    <!-- Desktop sidebar + content -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar (desktop) -->
      <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-admin-border shrink-0 h-screen sticky top-0">
        <div class="p-5 border-b border-admin-border">
          <router-link to="/admin" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-burgundy flex items-center justify-center">
              <span class="text-white font-serif font-bold text-sm">BS</span>
            </div>
            <div>
              <p class="font-serif font-bold text-brand-burgundy text-sm leading-tight">BLOODY Sweet</p>
              <p class="text-[10px] text-admin-text-secondary tracking-wider uppercase">Admin Panel</p>
            </div>
          </router-link>
        </div>
        <nav class="flex-1 py-4 overflow-y-auto">
          <router-link v-for="item in navItems" :key="item.to" :to="item.to"
            class="flex items-center gap-3 px-5 py-2.5 text-sm font-medium transition-colors"
            :class="isActive(item.to) ? 'text-brand-burgundy bg-brand-blush/50' : 'text-admin-text-secondary hover:text-admin-text hover:bg-gray-50'"
          >
            <component :is="item.icon" :size="18" :stroke-width="1.8" />
            {{ item.label }}
          </router-link>
        </nav>
        <div class="p-4 border-t border-admin-border">
          <button @click="handleLogout" class="flex items-center gap-2 text-sm text-admin-text-secondary hover:text-admin-danger transition-colors w-full px-1 py-2">
            <LogOut :size="18" :stroke-width="1.8" />
            Sign Out
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <!-- Top bar (mobile) -->
        <header class="lg:hidden sticky top-0 z-30 bg-white border-b border-admin-border px-4 py-3 flex items-center justify-between">
          <router-link to="/admin" class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-brand-burgundy flex items-center justify-center">
              <span class="text-white font-serif font-bold text-xs">BS</span>
            </div>
            <span class="font-serif font-bold text-brand-burgundy text-sm">Admin</span>
          </router-link>
          <div class="flex items-center gap-2">
            <button @click="showQuickAdd = !showQuickAdd" class="w-9 h-9 flex items-center justify-center rounded-full bg-brand-burgundy text-white">
              <Plus :size="18" />
            </button>
          </div>
        </header>

        <div class="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>

    <!-- Mobile bottom nav -->
    <nav class="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-admin-border safe-bottom z-40">
      <div class="flex items-center justify-around py-1">
        <router-link v-for="item in mobileNavItems" :key="item.to" :to="item.to"
          class="flex flex-col items-center gap-0.5 px-3 py-2 min-w-[60px] transition-colors"
          :class="isActive(item.to) ? 'text-brand-burgundy' : 'text-admin-text-secondary'"
        >
          <component :is="item.icon" :size="20" :stroke-width="1.8" />
          <span class="text-[10px] font-medium">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Quick add overlay -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="showQuickAdd" class="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div class="absolute inset-0 bg-black/40" @click="showQuickAdd = false"></div>
          <div class="relative bg-white rounded-t-2xl lg:rounded-2xl w-full max-w-sm p-6 safe-bottom animate-slide-up">
            <h3 class="font-serif font-bold text-lg mb-4 text-admin-text">Quick Actions</h3>
            <div class="grid grid-cols-2 gap-3">
              <router-link v-for="action in quickActions" :key="action.to" :to="action.to"
                @click="showQuickAdd = false"
                class="flex flex-col items-center gap-2 p-4 rounded-brand-lg border border-admin-border hover:border-brand-burgundy hover:bg-brand-blush/30 transition-colors"
              >
                <component :is="action.icon" :size="22" class="text-brand-burgundy" />
                <span class="text-xs font-medium text-admin-text">{{ action.label }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import {
  LayoutDashboard, ShoppingBag, MessageSquareQuote, Package,
  Warehouse, Wallet, BarChart3, Settings, LogOut, Plus,
  ClipboardList, Receipt,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const showQuickAdd = ref(false)

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/quotes', label: 'Quotes', icon: MessageSquareQuote },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/stock', label: 'Stock', icon: Warehouse },
  { to: '/admin/money', label: 'Money', icon: Wallet },
  { to: '/admin/business', label: 'Business', icon: BarChart3 },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

const mobileNavItems = [
  { to: '/admin', label: 'Home', icon: LayoutDashboard },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/quotes', label: 'Quotes', icon: MessageSquareQuote },
  { to: '/admin/money', label: 'Money', icon: Wallet },
  { to: '/admin/settings', label: 'More', icon: Settings },
]

const quickActions = [
  { to: '/admin/orders', label: 'New Order', icon: ShoppingBag },
  { to: '/admin/quotes', label: 'New Quote', icon: ClipboardList },
  { to: '/admin/money', label: 'Add Expense', icon: Receipt },
  { to: '/admin/stock', label: 'Add Stock', icon: Warehouse },
]

function isActive(path) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'admin-login' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
