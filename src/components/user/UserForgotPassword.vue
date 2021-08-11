<template>
    <div>
        <h3 class="title">Reset Your Password</h3>
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
    name: "user-forgot-password",
    data() {
      return {
        user: {
          email: "",
        },
        forgotPasswordMessage: "",
        message: null,
        valid: true,
      }
    },
    computed: {
      forgotPasswordEnabled: function() {
        return this.user.email && this.user.email.length > 0
      }
    },
    methods: {
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
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 5px;
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
    padding: 5px;
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

  .form-inputs {
    text-align: left;
    text-decoration-color: red;
  }

  .v-text-field__slot input {
    text-align: left;
  }

  .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
  }

  .log-in-text {
    color: #4a2770;
    font-weight: bold;
    font-size: 1.15rem
  }

  .sign-in-button {
    color: white;
    background-color: #4a2770 !important;
  }

  .forgot-password-text {
    font-size: 0.75rem;
    text-decoration-line: underline;
  }

  .no-account-text {
    font-size: 0.85rem;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
  }

  .create-account-text {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
    color: #4a2770;
  }

</style>