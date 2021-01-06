<template>
  <div class="dashboard">
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
          v-if="filePath.length"
          :userType="userType"
          :path="filePath"
          @switch-directory="switchDirectory">
      </course-contents>
    </div>
    <div v-if="showUsersTab" class="users-tab">
      <course-users
          :instructors="instructors"
          :students="students"
          :suggestions="allUsers"
          :user="user"
          :course="course"
          @add-user="addUser"
          @remove-users="removeUsers"
          @upload-users-file="uploadUsersFile">
      </course-users>
    </div>
    <div v-if="showGradesTab" class="grades-tab">
      <Grader/>
    </div>
    <div v-if="showCourseSettingsTab" class="course-settings-tab">
      <CourseSettings :course="course" />
    </div>
  </div>

</template>

<script>
import Vue from 'vue'
import loading from 'vuejs-loading-screen'
import CourseUsers from "./CourseUsers.vue"
import CourseSettings from "./CourseSettings.vue"
import CourseContents from "./CourseContents.vue"
import Grader from "../grader/Grader.vue"
import axios from 'axios'

Vue.use(loading, {
  bg: '#4a2270ad',
  icon: 'refresh',
  size: 3,
  icon_color: 'white',
})

export default {
  name: "course-dashboard",
  props:{
    course: Object,
    userType: String,
    user: Object,
  },
  data() {
    return {
      filePath: [],
      instructors: [],
      students: [],
      allUsers:[],
      currentTab: 'contents'
    };
  },
  computed: {
    tabs: function() {
      if (this.userType === "instructor") {
        return [
          { label: "Contents", type: 'contents' },
          { label: "Users", type: 'users' },
          { label: "Grades", type: 'grades'},
          { label: "Settings", type: 'courseSettings'}
        ]
      } else {
        return [
          { label: "Contents", type: 'contents' },
        ]
      }
    },
    showContentsTab: function() {
      return this.currentTab === 'contents'
    },
    showUsersTab: function() {
      return this.userType === 'instructor' && this.currentTab === 'users'
    },
    showGradesTab: function() {
      return this.userType === 'instructor' && this.currentTab === 'grades'
    },
    showCourseSettingsTab: function() {
      return this.userType === 'instructor' && this.currentTab === 'courseSettings'
    },
  },
  watch: {
    course: function(){
      this.currentTab = 'contents'
      this.loadFiles()
      this.loadStudents()
      this.loadInstructors()
    },
    userType: function(){
      this.loadStudents()
      this.loadInstructors()
    },
  },
  mounted: function(){
    this.loadFiles()
    this.loadStudents()
    this.loadInstructors()
    this.loadUsers()
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
      if (this.userType == "instructor") {
        axios.get(`/api/classes/instructorList/${this.course.id}`)
          .then((res) => {
            this.instructors = res.data
          })
      }
    },
    loadStudents: function(){
      if (this.userType == "instructor") {
        axios.get(`/api/classes/studentList/${this.course.id}`)
          .then((res) => {
            this.students = res.data
          })
      }
    },
    loadUsers: function(){
      axios.get(`/api/users/all`)
        .then(res => {
          this.allUsers = res.data
        })
    },
    addUser: function(user, role) {
      if (role === 'student') {
        axios.post(`/api/classes/student/${this.course.id}`, user)
          .then(() => this.loadStudents())
      } else if (role === 'instructor') {
        axios.post(`/api/classes/instructor/${this.course.id}`, user)
          .then(() => this.loadInstructors())
      }
    },
    removeUsers: function(selectedRows) {
      Array.prototype.forEach.call(selectedRows, user => {
        if (user.role === 'student') {
           axios.delete(`/api/classes/student/${this.course.id}/${user.id}`)
          .then(() => this.loadStudents())
        } else if (user.role === 'instructor') {
          axios.delete(`/api/classes/instructor/${this.course.id}/${user.id}`)
          .then(() => this.loadInstructors())
        }
      }) 
    },
    uploadUsersFile: function(formData) {
        this.$isLoading(true) // show loading screen      
        axios.post( `/api/classes/upload/${this.course.id}`,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        location.reload(); //TODO: this is a short fix for refreshing because the line below is not working for some reason..
      })
    },
    // openGrading: function(){
    //   this.$router.push("grading")
    // },
    loadFiles: function(){
      axios.get(`/api/files/class/${this.course.id}`)
        .then(res => {
          this.filePath = [res.data]
        })
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
  },
  components: {
    CourseContents,
    CourseUsers,
    Grader,
    CourseSettings
  },
}
</script>

<style scoped>
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
    padding: 10px 0;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  
</style>
