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
        NB Bookmarklet Instructions
        </button>
        <modal name="bookmarklet-modal" height="auto" width="70%" >
        <div class="bookmarklet-modal">
        <p>To enable the NB sidebar for a class reading, either drag (don't click) this <a :href = "bookmarklet">NB Bookmarklet</a> link to your bookmarks bar, or make a new bookmark with the code below as the URL.</p>
    <p>When on the class reading page, just click on the bookmark and the sidebar should appear.</p>
    <pre>
      <code>
        javascript:(function(){
          let s = document.createElement('script');
          s.src= '{{pathname}}/client/js/bundle.js';
          document.body.append(s);
        })()
      </code>
    </pre>
        </div>
        </modal>
        <a href="https://forms.gle/6YERC3jSu1W1zUzS8" class="nb-bug-link" target="_blank">Report Bug</a>
      </div>
      <div class="dashboard-wrapper">
        <course-dashboard
            v-if="selectedCourse"
            :course="selectedCourse"
            :userType="userType"
            :user="user">
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
  import VueJwtDecode from "vue-jwt-decode";

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
        return "javascript:(function(){let s = document.createElement('script'); s.src= '" + window.location.protocol + "//" + window.location.host + "/client/js/bundle.js'; document.body.append(s);})()"
      }
    },
    methods: {
      loadCourses: function() {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}

        axios.get(`/api/classes/instructor`, headers).then((res) => {
          this.courses.instructor = res.data
        })
        axios.get(`/api/classes/student`, headers).then((res) => {
          this.courses.student = res.data
        })

        const currentCourse = localStorage.getItem('nb.current.course')
        if (currentCourse) {
            this.selectedCourse = JSON.parse(currentCourse)
        }
      },
      onSelectCourse: function(course) {
          localStorage.setItem('nb.current.course', JSON.stringify(course))
          this.selectedCourse = course
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
        try {
            const token = localStorage.getItem("nb.user");
            const decoded = VueJwtDecode.decode(token);
            if (decoded.user.username && decoded.user.username !== '') {
                this.user = decoded.user
                this.loadCourses()
            } else {
                localStorage.removeItem("nb.user");
                localStorage.removeItem("nb.current.course");
                this.user = null
                this.redirect('top-page')
            }
        } catch (error) {
            localStorage.removeItem("nb.user");
            localStorage.removeItem("nb.current.course");
            this.user = null
            this.redirect('top-page')
        }
    }
  }
</script>

<style>

  .nb-bug-link {
    position: fixed;
    bottom: 12px;
    left: 25px;
  }
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
    /* height: 100%; */
    height: calc(100% - 6px);
    overflow-y: auto;
    background-color: #eee;
    text-align: left;
    border: solid 3px #875f9a;
    border-bottom-left-radius: 11px;
  }
  .dashboard-wrapper {
    padding: 20px;
    height: calc(100% - 46px);
    overflow-y: auto;
    flex-wrap: wrap;
    align-items: flex-start;
    border: solid 3px #875f9a;
    flex-grow: 1;
    border-bottom-right-radius: 11px;
  }

  .sidebar button {
    width: calc(100% - 20px);
    align-self: flex-end;
    padding: 6px 0;
    border-radius: 5px;
    border: solid 1px #8649af;
    background-color: #8649af;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .sidebar button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .sidebar button:enabled:hover {
    background-color: #45266C;
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
