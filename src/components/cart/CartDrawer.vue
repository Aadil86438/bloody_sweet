<template>
  <Teleport to="body">
    <transition name="cart-overlay">
      <div v-if="cart.isOpen" class="fixed inset-0 z-50" @click.self="cart.closeCart()">
        <div class="absolute inset-0 bg-black/40" @click="cart.closeCart()"></div>
        <transition name="cart-drawer">
          <div v-if="cart.isOpen" class="absolute inset-y-0 right-0 w-full max-w-md bg-brand-ivory shadow-modal flex flex-col overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 sm:p-5 border-b border-brand-cream">
              <div>
                <h2 class="font-serif font-bold text-lg text-brand-cocoa">Your Cart</h2>
                <p class="text-xs text-brand-cocoa-light mt-0.5">{{ cart.itemCount }} {{ cart.itemCount === 1 ? 'item' : 'items' }}</p>
              </div>
              <button @click="cart.closeCart()" class="p-2 text-brand-cocoa-light hover:text-brand-cocoa transition-colors" aria-label="Close cart">
                <X :size="20" />
              </button>
            </div>

            <!-- Items -->
            <div v-if="cart.items.length > 0" class="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              <div v-for="item in cart.items" :key="item.id" class="flex gap-3">
                <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-brand bg-brand-cream shrink-0 flex items-center justify-center overflow-hidden">
                  <img v-if="item.productImage" :src="item.productImage" :alt="item.productName" class="w-full h-full object-cover" />
                  <Package v-else :size="24" class="text-brand-cocoa-light/40" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-sm text-brand-cocoa truncate">{{ item.productName }}</h3>
                  <p v-if="item.variantName" class="text-xs text-brand-cocoa-light mt-0.5">{{ item.variantName }}</p>
                  <p class="text-sm font-semibold text-brand-burgundy mt-1">{{ formatCurrency(item.price) }}</p>
                  <div class="flex items-center gap-2 mt-2">
                    <button @click="cart.updateQuantity(item.id, item.quantity - 1)"
                      class="w-7 h-7 rounded-full border border-brand-cream flex items-center justify-center text-brand-cocoa hover:border-brand-burgundy hover:text-brand-burgundy transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus :size="14" />
                    </button>
                    <span class="text-sm font-medium text-brand-cocoa w-6 text-center">{{ item.quantity }}</span>
                    <button @click="cart.updateQuantity(item.id, item.quantity + 1)"
                      class="w-7 h-7 rounded-full border border-brand-cream flex items-center justify-center text-brand-cocoa hover:border-brand-burgundy hover:text-brand-burgundy transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus :size="14" />
                    </button>
                    <button @click="cart.removeItem(item.id)"
                      class="ml-auto p-1 text-brand-cocoa-light/60 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 :size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div v-else class="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag :size="48" class="text-brand-cocoa-light/20 mb-4" />
              <h3 class="font-serif text-lg text-brand-cocoa mb-1">Your cart is empty</h3>
              <p class="text-sm text-brand-cocoa-light">Explore our menu and add something sweet.</p>
              <router-link to="/menu" @click="cart.closeCart()" class="btn-primary mt-6 text-xs">
                Explore Menu
              </router-link>
            </div>

            <!-- Footer -->
            <div v-if="cart.items.length > 0" class="border-t border-brand-cream p-4 sm:p-5 space-y-3 safe-bottom">
              <div class="flex justify-between text-sm">
                <span class="text-brand-cocoa-light">Subtotal</span>
                <span class="font-semibold text-brand-cocoa">{{ formatCurrency(cart.subtotal) }}</span>
              </div>
              <div class="space-y-2">
                <router-link to="/cart" @click="cart.closeCart()" class="btn-primary w-full text-xs">
                  View Cart & Order
                </router-link>
                <button @click="orderOnWhatsApp" class="btn-whatsapp w-full text-xs">
                  <MessageCircle :size="16" />
                  Order on WhatsApp
                </button>
              </div>
              <button @click="cart.closeCart()" class="w-full text-center text-xs text-brand-cocoa-light hover:text-brand-cocoa transition-colors py-1">
                Continue Shopping
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { X, Minus, Plus, Trash2, ShoppingBag, Package, MessageCircle } from 'lucide-vue-next'
import { useCartStore } from '../../stores/cart.js'
import { formatCurrency } from '../../services/format.js'
import { createOrderMessage, openWhatsApp } from '../../services/whatsapp.js'

const cart = useCartStore()

function orderOnWhatsApp() {
  const message = createOrderMessage(cart.items, cart.total)
  openWhatsApp(message)
}
</script>

<style scoped>
.cart-overlay-enter-active, .cart-overlay-leave-active { transition: opacity 0.3s ease; }
.cart-overlay-enter-from, .cart-overlay-leave-to { opacity: 0; }
.cart-drawer-enter-active { transition: transform 0.3s ease-out; }
.cart-drawer-leave-active { transition: transform 0.2s ease-in; }
.cart-drawer-enter-from { transform: translateX(100%); }
.cart-drawer-leave-to { transform: translateX(100%); }
</style>
