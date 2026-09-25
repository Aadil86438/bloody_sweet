<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-brand-ivory/95 backdrop-blur-md border-t border-brand-cream safe-bottom z-40 lg:hidden">
    <div class="flex items-center justify-around py-1">
      <router-link v-for="item in navItems" :key="item.to" :to="item.to"
        class="flex flex-col items-center gap-0.5 px-3 py-2 min-w-[56px] transition-colors"
        :class="isActive(item.to) ? 'text-brand-burgundy' : 'text-brand-cocoa-light'"
      >
        <component :is="item.icon" :size="20" :stroke-width="1.8" />
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { Home, UtensilsCrossed, Search, ShoppingBag } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart.js'

const route = useRoute()
const cart = useCartStore()

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/quote', label: 'Quote', icon: Search },
  { to: '/cart', label: 'Cart', icon: ShoppingBag },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
