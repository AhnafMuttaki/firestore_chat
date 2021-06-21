import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import userModule from "./modules/user/index.js";
import chat from "./modules/chat/index.js";

const store = new Vuex.Store({
  modules: {
    user: userModule,
    chat: chat
  },
});

export default store;
