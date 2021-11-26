
<template>
    <div>
        <div class="search-container-box">
            <div class="searchinputlabel">{{ name }}</div>
            <div :class="{ searchinputvalue: !hasError, searchinputvalueerror: hasError }">
                <span v-if="hasValue"> {{ value }} </span>
                <span v-else>...    </span>
                <i id="input-search-box" class="bx bx-search-alt" @click="openModal" ></i>
            </div>
        </div>
        <span v-if="hasError" class="searchinputfielderror">Dit veld is verplicht</span>
    </div>
        <!--
        -->
</template>

<script>
import ModalFactory from "../../logic/factories/modalFactory";
//import LeverancierModal from '../../modals/LeverancierModal.vue';

export default {
  name: "ValidatedSearch",
  props: {
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data(){
    return {
        hasError: false,
        searchModal: null,
        currentValue: null
    }
  },
  created(){
    this.currentValue = this.value
  },
  computed: {
    hasValue(){
      if(this.currentValue == null || this.currentValue.length == 0){
        return false
      }
      return true
    }
  },
  methods: {
    setModal(modal){
      this.searchModal = modal
    },
    setValue(value){
      this.currentValue = value
    },
    openModal(){
      ModalFactory.showModal(this, this.searchModal, (item) => {
        this.$emit("choose", item)
      })
      //this.$emit("openModal");
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
}

#input-search-box:active{
  color: #81ecec;
}

</style>