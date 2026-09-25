<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <MobileBottomNav />
    <WhatsAppFloat />
  </div>
</template>

<script setup>
import Navbar from '../components/layout/Navbar.vue'
import Footer from '../components/layout/SiteFooter.vue'
import MobileBottomNav from '../components/layout/MobileBottomNav.vue'
import WhatsAppFloat from '../components/layout/WhatsAppFloat.vue'
</script>
