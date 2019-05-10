<template>
  <div id="class">
    <h3>{{nb_class.class_name}} <i v-if='isInstructor' class= "material-icons" v-on:click="openGrading">check_box</i></h3>
    <div class='split'>
      <div v-if='isInstructor'>
        <user-table
            :instructors="instructor_list"
            :students="student_list"
            :suggestions="all_users"
            @add-user="addUser">
        </user-table>
      </div>
      <FileList v-bind:type='type' v-if='parent_file' v-bind:parent='parent_file' v-bind:listener='listener'/>
    </div>
  </div>

</template>

<script>
import { eventBus } from "../main";
import UserTable from "./UserTable.vue"
import FileList from "./FileList.vue";
import axios from 'axios';
import Vue from 'vue'

export default {
  name: "ClassBody",

  components: { FileList, UserTable },

  data() {
    return {
      parent_file: null,
      listener: new Vue(),
      user_list: [],
      new_student: {username:""},
      new_instructor: {username:""},
      instructor_list: [],
      student_list: [],
      all_users:[],
      possible_users:[]
    };
  },

  computed:{
    isInstructor(){
      return this.type == "instructor";
    },
    student_username(){
      return this.new_student.username;
    },
    instructor_username(){
      return this.new_instructor.username;
    }
  },

  watch:{
    student_username: function(){
      this.filterUsernames(this.new_student);
    },
    instructor_username: function(){
      this.filterUsernames(this.new_instructor);
    },
    type: function(){
      this.loadStudents();
      this.loadInstructors();
    },
    nb_class: function(){
      this.setParent();
      this.setParent();
      this.loadStudents();
      this.loadInstructors();
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
    this.loadInstructors();
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
    filterUsernames: function(new_user){
      let regex = new RegExp(new_user.username, "i")
      let student_id_list = this.student_list.map(student => student.id)
      let instructor_id_list = this.instructor_list.map(student => student.id)
      this.possible_users = this.all_users.filter(user =>
        (regex.test(user.username) || regex.test(user.email))
        && !student_id_list.includes(user.id)
        && user.id != new_user.id
        && user.username != new_user.username)
    },
    loadInstructors: function(){
      // TODO: this should probably be verified on server and send 401 if user is student
      if (this.type == "instructor"){
        axios.get(`/api/classes/instructorList/${this.nb_class.id}`).then((res) => {
          this.instructor_list = res.data
        })
      }
    },
    loadStudents: function(){
      // TODO: same as above, check on server and send 401 appropriately
      if (this.type == "instructor"){
        axios.get(`/api/classes/studentList/${this.nb_class.id}`).then((res) => {
          this.student_list = res.data
        })
      }
    },
    addUser: function(user, role) {
      // TODO: same as above, check on server and send 401 appropriately
      if (role === 'student') {
        axios.post(`/api/classes/student/${this.nb_class.id}`, user)
          .then(() => this.loadStudents())
      } else if (role === 'instructor') {
        axios.post(`/api/classes/instructor/${this.nb_class.id}`, user)
          .then(() => this.loadInstructors())
      }
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
#class {
  padding: 20px;
}

/* .split{
  display: flex;
  flex-grow: 3;
  justify-content: space-around;
} */

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
