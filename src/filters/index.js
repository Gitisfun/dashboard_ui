import timeFormatter from './timeFormatter';
import dateFormatter from './dateFormatter';

export default {
     install(Vue) {
         Vue.filter('timeFormatter', timeFormatter);
         Vue.filter('dateFormatter', dateFormatter);
     }
}