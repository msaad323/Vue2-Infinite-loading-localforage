<template>
  <div id="app">
    <h1>Hacker Rank</h1>
    <div class="scroll-list">
      <infinite-loading
        v-if="toploader"
        direction="top"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <div v-for="(item, index) of list" :id="index" :key="index">
        <h3>
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </h3>
        <p>~ {{ item.points }} points by {{ item.author }}</p>
      </div>
      <infinite-loading
        v-if="bottomloader"
        @infinite="infiniteHandlerBottom"
      ></infinite-loading>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";

export default {
  name: "App",
  components: {
    InfiniteLoading
  },

  data() {
    return {
      page: 0,
      list: [],
      datalist: {},
      toploader: false,
      bottomloader: false,
      bottompage: 0,
      currentpage: 0
    };
  },
  async mounted() {
    const datalist = await this.$store.getters["getDataList"];
    const page = await this.$store.getters["getPage"];

    if (datalist) {
      this.datalist = datalist;
      this.page = page;
      this.bottompage = this.page;
      this.bottomloader = true;
    } else {
      this.toploader = true;
    }
  },
  methods: {
    infiniteHandler($state) {
      if (this.datalist[`page${this.page}`]) {
        this.list.unshift(...this.datalist[`page${this.page}`]);
        this.page++;
        $state.loaded();
      } else {
        axios
          .get(api, {
            params: {
              page: this.page
            }
          })
          .then(({ data }) => {
            if (data.hits.length) {
              this.datalist[`page${this.page}`] = data.hits;
              this.$store.commit("SET_DATALIST", this.datalist);
              this.list.unshift(...data.hits);
              this.$store.commit("SET_PAGE", this.page);
              this.page += 1;
              $state.loaded();
            } else {
              $state.complete();
            }
          });
      }
    },
    infiniteHandlerBottom($state) {
      if (this.datalist[`page${this.bottompage}`]) {
        this.list.push(...this.datalist[`page${this.bottompage}`]);
        this.bottompage--;
        this.toploader = true;
        $state.loaded();
      } else {
        $state.complete();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .scroll-list {
  height: 60vh;
  position: fixed;
  overflow-y: scroll;
  margin-bottom: 30px;
  left: 50%;
  transform: translate(-50%, 0);
  overflow-x: hidden;
} */

body {
  font-family: "Montserrat", sans-serif;
  background-attachment: fixed;
}
</style>
