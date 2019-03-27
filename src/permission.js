import router from './router'
import store from './store'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    console.log('token is exist')
    if (to.path === '/login') {
      next({path: '/'})
    }
    next()
  } else {
    console.log('token is not exist: ' + store.getters.token)
    if (whiteList.indexOf(to.path) >= 0) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
