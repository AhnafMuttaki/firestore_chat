<template>
  <div class="home">
    <br/>
    <br/>

    <h5>This is a mock login. Give an mock user id and name for chat. 
      <br/>
      It will be stored in vuex state for user information</h5>

    <div>
      <label for="user_id">User Id</label>
      <input type="number" name="user_id" id="user_id" v-model="user_id">
    </div>

    <div>
      <label for="user_name">User Name</label>
      <input type="text" name="user_name" id="user_name" v-model="user_name">
    </div>

    <div>
      <button @click="login">Login</button>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      user_id: null,
      user_name: null
    };
  },
  methods:{
    login(){
      alert('login clicked');
      var payload = {
        user_id: this.user_id,
        user_name: this.user_name
      }
      this.$store.dispatch('setUserInfo',payload);
      this.$router.push('/chat');
    }
  }
}
</script>
