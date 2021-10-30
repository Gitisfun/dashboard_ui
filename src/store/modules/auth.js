import httpClient from "../../api/httpClient";

const state = {
  user: {
    id: null,
    gebruikersnaam: null,
    voornaam: null,
    achternaam: null,
    rol: null,
    bedrijf_id: null
  },
  token: null,
};

const getters = {
  getUser: (state) => {
    if (JSON.parse(localStorage.getItem("userws"))) {
      state.user = JSON.parse(localStorage.getItem("userws"));
    }
    return state.user;
  },
  getToken: (state) => {
    if (JSON.parse(localStorage.getItem("authtokenws"))) {
      state.token = JSON.parse(localStorage.getItem("authtokenws"));
    }
    return state.token;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
};

const mutations = {
  setUser: (state, user) => {
    localStorage.setItem("userws", JSON.stringify(user));
    state.user = user;
  },
  setToken: (state, token) => {
    localStorage.setItem("authtokenws", JSON.stringify(token));
    httpClient.defaults.headers.common["authorization"] = `Bearer ${token}`;
    state.token = token;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};