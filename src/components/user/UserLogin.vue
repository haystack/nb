<template>
  <!--<div class="form">
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
    <button class="password-submit" :disabled="!forgotPasswordEnabled" @click="forgotPassword">Forgot Password</button>
    <span class="forgot-password-message"><br>{{forgotPasswordMessage}}<br></span>

  </div>-->
  <v-form ref="form">
    <v-container class="form">
      <a class="log-in-text"> Log In </a>
      <v-text-field
        class="form-inputs"
        v-model="user.username"
        label="Username"
        :rules="user.usernameRules"
        required
        @input="login-username">
      </v-text-field>
      <v-text-field
        v-model="user.password"
        label="Password"
        :rules="user.passwordRules"
        required
        @input="login-password"
        type="password">
      </v-text-field>
      <div v-if="message" class="message">{{ message }}</div>
      <v-row>
        <v-col>
          <v-btn
          :disabled="!valid"
            class="sign-in-button"
            @click="login"
            this.message=null
          >  Sign In 
          </v-btn>
        </v-col>
        <v-col align="right">
          <a class="forgot-password-text"
            @click="openPasswordModal"> Forgot Password </a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="7">
          <a class="no-account-text"> don't have an account? </a>
        </v-col>
        <v-col align="right" cols="5">
          <a 
            class="create-account-text"
            @click="openAccountModal"> create account </a>
        </v-col>
      </v-row>
    </v-container>
    <modal name="createaccount-modal">
      <user-create></user-create>
    </modal>
    <modal name="forgotpassword-modal">
      <user-forgot-password></user-forgot-password>
    </modal>
  </v-form>
</template>

<script>
  import axios from "axios"
  import Vue from 'vue'
  import VModal from 'vue-js-modal'
  Vue.use(VModal)
  import loading from 'vuejs-loading-screen'
  import { eventBus } from "../../main"
  import UserCreate from "./UserCreate.vue"
  import UserForgotPassword from './UserForgotPassword.vue'

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
          usernameRules: [
            v => !!v || "Username is required",
          ],
          password: "",
          passwordRules: [
            v => !!v || "Password is required",
          ],
          email: "",
        },
        forgotPasswordMessage: "",
        message: null,
        valid: true,
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
        openAccountModal: function() {
          this.$modal.show('createaccount-modal')
        },
        closeAccountModal: function() {
          this.$modal.hide('createaccount-modal')
        },
        openPasswordModal: function() {
          this.$modal.show('forgotpassword-modal')
        },
        closePasswordModal: function() {
          this.$modal.hide('forgotpassword-modal')
        }
    },
    components: {
      UserCreate,
      UserForgotPassword
    }
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
