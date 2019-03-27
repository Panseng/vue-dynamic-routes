import store from '@/store'
import { defaultRoutes, dynamicRoutes } from '@/router'

function hasPermission (roles, route) {
  if (!route.meta) return true
  return roles.some(role => route.meta.roles.indexOf(role) >= 0)
}

function accessRoutes (roles, routes) {
  let rs = []
  for (let route of routes) {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = accessRoutes(roles, route.children)
      }
      rs.push(route)
    }
  }
  return rs
}

export function computeRoutes (roles) {
  let tem = accessRoutes(roles, dynamicRoutes)
  let routes = defaultRoutes.concat(tem)
  store.commit('recordRoutes', routes)
}
