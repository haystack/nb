<template>
  <div class="search-user">
      <input class ="usernamesearch" type="text" v-model="nameSearch" placeholder="Enter name..">
      <div class="error-msg">
        {{ error }}
      </div>
      <div class="success-msg">
        {{ success }}
      </div>
        <div v-for="person in filtered" :key="person.first_name">
          <div style="display: flex; flex-direction: row; justify-content: space-between; margin: 10px 30px 5px 5px;">
            {{person.first_name}} {{person.last_name}}
            <button class="enteruser" v-on:click="follow(person.username)">Follow</button>
          </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "search-user",
    props:{
    me: Object,
  },
    data (){
      return {
        error: "",
        success: "",
        users: [],
        nameSearch: "",
      }
    },
    methods: {
      follow: function(username) {
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.post(`/api/follow/user`, {username: username}, headers)
          .then(() => {
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
        }, 2000);
    },
    },
    computed: {
      filtered(){
        if(this.nameSearch === ""){
          return []
        } else {
          let searchLower = this.nameSearch.toLowerCase()
          return this.users.filter(u => {
            if(u.first_name && u.last_name){
            return u.first_name.toLowerCase().includes(searchLower) ||
            u.last_name.toLowerCase().includes(searchLower)
            } else {
              return false
            }
          })
        }
      }
    },
    created: async function(){
      let classes = []
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}  
      await axios.get(`/api/classes/student`, headers)
      .then((res) => {
          classes = [...classes, ...res.data]

      })
      await axios.get(`/api/classes/instructor`, headers)
        .then((res) => {
      classes = [...classes, ...res.data]
      })    
      let current_id = []
      for(let i =0; i < classes.length; i++){
        await axios.get(`/api/classes/usersList/${classes[i].id}`, headers)
        .then((res) => {
          for(let u = 0; u < res.data.instructors.length; u++){
            if(!current_id.includes(res.data.instructors[u].id)){
              this.users.push(res.data.instructors[u])
              current_id.push(res.data.instructors[u].id)
            }
          }
          for(let u = 0; u < res.data.students.length; u++){
            if(!current_id.includes(res.data.students[u].id)){
              this.users.push(res.data.students[u])
              current_id.push(res.data.students[u].id)
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
    .error-msg {
        color: red;
        font-family: monospace;
        font-weight: bold;
        font-size: 16px;
    }

    .success-msg {
        color: #4a2270;
        font-family: monospace;
        font-weight: bold;
        font-size: 16px;
    }

  .search-user{
    margin-top: 20px;
    width: 300px;
  }

  .usernamesearch{
    height: 25px;
    margin: 0px 5px 10px 5px;
    padding: 6px 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    font-size: 16px;
    width: 250px;
  }

  .enteruser{
    padding: 6px 6px;
    border-radius: 5px;
    border: solid 1px #3b155e;
    background-color: #4a2270;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    width: auto;
  }
</style>