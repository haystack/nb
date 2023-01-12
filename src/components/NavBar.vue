<template>
    <nav>
        <div class="msg" v-if="hasMsg" :style="msg.style">
            <div v-html="msg.html"></div>
        </div>
        <div class="top">
            <div class="menu">
                <div class="home" @click="redirect('welcome-page')">nb</div>
                <div class="about" @click="redirect('about-page')">about</div>
            </div>
            <div v-if="user" class="user">
                <div class="name">{{ user.username }}</div>
                <div class="dropdown">
                    <font-awesome-icon :icon="downArrow" class="arrow"> </font-awesome-icon>
                    <div class="content">
                        <div @click="redirect('profile-page')">Your Profile</div>
                        <div @click="redirect('followers-page')"> Following </div>
                        <div @click="logout">Log out</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div v-if="course" class="title">
                {{ course.class_name }}
            </div>
        </div>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { eventBus } from "../main";

export default {
    name: "nav-bar",
    props: {
        course: Object,
        user: Object,
    },
    data() {
        return {
            downArrow: faChevronDown,
            hasMsg: false,
            msg: {},
        };
    },
    created: async function () {
        try {
            const res = await axios.get('/api/nb/config')
            const configs = res.data
            const msg = configs['CONFIG_NB_DASHBOARD_TOP_MSG'] ? JSON.parse(configs['CONFIG_NB_DASHBOARD_TOP_MSG']) : {}
            const hasMsg = configs['NB_DASHBOARD_TOP_MSG'] === 'true' ? true : false
            
            if (msg && msg.html && hasMsg) {
                this.msg = msg
                this.hasMsg = hasMsg
            }
        } catch (error) {}
    },
    methods: {
        redirect: function (page) {
            this.$router.push({ name: page });
        },
        logout: function () {
            localStorage.removeItem("nb.user");
            localStorage.removeItem("nb.current.course");
            eventBus.$emit("signout-success", true);
            this.$router.push({ name: "welcome-page" });
        },
    },
    components: {
        FontAwesomeIcon,
    },
};
</script>

<style scoped>
.msg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--navbar-height);
    background-color: rgb(215, 215, 40);
    color: #000;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--navbar-height);
  background-color: #4a2270;
  color: #fff;
}
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--navbar-height);
  background-color: #60348a;
  color: #fff;
}
.home {
  margin-left: 20px;
  font-size: 26px;
  font-weight: bold;
  font-style: italic;
  cursor: pointer;
}
.home:hover {
  text-decoration: underline;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.user {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.user .name {
  font-weight: bold;
}
.user .dropdown {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
}
.user .dropdown .arrow {
  margin-left: 8px;
  cursor: default;
}
.user .dropdown .content {
  display: none;
  position: absolute;
  right: -10px;
  top: var(--navbar-height);
  min-width: 100px;
  color: #000;
  font-size: 14px;
  background-color: #f9f9f9;
  border-radius: 3px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
}
.user .dropdown .content > div {
  padding: 8px 12px;
}
.user .dropdown .content > div:hover {
  background-color: #f1f1f1;
}
.user .dropdown:hover .content {
  display: block;
}
.menu {
  display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    user-select: none;
}
.about {
  margin-left: 30px;
  cursor: pointer;
  font-size: 14px;
}
</style>
