import { products } from '../data/products'
import { request, USE_MOCK } from '../api/client'
import { readStore, writeStore } from '../utils/format'

// Domain services isolate UI components from the eventual Spring Boot API.
export const productService = {
  list: async () => USE_MOCK ? products : request('/api/v1/products'),
  get: async (id) => USE_MOCK ? products.find(p => p.id === id || p.slug === id) : request(`/api/v1/products/${id}`),
  categories: async () => USE_MOCK ? [...new Set(products.map(p => p.category))] : request('/api/v1/categories')
}
export const authService = {
  login: async (email, password) => USE_MOCK ? ({ id:'demo-customer', name:email.split('@')[0], email }) : request('/api/v1/auth/login', { method:'POST', body:JSON.stringify({ email, password }) }),
  register: async (payload) => USE_MOCK ? ({ id:'demo-customer', ...payload }) : request('/api/v1/auth/register', { method:'POST', body:JSON.stringify(payload) })
}
export const categoryService = { list: async () => USE_MOCK ? [...new Set(products.map(p => p.category))] : request('/api/v1/categories') }
export const inventoryService = { availability: async (id) => USE_MOCK ? products.find(p=>p.id===id)?.stock ?? 0 : request(`/api/v1/inventory/${id}`) }
export const cartService = { sync: async (items) => USE_MOCK ? items : request('/api/v1/cart', { method:'PUT', body:JSON.stringify({ items }) }) }
export const wishlistService = { sync: async (ids) => USE_MOCK ? ids : request('/api/v1/wishlist', { method:'PUT', body:JSON.stringify({ productIds:ids }) }) }
export const orderService = {
  list: async () => USE_MOCK ? readStore('tv_orders', []) : request('/api/v1/orders'),
  createDemo: async (order) => { const saved = { ...order, id:`TV-${Date.now().toString().slice(-8)}`, createdAt:new Date().toISOString(), status:'Demo order placed' }; const all=readStore('tv_orders',[]); writeStore('tv_orders',[saved,...all]); return saved },
  create: async (order) => USE_MOCK ? orderService.createDemo(order) : request('/api/v1/orders', { method:'POST', body:JSON.stringify(order) })
}
export const checkoutService = { quote: async (items) => USE_MOCK ? ({ subtotal:items.reduce((s,i)=>s+i.price*i.quantity,0), shipping:items.length ? 0 : 0 }) : request('/api/v1/checkout/quote',{method:'POST',body:JSON.stringify({items})}) }