<template>
  <div class="file-table" v-if="parent">
    <h3>{{parent.file_name}}</h3>
    <ul v-if='files.length'>
      <li v-for='file in files' v-bind:key='file.id'>
        <p v-on:click='changeParent(file)'><i class="fa" v-html='icon(file)'></i> {{file.file_name}}</p>
      </li>
    </ul>
    <form class='component' v-on:submit.prevent='addFolder' method="post">
      <h3>Add Folder</h3>
      <div class='form-group'>
        <label for='username'>Folder Name:</label>
        <input id='username' v-model.trim='folderName' type='text' name='folderName'>
      </div>
      <input type='submit' value='Create'>
    </form>
  </div>
  
</template>

<script>
import { eventBus } from "../../main";
import axios from 'axios';

export default {
  name: "FileList",

  data() {
    return {
      files: [],
      folderName: ""
    };
  },

  watch:{
    parent: function(){
      this.loadFiles();
    }
  },

  props:{
    parent: Object
  },

  mounted: function(){
    console.log(this.parent)
    this.loadFiles();
  },

  methods:{
    icon: function(file){
      if(file.is_directory){
        return `&#x1F4C1;`
      }
      else{
        return `&#128462;`
      }
    },
    addFolder: function(){
      const bodyContent = { name: this.folderName,};
      axios.post(`/api/files/folder/${this.parent.id}`, bodyContent).then(() =>{
        this.loadFiles();
      });
    },
    loadFiles: function(){
      axios.get(`/api/files/folder/${this.parent.id}`)
        .then(res => {
          console.log("Loaded files")
          console.log(res.data)
          this.files = res.data
        });
    },
    changeParent: function(file){
      eventBus.$emit('changeParent', (file));
    }

  }
};
</script>

<style>
.file-table{
  border: 1px solid black
}
</style>