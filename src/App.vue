<template>
  <div id="bloody-sweet-app" class="min-h-screen">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Toast />
    <CartDrawer />
  </div>
</template>

<script setup>
import Toast from './components/ui/Toast.vue'
import CartDrawer from './components/cart/CartDrawer.vue'
</script>
