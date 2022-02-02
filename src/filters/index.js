import timeFormatter from './timeFormatter';
import dateFormatter from './dateFormatter';
import currencyFormatter from './currencyFormatter'
import kortingFormatter from './kortingFormatter'
import emptyKortingFormatter from './emptyKortingFormatter';
import nullByZeroFormatter from './nullByZeroFormatter';

export default {
     install(Vue) {
         Vue.filter('timeFormatter', timeFormatter);
         Vue.filter('dateFormatter', dateFormatter);
         Vue.filter('currencyFormatter', currencyFormatter);
         Vue.filter('kortingFormatter', kortingFormatter);
         Vue.filter('emptyKortingFormatter', emptyKortingFormatter);
         Vue.filter('nullByZeroFormatter', nullByZeroFormatter);
     }
}