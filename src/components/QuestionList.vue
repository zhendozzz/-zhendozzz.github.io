<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card v-for="question of questions" :key="question.order">
        <div slot="header">
          <h3>
            {{ question.question }}
          </h3>
        </div>
        <div class="addinfo">
          <vs-row vs-justify="flex-end">
            {{ $t("from") }}
            {{ question.login != null ? question.login : $t("anonimous") }}
          </vs-row>
          <vs-row vs-justify="flex-end">
            {{ question.date }} {{ question.time }}
          </vs-row>
        </div>
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
</style>
