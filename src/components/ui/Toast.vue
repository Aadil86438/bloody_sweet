<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-[min(90vw,380px)]" aria-live="polite">
      <transition-group name="toast">
        <div v-for="toast in ui.toasts" :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-brand-lg shadow-elevated text-sm font-medium animate-slide-in-right"
          :class="{
            'bg-white text-admin-text border border-admin-border': toast.type === 'success',
            'bg-red-50 text-red-800 border border-red-200': toast.type === 'error',
            'bg-amber-50 text-amber-800 border border-amber-200': toast.type === 'warning',
            'bg-blue-50 text-blue-800 border border-blue-200': toast.type === 'info',
          }"
        >
          <CheckCircle v-if="toast.type === 'success'" :size="18" class="text-green-600 shrink-0" />
          <AlertCircle v-else-if="toast.type === 'error'" :size="18" class="text-red-600 shrink-0" />
          <AlertTriangle v-else-if="toast.type === 'warning'" :size="18" class="text-amber-600 shrink-0" />
          <Info v-else :size="18" class="text-blue-600 shrink-0" />
          <span class="flex-1 min-w-0 break-words">{{ toast.message }}</span>
          <button @click="ui.dismissToast(toast.id)" class="shrink-0 p-1 hover:opacity-70" aria-label="Dismiss">
            <X :size="14" />
          </button>
        </div>
      </transition-group>
    </div>
  </Teleport>
</template>

<script setup>
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'
import { useUiStore } from '../../stores/ui.js'

const ui = useUiStore()
</script>

<style scoped>
.toast-enter-active { transition: all 0.3s ease-out; }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(100%); }
.toast-leave-to { opacity: 0; transform: translateX(100%); }
.toast-move { transition: transform 0.3s ease; }
</style>
