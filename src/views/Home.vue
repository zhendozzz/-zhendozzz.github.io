<template>
  <div v-if="isUserInited" class="home">
    <vs-row vs-justify="center">
      <vs-button @click="ask" color="dark" type="border"
        >{{ $t("home_askbutton_text") }}
      </vs-button>
      <vs-chip>
        {{ isUserLoggedIn ? login : $t("home_anonimuslabel_text") }}
      </vs-chip>
      <vs-button
        v-if="isUserLoggedIn"
        @click="logout"
        color="dark"
        type="border"
      >
        {{ $t("home_exitbutton_text") }}
      </vs-button>
      <vs-button v-else @click="logingIn" color="dark" type="border"
        >{{ $t("home_enterbutton_text") }}
      </vs-button>
    </vs-row>
    <QuestionList />
  </div>
  <div v-else>
    <LoaderComponent></LoaderComponent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuestionList from "@/components/QuestionList.vue";
import LoaderComponent from "@/components/LoaderComponent.vue";

@Component({
  components: {
    QuestionList,
    LoaderComponent
  }
})
export default class Home extends Vue {
  get isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn;
  }

  get email() {
    return this.$store.getters.email;
  }

  get login() {
    return this.$store.getters.login;
  }

  get isUserInited() {
    return this.$store.getters.isUserInited;
  }

  ask(): void {
    this.$router.push({ path: "/new" });
  }

  logingIn(): void {
    this.$router.push({ path: "/login" });
  }

  logout(): void {
    this.$store.dispatch("logoutUser");
  }
}
</script>
