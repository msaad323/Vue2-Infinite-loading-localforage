import Vuex from "vuex";
import Vue from "vue";
import cache from "./cache/cacheLs.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    datalist: cache.get_data_list() || [],
    page: cache.get_page() || 0
  },
  mutations: {
    setDatalistCommit(state, datalist) {
      state.datalist = datalist;
      cache.set_data_list(datalist);
    },
    setPageCommit(state, page) {
      state.page = page;
      cache.set_page(page);
    }
  },
  // actions: {
  //   setDataListAction(context, payload) {
  //     console.log(payload);
  //     return new Promise((resolve, reject) => {
  //       context.commit("setDatalistCommit", payload);
  //       resolve();
  //     });
  //   },
  //   setPageAction(context, payload) {
  //     return new Promise((resolve, reject) => {
  //       context.commit("setPageCommit", payload);
  //       resolve();
  //     });
  //   }
  // },
  getters: {
    getDataList: state => state.datalist,
    getPage: state => state.page
  }
});

export default store;
