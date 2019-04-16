<template>
  <div id="class">
    <h3>{{nb_class.class_name}}</h3>
    <FileList v-if='parent_file' v-bind:parent='parent_file'/>
    
  </div>
  
</template>

<script>
import { eventBus } from "../../main";
import FileList from "./FileList.vue";
import axios from 'axios';

export default {
  name: "ClassListItem",

  components: { FileList },

  data() {
    return {
      parent_file: null
    };
  },

  props:{
    nb_class: Object
  },

  mounted: function(){
    axios.get(`/api/files/class/${this.nb_class.id}`)
      .then(res => {
        this.parent_file = res.data
      });
    eventBus.$on('changeParent',(file) => {
      this.parent_file = file;
    })
  },

  methods:{
    icon: (file) => {
      if(file.is_directory){
        return `&#x1F4C1;`
      }
      else{
        return `&#128462;`
      }
    }
  }
};
</script>