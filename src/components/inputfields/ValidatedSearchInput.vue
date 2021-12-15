
<template>
  <ValidationProvider tag="div" :rules="rules" :name="name" :vid="vid" v-slot="{ errors, valid }">
    <div class="search-container-box">
        <div class="searchinputlabel">{{ name }}</div>
        <div :class="{ searchinputvalue: valid || !errors[0], searchinputvalueerror: errors[0] }">
            <span v-if="hasValue"> {{ innerValue }} </span>
            <span v-else>...</span>
            <i id="input-search-box" class="bx bx-search-alt" @click="openModal" ></i>
            <input v-model="innerValue" type="hidden" />
        </div>
    </div>
    <span class="searchinputfielderror">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import ModalFactory from "../../logic/factories/modalFactory";
import { ValidationProvider } from "vee-validate";

export default {
  name: "ValidatedSearchInput",
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Number],
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
  data(){
    return {
        hasError: false,
        searchModal: null,
        innerValue: null,
        fullObject: null
    }
  },
  created(){
    this.innerValue = this.value
  },
  watch: {
    innerValue(val) {
      // allows us to use v-model on our input.
      this.$emit("input", val);
    },
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  computed: {
    hasValue(){
      if(this.innerValue == null || this.innerValue.length == 0){
        return false
      }
      return true
    },
  },
  methods: {
    setModal(modal){
      this.searchModal = modal
    },
    openModal(){
      ModalFactory.showModal(this, this.searchModal, (item) => {
        this.innerValue = item.naam
        this.fullObject = item
        this.$emit("changeto", item);

      })
    },
    getItem(){
      return this.fullObject
    }
  }
};
</script>

<style>
.search-container-box{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 35px;
  line-height: 35px;
  vertical-align: middle;
}
.searchinputlabel {
  width: 35%;
  color: black;
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  height: 100%;
}

.searchinputvalue {
  height: 35px;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: inline-block;
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

.searchinputvalueerror {
  height: 35px;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  display: inline-block;
  width: 65%;
  border: none;
  outline: none;
  font-size: 14px;
  background: white;
  -webkit-transition: 1.5s;
  transition: 1.5s;
  border: 1.7px solid red;  border-radius: 6px;
  padding: 0 15px;
  resize: none;
}

.searchinputfielderror {
  color: red;
  font-size: 12px;
}

#input-search-box{
  float: right;
  vertical-align: middle;
  line-height: 35px;
}

#input-search-box:hover{
  color: grey;
  cursor: pointer;
}

#input-search-box:active{
  color: #81ecec;
}

</style>