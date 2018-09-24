<template>
  <div class="short-list-item">
    <p>Name: {{ short.name }}</p>
    <p>URL: {{ short.url }}</p>
    <p>Created by: {{ creatorIdentity }}</p>
    <input class="edit" v-model.trim='url' type="text" name="url" placeholder="Change URL associated with this name">
    <button v-on:click="updateShort">Update</button>
    <button v-on:click="deleteShort">Delete</button>
  </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "ShortListItem",

  props: {
    short: Object
  },

  data() {
    return {
      url: ""
    };
  },

  computed: {
    creatorIdentity: function() {
      return this.short.creator ? this.short.creator : "anonymous";
    }
  },

  methods: {
    updateShort: function() {
      // TODO: Step 3 - View All Shorts, Step 5: Propagate Messages

    },

    deleteShort: function() {
      // TODO: Step 3 - View All Shorts, Step 5: Propagate Messages

    }
  }
};
</script>

<style>
  .short-list-item {
    border: thin solid black;
  }
</style>

