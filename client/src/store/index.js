import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sObjLogs: [],
    sBlnDark: false,
    sBlnDrawer: true,
    sBlnSortByAsc: false,
    sStrColorBackground: "#D2D2D2",
    sStrColorBubleSender: "transaprent",
    sStrColorBubleSelf: "transaprent",
    sStrColorAttachment: "transaprent",
  },
  mutations: {
    CHANGE_sObjLogs: (state, data) => {
      state.sObjLogs = data
    },
    CHANGE_sBlnDark: (state, data) => {
      state.sBlnDark = data
    },
    CHANGE_sBlnDrawer: (state, data) => {
      state.sBlnDrawer = data
    },
    CHANGE_sBlnSortByAsc: (state, data) => {
      state.sBlnSortByAsc = data
    },
    CHANGE_sStrColorBackground: (state, data) => {
      state.sStrColorBackground = data
    },
    CHANGE_sStrColorBubleSender: (state, data) => {
      state.sStrColorBubleSender = data
    },
    CHANGE_sStrColorBubleSelf: (state, data) => {
      state.sStrColorBubleSelf = data
    },
    CHANGE_sStrColorAttachment: (state, data) => {
      state.sStrColorAttachment = data
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
