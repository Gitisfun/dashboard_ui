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
  color: #0c2461;
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
  /* border: none; */
  /* border-color: red; */
  outline: none;
  font-size: 14px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  /* background: red; */
  /* background: #FF7F7F; */
  border: 1.7px solid #ff7f7f;
  /* background: #9aecdb; */
  /* background: #dff9fb; */
  /* background: #f7f1e3; */

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
  -webkit-transition: 0.5s;
  transition: 0.5s;
  /* background: #f0f1f8; */
  background: white;
  border: 1.7px solid #9aecdb;

  /* background: #dff9fb; */
  /* background: #f7f1e3; */

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
  /* background: #f0f1f8; */
  background: white;
  /* background: #9aecdb; */
  /* background: #dff9fb; */
  /* background: #f7f1e3; */
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
