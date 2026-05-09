/** Base URL de l’API Render / locale (sans slash final). */
export const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000').replace(
  /\/$/,
  ''
)

export const AUTH_TOKEN_KEY = 'dynesis_token'

export function authFetch(token: string, path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && init.body && typeof init.body === 'string') {
    headers.set('Content-Type', 'application/json')
  }
  return fetch(`${API_BASE_URL}${path}`, { ...init, headers })
}
