<template>
  <div>
    <div class="columns">
      <div class="column is-9">
        <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb);">
          <apexchart ref="linechart" type="area" height="300" :options="options.chartOptions" :series="options.series"></apexchart>
        </div>
        <div>
          <WidgetTotalBox ref="widgetotalbox" :period="widgetPeriod"/>
        </div>
      </div>
      <div class="column">
        <div class="box" style="background: linear-gradient(#dff9fb, #dff9fb); height: 100%">
          <p style="font-weight: 900; color: black; margin-bottom: 15px">Legende</p> 
          <div>
            <StatisticsDateBox :start_date="currentPeriod.start_date" :end_date="currentPeriod.end_date" />
          </div>
          <div style="margin-top: 25px">
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
          <div style="margin-top: 15px; margin-bottom: 20px; border-bottom-style: dashed; border-bottom-color: white"></div>
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
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <div style="font-size: 14px; font-weight: 900">Aangepaste periode</div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                  <GenericBtn text="Kies" size="small" btnStyle="light" @clicked="choosePeriod"  />
              </div>
            </div>
          </div>
          <div style="margin-top: 15px; margin-bottom: 20px; border-bottom-style: dashed; border-bottom-color: white"></div>
          <div style="font-size: 14px; font-weight: 900; margin-bottom: 15px">Per maand</div>
          <div class="columns is-flex is-vcentered">
            <div class="column">
              <div style="font-size: 14px">Kies een jaar</div>
              </div>
          <div class="column">
            <b-select @input="changeToMonthsForYear" size="is-small" v-model="currentYearForMonths" placeholder="Jaar" expanded>
                <option
                    v-for="option in years"
                    :value="option.id"
                    :key="option.id">
                    {{ option.name }}
                </option>
            </b-select>
          </div> 
          </div>
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
import GenericBtn from "../buttons/GenericBtn.vue"
import StatisticsDateBox from "../boxes/StatisticsDateBox.vue"
import ModalFactory from '../../logic/factories/modalFactory.js';
import StatisticsDatePickerModal from "../../modals/StasticsDatePickerModal.vue"
import WidgetTotalBox from "../boxes/WidgetTotalBox.vue"

export default {
  name: "LineChart",
  components: {
    GenericBtn,
    WidgetTotalBox,
    StatisticsDateBox,
  },
  data() {
    return {
      widgetPeriod: null,
      firstLoad: true,
      options: null,
      months: [],
      years: [],
      currentYear: null,
      currentMonth: null,
      currentYearForMonths: null,
      currentPeriod: {
        start_date: null,
        end_date: null
      },
      isToggleAankopen: true,
      isToggleVerkopen: true,
      isToggleCreditnota: true,
      list: []
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
    fetchDataMonthForYears(){
      StatisticsController.getLineChartForMonthsOfYear(this, { year: this.currentYearForMonths }, (res) => {
        this.drawLine("Aankopen", res[0].data[0])
        this.drawLine("Verkopen", res[1].data[0])
        this.drawLine("Creditnotas", res[2].data[0])
      })
    },
    fetchData() {
      StatisticsController.getLineChartForPeriod(this, this.list.days, (res) => {
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
    checkToggleSeries(){
      this.toggleSeriesAankopen(this.isToggleAankopen)
      this.toggleSeriesVerkopen(this.isToggleVerkopen)
      this.toggleSeriesCreditnotas(this.isToggleCreditnota)
    },
    setDates(){
      this.widgetPeriod = DateHelper.getStartAndEndOfMonth(null, null)
      this.months = DateHelper.getAllMonths()
      this.years = DateHelper.getYears()
      this.currentMonth = DateHelper.getCurrentMonth()
      this.currentYear = DateHelper.getCurrentYear()
      this.currentYearForMonths = DateHelper.getCurrentYear()
      this.setCurrentDate(this.currentMonth, this.currentYear, null, false)
      this.setListByMonth()
    },
    setCurrentDate(month, year, newPeriod, options){
      if(options) {
        this.currentPeriod = newPeriod
      }
      else {
        this.currentPeriod = DateHelper.getStartAndEndOfMonthDate(month, year)
      }
    },
    reloadForMonths(){
      this.clearGraph()
      this.fetchDataMonthForYears()
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
      this.setCurrentDate(this.currentMonth, this.currentYear, null, false)
      this.setListByMonth()
      this.changeWidgetPeriod(temp, false)
      this.reload()
    },
    changeYear(value){
      this.currentYear = value
      const temp = {
        month: this.currentMonth,
        year: this.currentYear
      }
      this.setCurrentDate(this.currentMonth, this.currentYear, null, false)
      this.setListByMonth()
      this.changeWidgetPeriod(temp, false)
      this.reload()
    },
    changeToMonthsForYear(value){
      const startAndEndDateReadOnly = DateHelper.getStartAndEndOfYearDate(value)
      const startAndEndDateApi = DateHelper.getStartAndEndOfYearDateApi(value)
      this.setCurrentDate(null, null, startAndEndDateReadOnly, true)
      this.changeWidgetPeriod(startAndEndDateApi, true)
      this.reloadForMonths()
    },
    choosePeriod(){
      ModalFactory.showModal(this, StatisticsDatePickerModal, (value) => { 
        this.list = DateHelper.getAllDaysInPeriod(value)
        this.changeWidgetCustomPeriod(value)
        this.setCurrentDate(null, null, DateHelper.formatPeriodToRead(value), true) 
        this.reload()
      });
    },
    setListByMonth(){
      this.list = DateHelper.getAllDaysInMonth(this.currentMonth, this.currentYear)
    },
    changeWidgetPeriod(value, isByMonth){
      if(isByMonth){
        this.period = value
        this.$refs.widgetotalbox.refreshAll(this.period)
      }
      else {
        this.period = DateHelper.getStartAndEndOfMonth(value.month, value.year)
        this.$refs.widgetotalbox.refreshAll(this.period)
      }
    },
    changeWidgetCustomPeriod(value){
      this.$refs.widgetotalbox.refreshAll(value)
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