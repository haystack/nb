<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="app-body">
      <user-create></user-create>
      <div class="v-divide"></div>
      <user-login></user-login>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import { eventBus } from "../main"
  import NavBar from '../components/NavBar.vue'
  import UserCreate from "../components/user/UserCreate.vue"
  import UserLogin from "../components/user/UserLogin.vue"

  export default {
    name: "top-page",
    data() {
      return {
        user: null,
        messages: null,
      }
    },
    mounted:  function() {
      axios.get("/api/users/current/").then(res => {
        if (res.data) {
          this.user = res.data
          this.$router.push('home')
        }
      })
      eventBus.$on("signin-success", () => {
        axios.get("/api/users/current/").then(res => {
          this.user = res.data
          this.$router.push('home')
        })
      })
      eventBus.$on("signout-success", () => { this.user = null })
    },
    components: {
      NavBar,
      UserCreate,
      UserLogin,
    },
  }
</script>

<style scoped>
  .app-wrapper {
    height: 100%;
  }
  .app-body {
    width: 100%;
    height: calc(100vh - var(--navbar-height) - 80px);
    padding: 40px 0;
    display: flex;
    justify-content: space-around;
  }
  .v-divide {
    width: 0;
    height: 100%;
    border: solid 1px #aaa;
  }
</style>
