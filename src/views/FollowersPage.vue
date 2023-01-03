<template>
  <div class="app-wrapper">
    <nav-bar :course="selectedCourse" :user="user"></nav-bar>
    <div class="app-body">
        <div class="sidebar">
            <search-user :me="user"> </search-user>
        </div>
        <div class="dashboard-wrapper">
            <follow></follow>
        </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import NavBar from '../components/NavBar.vue'
  import VueJwtDecode from "vue-jwt-decode";
  import SearchUser from '../components/sidebar/SearchUser.vue';
  import Follow from '../components/follow/Follow.vue';

  export default {
    name: 'followers-page',
    components: {
      NavBar,
        SearchUser,
        Follow,
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
      redirect: function(page) {
        this.$router.push({ name: page, params: { class: null } })
      },
    },
    created: async function() {
        try {
            const token = localStorage.getItem("nb.user");
            if (token) {
                const decoded = VueJwtDecode.decode(token);
                if (decoded.user.username && decoded.user.username !== '') {
                    this.user = decoded.user                
                }
            } else {
                this.user = null
                localStorage.removeItem("nb.user");
                localStorage.removeItem("nb.current.course");
                this.redirect('top-page')
            }
        } catch (error) {
            console.error(error, 'error from decoding token')
            this.user = null
            this.redirect('top-page')
        }

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
    overflow-y: scroll;
    flex-wrap: wrap;
    align-items: flex-start;
    border: solid 3px #875f9a;
    flex-grow: 1;
  }
</style>