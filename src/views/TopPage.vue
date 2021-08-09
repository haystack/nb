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
              <v-card tile> 
                <v-card-title class="title-card"> Welcome to NB </v-card-title>
                <v-card-subtitle class="title-card-subtitle"> Anchored Annotation and Discussion for the Web </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-card tile class="top-panel-cards">
                <v-img alt="test" class="info-panel-images" src="https://i.imgur.com/eFiEEkW.png"></v-img>
                <v-card-title class="info-panel-text"> What is NB? </v-card-title>
                <v-card-subtitle class="info-panel-subtext"> NB is an annotation tool that allows for collaborative annotation and discussion within the margins of textbooks and pdfs. </v-card-subtitle>
                <!--<v-card-actions> 
                  <v-btn text class="info-panel-buttons"> Learn More </v-btn>
                </v-card-actions>-->
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card tile class="top-panel-cards">
                <v-img class="info-panel-images" src="https://i.imgur.com/RWTnCGQ.png" alt="this isn't loading"></v-img>
                <v-card-title class="info-panel-text"> Features of NB </v-card-title>
                <v-card-subtitle class="info-panel-subtext"> NB is equipped with highlighting, commenting, bookmarking, and many other features to help students annotate, ask questions, and discuss online material. </v-card-subtitle>
                <!--<v-card-actions>
                  <v-btn text class="info-panel-buttons" disabled> Learn More </v-btn>
                </v-card-actions>-->
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card tile class="top-panel-cards"> 
                <v-card-text class="temporary-text"> Statistics </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2">
              <v-card tile class="bottom-panel-cards"> 
                <v-card-text> Check out our demo video for tips on getting started! </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card tile class="bottom-panel-cards"> 
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/G0ghiJWkHYY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </v-card>
            </v-col>
            <v-col cols="4">
              <v-card tile class="bottom-panel-cards">
                <v-card-text class="temporary-text"> Statistics </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-divider
          vertical
          class="homepage-divider"
        ></v-divider>
        <v-col cols="4">
          <user-login class="log-in"></user-login>
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
  .title-card {
    text-align: center;
    justify-content: center;
    font-weight: bold;
    color: #4a2770;
  }
  .title-card-subtitle {
    text-align: center;
    font-weight: bold;
  }
  .video-wrapper {
    position: absolute;
    padding: 3.5%;
    width: 100%;
    height: 100%;
    top: 400px;
  }
  .info-panel-images {
    height: 10vh
  }
  .info-panel-buttons {
    color: "875f9a";
    position: absolute;
    bottom: 5px;
  }
  .top-panel-cards {
    height: 100%;
    padding-bottom: 15px
  }
  .bottom-panel-cards {
    height: 100%;
  }
  .temporary-text {
    text-align: center;
    justify-content: center;
    position: absolute;
    top: 40%
  }
  .homepage-divider {
    border: 1;
  }
  .log-in {
    justify-content: center;
    position: absolute;
    top: 30%;
  }

</style>
