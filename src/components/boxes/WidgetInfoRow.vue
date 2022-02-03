<template>
  <div class="widget-total-row">
    <div class="widget-info-column-left">
        {{ formattedText }}
    </div>
    <div class="widget-info-column-middle">
        {{ formattedQuantity }}
    </div>
    <div class="widget-info-column-right">
        {{ formattedMoney }}
    </div>
  </div>
</template>

<script>
export default {
    name: "WidgetInfoRow",
    props: {
      isRowHidden: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      },
      quantity: {
        type: [String, Number]
      },
      money: {
        type: [String, Number]
      }
    },
    computed: {
      formattedText(){
        if(!this.isRowHidden) return this.text
        return "-"
      },
      formattedQuantity(){
        //console.log(this.quantity);
        if(this.isRowHidden) return "-"
        if(this.quantity) return this.quantity
        return "0"
      },
      formattedMoney(){
        if(this.isRowHidden) return "-"
        if(this.money) return `€ ${this.money}`
        return "€ 0"
      },
    }
}
</script>

<style>

.widget-total-row{
  box-sizing: border-box;
}
.widget-total-row:after {
  content: "";
  display: table;
  clear: both;
}

.widget-info-column-left {
  width: 48%;
  float: left;
}

.widget-info-column-middle {
  width: 12%;
  float: left;
  text-align: right;
}

.widget-info-column-right {
  width: 40%;
  float: left;
  text-align: right;
}
</style>