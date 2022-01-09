<template>
  <ValidationProvider tag="div" :rules="rules" :name="name" :vid="vid" v-slot="{ errors, valid }">
    <label class="textinputfieldinputlabel" :for="name">{{ name }}</label>
    <input placeholder="..." :class="{ textinputfieldinput: !valid && !errors[0], errorinputcolor: errors[0], successinputcolor: valid }" :name="name" :type="type" v-model="innerValue" />
    <span class="textinputfielderror">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  name: "TextInputField",
  components: {
    ValidationProvider,
  },
  props: {
    value: {
      type: [String, Number, Date],
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
.textinputfieldinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
}
.errorinputcolor {
  height: 35px;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 20px;
  margin-bottom: 0px;
  width: 65%;
  outline: none;
  font-size: 14px;
  -webkit-transition: 1.5s;
  transition: 1.5s;
  border: 1.7px solid red;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.successinputcolor {
  height: 35px;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 20px;
  margin-bottom: 0px;
  width: 65%;
  border: none;
  outline: none;
  font-size: 14px;
  -webkit-transition: 1.5s;
  transition: 1.5s;
  background: white;
  /*border: 1.7px solid #0be881;*/
  border: 1.7px solid grey;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.textinputfieldinput {
  height: 35px;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 20px;
  margin-bottom: 0px;
  width: 65%;
  border: none;
  outline: none;
  font-size: 14px;
  background: white;
  border: 1.7px solid grey;
  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}
.textinputfielderror {
  color: red;
  font-size: 12px;
}
</style>
