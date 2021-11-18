<template>
  <div id="add-button" :class="getBtnStyle" @click="clicked" onselectstart="return false">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    text: String,
    btnStyle: {
      type: String
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    getBtnStyle(){
      if(this.btnStyle == "success"){
        return "success-btn"
      }
      else if(this.btnStyle == "warning"){
        return "warning-btn"
      }
      else if(this.btnStyle == "danger"){
        return "delete-btn"
      }
      return "default-btn"
    }
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    },
  },
};
</script>

<style>
#add-button {
  border-radius: 5px 5px 5px 5px;
  font-size: 11px;
  font-weight: 700;
  height: 100%;
  display: inline-block;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
}
#add-button:hover {
  color: white;
  background: rgb(47, 79, 79, 0.75);
  box-shadow: 0px 0px 25px 3px rgba(0, 255, 0, 0.3);
  -webkit-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -moz-box-shadow: 0px 0px 25px 3px rgba(0, 225, 255, 0.3);
}
#add-button:active {
  color: white;
  background: #bfe9ff;
  box-shadow: 0px 0px 25px 3px rgba(0, 255, 0, 0.3);
  -webkit-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -moz-box-shadow: 0px 0px 25px 3px rgba(0, 225, 255, 0.3);
}

.default-btn{
  color: white;
  background: black;
}
.success-btn{
  color: white;
  background: #0be881;
}
.warning-btn{
  color: white;
  background: #ff9f43;
}
.delete-btn{
  color: white;
  background: red;
}

.small {
  font-size: 11px;
}

.normal {
  font-size: 12px;
}
</style>
