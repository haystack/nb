<template>
  <div class="app-wrapper">
    <nav-bar></nav-bar>
    <div class="video-wrapper">
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/G0ghiJWkHYY"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="app-body">
      <user-create></user-create>
      <div class="v-divide"></div>
      <user-login></user-login>
    </div>
    <a
      href="https://forms.gle/6YERC3jSu1W1zUzS8"
      class="nb-bug-link"
      target="_blank"
      >Report Bug</a
    >
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "../main";
import NavBar from "../components/NavBar.vue";
import UserCreate from "../components/user/UserCreate.vue";
import UserLogin from "../components/user/UserLogin.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "login-page",
  data() {
    return {
      user: null,
      messages: null,
    };
  },
  mounted: function () {
    try {
      const token = localStorage.getItem("nb.user");
      if (token) {
        const decoded = VueJwtDecode.decode(token);
        if (decoded.user.username && decoded.user.username !== "") {
          this.user = decoded.user;
          this.$router.push("dashboard");
        }
      }
    } catch (error) {
      console.error(error, "error from decoding token");
    }

    eventBus.$on("signin-success", () => {
      try {
        const token = localStorage.getItem("nb.user");
        const decoded = VueJwtDecode.decode(token);
        this.user = decoded.user;
        this.$router.push("dashboard").catch((err) => {});
      } catch (error) {
        console.error(error, "error from decoding token");
      }
    });

    eventBus.$on("signout-success", () => {
      this.user = null;
    });
  },
  components: {
    NavBar,
    UserCreate,
    UserLogin,
  },
};
</script>

<style scoped>
.nb-bug-link {
  position: fixed;
  bottom: 12px;
  left: 25px;
}
.app-wrapper {
  height: 100%;
}
.app-body {
  width: 100%;
  height: calc(100vh - var(--navbar-height) - 80px);
  padding: 40px 0;
  display: flex;
  justify-content: space-around;
}
.v-divide {
  width: 0;
  height: 100%;
  border: solid 1px #aaa;
}

.video-wrapper {
  display: none;
  position: absolute;
  padding: 3.5%;
  width: 40%;
  height: 40%;
  top: 400px;
}
</style>
