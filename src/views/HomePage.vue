<template>
  <div class="app-wrapper">
    <nav-bar :course="selectedCourse" :user="user"></nav-bar>
    <div class="app-body">
      <div class="sidebar">
        <h2 class="title"> My Classes </h2>
        <h3 class="subtitle"> Enrolled as Student </h3>
        <course-list
            :courses="courses.student"
            :selectedCourse="selectedCourse"
            @select-course="onSelectCourse">
        </course-list>
        <h3 class="subtitle"> Enrolled as Instructor </h3>
        <course-list
            :courses="courses.instructor"
            :selectedCourse="selectedCourse"
            @select-course="onSelectCourse">
        </course-list>
        <course-create @create-course="onCreateCourse"></course-create>
        <button class="bookmarklet-button"
          @click="openBookmarkletModal"
        >
        NB Embed Code
        </button>
        <modal name="bookmarklet-modal" height="auto" width="70%" >
        <div class="bookmarklet-modal">
        <p>To enable the NB sidebar for a class reading, either drag (don't click) this <a :href = "bookmarklet">NB Bookmarklet</a> link to your bookmarks bar, or make a new bookmark with the code below as the URL.</p>
    <p>When on the class reading page, just click on the bookmark and the sidebar should appear.</p>
    <pre>
      <code>
        javascript:(function(){
          let s = document.createElement('script');
          s.src= 'http://nb-next.csail.mit.edu/js/bundle.js';
          document.body.append(s);
        })()
      </code>
    </pre>
        </div>
        </modal>
      </div>
      <div class="dashboard-wrapper">
        <course-dashboard
            v-if="selectedCourse"
            :course="selectedCourse"
            :userType="userType">
        </course-dashboard>
      </div>
      
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VModal from 'vue-js-modal'
  Vue.use(VModal)
  import axios from "axios"
  import NavBar from '../components/NavBar.vue'
  import CourseCreate from '../components/sidebar/CourseCreate.vue'
  import CourseList from '../components/sidebar/CourseList.vue'
  import CourseDashboard from '../components/course/CourseDashboard.vue'

  export default {
    name: 'home-page',
    components: {
      NavBar,
      CourseCreate,
      CourseList,
      CourseDashboard,
    },
    data() {
      return {
        user: null,
        courses: {
          instructor: [],
          student: [],
        },
        selectedCourse: null,
      }
    },
    computed: {
      userType: function() {
        if (
          this.courses.instructor.find(x => x.id === this.selectedCourse.id)
        ) {
          return 'instructor'
        }
        if (
          this.courses.student.find(x => x.id === this.selectedCourse.id)
        ) {
          return 'student'
        }
        return ''
      },
      pathname: function() {
        return window.location.protocol + "//" + window.location.host

      },
      bookmarklet: function() {
        return "javascript:(function(){let s = document.createElement('script'); s.src= '" + window.location.protocol + "//" + window.location.host + "/js/bundle.js'; document.body.append(s);})()"
      }
    },
    methods: {
      loadCourses: function() {
        axios.get(`/api/classes/instructor`).then((res) => {
          this.courses.instructor = res.data
        })
        axios.get(`/api/classes/student`).then((res) => {
          this.courses.student = res.data
        })
        axios.get("/api/classes/current").then(res => {
          this.selectedCourse = res.data
        })
      },
      onSelectCourse: function(course) {
        axios.post("/api/classes/current", { id: course.id }).then(() => {
          this.selectedCourse = course
        })
      },
      onCreateCourse: function() {
        this.loadCourses()
      },
      redirect: function(page) {
        this.$router.push({ name: page, params: { class: null } })
      },
      openBookmarkletModal: function() {
      
        this.$modal.show('bookmarklet-modal')
      },
      closeBookmarkletModal: function() {
        this.$modal.hide('bookmarklet-modal')
      },
    },
    created: function() {
      axios.get("/api/users/current")
        .then(res => {
          if (res.data.username && res.data.username.length > 0) {
            this.user = res.data
          } else {
            this.user = null
            this.redirect('top-page')
          }
        })
        .catch(() => {
          this.redirect('top-page')
        })
      this.loadCourses()
    }
  }
</script>

<style>
  .app-wrapper {
    height: 100%;
  }
  .app-body {
    display: flex;
    width: 100%;
    height: calc(100vh - var(--navbar-height));
  }
  .sidebar {
    min-width: 300px;
    width: 300px;
    padding: 0 0 0 20px;
    height: 100%;
    overflow-y: scroll;
    background-color: #eee;
    text-align: left;
  }
  .dashboard-wrapper {
    padding: 20px;
    height: calc(100% - 46px);
    overflow-y: scroll;
    flex-wrap: wrap;
    align-items: flex-start;
    border: solid 3px #875f9a;
    flex-grow: 1;
  }

  .sidebar button {
    width: calc(100% - 20px);
    align-self: flex-end;
    padding: 6px 0;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .sidebar button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .sidebar button:enabled:hover {
    background-color: #0069d9;
  }

  modal {
  
    height: 100%;
    overflow: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    
  }

  modal p {
  margin-left: 50px;
  margin-right: 50px;
  }

  pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 20px;
  margin: 0 15%;
  text-align: left;
  }

  .bookmarklet-modal {
  padding: 20px;
  }
</style>
