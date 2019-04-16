<template>
<!-- the submit event will no longer reload the page -->
  <form class='component' v-on:submit.prevent='create' method="post">
    <h3>Create Class</h3>

    <div class='form-group'>
      <label for='name'>Class name:</label>
      <input id='name' v-model.trim='name' type='text' name='name'>
      <label for='name'>Institution name:</label>
      <input id='institution' v-model.trim='institution' type='text' name='institution'>
    </div>

    <input type='submit' value='Create'>
  </form>
</template>

<script>
import axios from "axios";
import { eventBus } from "../../main";

export default {
  name: "ClassCreate",

  data() {
    return {
      name: "",
      institution: "",
    };
  },

  methods: {
    create: function() {
        const bodyContent = { name: this.name, institution: this.institution};
        axios.post("/api/classes/create", bodyContent).then((res) => {
            this.name = "";
            this.institution = "";
            console.log("Class has been created")
            console.log(res.data)
            eventBus.$emit("status-change");
        })
    },
  }
};
</script>