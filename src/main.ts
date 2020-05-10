import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as fb from "firebase";
import "@/plugins/index";
import { i18n } from "@/plugins/i18n/i18n";
import FlagIcon from "vue-flag-icon";

Vue.use(FlagIcon);
Vue.config.productionTip = false;

new Vue({
  i18n,
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
      const usersRef = fb.database().ref("users");
      usersRef
        .limitToLast(1)
        .orderByChild("uid")
        .equalTo(user != null ? user.uid : "-1")
        .on("value", a => {
          const resUsers = a.val();
          if (resUsers) {
            const resUsersKeys = Object.keys(resUsers);
            const first =
              resUsersKeys.length > 0 ? resUsers[resUsersKeys[0]] : {};
            if (first) {
              this.$store.dispatch("autoLoginUser", {
                uid: first.uid,
                login: first.login,
                email: first.email
              });
            }
          }
        });
    });
  },
  render: h => h(App)
}).$mount("#app");
