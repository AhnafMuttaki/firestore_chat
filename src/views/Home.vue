<template>
  <div class="home">
    <br />
    <br />

    <h1>Firestore Chat</h1>
    <br />
    <h5>
      This is a mock login. Give a mock user id and name for chat.(ie:
      user_id:1, user_name:john doe)
      <br />
      It will be stored in vuex state as user information
    </h5>
    <br />
    <div>
      <label class="form_column" for="user_id">User Id</label>
      <input
        class="form_column"
        type="number"
        name="user_id"
        id="user_id"
        v-model="user_id"
      />
    </div>

    <div>
      <label class="form_column" for="user_name">User Name</label>
      <input
        class="form_column"
        type="text"
        name="user_name"
        id="user_name"
        v-model="user_name"
      />
    </div>

    <div>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user_id: null,
      user_name: null,
    };
  },
  methods: {
    login() {
      // alert("login clicked");
      var payload = {
        user_id: this.user_id,
        user_name: this.user_name,
      };
      this.$store.dispatch("setUserInfo", payload);
      this.$router.push("/chat");
    },
  },
};
</script>
<style scoped>
.form_column {
  width: 250px;
}
</style>
