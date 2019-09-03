import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userStatus:{
      userId:"",
      userName:"",
    },
    loginStatus:false,

  },
  mutations: {
    setUserStatus(state,userInfo){
      state.userStatus.userId = userInfo.userId;
      state.userStatus.userName = userInfo.userName;
      state.loginStatus = true;
    },
  },
  actions: {

  }
})
