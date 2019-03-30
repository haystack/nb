<template>
  <div id="app" class='horiz-center'>
    <div v-if="user">
      <Logout/>
    </div>
    <div v-else>
      <Register/>
      <Login/>
    </div>
  </div>
</template>

<script>
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Logout from "./components/Logout.vue";
import { eventBus } from './main';

export default {
  name: "app",
  data(){
    return {
      user: null
    }
  },
  components: {
    Register,
    Login,
    Logout
  },

  created:function(){
    eventBus.$on("login", (res) =>{
      this.user = res
    });
    eventBus.$on("logout", () =>{
      this.user = null
    })
  }
};
</script>

<!-- global styles -->
<style>
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

<style scoped>
  .horiz-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
