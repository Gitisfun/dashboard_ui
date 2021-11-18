<template>
  <div>
    <label class="normalselectinputlabel" :for="name">{{ name }}</label>
    <select class="normalselectinputfieldinput" v-model="innerValue" :name="name" placeholder="...">
      <slot />
    </select>
  </div>
</template>

<script>
export default {
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
      // allows us to use v-model on our input.
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
.normalselectinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
    font-size: 14px;
  display: inline-block;
}
.normalselectinputfieldinput {
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
</style>
