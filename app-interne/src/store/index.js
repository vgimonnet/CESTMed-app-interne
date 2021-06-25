/* 
Imports and config
*/
    // Vue
    import Vuex from "vuex";
    import Vue from "vue";
    import createPersistedState from "vuex-persistedstate";

    // Inner
    import turtle from "./modules/turtle";
    import food from "./modules/food";

    // Set up Vuex
    Vue.use(Vuex);
//

/* 
Export store
*/
  export default new Vuex.Store({
    modules: {
      turtle,
      food
    },
    plugins: [
      createPersistedState()
    ]
  });
//
