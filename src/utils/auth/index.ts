export function getAuthToken() {
  return localStorage.getItem('token') || null
}

export function setAuthToken(token: string) {
  return localStorage.setItem('token', token)
}
