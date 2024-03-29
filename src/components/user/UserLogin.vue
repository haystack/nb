<template>
  <div class="form">
    <h3 class="title">Sign in</h3>

    <div class="group">
      <label for="login-username"> Username: </label>
      <input id="login-username" type="text" v-model="user.username">
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
    <h3 class="title">Reset Your Password</h3>
    <div class="group">
      <label for="login-email"> Email: </label>
      <input id="login-email" type="text" v-model="user.email">
    </div>
    <button class="submit" :disabled="!forgotPasswordEnabled" @click="forgotPassword">Forgot Password</button>
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
      }
    },
    computed: {
      submitEnabled: function() {
        return this.user.username.length > 0 && this.user.password.length > 0
      },
      forgotPasswordEnabled: function() {
        return this.user.email && this.user.email.length > 0
      }
    },
    methods: {
        login: async function() {
            try {
                if(!this.submitEnabled) return
                const res = await axios.post("/api/users/login", this.user)
                const token = res.data.token
                localStorage.setItem("nb.user", token);
                eventBus.$emit('signin-success')
                this.resetForm()
            } catch (error) {
                if (error.response.status === 401) {
                    this.message = "Invalid username and password. Try again!"
                }

                console.error(`Signin failed: ${err.response.data.error}`)
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
                this.setForgotPasswordMessage(err.response.data.msg)
            })
        },
        setForgotPasswordMessage: function(msg, disappear=true) {
            this.forgotPasswordMessage = msg;
            if (disappear) {
            setTimeout(() => this.forgotPasswordMessage = "", 4000);
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
  .form .message {
    color: #cf000f;
    font-size: 14px;
  }
  button.submit {
    align-self: flex-end;
    padding: 10px 15px;
    border-radius: 5px;
    border: solid 1px #38155a;
    background-color: #4a2270;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
button.submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
  button.submit:enabled:hover {
    background-color: #38155a;
  }

</style>
