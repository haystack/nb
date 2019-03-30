<template>
<!-- the submit event will no longer reload the page -->
  <form class='component' v-on:submit.prevent='register' method="post">
    <h3>Register</h3>

    <div class='form-group'>
      <label for='username'>Username:</label>
      <input id='username' v-model.trim='username' type='text' name='username'>
    </div>

    <div class='form-group'>
      <label for='email'>Email:</label>
      <input id='email' v-model.trim='email' type='text' name='email'>
    </div>

    <div class='form-group'>
      <label for='password'>Password:</label>
      <input id='password' v-model.trim='password' type='password' name='password'>
    </div>

    <input type='submit' value='Login'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Register",

  data() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },

  methods: {
    register: function() {
        const bodyContent = { username: this.username, email: this.email, password: this.password };
        axios.post("/api/users/register", bodyContent);
    },
  }
};
</script>