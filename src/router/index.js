import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const DefPageOne = r => require.ensure([], () => r(require('@/views/defpageone/dpo')), 'DefPageOne')

export const defaultRoutes = [
  {
    path: '/',
    name: 'DefPageOne',
    component: DefPageOne
  }
]

export default new Router({
  routes: defaultRoutes
})
