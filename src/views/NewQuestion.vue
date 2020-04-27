<template>
  <div>
    <label>
      <input
        type="text"
        v-model="nameInput"
        placeholder="Введите свой вопрос"
        @keypress.enter="onEnter()"
      />
    </label>
  </div>
</template>
<script lang="ts">
import QuestionList from "@/components/QuestionList.vue";
import { Vue, Component } from "vue-property-decorator";
import * as fb from "firebase";
import { format } from "date-fns";

@Component({
  components: { questionlist: QuestionList }
})
export default class About extends Vue {
  usersRef = fb.database().ref("questions");
  nameInput = "";

  onEnter(): void {
    const date = new Date();
    this.usersRef.push({
      question: this.nameInput,
      date: format(date, "dd.MM.yyyy"),
      time: format(date, "HH:mm:ss"),
      order: new Date().getTime()
    });
    this.$router.push({ path: "/" });
  }
}
</script>
