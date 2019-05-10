<template>
  <div id="class">
    <h3>{{nb_class.class_name}} <i v-if='isInstructor' class= "material-icons" v-on:click="openGrading">check_box</i></h3>
    <div class="tabs">
      <div
          v-for="tab in tabs"
          class="tab"
          :style="styleTab(tab.type)"
          @click="openTab(tab.type)">
        {{ tab.label }}
      </div>
    </div>
    <div v-if="showContentsTab">
      <FileList v-bind:type='type' v-if='parent_file' v-bind:parent='parent_file' v-bind:listener='listener'/>
    </div>
    <div v-if="showUsersTab">
      <user-table
          :instructors="instructor_list"
          :students="student_list"
          :suggestions="all_users"
          @add-user="addUser">
      </user-table>
    </div>
    <div v-if="showGradesTab">
      <div style="padding: 20px;">TODO: INSERT GRADING UI HERE</div>
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
      instructor_list: [],
      student_list: [],
      all_users:[],
      tabs: [
        { label: "Contents", type: 'contents' },
        { label: "Users", type: 'users' },
        { label: "Grades", type: 'grades'},
      ],
      currentTab: 'contents'
    };
  },

  computed:{
    isInstructor(){
      return this.type == "instructor";
    },
    showContentsTab: function() {
      return this.currentTab === 'contents'
    },
    showUsersTab: function() {
      return this.type === 'instructor' && this.currentTab === 'users'
    },
    showGradesTab: function() {
      return this.type === 'instructor' && this.currentTab === 'grades'
    }
  },

  watch:{
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
    styleTab: function(type) {
      if (type === this.currentTab) {
        return 'color: #000; text-decoration: underline; font-weight: bold;'
      }
    },
    openTab: function(type) {
      this.currentTab = type
    },
    icon: (file) => {
      if(file.is_directory){
        return `&#x1F4C1;`
      }
      else{
        return `&#128462;`
      }
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

.tabs {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.tabs .tab {
  color: #444;
  cursor: pointer;
}
.tabs .tab:hover {
  color: #000;
  font-weight: bold;
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
