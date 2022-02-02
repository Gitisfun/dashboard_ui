<template>
  <div class="content-body">
    <div>
      <div class="columns">
        <div class="column">
          <Widget title="Vandaag" period="today" />
        </div>
        <div class="column">
          <Widget title="Week" period="week" />
        </div>
        <div class="column">
          <Widget title="Maand" period="month" />
        </div>
        <div class="column">
          <Widget title="Jaar" period="year" />
        </div>
      </div>
    </div>
    <div style="margin-bottom: 10px">
      <LineChart @changeDate="changeDate" />
    </div>
    <div style="margin-bottom: 10px">
      <WidgetTotalBox ref="widgetotalbox" :period="period"/>
    </div>
  </div>
</template>

<script>
import Widget from '../components/charts/Widget.vue';
import LineChart from '../components/charts/LineChart.vue';
import WidgetTotalBox from '../components/boxes/WidgetTotalBox.vue';
import DateHelper from '../logic/utils/dateHelper';

export default {
  name: "Statistieken",
  components: {
    //Widget,
    Widget,
    LineChart,
    WidgetTotalBox,
  },
  data(){
    return {
      period: null,
    }
  },
  created(){
    this.period = DateHelper.getStartAndEndOfMonth(null, null)
  },
  mounted(){
    
    },
  methods: {
    changeDate(value){
      this.period = DateHelper.getStartAndEndOfMonth(value.month, value.year)
      this.$refs.widgetotalbox.refreshAll(this.period)
    },
  }

  //mixins: [socketMixin],

};
</script>

<style></style>
