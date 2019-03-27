// 封装sessionStorage的set\get\remove

export function setSessionStorage (key, value) {
  return sessionStorage.setItem(key, value)
}

export function getSessionStorage (key) {
  return sessionStorage.getItem(key)
}

export function removeSessionStorage (key) {
  return sessionStorage.removeItem(key)
}

export function clearSessionStorage () {
  return sessionStorage.clear()
}
