<template>
  <div class="form">
    <h3 class="title">Sign in</h3>

    <div class="group">
      <label for="login-username"> Username: </label>
      <input id="login-username" type="text" v-model="user.username">
    </div>

    <div class="group">
      <label for="login-password"> Password: </label>
      <input id="login-password" type="password" v-model="user.password">
    </div>

    <button class="submit" :disabled="!submitEnabled" @click="login">
      Sign in
    </button>
  </div>
</template>

<script>
  import axios from "axios"
  import { eventBus } from "../main"

  export default {
    name: "user-login",
    data() {
      return {
        user: {
          username: "",
          password: "",
        },
      }
    },
    computed: {
      submitEnabled: function() {
        return this.user.username.length > 0 && this.user.password.length > 0
      }
    },
    methods: {
      login: function() {
        axios.post("/api/users/login", this.user)
          .then(() => eventBus.$emit('signin-success'))
          .catch(err => {
            console.error(`Signin failed: ${err.response.data.error}`)
          })
          .then(() => this.resetForm())
      },
      resetForm: function() {
        this.user = {
          username: "",
          password: "",
        }
      },
    },
  }
</script>

<style scoped>
  .form {
    width: 380px;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .form .title {
    margin: 0;
    padding: 10px 0 20px 0;
  }
  .form .group {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  .form .group label {
    margin-right: 5px;
  }
  .form .group input {
    padding: 4px 6px;
    border-radius: 3px;
    border: solid 1px #aaa;
    font-size: 16px;
    flex-grow: 1;
  }
  button.submit {
    width: 80px;
    align-self: flex-end;
    padding: 6px 0;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  button.submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  button.submit:enabled:hover {
    background-color: #0069d9;
  }
</style>
