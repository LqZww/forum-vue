import Vue from 'vue'
import Vuex from 'vuex'

import { getCookie } from '../assets/js/cookie.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cookie: getCookie('name'),
    acookie: getCookie('aname'),
    userid: "",
    name: ""

  },
  mutations: {
    getuserid(state, userid) {
      state.userid = userid
    },
    getusername(state, name) {
      state.name = name
    },
  },
  actions: {

  },
  modules: {

  },
  getters: {

  }
})
