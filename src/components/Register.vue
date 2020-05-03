<template>
  <vs-card>
    <div slot="header">
      <vs-row vs-justify="center">
        <h3>
          {{ $t("register_registrationbutton_text") }}
        </h3>
      </vs-row>
      <vs-row vs-justify="center">
        <vs-button to="/login" type="flat">
          {{ $t("register_autorization_text") }}
        </vs-button>
      </vs-row>
    </div>
    <div slot="extra-content">
      <vs-row vs-justify="center">
        <vs-input
          color="dark"
          type="email"
          :label-placeholder="$t('register_emailinput_placeholder')"
          :danger="email.danger"
          :danger-text="email.dangertext"
          v-model="email.value"
          @input="validateEmail"
        />
      </vs-row>

      <vs-row vs-justify="center">
        <vs-input
          color="dark"
          type="password"
          :label-placeholder="$t('register_passwordinput_placeholder')"
          :danger="password.danger"
          :danger-text="password.dangerText"
          v-model="password.value"
          @input="validatePassword"
        />
      </vs-row>
      <div slot="footer">
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col vs-type="flex" vs-justify="center" vs-align="center">
            <vs-button color="dark" @click="back" type="flat">
              {{ $t("register_backbutton_text") }}
            </vs-button>
            <vs-button color="dark" :disabled="!validateForm" @click="register">
              {{ $t("register_registerbutton_text") }}
            </vs-button>
          </vs-col>
        </vs-row>
      </div>
    </div>
  </vs-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class Register extends Vue {
  email = {
    success: false,
    danger: false,
    value: "",
    dangertext: ""
  };

  password = {
    success: false,
    danger: false,
    value: "",
    dangertext: ""
  };
  $vs: any;

  validatePassword() {
    const passwordStore = this.password;
    if (passwordStore.value.length < 6) {
      passwordStore.success = false;
      passwordStore.danger = true;
      passwordStore.dangertext = "Слишком короткий пароль";
    } else {
      passwordStore.success = true;
      passwordStore.danger = false;
      passwordStore.dangertext = "";
    }
  }
  validateEmail() {
    const emailStore = this.email;
    const value = emailStore.value;
    const regExp = RegExp(/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    if (value.match(regExp)) {
      emailStore.success = true;
      emailStore.danger = false;
      emailStore.dangertext = "";
    } else {
      emailStore.success = false;
      emailStore.danger = true;
      emailStore.dangertext = "Некорректный формат email";
    }
  }

  get validateForm() {
    return this.email.success && this.password.success;
  }

  register() {
    this.$store
      .dispatch("registerUser", {
        email: this.email.value,
        password: this.password.value
      })
      .then(() => {
        this.$router.push("/");
      })
      .catch(err => {
        this.$vs.notify({
          title: "Ошибка",
          text: err.message,
          position: "top-center",
          color: "danger"
        });
      });
  }
  back() {
    this.$router.push("/");
  }
}
</script>

<style scoped></style>
