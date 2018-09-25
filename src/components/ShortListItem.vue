<template>
  <div class="short-list-item component">
    <p>Name: {{ short.name }}</p>
    <p>URL: {{ short.url }}</p>
    <p>Created by: {{ creatorIdentity }}</p>
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

  computed: {
    creatorIdentity: function() {
      return this.short.creator ? this.short.creator : "anonymous";
    }
  }
};
</script>
