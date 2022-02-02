<template>
  <div class="columns">
    <div class="column is-9">
      <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb);">
        <apexchart ref="linechart" type="area" height="300" :options="options.chartOptions" :series="options.series"></apexchart>
      </div>
    </div>
    <div class="column">
      <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb); height: 100%">
        <p style="font-weight: 900; color: black; margin-bottom: 15px">Legende</p> 
        <div class="columns">
          <div class="column">
            <b-select @input="changeMonth" size="is-small" v-model="currentMonth" placeholder="Maand" expanded>
                <option
                    v-for="option in months"
                    :value="option.id"
                    :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
          </div>
          <div class="column">
            <b-select @input="changeYear" size="is-small" v-model="currentYear" placeholder="Jaar" expanded>
                <option
                    v-for="option in years"
                    :value="option.id"
                    :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
          </div>
        </div>
        <div>
          <b-field>
              <b-checkbox :true-value="true" :false-value="false" size="is-small" type="is-info" v-model="isToggleAankopen" @input="toggleSeriesAankopen">Aankopen</b-checkbox>
          </b-field>
          <b-field>
              <b-checkbox size="is-small" type="is-success" v-model="isToggleVerkopen" @input="toggleSeriesVerkopen">Verkopen</b-checkbox>
          </b-field>
          <b-field>
              <b-checkbox size="is-small" type="is-warning" v-model="isToggleCreditnota" @input="toggleSeriesCreditnotas">Creditnotas</b-checkbox>
          </b-field>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import StatisticsController from '../../api/calls/statistics.js';
import lines from "../../logic/charts/lines.js";
import DateHelper from '../../logic/utils/dateHelper.js';
import UtilsFactory from '../../logic/utils/utilsFactory.js';

export default {
  name: "LineChart",
  data() {
    return {
      firstLoad: true,
      options: null,
      months: [],
      years: [],
      currentYear: null,
      currentMonth: null,
      isToggleAankopen: true,
      isToggleVerkopen: true,
      isToggleCreditnota: true
    };
  },
  created() {
    this.options = lines;
    this.setDates()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const list = DateHelper.getAllDaysInMonth(this.currentMonth, this.currentYear)
      StatisticsController.getLineChartForPeriod(this, list.days, (res) => {
        this.drawLine("Aankopen", res[0].data[0])
        this.drawLine("Verkopen", res[1].data[0])
        this.drawLine("Creditnotas", res[2].data[0])
        //this.checkToggleSeries()
      })
    },
    drawLine(name, data) {
      const keys = UtilsFactory.getAllKeys(data);
      const values = UtilsFactory.getAllValues(data).map(UtilsFactory.replaceNullByZero);
      this.options.chartOptions.xaxis.categories = keys;
      
      this.options.series.push({
        name: name,
        data: values,
      });
      /*

      this.$refs.linechart.updateSeries([{
        name: name,
        data: values
      }])

      */
      if (!this.firstLoad) {
        this.$refs.linechart.refresh();
      }
      this.firstLoad = false;
    },
    toggleSeriesAankopen(value){
      this.toggleSeries("Aankopen", value)
    },
    toggleSeriesVerkopen(value){
      this.toggleSeries("Verkopen", value)
    },
    toggleSeriesCreditnotas(value){
      this.toggleSeries("Creditnotas", value)
    },
    toggleSeries(name, value){
      if(value) this.$refs.linechart.showSeries(name)
      else this.$refs.linechart.hideSeries(name)
    },
    // TODO: Dit nog checken
    checkToggleSeries(){
      this.toggleSeriesAankopen(this.isToggleAankopen)
      this.toggleSeriesVerkopen(this.isToggleVerkopen)
      this.toggleSeriesCreditnotas(this.isToggleCreditnota)
    },
    setDates(){
      this.months = DateHelper.getAllMonths()
      this.years = DateHelper.getYears()
      this.currentMonth = DateHelper.getCurrentMonth()
      this.currentYear = DateHelper.getCurrentYear()
    },
    reload() {
      this.clearGraph();
      this.fetchData();
    },
    changeMonth(value){
      this.currentMonth = value
      const temp = {
        month: this.currentMonth,
        year: this.currentYear
      }
      this.$emit("changeDate", temp)
      this.reload()
    },
    changeYear(value){
      this.currentYear = value
      const temp = {
        month: this.currentMonth,
        year: this.currentYear
      }
      this.$emit("changeDate", temp)
      this.reload()
    },
    clearGraph() {
      this.options.series = [];
    },
  },
  beforeDestroy() {
    this.clearGraph()
  },
};
</script>