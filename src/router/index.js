import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
import Login from "../views/general/Login";
import Home from "../views/Home";
import Aankopen from "../views/aankopen/AankopenOverview";
import Verkopen from "../views/verkopen/VerkopenOverview";
import Creditnotas from "../views/creditnotas/CreditnotasOverview";
import Artikels from "../views/artikels/ArtikelsOverview";
import Klanten from "../views/klanten/KlantenOverview";
import Leveranciers from "../views/leveranciers/LeveranciersOverview";
import LeveranciersCreateview from "../views/leveranciers/LeveranciersCreateview"

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      group: "Home",
      requiresAuth: true,
    },
  },
  {
    path: "/aankopen",
    name: "Aankopen",
    component: Aankopen,
    meta: {
      group: "Aankopen",
      requiresAuth: true,
    },
  },
  {
    path: "/verkopen",
    name: "Verkopen",
    component: Verkopen,
    meta: {
      group: "Verkopen",
      requiresAuth: true,
    },
  },
  {
    path: "/creditnotas",
    name: "Creditnotas",
    component: Creditnotas,
    meta: {
      group: "Creditnotas",
      requiresAuth: true,
    },
  },
  {
    path: "/artikels",
    name: "Artikels",
    component: Artikels,
    meta: {
      group: "Artikels",
      requiresAuth: true,
    },
  },
  {
    path: "/klanten",
    name: "Klanten",
    component: Klanten,
    meta: {
      group: "Klanten",
      requiresAuth: true,
    },
  },
  {
    path: "/leveranciers",
    name: "Leveranciers",
    component: Leveranciers,
    meta: {
      group: "Leveranciers",
      requiresAuth: true,
    },
  },
  {
    path: "/leveranciers/create",
    name: "LeveranciersCreateview",
    component: LeveranciersCreateview,
    meta: {
      group: "Leveranciers",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next()
});

export default router;
