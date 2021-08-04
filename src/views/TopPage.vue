<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <!--<div class="app-body">
      <user-create></user-create>
      <div class="v-divide"></div>
      <user-login></user-login>
    </div>-->
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col>
              <v-card tile> title </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card tile> info 1 </v-card>
            </v-col>
            <v-col cols="4">
              <v-card tile> info 2 </v-card>
            </v-col>
            <v-col cols="4">
              <v-card tile> info 3 </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card tile> info 3 </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <user-login></user-login>
        </v-col>
      </v-row>
    </v-container>
    <a href="https://forms.gle/6YERC3jSu1W1zUzS8" class="nb-bug-link" target="_blank">Report Bug</a>
  </div>
</template>

<script>
  import axios from "axios"
  import { eventBus } from "../main"
  import NavBar from '../components/NavBar.vue'
  import UserCreate from "../components/user/UserCreate.vue"
  import UserLogin from "../components/user/UserLogin.vue"
  import VueJwtDecode from "vue-jwt-decode";
  
  export default {
    name: "top-page",
    data() {
      return {
        user: null,
        messages: null,
      }
    },
    mounted: function() {
        try {
            const token = localStorage.getItem("nb.user");
            if (token) {
                const decoded = VueJwtDecode.decode(token);
                if (decoded.user.username && decoded.user.username !== '') {
                    this.user = decoded.user
                    this.$router.push('home')
                }   
            }
        } catch (error) {
            console.error(error, 'error from decoding token')
        }
      
      eventBus.$on("signin-success", () => {
        try {
            const token = localStorage.getItem("nb.user");
            const decoded = VueJwtDecode.decode(token);
            this.user = decoded.user
            this.$router.push('home')
        } catch (error) {
            console.error(error, 'error from decoding token')
        }
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
  .nb-bug-link {
    position: fixed;
    bottom: 12px;
    left: 25px;
  }
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
