import localforage from "localforage";

localforage.config({
  driver: localforage.IndexedDB, // Force IndexedDB; same as using setDriver()
  name: process.env.VUE_APP_APP_TITLE, //App name
  version: 1.0,
  size: 209715200, // Size of database, in bytes. IndexedDB-only for now.
  storeName: "infinitehandler", // Should be alphanumeric, with underscores.
  description: "Infinite handler using localforage"
});

// var cache = {
//   /**
//    * set_current_user_id_ls
//    * Save the currently selected user to Localstorage
//    */
//   set__current_dataList(CURRENT_data_list) {
//     let ls_key = "dataList";
//     localforage.setItem(ls_key, CURRENT_data_list);
//   },

//   get_CURRENT_data_list() {
//     return localforage.getItem(ls_key);
//   }
// };
localforage.setItem("datalist", [1, 2, 3]);

localforage.getItem("datalist").then(value => console.log(value));
