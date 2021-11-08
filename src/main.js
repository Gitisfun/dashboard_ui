import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import filters from "./filters"
import "../veee-validate.js";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Buefy)
Vue.config.productionTip = false
Vue.use(filters);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
