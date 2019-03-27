import Vue from 'vue'
import Vuex from 'vuex'
import { login, getInfo, logOut } from '@/utils/getData'
import { setSessionStorage, clearSessionStorage } from '@/utils/sessionStorage'

Vue.use(Vuex)

const state = {
  userInfo: {},
  userRoutes: [],
  token: null
}

const getters = {
  token: state => state.token,
  userRoutes: state => state.userRoutes,
  userInfo: state => state.userInfo
}

const mutations = {
  recordUserInfo (state, info) {
    state.userInfo = info
  },

  recordRoutes (state, routes) {
    state.userRoutes = routes
  },

  recordToken (state, token) {
    state.token = token
  }
}

const actions = {
  Login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo.username, userInfo.password).then((res) => {
        commit('recordToken', res.data.token)
        setSessionStorage('token', res.data.token)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  GetInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
        commit('recordUserInfo', res.data.userInfo)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },

  LogOut ({ commit }) {
    console.log('Log Out Action')
    return new Promise((resolve, reject) => {
      logOut().then(() => {
        commit('recordUserInfo', null)
        commit('recordRoutes', [])
        commit('recordToken', null)
        clearSessionStorage()
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
