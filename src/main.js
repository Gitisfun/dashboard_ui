import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import filters from "./filters"
import "../veee-validate.js";
import Buefy from 'buefy'
//import 'buefy/dist/buefy.css'
import "@mdi/font/css/materialdesignicons.css";
import VueApexCharts from "vue-apexcharts";

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.use(filters);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
