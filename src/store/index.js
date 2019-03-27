import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: null,
  userRoutes: [],
  token: null
}

const getters = {
  token: state => state.token
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
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
