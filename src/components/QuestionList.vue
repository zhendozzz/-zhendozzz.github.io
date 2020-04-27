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
import * as fb from "firebase";

type QuestionType = {
  date: string;
  question: string;
  order: number;
  time: string;
};
@Component
export default class QuestionList extends Vue {
  usersRef = fb.database().ref("questions");
  questions: Array<QuestionType> = [];

  created(): void {
    const rawData: Array<QuestionType> = [];
    this.usersRef
      .orderByValue()
      .limitToLast(10)
      .on("value", a => {
        const resQuestions = a.val();
        for (const resQuestionsKey in resQuestions) {
          const item: QuestionType = resQuestions[resQuestionsKey];
          rawData.push({
            date: item.date,
            question: item.question,
            order: item.order,
            time: item.time
          });
        }
      });
    rawData.sort(function(b, a) {
      if (a.order > b.order) {
        return 1;
      }
      if (a.order < b.order) {
        return -1;
      }
      return 0;
    });
    this.questions = rawData;
  }
}
</script>
<style scoped></style>
