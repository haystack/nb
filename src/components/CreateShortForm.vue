<template>
<!-- the submit event will no longer reload the page -->
  <form class='component' v-on:submit.prevent='createShort' method="post">
    <h3>Create Short URL</h3>

    <div class='form-group'>
      <label for='name'>Short Name:</label>
      <input id='name' v-model.trim='name' type='text' name='name'>
    </div>

    <div class='form-group'>
      <label for='url'>URL:</label>
      <input id='url' v-model.trim='url' type='url' name='url'>
    </div>

    <input type='submit' value='Shorten URL'>

    <div v-if='success' class="success-message">
      {{ success }}
    </div>

    <div v-if='errors.length' class="error-message">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </form>
</template>

<script>
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "CreateShortForm",

  data() {
    return {
      errors: [],
      success: "",
      name: "",
      url: ""
    };
  },

  methods: {
    createShort: function() {
      this.errors = [];

      if (this.name === "" || this.url === "") {
        if (this.name === "") {
          this.errors.push("Short name is required");
        }

        if (this.url === "") {
          this.errors.push("URL is required");
        }
      } else {
        const bodyContent = { name: this.name, url: this.url };
        axios
          .post("/api/shorts", bodyContent)
          .then(() => {
            // handle success
            this.success = "Short created successfully!";
            
            // TODO: Step 4 - Emit Success Event

          })
          .catch(err => {
            // handle error
            this.errors.push(err);
          })
          .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
          });
      }
    },

    resetForm: function() {
      this.name = "";
      this.url = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.success = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
  .form-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  label {
    margin-right: 0.5rem;
  }

  form {
    width: fit-content;
  }

  input[type='text'], input[type='url'] {
    width: 15rem;
  }

  form > * {
    margin-bottom: 1rem;
  }
</style>
