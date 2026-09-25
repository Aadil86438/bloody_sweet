<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="bg-brand-cocoa py-12 sm:py-16">
      <div class="container-content text-center">
        <p class="text-brand-rose/50 text-xs tracking-[0.3em] uppercase font-medium mb-2">Custom Orders</p>
        <h1 class="font-serif text-section text-brand-cream mb-3">Get a Quote</h1>
        <p class="text-brand-cream/50 text-sm max-w-md mx-auto">Tell us what you're planning and we'll craft the perfect sweet experience.</p>
      </div>
    </section>

    <section class="section-padding bg-brand-ivory">
      <div class="container-narrow">
        <!-- Success State -->
        <div v-if="submitted" class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <CheckCircle :size="40" class="text-green-500" />
          </div>
          <h2 class="font-serif text-2xl text-brand-cocoa mb-2">Your quote request is complete!</h2>
          <p class="text-brand-cocoa-light text-sm max-w-sm mx-auto mb-8">
            We've generated your quote request document. Download your official PDF copy below or reach us directly on WhatsApp.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button @click="generatePDF" class="btn-primary text-xs flex items-center gap-2">
              <Download :size="16" /> Download Quote PDF
            </button>
            <router-link to="/" class="btn-secondary text-xs">Back to Home</router-link>
            <button @click="resetForm" class="btn-ghost text-xs">Submit Another Request</button>
          </div>
        </div>

        <!-- Multi-step Form -->
        <div v-else>
          <!-- Stepper -->
          <div class="flex items-center justify-center gap-2 mb-8">
            <div v-for="s in 3" :key="s" class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
                :class="step >= s ? 'bg-brand-burgundy text-white' : 'bg-brand-cream text-brand-cocoa-light'"
              >
                <Check v-if="step > s" :size="14" />
                <span v-else>{{ s }}</span>
              </div>
              <div v-if="s < 3" class="w-8 sm:w-12 h-0.5 rounded-full transition-colors"
                :class="step > s ? 'bg-brand-burgundy' : 'bg-brand-cream'"
              ></div>
            </div>
          </div>

          <div class="card p-5 sm:p-8">
            <!-- Step 1: Event Type -->
            <div v-if="step === 1">
              <h2 class="font-serif text-xl text-brand-cocoa mb-2">What are you planning?</h2>
              <p class="text-sm text-brand-cocoa-light mb-6">Select the type of occasion or order.</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button v-for="type in requestTypes" :key="type.id" @click="form.requestType = type.id"
                  class="p-4 rounded-brand-lg border text-center transition-all"
                  :class="form.requestType === type.id
                    ? 'border-brand-burgundy bg-brand-blush/30 ring-1 ring-brand-burgundy'
                    : 'border-brand-cream bg-white hover:border-brand-burgundy/50'"
                >
                  <span class="text-xl block mb-1">{{ type.icon }}</span>
                  <span class="text-xs font-medium text-brand-cocoa">{{ type.label }}</span>
                </button>
              </div>
              <p v-if="errors.requestType" class="input-error mt-3">{{ errors.requestType }}</p>
            </div>

            <!-- Step 2: Requirements -->
            <div v-if="step === 2">
              <h2 class="font-serif text-xl text-brand-cocoa mb-2">Tell us more</h2>
              <p class="text-sm text-brand-cocoa-light mb-6">Share your requirements so we can prepare the perfect quote.</p>
              <div class="space-y-4">
                <div>
                  <label class="input-label">Quantity / Servings *</label>
                  <input v-model="form.quantity" type="text" class="input-field" placeholder="e.g. 200 guests, 50 boxes, 5 kg" />
                  <p v-if="errors.quantity" class="input-error">{{ errors.quantity }}</p>
                </div>
                <div>
                  <label class="input-label">Preferred Date</label>
                  <input v-model="form.eventDate" type="date" class="input-field" />
                </div>
                <div>
                  <label class="input-label">Location</label>
                  <input v-model="form.location" type="text" class="input-field" placeholder="Event location or delivery address" />
                </div>
                <div>
                  <label class="input-label">Budget Range</label>
                  <select v-model="form.budget" class="input-field">
                    <option value="">Select budget range</option>
                    <option value="Under ₹5,000">Under ₹5,000</option>
                    <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000</option>
                    <option value="₹15,000 – ₹30,000">₹15,000 – ₹30,000</option>
                    <option value="₹30,000 – ₹50,000">₹30,000 – ₹50,000</option>
                    <option value="₹50,000+">₹50,000+</option>
                  </select>
                </div>
                <div>
                  <label class="input-label">Special Requirements *</label>
                  <textarea v-model="form.requirements" rows="3" class="input-field" placeholder="Describe what you're looking for..."></textarea>
                  <p v-if="errors.requirements" class="input-error">{{ errors.requirements }}</p>
                </div>
              </div>
            </div>

            <!-- Step 3: Contact -->
            <div v-if="step === 3">
              <h2 class="font-serif text-xl text-brand-cocoa mb-2">Your Details</h2>
              <p class="text-sm text-brand-cocoa-light mb-6">How should we reach you?</p>
              <div class="space-y-4">
                <div>
                  <label class="input-label">Your Name *</label>
                  <input v-model="form.name" type="text" class="input-field" placeholder="Your full name" />
                  <p v-if="errors.name" class="input-error">{{ errors.name }}</p>
                </div>
                <div>
                  <label class="input-label">WhatsApp Number *</label>
                  <input v-model="form.phone" type="tel" class="input-field" placeholder="Your WhatsApp number" />
                  <p v-if="errors.phone" class="input-error">{{ errors.phone }}</p>
                </div>
                <div>
                  <label class="input-label">Email (Optional)</label>
                  <input v-model="form.email" type="email" class="input-field" placeholder="your@email.com" />
                  <p v-if="errors.email" class="input-error">{{ errors.email }}</p>
                </div>
                <div>
                  <label class="input-label">Additional Message (Optional)</label>
                  <textarea v-model="form.message" rows="3" class="input-field" placeholder="Anything else we should know..."></textarea>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex justify-between gap-3 mt-8">
              <button v-if="step > 1" @click="step--" class="btn-ghost text-xs">
                <ArrowLeft :size="14" />
                Back
              </button>
              <div v-else></div>
              <button v-if="step < 3" @click="nextStep" class="btn-primary text-xs">
                Continue
                <ArrowRight :size="14" />
              </button>
              <button v-else @click="submitQuote" :disabled="submitting" class="btn-primary text-xs">
                <Loader2 v-if="submitting" :size="14" class="animate-spin" />
                {{ submitting ? 'Sending...' : 'Request My Quote' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle, Check, ArrowLeft, ArrowRight, Download, Loader2 } from 'lucide-vue-next'
import { useUiStore } from '../../stores/ui.js'
import { validators, validateForm } from '../../services/validation.js'
import { downloadQuotePDF } from '../../services/pdf.js'
import { dataService } from '../../services/dataService.js'

const route = useRoute()
const ui = useUiStore()

const step = ref(1)
const submitted = ref(false)
const submitting = ref(false)
const lastQuote = ref(null)

const form = reactive({
  requestType: '', quantity: '', eventDate: '', location: '', budget: '',
  requirements: '', name: '', phone: '', email: '', message: '',
})
const errors = reactive({})

const requestTypes = [
  { id: 'custom-cake', icon: '🎂', label: 'Custom Cake' },
  { id: 'bulk-sweets', icon: '🍬', label: 'Bulk Sweets' },
  { id: 'gift-boxes', icon: '🎁', label: 'Gift Boxes' },
  { id: 'birthday', icon: '🎉', label: 'Birthday' },
  { id: 'wedding', icon: '💍', label: 'Wedding' },
  { id: 'party', icon: '🎊', label: 'Party' },
  { id: 'catering', icon: '🍽️', label: 'Catering' },
  { id: 'corporate', icon: '🏢', label: 'Corporate' },
  { id: 'other', icon: '✨', label: 'Other' },
]

onMounted(() => {
  if (route.query.type) {
    form.requestType = route.query.type
  }
})

function nextStep() {
  Object.keys(errors).forEach(k => delete errors[k])
  
  if (step.value === 1) {
    if (!form.requestType) {
      errors.requestType = 'Please select what you are planning'
      return
    }
  }
  if (step.value === 2) {
    const rules = {
      quantity: [v => validators.required(v, 'Quantity')],
      requirements: [v => validators.required(v, 'Requirements')],
    }
    const result = validateForm(form, rules)
    if (!result.valid) {
      Object.assign(errors, result.errors)
      return
    }
  }
  step.value++
}

function handleImageUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return
  
  const typeErr = validators.fileType(file)
  if (typeErr) { errors.image = typeErr; return }
  const sizeErr = validators.fileSize(file, 5)
  if (sizeErr) { errors.image = sizeErr; return }
  
  delete errors.image
  imageFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { imagePreview.value = ev.target.result }
  reader.readAsDataURL(file)
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = null
}

async function submitQuote() {
  Object.keys(errors).forEach(k => delete errors[k])
  const rules = {
    name: [v => validators.required(v, 'Name')],
    phone: [v => validators.required(v, 'Phone'), v => validators.phone(v)],
  }
  if (form.email) {
    rules.email = [v => validators.email(v)]
  }
  const result = validateForm(form, rules)
  if (!result.valid) {
    Object.assign(errors, result.errors)
    return
  }

  submitting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const quote = {
      id: `qt-${Date.now()}`,
      quote_number: `BQ-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email,
      request_type: form.requestType,
      event_date: form.eventDate,
      quantity: form.quantity,
      budget: form.budget,
      requirements: form.requirements,
      message: form.message,
      location: form.location,
      status: 'new',
      quoted_amount: null,
      owner_notes: '',
      created_at: new Date().toISOString(),
    }
    
    lastQuote.value = quote
    await dataService.createQuote(quote)
    
    submitted.value = true
    ui.showToast('Quote request submitted successfully!')
  } catch {
    ui.showToast('Something went wrong. Please try again.', 'error')
  } finally {
    submitting.value = false
  }
}

function generatePDF() {
  if (lastQuote.value) {
    downloadQuotePDF(lastQuote.value)
    ui.showToast('Quote PDF downloaded!')
  }
}

function resetForm() {
  Object.keys(form).forEach(k => form[k] = '')
  step.value = 1
  submitted.value = false
  lastQuote.value = null
}
</script>
