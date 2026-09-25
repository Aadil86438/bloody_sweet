<template>
  <header class="sticky top-0 z-40 bg-brand-ivory/95 backdrop-blur-md border-b border-brand-cream">
    <div class="container-site">
      <div class="flex items-center justify-between h-16 sm:h-18 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 shrink-0" @click="closeMobileNav">
          <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-burgundy flex items-center justify-center">
            <span class="text-brand-cream font-serif font-bold text-xs sm:text-sm">BS</span>
          </div>
          <div class="leading-tight">
            <p class="font-serif font-bold text-brand-burgundy text-sm sm:text-base">BLOODY Sweet</p>
            <p class="text-[9px] sm:text-[10px] text-brand-cocoa-light tracking-[0.15em] uppercase">by fafa</p>
          </div>
        </router-link>

        <!-- Desktop navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <router-link v-for="link in navLinks" :key="link.to" :to="link.to"
            class="px-3 py-2 text-sm font-medium tracking-wide uppercase text-brand-cocoa hover:text-brand-burgundy transition-colors relative group"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-burgundy scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </router-link>
        </nav>

        <!-- Desktop actions -->
        <div class="hidden lg:flex items-center gap-3">
          <router-link to="/admin/login" class="btn-ghost text-xs py-1.5 px-3 border border-brand-burgundy/20 text-brand-burgundy font-medium hover:bg-brand-burgundy hover:text-white transition-all rounded-full flex items-center gap-1">
            <Lock :size="12" /> Admin
          </router-link>
          <router-link to="/quote" class="btn-ghost text-xs py-2 px-3">
            Get a Quote
          </router-link>
          <button @click="cart.toggleCart()" class="relative p-2 text-brand-cocoa hover:text-brand-burgundy transition-colors" aria-label="Open cart">
            <ShoppingBag :size="20" :stroke-width="1.8" />
            <span v-if="cart.itemCount > 0" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {{ cart.itemCount > 9 ? '9+' : cart.itemCount }}
            </span>
          </button>
        </div>

        <!-- Mobile actions -->
        <div class="flex lg:hidden items-center gap-2">
          <router-link to="/admin/login" class="text-[11px] font-medium px-2.5 py-1 rounded-full border border-brand-burgundy/30 text-brand-burgundy flex items-center gap-1 bg-white">
            <Lock :size="11" /> Admin
          </router-link>
          <button @click="cart.toggleCart()" class="relative p-2 text-brand-cocoa" aria-label="Open cart">
            <ShoppingBag :size="20" :stroke-width="1.8" />
            <span v-if="cart.itemCount > 0" class="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-burgundy text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {{ cart.itemCount > 9 ? '9+' : cart.itemCount }}
            </span>
          </button>
          <button @click="ui.toggleMobileNav()" class="p-2 text-brand-cocoa" aria-label="Toggle menu">
            <Menu v-if="!ui.mobileNavOpen" :size="22" :stroke-width="1.8" />
            <X v-else :size="22" :stroke-width="1.8" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu overlay -->
    <Teleport to="body">
      <transition name="mobile-nav">
        <div v-if="ui.mobileNavOpen" class="fixed inset-0 z-50 lg:hidden">
          <div class="absolute inset-0 bg-black/30" @click="closeMobileNav"></div>
          <div class="absolute inset-y-0 right-0 w-full max-w-xs bg-brand-ivory shadow-modal flex flex-col overflow-y-auto">
            <div class="p-5 flex justify-between items-center border-b border-brand-cream">
              <div>
                <p class="font-serif font-bold text-brand-burgundy">BLOODY Sweet</p>
                <p class="text-[10px] text-brand-cocoa-light tracking-widest uppercase">by fafa</p>
              </div>
              <button @click="closeMobileNav" class="p-2 text-brand-cocoa" aria-label="Close menu">
                <X :size="22" />
              </button>
            </div>
            <nav class="flex-1 py-4">
              <router-link v-for="link in allNavLinks" :key="link.to" :to="link.to"
                @click="closeMobileNav"
                class="block px-6 py-3 text-sm font-medium tracking-wide uppercase text-brand-cocoa hover:text-brand-burgundy hover:bg-brand-blush/30 transition-colors"
                :class="{ 'text-brand-burgundy bg-brand-blush/30': $route.path === link.to }"
              >
                {{ link.label }}
              </router-link>
            </nav>
            <div class="p-5 border-t border-brand-cream space-y-3">
              <router-link to="/quote" @click="closeMobileNav" class="btn-primary w-full text-center text-xs">
                Get a Quote
              </router-link>
              <router-link to="/contact" @click="closeMobileNav" class="btn-secondary w-full text-center text-xs">
                Contact Us
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ShoppingBag, Menu, X, Lock } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart.js'
import { useUiStore } from '../../stores/ui.js'

const cart = useCartStore()
const ui = useUiStore()

const navLinks = [
  { to: '/menu', label: 'Menu' },
  { to: '/catering', label: 'Catering' },
  { to: '/contact', label: 'Contact' },
]

const allNavLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/catering', label: 'Catering' },
  { to: '/quote', label: 'Get a Quote' },
  { to: '/contact', label: 'Contact' },
  { to: '/cart', label: 'Cart' },
]

function closeMobileNav() {
  ui.closeMobileNav()
}
</script>

<style scoped>
.mobile-nav-enter-active { transition: opacity 0.2s ease; }
.mobile-nav-enter-active > div:last-child { transition: transform 0.3s ease; }
.mobile-nav-leave-active { transition: opacity 0.2s ease 0.1s; }
.mobile-nav-leave-active > div:last-child { transition: transform 0.2s ease; }
.mobile-nav-enter-from { opacity: 0; }
.mobile-nav-enter-from > div:last-child { transform: translateX(100%); }
.mobile-nav-leave-to { opacity: 0; }
.mobile-nav-leave-to > div:last-child { transform: translateX(100%); }
</style>
