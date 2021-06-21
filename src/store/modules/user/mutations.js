export default {
  setUserInfo(state, payload) {
    state.user_id = payload.user_id;
    state.user_name = payload.user_name;
  },
};
