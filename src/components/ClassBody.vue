<template>
  <div id="class">
    <h3>{{nb_class.class_name}} <i v-if='isInstructor' class= "material-icons" v-on:click="openGrading">settings</i></h3>
    <div class='split'>
      <div v-if='isInstructor'>
        <form  class='component' v-on:submit.prevent='addStudent' method="post">
          <h3>Add Student</h3>
          <div class='form-class'>
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

        <div v-if='student_list.length' class='component'>
          <h4>Students</h4>
          <ul class="user-item">
            <li v-for='student in student_list' v-bind:key="student.id">{{student.username}}</li>
          </ul>
        </div>

      </div>
      <FileList v-bind:type='type' v-if='parent_file' v-bind:parent='parent_file' v-bind:listener='listener'/>
    </div>
  </div>

</template>

<script>
import { eventBus } from "../main";
import FileList from "./FileList.vue";
import axios from 'axios';
import Vue from 'vue'

export default {
  name: "ClassBody",

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
      let regex = new RegExp(new_user.username, "i")
      let student_id_list = this.student_list.map(student => student.id)
      this.possible_users = this.all_users.filter(user =>
        (regex.test(user.username) || regex.test(user.email))
        && !student_id_list.includes(user.id)
        && user.id != new_user.id 
        && user.username != new_user.username
      )
    },
    type: function(){
      this.loadStudents();
    },
    nb_class: function(){
      this.setParent();
      this.setParent();
      this.loadStudents();
    }
  },

  props:{
    nb_class: Object,
    type: String
  },

  mounted: function(){
    this.setParent();
    this.listener.$on('changeParent',(file) => {
      this.parent_file = file;
    });
    this.loadStudents();
    this.setUsers();
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
        .then(function(){this.loadStudents(); this.new_user = {username:""};})
    },
    openGrading: function(){
      this.$router.push("grading")
    },
    setUsers: function(){
      axios.get(`/api/users/all`)
        .then(res => {
          this.all_users = res.data;
        })
    },
    setParent: function(){
      axios.get(`/api/files/class/${this.nb_class.id}`)
        .then(res => {
          this.parent_file = res.data
        });
    }
  }
};
</script>

<style scoped>
.split{
  display: flex;
  flex-grow: 3;
  justify-content: space-around;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3{
  display: inline-flex;
  vertical-align: middle;
}

i{
  margin-left: 5px;
}

ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
  width: 100%;
}
</style>
