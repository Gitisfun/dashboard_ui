<template>
  <ValidationProvider tag="div" :rules="rules" :name="name" :vid="vid" v-slot="{ errors, valid }">
    <input placeholder="..." :class="{ logintextinputfieldinput: !valid && !errors[0], loginerrorinputcolor: errors[0], loginsuccessinputcolor: valid }" :name="name" :type="type" v-model="innerValue" />
    <span class="logintextinputfielderror">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "LoginTextInputField",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    rules: {
      type: [String, Object],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    vid: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    innerValue(val) {
      // allows us to use v-model on our input.
      this.$emit("input", val);
    },
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>

<style>

.loginerrorinputcolor {
  width: 100%;
  height: 35px;
  outline: none;
  font-size: 14px;
  -webkit-transition: 1.5s;
  transition: 1.5s;
  border: 1.7px solid red;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.loginsuccessinputcolor {
    width: 100%;
  height: 35px;
  border: none;
  outline: none;
  font-size: 14px;
  -webkit-transition: 1.5s;
  transition: 1.5s;
  background: white;
  border: 1.7px solid #0be881;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.logintextinputfieldinput {
    width: 100%;
  height: 35px;
  border: none;
  outline: none;
  font-size: 14px;
  background: white;
  border: 1.7px solid grey;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.logintextinputfielderror {
  color: red;
  font-size: 12px;
}
</style>
