<template>
<!-- the submit event will no longer reload the page -->
  <form class='component' v-on:submit.prevent='logout' method="post">
    <h3>Logout</h3>
    <input type='submit' value='Logout'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "Logout",

  methods: {
    logout: function() {
        axios.post("/api/users/logout").then(()=>{
            eventBus.$emit('logout');
        });
    },
  }
};
</script>