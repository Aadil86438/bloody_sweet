<template>
  <a v-if="whatsappUrl" :href="whatsappUrl" target="_blank" rel="noopener"
    class="fixed bottom-20 lg:bottom-6 right-4 z-30 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle :size="24" :stroke-width="2" />
  </a>
</template>

<script setup>
import { computed } from 'vue'
import { MessageCircle } from 'lucide-vue-next'
import { createWhatsAppURL } from '../../services/whatsapp.js'

const whatsappUrl = computed(() =>
  createWhatsAppURL('Hello BLOODY Sweet by fafa, I\'d like to know more about your products.')
)
</script>
