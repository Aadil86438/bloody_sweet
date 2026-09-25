<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-brand-cocoa overflow-hidden min-h-[80vh] sm:min-h-[85vh] flex items-center">
      <!-- Background decorative elements -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-40 h-40 rounded-full bg-brand-burgundy blur-3xl"></div>
        <div class="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-brand-cherry blur-3xl"></div>
      </div>

      <div class="container-site relative z-10 py-16 sm:py-20">
        <div class="max-w-2xl">
          <p class="text-brand-rose/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 sm:mb-6 font-sans font-medium">
            BAKERY • JUICES • SWEETS
          </p>
          <h1 class="font-serif font-bold text-hero text-brand-cream leading-[1.1] mb-4 sm:mb-6">
            BLOODY Sweet<br />
            <span class="text-brand-rose/80 italic font-normal text-[0.6em]">by fafa</span>
          </h1>
          <p class="text-brand-cream/60 text-base sm:text-lg leading-relaxed max-w-md mb-8 sm:mb-10 font-light">
            Made fresh.<br />
            Made to be remembered.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <router-link to="/menu" class="btn-primary text-xs sm:text-sm px-8">
              Explore Menu
            </router-link>
            <button @click="orderOnWhatsApp" class="btn-whatsapp text-xs sm:text-sm px-8">
              <MessageCircle :size="16" />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>

      <!-- Subtle cherry motif -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-burgundy/30 to-transparent"></div>
    </section>

    <!-- Signature Collection -->
    <section class="section-padding bg-brand-ivory">
      <div class="container-content">
        <div class="text-center mb-8 sm:mb-12">
          <p class="text-brand-burgundy text-xs tracking-[0.3em] uppercase font-medium mb-2">Our Finest</p>
          <h2 class="font-serif text-section text-brand-cocoa">Signature Collection</h2>
        </div>
        <div class="product-grid">
          <ProductCard v-for="product in signatureProducts" :key="product.id" :product="product" />
        </div>
        <div v-if="signatureProducts.length === 0" class="text-center py-12">
          <p class="text-brand-cocoa-light text-sm">Our signatures are being curated.</p>
        </div>
      </div>
    </section>

    <!-- Trending Now -->
    <section class="section-padding bg-white">
      <div class="container-content">
        <div class="text-center mb-8 sm:mb-12">
          <p class="text-brand-cherry text-xs tracking-[0.3em] uppercase font-medium mb-2">Popular right now</p>
          <h2 class="font-serif text-section text-brand-cocoa">Trending Now</h2>
        </div>
        <div class="product-grid">
          <ProductCard v-for="product in trendingProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section-padding bg-brand-ivory">
      <div class="container-content">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="font-serif text-section text-brand-cocoa">Explore Our Menu</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <router-link v-for="cat in categories" :key="cat.id" :to="`/menu?category=${cat.slug}`"
            class="group text-center p-4 sm:p-6 rounded-brand-lg bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
          >
            <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-brand-blush/50 flex items-center justify-center group-hover:bg-brand-burgundy/10 transition-colors">
              <UtensilsCrossed :size="20" class="text-brand-burgundy sm:w-6 sm:h-6" />
            </div>
            <h3 class="font-serif font-semibold text-sm text-brand-cocoa">{{ cat.name }}</h3>
            <p class="text-[10px] text-brand-cocoa-light mt-1 hidden sm:block">{{ cat.description }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Occasions -->
    <section class="section-padding bg-brand-cocoa">
      <div class="container-content">
        <div class="text-center mb-8 sm:mb-12">
          <p class="text-brand-rose/50 text-xs tracking-[0.3em] uppercase font-medium mb-2">For every moment</p>
          <h2 class="font-serif text-section text-brand-cream">Sweet Occasions</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <router-link v-for="occ in occasions" :key="occ.id" :to="`/quote?type=${occ.id}`"
            class="group text-center p-4 sm:p-6 rounded-brand-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <span class="text-2xl sm:text-3xl block mb-2">{{ occ.icon }}</span>
            <h3 class="font-serif font-semibold text-sm text-brand-cream">{{ occ.name }}</h3>
            <p class="text-[10px] text-brand-cream/50 mt-1 hidden sm:block">{{ occ.description }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Custom Creations CTA -->
    <section class="section-padding bg-brand-blush">
      <div class="container-narrow text-center">
        <Cherry :size="36" class="text-brand-burgundy/20 mx-auto mb-4" />
        <h2 class="font-serif text-section text-brand-cocoa mb-3">Have something special in mind?</h2>
        <p class="text-brand-cocoa-light text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          From custom cakes to bulk sweets, from wedding catering to corporate gifting — we bring your sweet vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <router-link to="/quote" class="btn-primary text-xs sm:text-sm px-8">
            Get a Quote
          </router-link>
          <router-link to="/catering" class="btn-secondary text-xs sm:text-sm px-8">
            Plan Your Event
          </router-link>
        </div>
      </div>
    </section>

    <!-- Official Menu & Brand Flyers Gallery Section -->
    <section class="section-padding bg-brand-cream/30">
      <div class="container-content">
        <div class="text-center max-w-xl mx-auto mb-10">
          <p class="text-brand-burgundy text-xs tracking-[0.3em] uppercase font-medium mb-2">Authentic Catalog</p>
          <h2 class="font-serif text-section text-brand-cocoa mb-3">Official Brand Flyers & Menu</h2>
          <p class="text-brand-cocoa-light text-sm">View our original hand-drawn menu flyers, official sweet list, and Instagram QR code.</p>
          <div class="mt-6 flex justify-center">
            <button @click="downloadMenu" class="btn-primary text-xs px-6 flex items-center gap-2">
              <Download :size="16" /> Download PDF Menu Catalog
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div class="card overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="aspect-[3/4] overflow-hidden bg-white">
              <img src="/images/full-brand-menu.jpeg" alt="Official Menu Flyer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-4 text-center bg-white">
              <h3 class="font-serif font-semibold text-brand-cocoa text-sm">Full Menu & Price List</h3>
              <p class="text-xs text-brand-cocoa-light mt-1">Signature Muttā Mittai, Tres Leches & Juices</p>
            </div>
          </div>

          <div class="card overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="aspect-[3/4] overflow-hidden bg-white">
              <img src="/images/handdrawn-menu.jpeg" alt="Handdrawn Sweet Treats Menu" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-4 text-center bg-white">
              <h3 class="font-serif font-semibold text-brand-cocoa text-sm">Sweet Treats & Cool Drinks</h3>
              <p class="text-xs text-brand-cocoa-light mt-1">Traditional handdrawn price list</p>
            </div>
          </div>

          <div class="card overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div class="aspect-[3/4] overflow-hidden bg-white">
              <img src="/images/brand-hero-banner.jpeg" alt="Brand Poster & Contact" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-4 text-center bg-white">
              <h3 class="font-serif font-semibold text-brand-cocoa text-sm">Official Brand Poster</h3>
              <p class="text-xs text-brand-cocoa-light mt-1">Saleem Basha | 9840293144</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="section-padding bg-white">
      <div class="container-narrow text-center">
        <p class="text-brand-burgundy text-xs tracking-[0.3em] uppercase font-medium mb-4">Our Story</p>
        <h2 class="font-serif text-section text-brand-cocoa mb-6">Crafted with Passion</h2>
        <p class="text-brand-cocoa-light leading-relaxed text-sm sm:text-base max-w-lg mx-auto">
          At BLOODY Sweet by fafa, every sweet is a story. We combine traditional recipes with modern artistry to create desserts that aren't just eaten — they're experienced. Each piece is handcrafted with the finest ingredients, made fresh, and presented with love.
        </p>
        <div class="mt-8 flex items-center justify-center gap-8 text-brand-cocoa-light/40 text-xs tracking-widest uppercase">
          <span>Handcrafted</span>
          <span class="w-1 h-1 rounded-full bg-brand-burgundy/30"></span>
          <span>Fresh Daily</span>
          <span class="w-1 h-1 rounded-full bg-brand-burgundy/30"></span>
          <span>Made with Love</span>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section-padding-sm bg-brand-ivory border-t border-brand-cream">
      <div class="container-content">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 class="font-serif text-xl sm:text-2xl text-brand-cocoa mb-1">Visit us or place an order</h3>
            <p class="text-sm text-brand-cocoa-light">Orders undertaken for all occasions</p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <router-link to="/contact" class="btn-secondary text-xs px-6">
              Contact Us
            </router-link>
            <button @click="orderOnWhatsApp" class="btn-whatsapp text-xs px-6">
              <MessageCircle :size="16" />
              WhatsApp Us
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Cherry, UtensilsCrossed, MessageCircle, Download } from 'lucide-vue-next'
import ProductCard from '../../components/product/ProductCard.vue'
import { useProductsStore } from '../../stores/products.js'
import { occasions } from '../../services/mockData.js'
import { openWhatsAppContact } from '../../services/whatsapp.js'
import { downloadMenuPDF } from '../../services/pdf.js'

const productsStore = useProductsStore()

const signatureProducts = computed(() => productsStore.signatureProducts.slice(0, 4))
const trendingProducts = computed(() => productsStore.trendingProducts.slice(0, 4))
const categories = computed(() => productsStore.categories)

function orderOnWhatsApp() {
  openWhatsAppContact()
}

function downloadMenu() {
  downloadMenuPDF()
}
</script>
