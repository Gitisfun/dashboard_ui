<template>
  <div>
      <apexchart ref="linechart" type="area" height="250" :options="options.chartOptions" :series="options.series"></apexchart>
  </div>
</template>

<script>
import lines from "../../logic/charts/lines.js";

export default {
  name: "LineChart",
  components: {
    InfoButton,
    Icon,
  },
  data() {
    return {
      firstLoad: true,
      options: null,
    };
  },
  created() {
    this.options = lines;
  },
  methods: {
    fetchData() {
        this.drawLine()
    },
    drawLine(name, data) {
      const keys = logic.getAllKeys(data);
      const values = Object.values(data).map(logic.replaceNullByZero);
      this.options.chartOptions.xaxis.categories = keys;
      this.options.series.push({
        name: name,
        data: values,
      });
      if (!this.firstLoad) {
        this.$refs.linechart.refresh();
      }
      this.firstLoad = false;
    },
    reload() {
      this.fetchData();
    },
    setDates() {
      this.currentMonth = dateHelper.getCurrentMonth();
      this.currentYear = dateHelper.getCurrentYear();
      this.months = dateHelper.getAllMonths();
      this.years = dateHelper.getYears();
    },

  },
  beforeDestroy() {

  },
};
</script>