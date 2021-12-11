<template>
  <div>
    <label class="multilinetextinputfieldinputlabel" :for="name">{{ name }}</label>
    <div class="multilinegroup">
      <textarea placeholder="..." v-model="innerValue" class="multilinetextinputfieldinput" :name="name" rows="4" cols="50"/>
      <!--
        <b-tooltip class="multilineicon" label="Klik hier om een adres te zoeken" type="is-info is-light" position="is-left" multilined>
          -->
          <i class='bx bx-search-alt multilineicon' style="cursor: pointer" ></i>
       <!-- </b-tooltip> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MultilineTextInput",
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
.multilinetextinputfieldinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
}

.multilinegroup{
  width: 65%;
  position: relative;  
  display: inline-block;
}

.multilinetextinputfieldinput {
  resize: none;
  width: 100%;
  font-size: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 6px;
  outline: none;
}

.multilineicon{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>


<!--

<template>
  <div>
    <label class="multilinetextinputfieldinputlabel" :for="name">{{ name }}</label>
    <textarea placeholder="..." v-model="innerValue" class="multilinetextinputfieldinput" :name="name" rows="4" cols="50"/>
  </div>
</template>

<script>
export default {
  name: "MultilineTextInput",
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
.multilinetextinputfieldinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
vertical-align: top;
}

.multilinetextinputfieldinput {
    width: 65%;
    resize: none;
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 6px;
    outline: none;
}
</style>

-->
