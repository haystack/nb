<template>
  <div class="app-wrapper">
    <nav-bar :course="selectedCourse" :user="user"></nav-bar>
    <div class="app-body">
      <div class="dashboard-wrapper">
        <user-profile :user="user"> </user-profile>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import UserProfile from "../components/user/UserProfile.vue";
import VueJwtDecode from "vue-jwt-decode";
import Vue           from 'vue'
import Notifications from 'vue-notification'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas, far)
Vue.use(Notifications)

export default {
  name: "profile-page",
  components: {
    NavBar,
    UserProfile,
  },
  data() {
    return {
      user: null,
      courses: {
        instructor: [],
        student: [],
      },
      selectedCourse: null,
    };
  },
  computed: {
    userType: function () {
      if (
        this.courses.instructor.find((x) => x.id === this.selectedCourse.id)
      ) {
        return "instructor";
      }
      if (this.courses.student.find((x) => x.id === this.selectedCourse.id)) {
        return "student";
      }
      return "";
    },
  },
  methods: {
    redirect: function (page) {
      this.$router.push({ name: page, params: { class: null } });
    },
  },
  created: async function () {
    try {
      const token = localStorage.getItem("nb.user");
      if (token) {
        const decoded = VueJwtDecode.decode(token);
        if (decoded.user.username && decoded.user.username !== "") {
          this.user = decoded.user;
        }
      } else {
        this.user = null;
        localStorage.removeItem("nb.user");
        localStorage.removeItem("nb.current.course");
        this.redirect("login-page");
      }
    } catch (error) {
      console.error(error, "error from decoding token");
      this.user = null;
      this.redirect("login-page");
    }
  },
};
</script>

<style>
.app-wrapper {
  height: 100%;
}
.app-body {
  display: flex;
  width: 100%;
  height: calc(100vh - (2 * var(--navbar-height)));
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
  border: solid 3px #60348a;
  flex-grow: 1;
}
</style>
