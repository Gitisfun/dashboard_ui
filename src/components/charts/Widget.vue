<template>
  <div class="widget-period-box">
      <div style="margin-bottom: 10px">
        <p id="widget-period-title">{{ title }}</p>
      </div>
      <div style="font-size: 14px;">
        <div style="margin-bottom: 10px;">
            <div><span>Aankopen</span><span style="float: right">€ {{ aankopen | nullByZeroFormatter }}</span></div>
        </div>
        <div style="margin-bottom: 10px">
            <div><span>Verkopen</span><span style="float: right">€ {{ verkopen | nullByZeroFormatter }}</span></div>
        </div>
        <div style="margin-bottom: 10px">
            <div><span>Creditnotas</span><span style="float: right">€ {{ creditnotas | nullByZeroFormatter }}</span></div>
        </div>
      </div>
  </div>
</template>

<script>
import StatisticsController from '../../api/calls/statistics'
import Widget from "../../logic/charts/widget"

export default {
    name: "Widget",
    props: {
        title: {
          type: String
        },
        period: {
          type: String
        }
    },
    data(){
      return {
        aankopen: null,
        verkopen: null,
        creditnotas: null,
        options: null,
      }
    },
    created(){
      this.options = Widget.bundle()

    },
    mounted(){
      this.fetchData()
    },
    methods: {
      fetchData(){
        StatisticsController.getWidgetForPeriod(this, this.options[this.period], (res) => {
          this.aankopen = res[0].data[0].totaal
          this.verkopen = res[1].data[0].totaal
          this.creditnotas = res[2].data[0].totaal
        })
      }
    }
}
</script>

<style>
.widget-period-box{
  border-radius: 5px;
  padding: 15px;
  /*
  background: white;
  */
  background: linear-gradient(#dff9fb, #dff9fb);
  margin-bottom: 10px;
}

#widget-period-title {
  font-weight: 700;
  font-size: 17px;
  color: black;
}

</style>