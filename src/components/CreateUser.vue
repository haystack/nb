<template>
  <form id="create-user" class='user-settings-form' v-on:submit.prevent="createUser" style="margin:auto">
    <h3>Create an account</h3>
    
    <div class="form-group">
      <label class="setting-label" for='username'>Username:</label>
      <input class="setting-input" v-model.trim='username' type='text' name='username'>
    </div>

    <div class="form-group">
      <label class="setting-label" for='first'>First name:</label>
      <input class="setting-input" v-model.trim='first' type='text' name='first'>
    </div>

    <div class="form-group">
      <label class="setting-label" for='last'>Last name:</label>
      <input class="setting-input" v-model.trim='last' type='text' name='last'>
    </div>

    <div class="form-group">
      <label class="setting-label" for='email'>Email:</label>
      <input class="setting-input" v-model.trim='email' type='text' name='email'>
    </div>

    <div class="form-group">
      <label class="setting-label" for='password'>Password:</label>
      <input class="setting-input" v-model.trim='password' type='password' name='password'>
    </div>

    <input class="submit-button" type='submit' value='Create User'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "CreateUser",

  data() {
    return {
      username: "",
      first: "",
      last: "",
      email: "",
      password: ""
    }
  },

  methods: {
    createUser: function() {
      if (this.username.length == 0 || this.email.length == 0 || this.password.length == 0) {
        alert('Missing fields required for creating user.');
        return;
      }
      const bodyContent = {
        username: this.username,
        first: this.first,
        last: this.last,
        email: this.email,
        password: this.password
      }
        axios.post("api/users/register", bodyContent)
          .then((res) => {
            // handle success
            axios.post("/api/users/login", bodyContent)
            .then(() => {
              // handle success
              eventBus.$emit('signin-success', this.username);
            })
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
      this.username = ""
      this.first = ""
      this.last = ""
      this.email = ""
      this.password = ""
    }
  }
}
</script>
