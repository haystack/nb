<template>
<!-- the submit event will no longer reload the page -->
  <form class='component' v-on:submit.prevent='create' method="post">
    <h3>Create Class</h3>

    <div class='form-class'>
      <label for='name'>Class name:</label>
      <input id='name' v-model.trim='name' type='text' name='name'>
    </div>

    <input type='submit' value='Create'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ClassCreate",

  data() {
    return {
      name: "",
    };
  },

  props:{
    listener: Object,
  },

  methods: {
    create: function() {
      const bodyContent = {name: this.name};
      axios.post("/api/classes/create", bodyContent).then((res) => {
          this.name = "";
          eventBus.$emit("class-changes");
          this.listener.$emit("setClass", {nb_class: res.data, mode: "instructor"});
      })
    },
  }
};
</script>