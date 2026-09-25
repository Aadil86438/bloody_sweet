<template>
  <div class="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
    <div class="text-center max-w-md">
      <div class="mb-6">
        <span class="font-serif text-6xl sm:text-8xl font-bold text-brand-burgundy/10">404</span>
      </div>
      <h1 class="font-serif text-2xl sm:text-3xl text-brand-cocoa mb-3">Page not found</h1>
      <p class="text-sm text-brand-cocoa-light mb-8 leading-relaxed">
        The page you're looking for doesn't exist or has been moved. Let us guide you back to sweetness.
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <router-link to="/" class="btn-primary text-xs">Back to Home</router-link>
        <router-link to="/menu" class="btn-secondary text-xs">Explore Menu</router-link>
      </div>
    </div>
  </div>
</template>
