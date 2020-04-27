import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fb from "firebase";
import "@/plugins/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDulNOkjvSqbgUqjQ-je8Nv-r9rjXgGwFw",
      authDomain: "zhendozzzru.firebaseapp.com",
      databaseURL: "https://zhendozzzru.firebaseio.com",
      projectId: "zhendozzzru",
      storageBucket: "zhendozzzru.appspot.com",
      messagingSenderId: "507652298679",
      appId: "1:507652298679:web:70d274d01670a93d5dfa32"
    });
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoLoginUser", user);
      }
    });
  },
  render: h => h(App)
}).$mount("#app");