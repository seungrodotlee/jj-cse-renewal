import { createStore } from "vuex";

export default createStore({
  state: {
    userInfo: null,
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {},
  modules: {},
});
