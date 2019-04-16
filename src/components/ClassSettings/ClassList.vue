<template>
  <div id="class-list">
    <h2>Instructor Classes</h2>
    <div v-if='i_classes.length'>
      <ClassListItem v-for='nb_class in i_classes' v-bind:key='nb_class.id' v-bind:nb_class='nb_class'/>
    </div>
    <h2>Student Classes</h2>
    <div v-if='s_classes.length'>
      <ClassListItem v-for='nb_class in s_classes' v-bind:key='nb_class.id' v-bind:nb_class='nb_class'/>
    </div>
    
    <div v-if='!i_classes.length && !s_classes.length'>
      <p>There are no classes to display!</p>
    </div>
  </div>
</template>

<script>
import ClassListItem from "./ClassListItem.vue";
import axios from "axios";
import { eventBus } from "../../main";


export default {
  name: "ClassList",

  components: { ClassListItem },

  data() {
    return {
      i_classes: [],
      s_classes: []
    };
  },

  created: function() {
    eventBus.$on("status-change", () => {
      this.loadClasses();
    });
  },

  mounted: function() {
    this.loadClasses();
  },

  methods: {
    loadClasses: function() {
      this.i_classes = [];
      this.s_classes = [];
      axios.get('/api/classes/instructor').then(res => {
        this.i_classes = res.data;
        });
      axios.get('/api/classes/student').then(res => {
        console.log("Loaded student classes");
        console.log(res.data)
        this.s_classes = res.data;
        });
    },
  }
};
</script>
