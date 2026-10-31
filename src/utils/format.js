export const money = (n) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(n)
export const readStore = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
export const writeStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch {} }