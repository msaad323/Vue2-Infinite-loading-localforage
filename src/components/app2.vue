<template>
  <div id="app">
    <h1>Hacker Rank</h1>
    <div class="scroll-list">
      <infinite-loading
        direction="top"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <div v-for="(item, $index) in list" :key="item.index">
        <h3>
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </h3>
        <p>~ {{ item.points }} points by {{ item.author }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

const api = "//hn.algolia.com/api/v1/search_by_date?tags=story";

window.onscroll = function () {
  console.log(this.page);
};

export default {
  name: "App",
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      page: 0,
      list: [],
      datalist: {},
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("datalist"))) {
      this.datalist[`page${this.page}`] = JSON.parse(
        localStorage.getItem("datalist")
      )[`page${this.page}`];
      console.log(this.datalist);
      this.list = this.datalist[`page${this.page}`];
    }
  },
  methods: {
    infiniteHandler($state) {
      if (this.page == 0 && localStorage.getItem("datalist")) {
        this.page = Number(localStorage.getItem("page"));
        this.datalist = JSON.parse(localStorage.getItem("datalist"));
      }
      // console.log($state);
      if (this.datalist[`page${this.page}`]) {
        //unshift when it is upward dir else push
        this.list.unshift(...this.datalist[`page${this.page}`]);
        this.page += 1;
        // console.log($state);
        $state.loaded();
      } else {
        axios
          .get(api, {
            params: {
              page: this.page,
            },
          })
          .then(({ data }) => {
            if (data.hits.length) {
              this.datalist[`page${this.page}`] = data.hits.reverse();
              localStorage.setItem("datalist", JSON.stringify(this.datalist));
              this.list.unshift(...data.hits.reverse());
              localStorage.setItem("page", String(this.page));
              this.page += 1;
              $state.loaded();
            } else {
              $state.complete();
            }
          });
      }
    },
  },
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
  overflow-x: hidden; */
/* display: flex;
  flex-direction: column-reverse; */
/* bottom: 0; */
/* width: fit-content; */
/* scroll-behavior: revert; */
/* } */

body {
  font-family: "Montserrat", sans-serif;
  background-attachment: fixed;
}
</style>
