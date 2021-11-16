<template>
  <div>
    <label class="normaltextinputfieldinputlabel" :for="name">{{ name }}</label>
    <input class="normaltextinputfieldinput" placeholder="..." :name="name" :type="type" v-model="innerValue" />
  </div>
</template>

<script>
export default {
  name: "NormalTextInputField",
  props: {
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
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
.normaltextinputfieldinputlabel {
  width: 35%;
  color: #0c2461;
  font-size: 14px;
  display: inline-block;
}
.normaltextinputfieldinput {
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
