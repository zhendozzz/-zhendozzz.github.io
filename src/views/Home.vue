<template>
  <div class="home">
    <vs-row vs-justify="center">
      <vs-button @click="ask" color="dark" type="border">Спросить</vs-button>
      <vs-chip>
        {{ isUserLoggedIn ? email : "Анонимно" }}
      </vs-chip>
      <vs-button
        v-if="isUserLoggedIn"
        @click="logout"
        color="dark"
        type="border"
      >
        Выход</vs-button
      >
      <vs-button v-else @click="logingIn" color="dark" type="border"
        >Вход</vs-button
      >
    </vs-row>
    <questionlist />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QuestionList from "@/components/QuestionList.vue";

@Component({
  components: { questionlist: QuestionList }
})
export default class Home extends Vue {
  get isUserLoggedIn() {
    return this.$store.getters.isUserLoggedIn;
  }
  get email() {
    return this.$store.getters.email;
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
