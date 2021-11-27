<template>
  <ValidationProvider :rules="rules" :name="name" :vid="vid" v-slot="{ errors, valid }">
    <label class="selectinputlabel" :for="name">{{ name }}</label>
    <select :class="{ selectinputfieldinput: !valid && !errors[0], selecterrorinputcolor: errors[0], selectsuccessinputcolor: valid }" v-model="innerValue">
      <slot />
    </select>
    <span class="selectinputerror">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider,
  },
  props: {
    // must be included in props
    value: {
      type: null,
    },
    rules: {
      type: [Object, String],
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    vid: {
      type: String,
    },
  },
  data: () => ({
    innerValue: "",
  }),
  watch: {
    // Handles internal model changes.
    innerValue(val) {
      this.$emit("input", val);
    },
    // Handles external model changes.
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
.selectinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
}
.selecterrorinputcolor {
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
.selectsuccessinputcolor {
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
.selectinputfieldinput {
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
.selectinputerror {
  color: red;
  font-size: 12px;
}
</style>
