<template>
  <div class="follow">
    <h1> Following </h1>
    <button v-on:click="follow()">Click me!</button>
    <button v-on:click="unfollow()">Unfollow me!</button>
    <button v-on:click="getFollowing()">aaa me!</button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "follow",
    props: {
    },
    data() {
    return {
        tabs: ['Followers', 'Following'],
        currentTab: 'Followers',
        userlist:[],
    }},
    methods: {
        styleTab: function(type) {
        if (type === this.currentTab) {
            return 'color: #000; text-decoration: underline; font-weight: bold;'
        }
        },
        openTab: function(type) {
            this.currentTab = type
        },
        follow: function() {
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.post(`/api/follow/user`, {username: "student"}, headers)
          .then(res => {
            console.log(res)
          })
        },
        unfollow: function() {
          const token = localStorage.getItem("nb.user");
          const headers ={ headers: { Authorization: 'Bearer ' + token }}
          axios.delete(`/api/follow/user`, {headers: { Authorization: 'Bearer ' + token }, data: {username: "student"}})
          .then(res => {
            console.log(res)
          })
        },
        getFollowing: function(){
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.get(`/api/follow/user`, headers)
          .then(res => {
            console.log(res)
          })
        }
    },
  }
  
</script>

<style scoped>
  h1 {
    display: flex;
    justify-content: space-around;
  }

</style>
