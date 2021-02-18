<template>
  <div class="form">
    <h3 class="title">Sign in</h3>

    <div class="group">
      <select v-model="selected">
        <option>Username</option>
        <option>Email</option>
      </select>
      <br>
      <input v-if="selected === 'Username'" id="login-username" type="text" v-model="user.username">
      <input v-if="selected === 'Email'" id="login-email" type="text" v-model="user.email">

    </div>

    <div class="group">
      <label for="login-password"> Password: </label>
      <input id="login-password" type="password" v-model="user.password" v-on:keyup.enter="login">
    </div>

    <div v-if="message" class="message">{{ message }}</div>

    <button class="submit" :disabled="!submitEnabled" @click="login">
      Sign in
    </button>
    <br><br>
    <h3 class="title">Forgot Your Password</h3>
    <div class="group">
      <label for="login-email"> Email: </label>
      <input id="login-email" type="text" v-model="user.email">
    </div>
    <button class="password-submit" :disabled="!forgotPasswordEnabled" @click="forgotPassword">Forgot Password</button>
    <span class="forgot-password-message"><br>{{forgotPasswordMessage}}<br></span>

  </div>
</template>

<script>
  import axios from "axios"
  import Vue from 'vue'
  import loading from 'vuejs-loading-screen'
  import { eventBus } from "../../main"

  Vue.use(loading, {
    bg: '#4a2270ad',
    icon: 'refresh',
    size: 3,
    icon_color: 'white',
  })

  export default {
    name: "user-login",
    data() {
      return {
        user: {
          username: "",
          password: "",
          email: "",
        },
        forgotPasswordMessage: "",
        message: null,
        selected: "Username"
      }
    },
    computed: {
      submitEnabled: function() {
        return ((this.selected === "Username" && this.user.username.length > 0)  || (this.selected === "Email" && this.user.email.length > 0))
        && this.user.password.length > 0
      },
      forgotPasswordEnabled: function() {
        return this.user.email && this.user.email.length > 0
      }
    },
    methods: {
        login: async function() {
            try {
                if(!this.submitEnabled) return
                const res = await axios.post("/api/users/new_login", {user: this.user, loginType: this.selected})
                const token = res.data.token
                localStorage.setItem("nb.user", token);
                eventBus.$emit('signin-success')
                this.resetForm()
            } catch (error) {
                if (error.response.status === 401) {
                    this.message = "Invalid " + this.selected.toLowerCase() + " and password. Try again!"
                }

                console.error(`Signin failed: ${error.response.data.msg}`)
            }
        },
        resetForm: function() {
            this.user = {
            username: "",
            password: "",
            },
            this.message = null
        },
        forgotPassword: function() {
            this.$isLoading(true) // show loading screen      
            axios.post("/api/users/forgotpassword", this.user)
            .then(() => {
                this.$isLoading(false) // hide loading screen      
                this.setForgotPasswordMessage("Email sent")
            })
            .catch(err => {            
                this.$isLoading(false) // hide loading screen      
                this.setForgotPasswordMessage("No user with that email. Please try again.")
            })
        },
        setForgotPasswordMessage: function(msg, disappear=true) {
            this.forgotPasswordMessage = msg;
            if (disappear) {
            setTimeout(() => this.forgotPasswordMessage = "", 2000);
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
  .form .group select {
    margin-right: 10px;
    padding: 4px 0px 4px 4px
  }
  .form .group label {
    margin-right: 10px;
  }
  .form .group input {
    padding: 4px 6px;
    border-radius: 3px;
    border: solid 1px #aaa;
    font-size: 16px;
    flex-grow: 1;
  }
  .form .message {
    color: #cf000f;
    font-size: 14px;
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
  button.password-submit {
    width: 40%;
    align-self: flex-end;
    padding: 6px 0;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  button.password-submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
