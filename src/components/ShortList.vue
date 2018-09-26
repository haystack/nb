<template>
  <div>
    <h3>All Shorts</h3>
    <div v-if='success' class="success-message">
      {{ success }}
    </div>
    <div v-if='error' class="error-message">
      {{ error }}
    </div>

    <div class="short-list">
      <!-- TODO: Step 3: View All Shorts -->

    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import axios from "axios";
// eslint-disable-next-line
import { eventBus } from "../main";

export default {
  name: "ShortList",

  data() {
    return {
      error: "",
      success: "",
      shorts: []
    };
  },

  created: function() {
    // TODO: Step 4 - Refresh Shorts

  },

  mounted: function() {
    this.loadShorts();
  },

  methods: {
    loadShorts: function() {
      // TODO: Step 3 - View All Shorts
      
    },

    clearMessages: function() {
      setInterval(() => {
        this.success = "";
        this.error = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
.short-list {
  display: flex;
  flex-wrap: wrap;
}

.short-list > * {
  margin: 0.5rem;
}
</style>
