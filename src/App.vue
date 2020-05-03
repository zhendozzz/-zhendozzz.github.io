<template>
  <div id="app">
    <a
      href=""
      v-if="getCurrentLocale() === 'ru'"
      class="i18nflag"
      @click.prevent="setCurrentLocale('en')"
    >
      <flag iso="us"></flag>
    </a>
    <a
      href=""
      v-if="getCurrentLocale() === 'en'"
      class="i18nflag"
      @click.prevent="setCurrentLocale('ru')"
    >
      <flag iso="ru"></flag>
    </a>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class App extends Vue {
  getCurrentLocale() {
    return this.$i18n.locale;
  }
  setCurrentLocale(locale: string) {
    this.$i18n.locale = locale;
  }
}
</script>
<style>
.i18nflag {
  float: right;
  margin: 2px 2px 2px 2px;
}
</style>
