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
      <LineChart />
    </div>
  </div>
</template>

<script>
import Widget from '../components/charts/Widget.vue';
import LineChart from '../components/charts/LineChart.vue';

export default {
  name: "Statistieken",
  components: {
    //Widget,
    Widget,
    LineChart,
  },
};
</script>