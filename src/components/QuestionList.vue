<template>
  <vs-row vs-justify="center">
    <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
      <vs-card v-for="question of questions" :key="question.order">
        <div slot="header">
          <h3>
            {{ question.question }}
          </h3>
        </div>
        <div>
          <span></span>
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
<style scoped></style>
