// 定义了一些工具类函数去操作 localStorage
export function getAuthToken() {
  return localStorage.getItem('token') || ''
}

export function setAuthToken(token: string) {
  return localStorage.setItem('token', token)
}

export function removeAuthToken() {
  return localStorage.removeItem('token')
}

export function getUID() {
  let uid = localStorage.getItem('uid')
  if (uid) {
    return parseInt(uid)
  } else {
    return null
  }
}

export function setUID(uid: number) {
  return localStorage.setItem('uid', uid.toString())
}

export function removeUID() {
  return localStorage.removeItem('uid')
}
