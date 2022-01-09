import Vuex from "vuex";
import Vue from "vue";
import menu from "./modules/menu";
import auth from "./modules/auth"
import settings from "./modules/settings"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    menu,
    settings,
  },
});
