import Vuex from "vuex";
import Vue from "vue";
import cache from "./cache/cache.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    datalist: cache.get_data_list(),
    page: cache.get_page()
  },
  mutations: {
    SET_DATALIST(state, datalist) {
      state.datalist = datalist;
      cache.set_data_list(datalist);
    },
    SET_PAGE(state, page) {
      state.page = page;
      cache.set_page(page);
    }
  },
  // actions: {
  //   async fetchNews({ commit }) {
  //     try {
  //       const response = await axios.get(
  //         "//hn.algolia.com/api/v1/search_by_date?tags=story"
  //       );
  //       commit("SET_NEWS", response.data.hits);
  //     } catch (error) {
  //       alert(error);
  //       console.log(error);
  //     }
  //   }
  // },
  getters: {
    getDataList: state => state.datalist,
    getPage: state => state.page
  }
});

export default store;
