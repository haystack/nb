<template>
  <div class="form">
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
          first: "",
          last: "",
          email: "",
          password: "",
        },
        registerMessage: "",
      }
    },
    computed: {
      submitEnabled: function() {
        return this.newUser.username.length > 0
          && this.newUser.first.length > 0
          && this.newUser.last.length > 0
          && this.newUser.email.length > 0
          && this.newUser.password.length > 0
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
</style>
