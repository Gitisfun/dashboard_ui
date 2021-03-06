import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/general/Login";
import Home from "../views/Home";
import Statistieken from "../views/Statistieken";
import Andere from "../views/Andere";
import Instellingen from "../views/Instellingen"
import Aankopen from "../views/aankopen/AankopenOverview";
import AankopenCreateview from "../views/aankopen/AankopenCreateview";
import AankopenUpdateview from "../views/aankopen/AankopenUpdateview";
import AankopenPrint from "../views/aankopen/AankopenPrint"
import Verkopen from "../views/verkopen/VerkopenOverview";
import VerkopenCreateview from "../views/verkopen/VerkopenCreateview";
import VerkopenUpdateview from "../views/verkopen/VerkopenUpdateview";
import VerkopenPrint from "../views/verkopen/VerkopenPrint"
import Creditnotas from "../views/creditnotas/CreditnotasOverview";
import CreditnotasCreateview from "../views/creditnotas/CreditnotasCreateview";
import CreditnotasUpdateview from "../views/creditnotas/CreditnotasUpdateview";
import CreditnotasPrint from "../views/creditnotas/CreditnotasPrint" 
import Artikels from "../views/artikels/ArtikelsOverview";
import ArtikelsCreateview from "../views/artikels/ArtikelsCreateview";
import ArtikelsUpdateview from "../views/artikels/ArtikelsUpdateview";
import Klanten from "../views/klanten/KlantenOverview";
import KlantenCreateview from "../views/klanten/KlantenCreateview";
import KlantenUpdateview from "../views/klanten/KlantenUpdateview";
import Leveranciers from "../views/leveranciers/LeveranciersOverview";
import LeveranciersCreateview from "../views/leveranciers/LeveranciersCreateview"
import LeveranciersUpdateview from "../views/leveranciers/LeveranciersUpdateview"
import UtilsFactory from "../logic/utils/utilsFactory"

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
    path: "/statistieken",
    name: "Statistieken",
    component: Statistieken,
    meta: {
      group: "Statistieken",
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
    path: "/aankopen/create",
    name: "AankopenCreateview",
    component: AankopenCreateview,
    meta: {
      group: "Aankopen",
      requiresAuth: true,
    }
  },
  {
    path: "/aankopen/update/:id",
    name: "AankopenUpdateview",
    component: AankopenUpdateview,
    meta: {
      group: "Aankopen",
      requiresAuth: true,
    }
  },
  {
    path: "/aankopen/print/:id",
    name: "AankopenPrint",
    component: AankopenPrint,
    meta: {
      group: "Print",
      requiresAuth: true
    }
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
    path: "/verkopen/create",
    name: "VerkopenCreateview",
    component: VerkopenCreateview,
    meta: {
      group: "Verkopen",
      requiresAuth: true,
    }
  },
  {
    path: "/verkopen/update/:id",
    name: "VerkopenUpdateview",
    component: VerkopenUpdateview,
    meta: {
      group: "Verkopen",
      requiresAuth: true,
    }
  },
  {
    path: "/verkopen/print/:id",
    name: "VerkopenPrint",
    component: VerkopenPrint,
    meta: {
      group: "Print",
      requiresAuth: true
    }
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
    path: "/creditnotas/create",
    name: "CreditnotasCreateview",
    component: CreditnotasCreateview,
    meta: {
      group: "Creditnotas",
      requiresAuth: true,
    }
  },
  {
    path: "/creditnotas/update/:id",
    name: "CreditnotasUpdateview",
    component: CreditnotasUpdateview,
    meta: {
      group: "Creditnotas",
      requiresAuth: true,
    }
  },
  {
    path: "/creditnotas/print/:id",
    name: "CreditnotasPrint",
    component: CreditnotasPrint,
    meta: {
      group: "Print",
      requiresAuth: true
    }
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
    path: "/artikels/create",
    name: "ArtikelsCreateview",
    component: ArtikelsCreateview,
    meta: {
      group: "Artikels",
      requiresAuth: true,
    }
  },
  {
    path: "/artikels/update/:id",
    name: "ArtikelsUpdateview",
    component: ArtikelsUpdateview,
    meta: {
      group: "Artikels",
      requiresAuth: true,
    }
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
    path: "/klanten/create",
    name: "KlantenCreateview",
    component: KlantenCreateview,
    meta: {
      group: "Klanten",
      requiresAuth: true,
    }
  },
  {
    path: "/klanten/update/:id",
    name: "KlantenUpdateview",
    component: KlantenUpdateview,
    meta: {
      group: "Klanten",
      requiresAuth: true,
    }
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
    path: "/leveranciers/make",
    name: "LeveranciersCreateview",
    component: LeveranciersCreateview,
    meta: {
      group: "Leveranciers",
      requiresAuth: true,
    }
  },
  {
    path: "/leveranciers/update/:id",
    name: "LeveranciersUpdateview",
    component: LeveranciersUpdateview,
    meta: {
      group: "Leveranciers",
      requiresAuth: true,
    }
  },
  {
    path: "/andere",
    name: "Andere",
    component: Andere,
    meta: {
      group: "Andere",
      requiresAuth: true,
    },
  },
  {
    path: "/instellingen",
    name: "Instellingen",
    component: Instellingen,
    meta: {
      group: "Instellingen",
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
  if(to.name !== "Login"){
    if(UtilsFactory.isTokenExpired()){
      store.dispatch("setToken", null);
      store.dispatch("setUser", null);
    }
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.getToken == null)
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    else {
      next();
    }
  } else {
    next();
  }
});

export default router;
