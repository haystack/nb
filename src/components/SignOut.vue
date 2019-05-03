<template>
  <form id="sign-out" class='user-settings-form' v-on:submit.prevent="signOut" method="post" style="margin:auto">
    <div id="sign-out" class="component">
      <input class="submit-button" type='submit' value='Sign Out'>    
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignOut",

  data() {
    return {
      username: ""
    }
  },

  methods: {
    signOut: function() {
      axios.post('api/users/logout')
        .then(() => {
          // handle success
          eventBus.$emit('signout-success', true);
        })
        .catch((err) => {
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
    },
  }
}
</script>
