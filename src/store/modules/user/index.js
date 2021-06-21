import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      user_id: null,
      user_name: null
    };
  },
  mutations,
  actions,
  getters,
};
