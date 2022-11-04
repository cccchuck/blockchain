export function getAuthToken() {
  return localStorage.getItem('token') || ''
}

export function setAuthToken(token: string) {
  return localStorage.setItem('token', token)
}
