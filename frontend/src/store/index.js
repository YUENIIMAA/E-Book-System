import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userstatus: 'guest',
    userid: '0',
    username: '',
    userpwd: '',
    usertoken: '',
    activeIndex: '1',
    showUserPanel: false,
    showAdminPanel: false,
    allowLogin: true
  },
  getters: {
    getAllowLogin: function (state) {
      return state.allowLogin
    },
    getUserStatus: function (state) {
      return state.userstatus
    },
    getUserID: function (state) {
      return state.userid
    },
    getUsername: function (state) {
      return state.username
    },
    getAI: function (state) {
      return state.activeIndex
    },
    getSUP: function (state) {
      return state.showUserPanel
    },
    getSAP: function (state) {
      return state.showAdminPanel
    }
  },
  mutations: {
    setAllowLogin (state, allowlogin) {
      state.allowLogin = allowlogin
    },
    setUserStatus (state, userstatus) {
      state.userstatus = userstatus
    },
    setUserID (state, userid) {
      state.userid = userid
    },
    setUserName (state, username) {
      state.username = username
    },
    setUserPWD (state, userpwd) {
      state.userpwd = userpwd
    },
    setUserToken (state, usertoken) {
      state.usertoken = usertoken
    },
    setAI (state, activeindex) {
      state.activeIndex = activeindex
    },
    setSUP (state, showuserpanel) {
      state.showUserPanel = showuserpanel
    },
    setSAP (state, showadminpanel) {
      state.showAdminPanel = showadminpanel
    }
  },
  actions: {
    setAllowLogin (context, allowlogin) {
      context.commit('setAllowLogin', allowlogin)
    },
    setUserid (context, userid) {
      context.commit('setUserID', userid)
    },
    setUserstatus (context, userstatus) {
      context.commit('setUserStatus', userstatus)
    },
    setUsername (context, username) {
      context.commit('setUserName', username)
    },
    setUserpwd (context, userpwd) {
      context.commit('setUserPWD', userpwd)
    },
    insertUser (context, userstatus, userid, username, userpwd) {
      context.commit('setUserStatus', userstatus)
      context.commit('setUserID', userid)
      context.commit('setUserName', username)
      context.commit('setUserPWD', userpwd)
    },
    setActiveIndex (context, activeIndex) {
      context.commit('setAI', activeIndex)
    },
    setShowUserPanel (context, showUserPanel) {
      context.commit('setSUP', showUserPanel)
    },
    setShowAdminPanel (context, showAdminPanel) {
      context.commit('setSAP', showAdminPanel)
    }
  }
})

export default store
