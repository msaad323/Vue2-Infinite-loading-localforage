import Vuex from "vuex";
import Vue from "vue";
import cache from "./cache/cache.js";

import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    datalist: []
  },
  mutations: {
    SET_NEWS(state, datalist) {
      state.datalist = datalist;
    }
  },
  actions: {
    async fetchNews({ commit }) {
      try {
        const response = await axios.get(
          "//hn.algolia.com/api/v1/search_by_date?tags=story"
        );
        commit("SET_NEWS", response.data.hits);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    }
  },
  getters: {
    getNews: state => state.datalist
  }
});

export default store;
