<template>
  <div class="min-h-screen">
    <!-- Hero -->
    <section class="bg-brand-cocoa py-16 sm:py-24">
      <div class="container-content text-center">
        <p class="text-brand-rose/50 text-xs tracking-[0.3em] uppercase font-medium mb-4">Catering & Events</p>
        <h1 class="font-serif text-hero text-brand-cream mb-4">Make Your Event<br />Unforgettable</h1>
        <p class="text-brand-cream/50 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
          From intimate gatherings to grand celebrations — we bring the sweetness to your special moments.
        </p>
        <router-link to="/quote?type=catering" class="btn-primary text-xs sm:text-sm px-8">
          Plan Your Event
        </router-link>
      </div>
    </section>

    <!-- Services -->
    <section class="section-padding bg-brand-ivory">
      <div class="container-content">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="font-serif text-section text-brand-cocoa">What We Offer</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div v-for="service in services" :key="service.title" class="card p-6 sm:p-8 text-center">
            <span class="text-3xl block mb-3">{{ service.icon }}</span>
            <h3 class="font-serif font-semibold text-brand-cocoa text-lg mb-2">{{ service.title }}</h3>
            <p class="text-sm text-brand-cocoa-light leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="section-padding bg-white">
      <div class="container-narrow text-center">
        <h2 class="font-serif text-section text-brand-cocoa mb-8 sm:mb-12">How It Works</h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div v-for="(step, i) in steps" :key="i" class="relative">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-blush flex items-center justify-center">
              <span class="font-serif font-bold text-brand-burgundy">{{ i + 1 }}</span>
            </div>
            <h3 class="font-serif font-semibold text-brand-cocoa mb-2">{{ step.title }}</h3>
            <p class="text-sm text-brand-cocoa-light leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
        <router-link to="/quote?type=catering" class="btn-primary text-xs mt-10 px-8">
          Get Started
        </router-link>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding-sm bg-brand-cocoa">
      <div class="container-narrow text-center">
        <h2 class="font-serif text-2xl sm:text-3xl text-brand-cream mb-4">Ready to plan something sweet?</h2>
        <p class="text-brand-cream/50 text-sm mb-8 max-w-md mx-auto">Contact us today and let's create something your guests will remember.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link to="/quote?type=catering" class="btn-primary text-xs px-8">Plan Your Event</router-link>
          <button @click="whatsappUs" class="btn-whatsapp text-xs px-8">
            <MessageCircle :size="16" />
            WhatsApp Us
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { MessageCircle } from 'lucide-vue-next'
import { openWhatsAppContact } from '../../services/whatsapp.js'

const services = [
  { icon: '💍', title: 'Weddings', description: 'Curated sweet tables, traditional boxes, and custom desserts for your special day.' },
  { icon: '🎂', title: 'Birthdays', description: 'Celebration cakes, party platters, and sweet surprises for all ages.' },
  { icon: '🏢', title: 'Corporate', description: 'Professional gift boxes, office celebrations, and client appreciation packages.' },
  { icon: '🎉', title: 'Parties', description: 'Sweet platters, dessert tables, and themed treats for any celebration.' },
  { icon: '🎁', title: 'Gifting', description: 'Premium gift boxes, festive hampers, and personalized sweet collections.' },
  { icon: '🍽️', title: 'Full Catering', description: 'Complete sweet and dessert catering for events of any scale.' },
]

const steps = [
  { title: 'Tell Us Your Vision', description: 'Share your event details, preferences, and budget. We listen carefully.' },
  { title: 'Receive Your Quote', description: 'We craft a custom proposal with curated selections tailored to your event.' },
  { title: 'Sit Back & Enjoy', description: 'We handle the preparation and delivery. You focus on making memories.' },
]

function whatsappUs() { openWhatsAppContact() }
</script>
