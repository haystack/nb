<template>
  <div class="file-table" v-if="parent">
    <h3><i v-if='parent.Parent' v-on:click='back'>&#x2190;</i>{{parent.filename}}</h3>
    <ul v-if='files.length'>
      <li v-for='file in files' v-bind:key='file.id'>
        <p v-if='file.is_directory' v-on:click='changeParent(file)'><i>&#x1F4C1;</i> {{file.filename}}</p>
        <p v-else v-on:click='redirect(file)'><i>&#x1f5ce;</i> {{file.filename}}</p>
      </li>
    </ul>
    <div v-if='isInstructor' id="edit-files-forms">
      <form class='component' v-on:submit.prevent='addFolder' method="post">
        <h3>Add Folder</h3>
        <div class='form-group'>
          <label for='folderName'>Folder Name:</label>
          <input v-model.trim='folderName' type='text' name='folderName'>
        </div>
        <input type='submit' value='Create'>
      </form>
      <form class='component' v-on:submit.prevent='addFile' method="post">
        <h3>Add File</h3>
        <div class='form-group'>
          <label for='fileName'>File Name:</label>
          <input v-model.trim='fileName' type='text' name='fileName'>
        </div>
        <div class='form-group'>
          <label for='url'>URL:</label>
          <input v-model.trim='url' type='text' name='url'>
        </div>
        <input type='submit' value='Create'>
      </form>
    </div>
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
      folderName: "",
      fileName: "",
      url: ""
    };
  },

  computed:{
    isInstructor(){
      return this.type == "instructor";
    }
  },

  watch:{
    parent: function(){
      this.loadFiles();
    }
  },

  props:{
    parent: Object,
    listener: Object,
    type: String
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
        return `&#x1f5ce;`
      }
    },
    addFolder: function(){
      const bodyContent = { name: this.folderName,};
      axios.post(`/api/files/folder/${this.parent.id}`, bodyContent).then(() =>{
        this.folderName = "";
        this.loadFiles();
      });
    },
    addFile: function(){
      const bodyContent = { name: this.fileName, url: this.url};
      axios.post(`/api/files/file/${this.parent.id}`, bodyContent).then(() =>{
        this.fileName = "";
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
      if(file.is_directory){
        this.listener.$emit('changeParent', (file));
      }
    },
    redirect: function(file){
      console.log(file);
      location.href = file.Source.filepath;
    },
    back: function(){
      axios.get(`/api/files/parent/${this.parent.id}`)
        .then(res => {
          this.changeParent(res.data);
        })
    }

  }
};
</script>

<style>
.file-table{
  border: 1px solid black
}
</style>