import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      current_conversation: null,
      conversations:[],
      messages:[],
      unread_records:[],
    };
  },
  mutations,
  actions,
  getters,
};
