<template>
  <!--<div class="form">
    <h3 class="title">Create a New Account</h3>

    <div class="group">
      <label for="new-user-username"> Username: </label>
      <input id="new-user-username" type="text" v-model="newUser.username">
    </div>

    <div class="group">
      <label for="new-user-first"> First name: </label>
      <input id="new-user-first" type="text" v-model="newUser.first">
    </div>

    <div class="group">
      <label for="new-user-last"> Last name: </label>
      <input id="new-user-last" type="text" v-model="newUser.last">
    </div>

    <div class="group">
      <label for="new-user-email"> Email: </label>
      <input id="new-user-email" type="text" v-model="newUser.email">
    </div>

    <div class="group">
      <label for="new-user-password"> Password: </label>
      <input id="new-user-password" type="password" v-model="newUser.password">
    </div>

    <button class="submit" :disabled="!submitEnabled" @click="createUser">
      Sign up
    </button>
    <span class="register-message"><br>{{registerMessage}}<br></span>
  </div>-->
  <div>
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-card-title class="title-text"> Create Account </v-card-title>
        <v-card-subtitle class="info-text"> Enter your information to create an account! </v-card-subtitle>
        <!--<v-container class="input-container">-->
          <v-text-field
            class="input-style"
            v-model="newUser.username"
            :rules="newUser.usernameRules"
            required
            id="new-user-username"
            label="Username"></v-text-field>
          <v-text-field
            class="input-style"
            v-model="newUser.first"
            :rules="newUser.firstRules"
            required
            id="new-user-first"
            label="First Name"></v-text-field>
          <v-text-field
            class="input-style"
            v-model="newUser.last"
            :rules="newUser.lastRules"
            required
            id="new-user-last"
            label="Last Name"></v-text-field>
          <v-text-field
            class="input-style"
            v-model="newUser.email"
            :rules="newUser.emailRules"
            required
            id="new-user-email"
            label="Email"></v-text-field>
          <v-text-field
            class="input-style"
            v-model="newUser.password"
            :rules="newUser.passwordRules"
            required
            id="new-user-password"
            label="Password"></v-text-field>
        <!--</v-container>-->
        <v-card-actions class="reset-button">
          <v-btn
            :disabled="!submitEnabled"
            class="sign-in-button"
            @click="createUser"> Sign Up </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>  
</template>

<script>
  import axios from "axios"
  import { eventBus } from "../../main"

  export default {
    name: "user-create",
    data() {
      return {
        newUser: {
          username: "",
          usernameRules: [
            v => !!v || "Username is required",
          ],
          first: "",
          firstRules: [
            v => !!v || "First name is required",
          ],
          last: "",
          lastRules: [
            v => !!v || "Last name is required",
          ],
          email: "",
          emailRules: [
            v => !!v || "Email is required",
            v => /.+@.+/.test(v) || 'E-mail must be valid',
          ],
          password: "",
          passwordRules: [
            v => !!v || "Password is required",
          ],
        },
        registerMessage: "",
      }
    },
    computed: {
      submitEnabled: function() {
        return (this.newUser.username.length > 0
          && this.newUser.first.length > 0
          && this.newUser.last.length > 0
          && this.newUser.email.length > 0
          && this.newUser.password.length > 0)
      },
    },
    methods: {
        createUser: async function() {
            try {
                await axios.post("api/users/register", this.newUser)
                const res = await axios.post("/api/users/login", this.newUser)
                const token = res.data.token
                localStorage.setItem("nb.user", token);
                eventBus.$emit('signin-success')
                this.resetForm()
            } catch (error) {
                let msg = error.response.data.msg
                console.error(`Signup failed: ${msg}`)
                if (msg.includes("unique")) {
                  if (msg.includes("username")) {
                    this.setRegisterMessage("There is already any account configured for this username. Please use a different one, or you can use the Reset Password option to access the account.")
                  } else if (msg.includes("email")) {
                    this.setRegisterMessage("There is already any account configured for this email. Please use a different one, or you can use the Reset Password option to access the account.")
                  }
                } else if (msg.includes("isEmail")) {
                  this.setRegisterMessage("Please enter a valid email with the correct format, such as test@mail.com")
                } 
            }
        },
        resetForm: function() {
            this.newUser = {
            username: "",
            first: "",
            last: "",
            email: "",
            password: "",
            }
        },
        setRegisterMessage: function(msg, disappear=true) {
            this.registerMessage = msg;
            if (disappear) {
            setTimeout(() => this.registerMessage = "", 10000);
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

  .title-text {
    color: #4a2770;
    font-weight: bold;
    font-size: 1.15rem;
    justify-content: center;
  }

  .input-container {
    height: 100%;
    padding: 0px;
  }

  .input-style {
    height: 45px;
    padding: 10px;
  }

  .reset-button {
      justify-content: center;
      text-align: center;
      padding: 20px;
  }

  .sign-in-button {
    color: white;
    background-color: #4a2770 !important;
  }

  .info-text {
      padding: 0px;
      justify-content: center;
      text-align: center;
  }

  .error--text {
    color: #ff5252 !important;
    caret-color: #ff5252 !important;
  }
</style>
