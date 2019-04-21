<template>
  <div id="class">
    <h3>{{nb_class.class_name}}</h3>
      <form v-if='isInstructor' class='component' v-on:submit.prevent='addStudent' method="post">
        <h3>Add Student</h3>
        <div class='form-group'>
          <input v-model.trim='new_user.username' type='text'>
          <div v-if="new_user.username.length">
            <ul v-if="possible_users.length >= 1">Do you mean?
              <li v-for='possible_user in possible_users' :key="possible_user.id" class="text-button" v-on:click="new_user = possible_user">{{ possible_user.username }} ({{ possible_user.email}})</li>
            </ul>
            <p v-else-if="new_user.username.length > 0">No users found</p>
          </div>  
        </div>
        <input type='submit' value='Add'>
      </form>
      <div v-if='isInstructor && student_list.length' class='component'>
        <h4>Students</h4>
        <ul>
          <li v-for='student in student_list' v-bind:key="student.id">{{student.username}}</li>
        </ul>
      </div>
    <FileList v-bind:type='type' v-if='parent_file' v-bind:parent='parent_file' v-bind:listener='listener'/>
    
  </div>
  
</template>

<script>
import { eventBus } from "../../main";
import FileList from "./FileList.vue";
import axios from 'axios';
import Vue from 'vue'

export default {
  name: "ClassListItem",

  components: { FileList },

  data() {
    return {
      parent_file: null,
      listener: new Vue(),
      user_list: [],
      new_user: {username:""},
      student_list: [],
      all_users:[],
      possible_users:[]
    };
  },

  computed:{
    isInstructor(){
      return this.type == "instructor";
    },
    username(){
      return this.new_user.username;
    }
  },

  watch:{
    username: function(){
      const new_user = this.new_user;
      this.possible_users = this.all_users.filter(user =>{ 
        console.log(new_user)
        console.log(!this.student_list.includes(user))
        console.log(this.student_list)
        console.log(user)
        return (user.username.includes(new_user.username) || user.email.includes(new_user.username))
        && !this.student_list.includes(user) && user.id != new_user.id && user.username != new_user.username
      }
      )
    }
  },

  props:{
    nb_class: Object,
    type: String
  },

  mounted: function(){
    axios.get(`/api/files/class/${this.nb_class.id}`)
      .then(res => {
        this.parent_file = res.data
      });
    this.listener.$on('changeParent',(file) => {
      this.parent_file = file;
    });
    this.loadStudents()
    axios.get(`/api/users/all`)
      .then(res => {
        console.log(res.data)
        this.all_users = res.data;
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
    },
    loadStudents: function(){
      if (this.type == "instructor"){
        axios.get(`/api/classes/studentList/${this.nb_class.id}`).then((res) => {
          this.student_list = res.data
        })
      }
    },
    addStudent: function(user){
      const bodyContent = this.new_user;
      axios.post(`/api/classes/student/${this.nb_class.id}`, bodyContent)
        .then(function(){this.loadStudents()})
    }
  }
};
</script>