const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const STORE_ID = import.meta.env.VITE_STORE_ID || 'techvault'
const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false' || !BASE_URL

export async function request(path, options = {}) {
  if (USE_MOCK) throw new Error('Mock adapter is active. Use the domain services for demo data.')
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type':'application/json', 'X-Store-Id':STORE_ID, ...options.headers }
  })
  if (!response.ok) throw new Error(`API request failed (${response.status})`)
  return response.status === 204 ? null : response.json()
}
export { STORE_ID, USE_MOCK, BASE_URL }