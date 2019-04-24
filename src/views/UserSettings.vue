<template>
  <div v-if="user">
    <p> Welcome {{user.username}} </p>
    <ClassCreate/>
    <ClassList/>
    <Logout/>
  </div>
  <div v-else>
    <Register/>
    <Login/>
  </div>
</template>

<script>
import axios from "axios";

import Register from "../components/UserSettings/Register.vue";
import Login from "../components/UserSettings/Login.vue";
import Logout from "../components/UserSettings/Logout.vue";
import ClassCreate from "../components/ClassSettings/ClassCreate.vue";
import ClassList from "../components/ClassSettings/ClassList.vue";
import { eventBus } from '../main';

export default {
  name: "UserSettings",
  data(){
    return {
      user: null
    }
  },
  components: {
    Register,
    Login,
    Logout,
    ClassCreate,
    ClassList
  },

  created:function(){
    eventBus.$on("login", (res) =>{
      this.user = res.data
    });
    eventBus.$on("logout", () =>{
      this.user = null
    })
  },

  mounted:function(){
    axios.get('/api/users/current').then((res)=>{
      this.user =res.data
    })
  }
};
</script>

<!-- global styles -->
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightblue;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

.component {
  background-color: whitesmoke;
  padding: 1rem;
}
</style>
