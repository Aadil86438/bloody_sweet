import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const mobileNavOpen = ref(false)
  const toasts = ref([])
  const modalOpen = ref(false)
  const modalComponent = ref(null)
  const modalProps = ref({})

  function toggleMobileNav() { mobileNavOpen.value = !mobileNavOpen.value }
  function closeMobileNav() { mobileNavOpen.value = false }
  function openMobileNav() { mobileNavOpen.value = true }

  function showToast(message, type = 'success', duration = 3000) {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    toasts.value.push({ id, message, type, duration })
    setTimeout(() => dismissToast(id), duration)
    return id
  }

  function dismissToast(id) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  function openModal(component, props = {}) {
    modalComponent.value = component
    modalProps.value = props
    modalOpen.value = true
  }

  function closeModal() {
    modalOpen.value = false
    modalComponent.value = null
    modalProps.value = {}
  }

  return {
    mobileNavOpen, toasts, modalOpen, modalComponent, modalProps,
    toggleMobileNav, closeMobileNav, openMobileNav,
    showToast, dismissToast,
    openModal, closeModal,
  }
})
