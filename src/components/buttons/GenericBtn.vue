<template>
  <div id="generic-button" :class="[getBtnStyle, getBtnSize]" @click="clicked" onselectstart="return false">
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
      else if(this.btnStyle == "secundary"){
        return "secundary-btn"
      }
      else if(this.btnStyle == "underlined"){
        return "underlined"
      }
      return "default-btn"
    },
    getBtnSize(){
      if(this.size == "normal"){
        return "normal-btn"
      }
      else if(this.size == "large"){
        return "large-btn"
      }
      else if(this.size == "small"){
        return "small-btn"
      }
      return "normal-btn"
    },
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
  animation: glow linear 2s infinite; 
  /*
  background: linear-gradient(-45deg, #81ecec, #7efff5, #32ff7e, #3ae374);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #ff4d4d, red);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #ffaf40, orange);
  background: linear-gradient(-45deg, #81ecec, #7efff5, #4b4b4b, black);

	background-size: 400% 400%;
	animation: gradient 5s ease infinite;
  */
}
@keyframes glow { 
    0% { background-color:#81ecec; }
    50% { background-color:#c7ecee; }
    100% { background-color:#81ecec; } 
}

/*
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
*/

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
.secundary-btn{
  color: black;
  background: #f5cd79;
}
.underlined{
  text-decoration: underline;
}

.small-btn {
  font-size: 8px;
  font-weight: 700;
}

.normal-btn {
   font-size: 11px; 
   font-weight: 700
}

.large-btn {
  font-size: 16px; 
  font-weight: 700;
}

</style>
