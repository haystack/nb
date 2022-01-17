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
          :path="filePath"">
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
          @add-new-user="addNewUser" 
          @remove-users="removeUsers"
          @upload-users-file="uploadUsersFile"
          @refresh="refreshUsers">
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
      currentTab: 'contents',
      candidates: []
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
      return this.$route.params.tab === 'contents'
    },
    showUsersTab: function() {
      return this.userType === 'instructor' && this.$route.params.tab === 'users'
    },
    showGradesTab: function() {
      return this.userType === 'instructor' && this.$route.params.tab === 'grades'
    },
    showCourseSettingsTab: function() {
      return this.userType === 'instructor' && this.$route.params.tab === 'courseSettings'
    },
    idpath: function() {
      return this.$route.params.folder_id.split('+')
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
    '$route': 'switchDirectory'
  },
  created: async function(){
    console.log(this.$route.name)
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
      this.$router.push({params: {tab: type}})
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
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.get(`/api/classes/instructorList/${this.course.id}`, headers)
          .then((res) => {
            this.instructors = res.data
          })
      }
    },
    loadStudents: function(){
      if (this.userType == "instructor") {
        this.$isLoading(true) // show loading screen since this can take a while    
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}  
        axios.get(`/api/classes/studentList/${this.course.id}`, headers)
          .then((res) => {
            this.students = res.data
            this.$isLoading(false) // close loading screen      
          })
      }
    },
    loadUsers: function(){
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}
      axios.get(`/api/users/all`, headers)
        .then(res => {
          this.allUsers = res.data
        })
    },
    addNewUser: function (user) { // adds a new user that isn't curren't registered in NB
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}
      axios.post(`/api/classes/user/${this.course.id}`, user, headers)
        .then(() => {
          if (user.role === "instructor") {
            this.loadInstructors()
          } else {
            this.loadStudents()
          }
        })
    },
    addUser: function(user, role) {
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}
      if (role === 'student') {
        axios.post(`/api/classes/student/${this.course.id}`, user, headers)
          .then(() => this.loadStudents())
      } else if (role === 'instructor') {
        axios.post(`/api/classes/instructor/${this.course.id}`, user, headers)
          .then(() => this.loadInstructors())
      }
    },
    removeUsers: function(selectedRows) {
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}
      this.$isLoading(true); // show loading screen
      let requests = selectedRows.map((user) => {
        return new Promise((resolve) => {
          if (user.role === 'student') {
            axios.delete(`/api/classes/student/${this.course.id}/${user.id}`, headers)
            .then(() => resolve("success"))
            .catch(() => resolve())
          } else if (user.role === 'instructor') {
            axios.delete(`/api/classes/instructor/${this.course.id}/${user.id}`, headers)
            .then(() => resolve("success"))
            .catch(() => resolve())
          }
        });
      })
      Promise.all(requests).then(() => {
        this.loadStudents();
        this.loadInstructors();
        this.$isLoading(false);
      })
    },
    uploadUsersFile: function(formData) {
        const token = localStorage.getItem("nb.user");
        this.$isLoading(true) // show loading screen      
        axios.post( `/api/classes/upload/${this.course.id}`,
        formData,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + token 
          }
        }
      ).then((response) => {
        location.reload(); //TODO: this is a short fix for refreshing because the line below is not working for some reason..
      })
    },
    refreshUsers: function() {
      this.loadStudents();
      this.loadInstructors();
    },
    // openGrading: function(){
    //   this.$router.push("grading")
    // },
    loadFiles: function(){
      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}
      axios.get(`/api/files/class/${this.course.id}`, headers)
        .then(res => {
          this.filePath = [res.data]
        })
    },
    switchDirectory: async function() {
      let len = this.idpath.length

      const token = localStorage.getItem("nb.user");
      const headers = { headers: { Authorization: 'Bearer ' + token }}

      let newFilePath = this.filePath
      let res = await axios.get(`/api/files/class/${this.course.id}`, headers)
      newFilePath = [res.data]
      newFilePath.length = len
      console.log(this.idpath)
      for(let i = 1; i < len; i++){
        console.log(i)
        let res2 = await axios.get(`/api/files/folder/${this.idpath[i-1]}`, headers)
        this.candidates = res2.data
        console.log(this.candidates)
        for (let j = 0; j < this.candidates.length; j++){
          if (this.candidates[j].id == this.idpath[i]) {
            newFilePath[i] = this.candidates[j]
          }
        }
      }
      this.filePath = newFilePath
      console.log(this.filePath)
    }
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
