<template>
    <div class="list">
        <div v-for="user in following" :key="user.first_name">
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div>
                    <h2 style="margin-bottom:0">{{user.first_name}} {{user.last_name}}</h2>
                    <p style="margin-top:0">{{user.username}}</p>
                </div>
                <button class="unfollow-btn" v-on:click="unfollow(user.username)">Unfollow</button>
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
            unfollow: async function(username) {
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                await axios.delete(`/api/follow/user`, {headers: { Authorization: 'Bearer ' + token }, data: {username: username}})
                location.reload()
            },
        },
    }
</script>

<style scoped>
  .list {
    margin-left: 10%;
    margin-right: 10%;
  }
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
    color: #4a2270;
    font-family: monospace;
    font-weight: bold;
    font-size: 16px;
  }
  .unfollow-btn{
    padding: 8px 8px;
    border-radius: 5px;
    border: solid 1px #3b155e;
    background-color: #4a2270;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    height: min-content;
    display: flex;
    flex-direction: column;
    align-self: center;
  }
</style>