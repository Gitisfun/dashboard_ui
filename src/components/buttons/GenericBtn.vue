<template>
  <div id="generic-button" :class="[getBtnStyle, getSize]" @click="clicked" onselectstart="return false">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "GenericBtn",
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
  created(){
    console.log(this.size);
  },
  computed: {
    getBtnStyle(){
      console.log(this.btnStyle);
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
    },
    getSize(){
      console.log("--- size ---");
      console.log(this.size);
      console.log("------------");
      if(this.size == "normal"){
        return "normal"
      }
      else if(this.size == "large"){
        return "large"
      }
      else if(this.size == "small"){
        return "small"
      }
      return "normal"
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
#generic-button {
  border-radius: 5px 5px 5px 5px;
  display: inline-block;
  text-align: center;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 20px;
  padding-left: 20px;
  cursor: pointer;
}

#generic-button:hover {
  color: white;
  background: #81ecec;
  box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -webkit-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -moz-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  /*
  background: linear-gradient(-45deg, #81ecec, #7efff5, #32ff7e, #3ae374);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #ff4d4d, red);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #ffaf40, orange);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #4b4b4b, black);

	background-size: 400% 400%;
	animation: gradient 5s ease infinite;
  */
}


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
  
}

#generic-button:active {
  color: white;
  background: #bfe9ff;
  box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -webkit-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
  -moz-box-shadow: 0px 0px 25px 3px rgba(0, 174, 255, 0.3);
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
  background: #fcb001;
}
.delete-btn{
  color: white;
  background: red;
}

.small {
  font-size: 9px;
  font-weight: 700;
}

.normal {
   font-size: 11px; 
   font-weight: 700
}

.large{
  font-size: 16px; 
  font-weight: 500;
}

</style>
