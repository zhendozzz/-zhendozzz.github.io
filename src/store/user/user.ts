import Vue from "vue";
import Vuex from "vuex";
import * as fb from "firebase";

Vue.use(Vuex);
export default {
  state: {
    uid: null,
    email: null
  },
  mutations: {
    setUser(state: any, payload: firebase.User) {
      if (payload != null) {
        state.uid = payload.uid;
        state.email = payload.email;
      } else {
        state.uid = null;
        state.email = null;
      }
    }
  },
  getters: {
    uid(state: any) {
      return state.uid;
    },
    isUserLoggedIn(state: any) {
      return state.uid != null;
    },
    email(state: any) {
      return state.email;
    }
  },
  actions: {
    async registerUser({ commit }: any, payload: any) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        if (user.user) {
          const firebaseUser: firebase.User = user.user;
          commit("setUser", firebaseUser);
          commit("setLoading", false);
        }
      } catch (e) {
        commit("setError", e.reason);
        commit("setLoading", false);
        throw e;
      }
    },
    async loginUser({ commit }: any, payload: any) {
      commit("clearError");
      commit("setLoading", true);
      try {
        const user = await fb
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        if (user.user) {
          const firebaseUser: firebase.User = user.user;
          commit("setUser", firebaseUser);
          commit("setLoading", false);
        }
      } catch (e) {
        commit("setError", e.reason);
        commit("setLoading", false);
        throw e;
      }
    },
    async logoutUser({ commit }: any) {
      const user = await fb.auth().signOut();
      commit("setUser", user);
    },
    autoLoginUser({ commit }: any, payload: firebase.User) {
      commit("setUser", payload);
    }
  }
};
