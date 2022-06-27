<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="app-body">
      <div class="dashboard-wrapper">
        <reset-password
            :user="user"
        >
        </reset-password>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import NavBar from '../components/NavBar.vue'
  import ResetPassword from '../components/user/ResetPassword.vue'
  import VueJwtDecode from "vue-jwt-decode";

  export default {
    name: 'reset-password-page',
    components: {
      NavBar,
      ResetPassword,
    },
    props: {
      reset_password_id: String,
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
            } else if (this.reset_password_id) {
                const res = await axios.post("api/users/getuser", {id: this.reset_password_id}) // pass in id to get that user is none is currently logged in
                const token = res.data.token
                localStorage.setItem("nb.user", token);
                const decoded = VueJwtDecode.decode(token);
                this.user = decoded.user
            } else {
                this.user = null
                localStorage.removeItem("nb.user");
                localStorage.removeItem("nb.current.course");
                this.redirect('top-page')
            }
        } catch (error) {
            console.log(error, 'error from decoding token')
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
