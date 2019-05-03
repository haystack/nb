<template>
  <form id="sign-in" class='user-settings-form' v-on:submit.prevent="signIn" style="margin:auto">
    <h3>Sign in</h3>
    
    <div class="form-group">
      <label class="setting-label" for='username'>Username:</label>
      <input class="setting-input" v-model.trim='username' type='text' name='username'>
    </div>

    <div class="form-group">
      <label class="setting-label" for='password'>Password:</label>
      <input class="setting-input" v-model.trim='password' type='password' name='password'>
    </div>

    <input class="submit-button" type='submit' value='Sign In'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignIn",

  data() {
    return {
      username: "",
      password: "",
    }
  },

  methods: {
    signIn: function() {
      const bodyContent = { username: this.username, password: this.password };
        axios.post("/api/users/login", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('signin-success', this.username);
          })
          .catch(err => {
            // handle error
            alert(`Error with axios request: ${err.response.data.error}`);
          })
          .then(() => {
            // always executed
            this.resetForm();
          });
    },

    resetForm: function() {
      this.username = "",
      this.password = ""
    }
  }
}
</script>

