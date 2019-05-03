<template>
  <div id="class-list">
    <div>
      <div v-if='classes.length' class="class-list">
        <ClassListItem v-for='nb_class in classes' :selected="selected" :mode="mode" :listener="listener" :key='nb_class.classId' :nb_class='nb_class'/>
      </div>
      <div v-else>
        <p>You don't have any classes</p>
      </div>
    </div>
  </div>
  
</template>

<script>

import ClassListItem from "./ClassListItem.vue";
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ClassList",

  props: {
    mode: String,
    listener: Object,
    selected: Object
  },

  components: { 
    ClassListItem 
  },

  data() {
    return {
      classes: [],
    };
  },

  created: function() {
    eventBus.$on("class-changes", () => {
      this.loadClasses();
    });
  },

  mounted: function() {
    this.loadClasses();
  },
  methods: {
    loadClasses: function() {
      axios.get(`/api/classes/${this.mode}`).then((res) => {
        this.classes = res.data
      })
    },
  }
};
</script>
