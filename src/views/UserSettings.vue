<template>
  <div id="user-settings" class="component" style="display:inline">
    <NavBar v-bind:hasBackwardArrow="this.hasBackwardArrow" title="NB Prototype" v-bind:isSignedIn="this.isSignedIn" username=""/>
    <CreateUser/>
    <SignIn/>
    <p v-if="messages.length > 0">{{ messages }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import CreateUser from "../components/CreateUser.vue";
import SignIn from "../components/SignIn.vue";
import SignOut from "../components/SignOut.vue";
import NavBar from '../components/NavBar.vue'

export default {
  name: "UserSettings",

  data() {
    return {
      signedIn: false,
      username: "",
      messages: [],
      hasBackwardArrow: false,
      isSignedIn: false
    }
  },

  components: {
    CreateUser,
    SignIn,
    SignOut,
    NavBar
  },

  mounted:  function() {
    axios.get("/api/users/current/")
      .then((res) => {
        if(res.data){
          this.$router.push('home');
        }
        else{
          this.username = "Not logged in."
        }     
      })
    .catch(() => {
      this.username = "Not logged in.";
    });
    eventBus.$on("createuser-success", () => {
      this.messages = "Successfully created user.";
    });

    eventBus.$on("signin-success", () => {
      axios.get("/api/users/current/")
        .then(res => {
            this.username = res.data.name.first + " " + res.data.name.last;
            this.$router.push('home');
        })
      this.signedIn = true;
    });
    
    eventBus.$on("signout-success", () => {
      this.signedIn = false;
      this.username = "";
      this.messages = "Successfully signed out.";
    });
  }
};
</script>

<style>
#user-settings {
  text-align: center;
}
.form-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.setting-input {
    margin-top: 20px;
    width: 15rem;
}
.setting-label {
    margin-right: 0.5rem;
    margin-top: 20px;
}
.user-settings-form {
    width: fit-content;
}
</style>