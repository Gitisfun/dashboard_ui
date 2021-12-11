import timeFormatter from './timeFormatter';
import dateFormatter from './dateFormatter';
import currencyFormatter from './currencyFormatter'

export default {
     install(Vue) {
         Vue.filter('timeFormatter', timeFormatter);
         Vue.filter('dateFormatter', dateFormatter);
         Vue.filter('currencyFormatter', currencyFormatter)
     }
}