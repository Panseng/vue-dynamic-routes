import router from './router'
import store from './store'
import { computeRoutes } from '@/utils/common'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (store.getters.token != null) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (!store.getters.userInfo.roles) {
        store.dispatch('GetInfo').then(() => {
          computeRoutes(store.getters.userInfo.roles)
          next()
        }).catch((error) => {
          console.log(error)
          store.dispatch('LogOut').then(() => {
            next({path: '/'})
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
