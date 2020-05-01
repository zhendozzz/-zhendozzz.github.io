<template>
  <vs-card>
    <div slot="header">
      <vs-row vs-justify="center">
        <vs-input
          type="text"
          label-placeholder="Введите свой вопрос"
          v-model="nameInput"
          @keypress.enter="onEnter"
        />
      </vs-row>
    </div>
  </vs-card>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { format } from "date-fns";

@Component({})
export default class About extends Vue {
  nameInput = "";

  onEnter(): void {
    const date = new Date();
    this.$store
      .dispatch("addQuestion", {
        question: this.nameInput,
        date: format(date, "dd.MM.yyyy"),
        time: format(date, "HH:mm:ss"),
        order: new Date().getTime()
      })
      .then(() => {
        this.$router.push({ path: "/" });
      });
  }
}
</script>
