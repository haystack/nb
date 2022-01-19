<template>
  <div class="search-user">
      <input class ="usernamesearch" type="text" placeholder="Follow more..">
      <button class="enteruser" v-on:click="follow()">Follow</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "search-user",
    props: {
    },
    methods: {
      follow: function() {
          let user_input = document.getElementsByClassName("usernamesearch")[0].value;
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.post(`/api/follow/user`, {username: user_input}, headers)
          .then(res => {
            console.log(res)
            location.reload()
          })
          .catch(err => {
            console.log(err)
            console.log(err.data)
          })
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
  }
</style>
