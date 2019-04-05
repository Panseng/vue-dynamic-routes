import Vue from 'vue'
import Router from 'vue-router'

// 懒加载组件
const DefPageOne = r => require.ensure([], () => r(require('@/views/defpageone/dpo')), 'DefPageOne')
const DefPageTwo = r => require.ensure([], () => r(require('@/views/defpagetwo/dpt')), 'DefPageTwo')
const Login = r => require.ensure([], () => r(require('@/views/login/log')), 'login')
const Layout = r => require.ensure([], () => r(require('@/views/layout/layout')), 'layout')

// 动态权限
const DynPageOne = r => require.ensure([], () => r(require('@/views/dynpageone/dpo')), 'DynPageOne')
const DynPageTwo = r => require.ensure([], () => r(require('@/views/dynpagetwo/dpt')), 'DynPageTwo')

Vue.use(Router)

export const defaultRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Default',
    component: Layout,
    redirect: '/defpo',
    children: [
      {
        path: 'defpo',
        name: 'DefPageOne',
        component: DefPageOne
      },
      {
        path: 'defpt',
        name: 'DefPageTwo',
        component: DefPageTwo
      }
    ]
  }
]

export const dynamicRoutes = [
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: Layout,
    redirect: '/dynamic/dynpo',
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'dynpo',
        name: 'DynPageOne',
        component: DynPageOne,
        meta: { roles: [ 'admin' ] }
      },
      {
        path: 'dynpt',
        name: 'DynPageTwo',
        component: DynPageTwo,
        meta: { roles: [ 'admin' ] }
      },
      {
        path: 'dynpth',
        name: 'Dy03',
        component: () => import('@/views/dynpagethree/dpth')
      },
      {
        path: 'dynpf',
        name: 'Dy04',
        component: () => import('@/views/dynpagefour/dpf')
      }
    ]
  }
]

export default new Router({
  routes: defaultRoutes
})
