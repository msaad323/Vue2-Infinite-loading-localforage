import localforage from "localforage";

localforage.config({
  driver: localforage.IndexedDB, // Force IndexedDB; same as using setDriver()
  name: "Vue Infinite loader", //App name
  version: 1.0,
  size: 209715200, // Size of database, in bytes. IndexedDB-only for now.
  storeName: "infinitehandler", // Should be alphanumeric, with underscores.
  description: "Infinite handler using localforage"
});

export default {
  set_data_list(current_data_list) {
    let ls_key = "dataList";
    localforage.setItem(ls_key, current_data_list);
  },

  get_data_list() {
    let ls_key = "dataList";
    console.log("Saad");
    return localforage.getItem(ls_key);
  },

  set_page(current_page) {
    let ls_key = "page";
    localforage.setItem(ls_key, current_page);
  },
  get_page() {
    let ls_key = "page";
    return localforage.getItem(ls_key);
  }
  // set_current_page(current_page) {
  //   let ls_key = "current_page";
  //   localforage.setItem(ls_key, current_page);
  // },
  // get_current_page() {
  //   let ls_key = "current_page";
  //   return localforage.getItem(ls_key);
  // }
};
