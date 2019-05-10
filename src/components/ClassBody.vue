<template>
  <div id="class">
    <div class="tabs">
      <div
          v-for="tab in tabs"
          class="tab"
          :key="tab.type"
          :style="styleTab(tab.type)"
          @click="openTab(tab.type)">
        {{ tab.label }}
      </div>
    </div>
    <div v-if="showContentsTab" class="contents-tab">
      <course-contents
          v-if='filePath.length'
          :userType='type'
          :path="filePath"
          @switch-directory="switchDirectory">
      </course-contents>
    </div>
    <div v-if="showUsersTab" class="users-tab">
      <h3> {{nb_class.class_name}} </h3>
      <course-users
          :instructors="instructor_list"
          :students="student_list"
          :suggestions="all_users"
          @add-user="addUser">
      </course-users>
    </div>
    <div v-if="showGradesTab" class="grades-tab">
      <h3> {{nb_class.class_name}} </h3>
      <div>TODO: INSERT GRADING UI HERE</div>
    </div>
  </div>

</template>

<script>
import CourseUsers from "./CourseUsers.vue"
import CourseContents from "./CourseContents.vue"
import axios from 'axios'

export default {
  name: "ClassBody",

  components: { CourseContents, CourseUsers },

  data() {
    return {
      filePath: [],
      instructor_list: [],
      student_list: [],
      all_users:[],
      currentTab: 'contents'
    };
  },

  computed:{
    tabs: function() {
      if (this.type === "instructor") {
        return [
          { label: "Contents", type: 'contents' },
          { label: "Users", type: 'users' },
          { label: "Grades", type: 'grades'},
        ]
      } else {
        return [
          { label: "Contents", type: 'contents' },
        ]
      }
    },
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
          this.filePath = [res.data]
        });
    },
    switchDirectory: function(directory) {
      let idx = this.filePath.indexOf(directory)
      if (idx < 0) { // file doesn't exist in the path yet
        this.filePath.push(directory)
      } else if (idx < this.filePath.length - 1) {
        // file exists, but not at the end of path
        this.filePath.splice(idx + 1)
      }
    },
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

  .users-tab > h3,
  .grades-tab > h3 {
    margin: 0;
    padding-top: 20px;
    padding-bottom: 10px;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }
</style>
