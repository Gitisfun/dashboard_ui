import Vuex from "vuex";
import Vue from "vue";
import menu from "./modules/menu";
import auth from "./modules/auth"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    menu,
  },
});
