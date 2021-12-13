import timeFormatter from './timeFormatter';
import dateFormatter from './dateFormatter';
import currencyFormatter from './currencyFormatter'
import kortingFormatter from './kortingFormatter'

export default {
     install(Vue) {
         Vue.filter('timeFormatter', timeFormatter);
         Vue.filter('dateFormatter', dateFormatter);
         Vue.filter('currencyFormatter', currencyFormatter);
         Vue.filter('kortingFormatter', kortingFormatter);
     }
}