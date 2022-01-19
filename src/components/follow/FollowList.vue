<template>
  <div class="list">
    <div
        v-for="user in following"
        :key="user.first_name">
      <div style="display: flex; flex-direction: row; justify-content: space-evenly;">
        <div>
          <h2 style="margin-bottom:0">{{user.first_name}} {{user.last_name}}</h2>
          <p style="margin-top:0">{{user.username}}</p>
        </div>
        <button class="unfollow-btn" v-on:click="unfollow()">Unfollow</button>
      </div>
    </div>
    <p v-if="following.length === 0" class="empty"> No following yet </p>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "follow-list",
    props: {
      following: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
    unfollow: function() {
          const token = localStorage.getItem("nb.user");
          const headers ={ headers: { Authorization: 'Bearer ' + token }}
          axios.delete(`/api/follow/user`, {headers: { Authorization: 'Bearer ' + token }, data: {username: "student"}})
          .then(res => {
            console.log(res)
            location.reload()
          })
        },
    }
  }
</script>

<style scoped>
  .list .item {
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
  }
  .list .item:hover {
    background-color: #ddd;
  }
  p.empty {
    padding: 10px;
    color: #444;
  }
  .unfollow-btn{
    padding: 8px 8px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    height: min-content;
    display: flex;
    flex-direction: column;
    align-self: center;
  }
</style>
