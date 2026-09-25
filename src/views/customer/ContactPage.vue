<template>
  <div class="min-h-screen">
    <section class="bg-brand-cocoa py-12 sm:py-16">
      <div class="container-content text-center">
        <p class="text-brand-rose/50 text-xs tracking-[0.3em] uppercase font-medium mb-2">Get in Touch</p>
        <h1 class="font-serif text-section text-brand-cream mb-3">Contact Us</h1>
        <p class="text-brand-cream/50 text-sm max-w-md mx-auto">We'd love to hear from you. Reach out for orders, custom requests, or just to say hello.</p>
      </div>
    </section>

    <section class="section-padding bg-brand-ivory">
      <div class="container-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          <!-- Contact Info -->
          <div class="space-y-6">
            <div>
              <h2 class="font-serif text-xl text-brand-cocoa mb-4">Get in Touch</h2>
              <p class="text-sm text-brand-cocoa-light leading-relaxed">Whether it's a single brownie or a wedding catering order, we're here to make your moments sweeter.</p>
            </div>

            <div class="space-y-4">
              <a href="#" @click.prevent="whatsappUs"
                class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream hover:border-[#25D366] hover:shadow-card transition-all group"
              >
                <div class="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle :size="22" class="text-[#25D366]" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">WhatsApp Us</p>
                  <p class="text-xs text-brand-cocoa-light">Quick response, easy ordering</p>
                </div>
              </a>

              <div class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream">
                <div class="w-12 h-12 rounded-full bg-brand-blush/50 flex items-center justify-center shrink-0">
                  <Clock :size="22" class="text-brand-burgundy" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">Opening Hours</p>
                  <p class="text-xs text-brand-cocoa-light">Mon–Sat: 10 AM – 9 PM</p>
                </div>
              </div>

              <div class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream">
                <div class="w-12 h-12 rounded-full bg-brand-blush/50 flex items-center justify-center shrink-0">
                  <MapPin :size="22" class="text-brand-burgundy" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">Visit Us</p>
                  <p class="text-xs text-brand-cocoa-light">Orders Undertaken</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-6">
            <h2 class="font-serif text-xl text-brand-cocoa">Quick Actions</h2>
            <div class="space-y-3">
              <router-link to="/menu" class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream hover:border-brand-burgundy hover:shadow-card transition-all group">
                <div class="w-12 h-12 rounded-full bg-brand-blush/50 flex items-center justify-center shrink-0 group-hover:bg-brand-burgundy/10 transition-colors">
                  <UtensilsCrossed :size="22" class="text-brand-burgundy" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">Browse Our Menu</p>
                  <p class="text-xs text-brand-cocoa-light">Explore sweets, cakes, brownies & more</p>
                </div>
              </router-link>

              <router-link to="/quote" class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream hover:border-brand-burgundy hover:shadow-card transition-all group">
                <div class="w-12 h-12 rounded-full bg-brand-blush/50 flex items-center justify-center shrink-0 group-hover:bg-brand-burgundy/10 transition-colors">
                  <ClipboardList :size="22" class="text-brand-burgundy" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">Get a Quote</p>
                  <p class="text-xs text-brand-cocoa-light">Custom cakes, catering & bulk orders</p>
                </div>
              </router-link>

              <router-link to="/catering" class="flex items-center gap-4 p-4 rounded-brand-lg bg-white border border-brand-cream hover:border-brand-burgundy hover:shadow-card transition-all group">
                <div class="w-12 h-12 rounded-full bg-brand-blush/50 flex items-center justify-center shrink-0 group-hover:bg-brand-burgundy/10 transition-colors">
                  <PartyPopper :size="22" class="text-brand-burgundy" />
                </div>
                <div>
                  <p class="font-semibold text-sm text-brand-cocoa">Plan Your Event</p>
                  <p class="text-xs text-brand-cocoa-light">Weddings, birthdays & celebrations</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { MessageCircle, Clock, MapPin, UtensilsCrossed, ClipboardList, PartyPopper } from 'lucide-vue-next'
import { openWhatsAppContact } from '../../services/whatsapp.js'

function whatsappUs() { openWhatsAppContact() }
</script>
