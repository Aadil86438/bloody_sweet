import { createRouter, createWebHistory } from 'vue-router'

const CustomerLayout = () => import('../layouts/CustomerLayout.vue')
const AdminLayout = () => import('../layouts/AdminLayout.vue')

const routes = [
  // Customer routes
  {
    path: '/',
    component: CustomerLayout,
    children: [
      { path: '', name: 'home', component: () => import('../views/customer/HomePage.vue'), meta: { title: 'BLOODY Sweet by fafa — Premium Bakery & Sweets' } },
      { path: 'menu', name: 'menu', component: () => import('../views/customer/MenuPage.vue'), meta: { title: 'Our Menu — BLOODY Sweet by fafa' } },
      { path: 'menu/:slug', name: 'product', component: () => import('../views/customer/ProductPage.vue'), meta: { title: 'Product — BLOODY Sweet by fafa' } },
      { path: 'cart', name: 'cart', component: () => import('../views/customer/CartPage.vue'), meta: { title: 'Your Cart — BLOODY Sweet by fafa' } },
      { path: 'order/:id', name: 'order-confirmation', component: () => import('../views/customer/OrderConfirmation.vue'), meta: { title: 'Order Confirmation — BLOODY Sweet by fafa' } },
      { path: 'quote', name: 'quote', component: () => import('../views/customer/QuotePage.vue'), meta: { title: 'Get a Quote — BLOODY Sweet by fafa' } },
      { path: 'catering', name: 'catering', component: () => import('../views/customer/CateringPage.vue'), meta: { title: 'Catering — BLOODY Sweet by fafa' } },
      { path: 'contact', name: 'contact', component: () => import('../views/customer/ContactPage.vue'), meta: { title: 'Contact Us — BLOODY Sweet by fafa' } },
    ],
  },

  // Admin routes
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: { title: 'Admin Login — BLOODY Sweet', requiresGuest: true },
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('../views/admin/AdminDashboard.vue'), meta: { title: 'Dashboard — BLOODY Sweet Admin' } },
      { path: 'orders', name: 'admin-orders', component: () => import('../views/admin/OrdersView.vue'), meta: { title: 'Orders — BLOODY Sweet Admin' } },
      { path: 'orders/:id', name: 'admin-order-detail', component: () => import('../views/admin/OrderDetail.vue'), meta: { title: 'Order Detail — BLOODY Sweet Admin' } },
      { path: 'quotes', name: 'admin-quotes', component: () => import('../views/admin/QuotesView.vue'), meta: { title: 'Quotes — BLOODY Sweet Admin' } },
      { path: 'quotes/:id', name: 'admin-quote-detail', component: () => import('../views/admin/QuoteDetail.vue'), meta: { title: 'Quote Detail — BLOODY Sweet Admin' } },
      { path: 'products', name: 'admin-products', component: () => import('../views/admin/ProductsView.vue'), meta: { title: 'Products — BLOODY Sweet Admin' } },
      { path: 'products/:id', name: 'admin-product-edit', component: () => import('../views/admin/ProductForm.vue'), meta: { title: 'Edit Product — BLOODY Sweet Admin' } },
      { path: 'stock', name: 'admin-stock', component: () => import('../views/admin/StockView.vue'), meta: { title: 'Stock — BLOODY Sweet Admin' } },
      { path: 'money', name: 'admin-money', component: () => import('../views/admin/MoneyView.vue'), meta: { title: 'Money — BLOODY Sweet Admin' } },
      { path: 'business', name: 'admin-business', component: () => import('../views/admin/BusinessView.vue'), meta: { title: 'Business — BLOODY Sweet Admin' } },
      { path: 'settings', name: 'admin-settings', component: () => import('../views/admin/SettingsView.vue'), meta: { title: 'Settings — BLOODY Sweet Admin' } },
    ],
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found — BLOODY Sweet by fafa' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation guards
router.beforeEach((to, from, next) => {
  // Set page title  
  document.title = to.meta.title || 'BLOODY Sweet by fafa'

  // Auth guard for admin routes
  if (to.meta.requiresAuth) {
    const authData = localStorage.getItem('bs_auth')
    if (!authData) {
      return next({ name: 'admin-login', query: { redirect: to.fullPath } })
    }
  }

  // Guest guard (redirect if already logged in)
  if (to.meta.requiresGuest) {
    const authData = localStorage.getItem('bs_auth')
    if (authData) {
      return next({ name: 'admin-dashboard' })
    }
  }

  next()
})

export default router
