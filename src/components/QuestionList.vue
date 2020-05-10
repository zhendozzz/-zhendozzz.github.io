<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card v-for="question of questions" :key="question.order">
        <h3>
          {{ question.question }}
          <span v-if="question.login === login" class="buttons"
            ><vs-button
              @click="deleteQuestion(question.id)"
              color="danger"
              text-color="#aaff00"
              >Delete</vs-button
            ></span
          >
        </h3>
        <vs-row vs-justify="flex-end">
          {{ $t("from") }}
          {{ question.login != null ? question.login : $t("anonimous") }}
          {{ question.date }} {{ question.time }}
        </vs-row>
        <vs-row vs-justify="flex-end"> </vs-row>
        <div slot="footer"></div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class QuestionList extends Vue {
  get questions() {
    return this.$store.getters.questions;
  }

  get login() {
    return this.$store.getters.login || "";
  }

  deleteQuestion(id: string) {
    const dispatch = this.$store.dispatch;
    const settings = {
      type: "confirm",
      color: "danger",
      title: this.$t("deletion_confirm"),
      text: this.$t("are_you_sure?"),
      "accept-text": this.$t("accept"),
      "cancel-text": this.$t("cancel"),
      accept: function() {
        dispatch("deleteQuestion", id);
      }
    };
    this.$vs.dialog(settings);
  }

  created(): void {
    this.$store.dispatch("fetchQuestionList");
  }
}
</script>
<style scoped>
.addinfo {
  font-size: 10px;
  color: darkgrey;
}
.buttons {
  float: right;
  font-size: 10px;
}
</style>
