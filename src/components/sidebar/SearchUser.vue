<template>
  <div class="search-user">
      <input class ="usernamesearch" type="text" placeholder="Follow more..">
      <button class="enteruser" v-on:click="follow()">Follow</button>
      <div class="error-msg">
        {{ error }}
      </div>
      <div class="success-msg">
        {{ success }}
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "search-user",
    data (){
      return {
        error: "",
        success: "",
      }
    },
    methods: {
      follow: function() {
          let user_input = document.getElementsByClassName("usernamesearch")[0].value;
          if(user_input.length == 0){
            this.error = "You must enter a username"
            this.clearMessages();
            return;
          } 
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.post(`/api/follow/user`, {username: user_input}, headers)
          .then(res => {
            this.success = "Success! You are following this user."
          })
          .catch(err => {
            this.error = err.response.data.msg
          })
          .then (() => {
            this.clearMessages();
          })
        },
    clearMessages: function () {
      setTimeout(() => {
        this.error = "";
        if (this.success != "") {
          location.reload();
          this.success = "";
        }
      }, 1000);
    },
    },
  }
</script>

<style scoped>
  .search-user{
    margin-top: 20px;
    width: 300px;
  }

  .usernamesearch{
    max-width: 200px;
    height: 25px;
    margin: 0 5px;
    padding: 6px 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    font-size: 16px;
  }

  .enteruser{
    padding: 8px 8px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    width: auto;
  }
</style>
