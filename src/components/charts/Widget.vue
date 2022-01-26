<template>
  <div class="widget-box" :style="`background-image: linear-gradient(${colorOne}, ${colorTwo})`">
    <div class="columns">
      <div class="column">
        <p id="widget-title" :style="`color: ${colorTitle}`">{{ title }}</p>
        <p class="widget-text-left">Geleverd:</p>
        <p class="widget-text-left">Betaald:</p>
        <p class="widget-text-left">Totaal:</p>

      </div>
      <div class="column">
        <p class="widget-title-right">€ {{ getTotal }}</p>
        <p class="widget-text">60</p>
        <p class="widget-text">90</p>
        <p class="widget-text">150</p>
      </div>
    </div>
    <b-progress 
      :value="45" 
      size="is-normal" 
      :type="getColor"
      show-value>75 / 100</b-progress>
  </div>
</template>

<script>
export default {
  name: "Widget",
  props: {
    title: String,
    total: String,
    colorTitle: String,
    colorOne: String,
    colorTwo: String,
  },
  computed: {
    getTotal() {
      if (this.total) {
        return this.total;
      }
      return "0.00";
    },
    getColor(){
      if(this.title === "Aankopen") return "is-danger"
      if(this.title === "Verkopen") return "is-warning"
      if(this.title === "Creditnotas") return "is-info"
      //if(this.title === "Totaal") 
      return "is-success"
    }
  },
};
</script>

<style>
.widget-box{
  border-radius: 5px;
  padding: 15px
}

#widget-title {
  font-weight: 700;
  font-size: 20px;
  color: black;
  margin-bottom: 5px;
}

.widget-title-right{
  font-weight: 700;
  font-size: 20px;
  color: black;
  text-align: right;
  margin-bottom: 5px;
}
.widget-text {
  font-weight: 400;
  text-align: right;
  color: grey;
}
.widget-text-left {
  font-weight: 400;
  text-align: left;
  color: grey;
}
</style>