<template>
  <div>
    <h1 class="font-serif font-bold text-xl sm:text-2xl text-admin-text mb-6">Settings</h1>

    <div class="max-w-2xl space-y-6">
      <!-- Business Info -->
      <div class="card-admin p-4 sm:p-5">
        <h2 class="font-semibold text-admin-text text-sm mb-4">Business Information</h2>
        <div class="space-y-3">
          <div><label class="input-label">Business Name</label><input v-model="settings.name" class="input-field" /></div>
          <div><label class="input-label">Phone</label><input v-model="settings.phone" type="tel" class="input-field" /></div>
          <div><label class="input-label">WhatsApp Number</label><input v-model="settings.whatsapp" type="tel" class="input-field" placeholder="e.g. 919999999999" /></div>
          <div><label class="input-label">Email</label><input v-model="settings.email" type="email" class="input-field" /></div>
          <div><label class="input-label">Address</label><textarea v-model="settings.address" rows="2" class="input-field"></textarea></div>
          <div><label class="input-label">Opening Hours</label><input v-model="settings.openingHours" class="input-field" /></div>
        </div>
      </div>

      <!-- Social -->
      <div class="card-admin p-4 sm:p-5">
        <h2 class="font-semibold text-admin-text text-sm mb-4">Social Media</h2>
        <div class="space-y-3">
          <div><label class="input-label">Instagram</label><input v-model="settings.instagram" class="input-field" placeholder="@handle or URL" /></div>
          <div><label class="input-label">Facebook</label><input v-model="settings.facebook" class="input-field" placeholder="Page URL" /></div>
        </div>
      </div>

      <!-- Documents -->
      <div class="card-admin p-4 sm:p-5">
        <h2 class="font-semibold text-admin-text text-sm mb-4">Documents</h2>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div><label class="input-label">Invoice Prefix</label><input v-model="settings.invoicePrefix" class="input-field" /></div>
            <div><label class="input-label">Quote Prefix</label><input v-model="settings.quotePrefix" class="input-field" /></div>
          </div>
          <div><label class="input-label">Document Footer Message</label><input v-model="settings.footerMessage" class="input-field" /></div>
        </div>
      </div>

      <!-- Ordering -->
      <div class="card-admin p-4 sm:p-5">
        <h2 class="font-semibold text-admin-text text-sm mb-4">Ordering</h2>
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" v-model="settings.deliveryAvailable" class="w-4 h-4 rounded border-gray-300 text-admin-accent focus:ring-admin-accent" />
            <span class="text-sm text-admin-text">Delivery Available</span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" v-model="settings.pickupAvailable" class="w-4 h-4 rounded border-gray-300 text-admin-accent focus:ring-admin-accent" />
            <span class="text-sm text-admin-text">Pickup Available</span>
          </label>
        </div>
      </div>

      <!-- Admin -->
      <div class="card-admin p-4 sm:p-5">
        <h2 class="font-semibold text-admin-text text-sm mb-4">Admin</h2>
        <div class="flex flex-col sm:flex-row gap-3">
          <router-link to="/" class="btn-ghost text-xs">View Website →</router-link>
          <button @click="handleLogout" class="btn-ghost text-xs text-admin-danger hover:bg-red-50">Sign Out</button>
        </div>
      </div>

      <button @click="saveSettings" class="btn-primary text-xs">Save Settings</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { businessSettings } from '../../services/mockData.js'
import { useAuthStore } from '../../stores/auth.js'
import { useUiStore } from '../../stores/ui.js'

const router = useRouter()
const auth = useAuthStore()
const ui = useUiStore()

const settings = reactive({ ...businessSettings })

function saveSettings() {
  localStorage.setItem('bs_settings', JSON.stringify(settings))
  ui.showToast('Settings saved')
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'admin-login' })
}
</script>
