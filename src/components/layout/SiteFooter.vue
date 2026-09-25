<template>
  <footer class="bg-brand-cocoa text-brand-cream/80 pb-20 lg:pb-0">
    <div class="container-site section-padding-sm">
      <!-- Top section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <div class="mb-4">
            <p class="font-serif font-bold text-white text-xl">BLOODY Sweet</p>
            <p class="text-xs tracking-[0.2em] uppercase text-brand-rose/60 mt-0.5">by fafa</p>
          </div>
          <p class="text-sm text-brand-cream/60 leading-relaxed max-w-xs">
            BAKERY • JUICES • SWEETS<br />
            Catering • Party • Wedding
          </p>
          <p class="text-xs text-brand-cream/40 mt-4 italic font-serif">Made fresh. Made to be remembered.</p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-serif font-semibold text-white text-sm uppercase tracking-wider mb-4">Explore</h4>
          <nav class="space-y-2.5">
            <router-link v-for="link in quickLinks" :key="link.to" :to="link.to"
              class="block text-sm text-brand-cream/60 hover:text-white transition-colors">
              {{ link.label }}
            </router-link>
          </nav>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-serif font-semibold text-white text-sm uppercase tracking-wider mb-4">Services</h4>
          <nav class="space-y-2.5">
            <router-link to="/catering" class="block text-sm text-brand-cream/60 hover:text-white transition-colors">Catering</router-link>
            <router-link to="/quote" class="block text-sm text-brand-cream/60 hover:text-white transition-colors">Custom Orders</router-link>
            <router-link to="/quote" class="block text-sm text-brand-cream/60 hover:text-white transition-colors">Wedding Sweets</router-link>
            <router-link to="/quote" class="block text-sm text-brand-cream/60 hover:text-white transition-colors">Corporate Gifting</router-link>
          </nav>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-serif font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact</h4>
          <div class="space-y-3 text-sm text-brand-cream/60">
            <p>Orders Undertaken</p>
            <a v-if="whatsappUrl" :href="whatsappUrl" target="_blank" rel="noopener"
              class="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle :size="16" />
              WhatsApp Us
            </a>
            <router-link to="/contact" class="flex items-center gap-2 hover:text-white transition-colors">
              <MapPin :size="16" />
              Find Us
            </router-link>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-10 pt-6 border-t border-brand-cream/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-brand-cream/40">
          © {{ currentYear }} BLOODY Sweet by fafa. All rights reserved.
        </p>
        <div class="flex items-center gap-4 text-xs text-brand-cream/40">
          <router-link to="/admin/login" class="hover:text-white transition-colors flex items-center gap-1">
            <span>Owner Portal</span> →
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { MessageCircle, MapPin, Instagram } from 'lucide-vue-next'
import { createWhatsAppURL } from '../../services/whatsapp.js'

const currentYear = new Date().getFullYear()
const whatsappUrl = computed(() => createWhatsAppURL('Hello BLOODY Sweet by fafa, I have a question.'))

const quickLinks = [
  { to: '/menu', label: 'Our Menu' },
  { to: '/menu', label: 'Signatures' },
  { to: '/menu', label: 'Cakes' },
  { to: '/menu', label: 'Brownies' },
  { to: '/menu', label: 'Desserts' },
]
</script>
