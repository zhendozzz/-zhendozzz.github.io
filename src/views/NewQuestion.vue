<template>
  <vs-card>
    <div slot="header">
      <vs-row vs-justify="center">
        <vs-col vs-type="flex" vs-justify="center" vs-align="center">
          <vs-input
            color="dark"
            type="text"
            label-placeholder="Введите свой вопрос"
            v-model="question"
            @keypress.enter="onEnter"
          />
        </vs-col>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center">
          <vs-button :disabled="!validateForm()" @click="onEnter" color="dark">
            {{ $t("login_enterbutton_text") }}
          </vs-button>
        </vs-col>
      </vs-row>
    </div>
  </vs-card>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { format } from "date-fns";

@Component({})
export default class NewQuestion extends Vue {
  question = "";

  onEnter(): void {
    const date = new Date();
    this.$store
      .dispatch("addQuestion", {
        question: this.question,
        date: format(date, "dd.MM.yyyy"),
        time: format(date, "HH:mm:ss"),
        order: new Date().getTime(),
        user: this.$store.getters.isUserLoggedIn
      })
      .then(() => {
        this.$router.push({ path: "/" });
      });
  }

  validateForm() {
    return this.question.length > 2;
  }

  enterEmailPressed() {
    if (this.validateForm()) {
      this.onEnter();
    }
  }
}
</script>
