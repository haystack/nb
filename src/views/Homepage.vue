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
</style>
