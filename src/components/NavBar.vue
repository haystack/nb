<template>
  <nav>
    <div class="home" @click="redirect('home-page')"> 
      <img src="./inversenblogo.png" width="40px" alt="test">
    </div>
    <div v-if="course" class="title">
      {{ course.class_name }}
    </div>
    <div v-if="user" class="user">
      <div class="name">{{ user.username }}</div>
      <div class="dropdown">
        <font-awesome-icon :icon="downArrow" class="arrow">
        </font-awesome-icon>
        <div class="content">
          <div @click="redirect('profile-page')"> Your Profile </div>
          <div @click="logout"> Log out </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
  import axios from "axios"
  import { eventBus } from "../main"

  export default {
    name: "nav-bar",
    props: {
      course: Object,
      user: Object,
    },
    data() {
      return {
        downArrow: faChevronDown,
      }
    },
    methods: {
      redirect: function(page) {
        this.$router.push({ name: page })
      },
      logout: function() {
        localStorage.removeItem("nb.user")
        localStorage.removeItem("nb.current.course")
        eventBus.$emit('signout-success', true)
        this.$router.push({ name: 'top-page' })
      }
    },
    components: {
      FontAwesomeIcon,
    }
  }
</script>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--navbar-height);
    background-color: #4a2270;
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
  .link-bar {
    list-style: none;
    margin: 0;
    padding: 0;
    color: #f7f6f6;
    font-family: "Roboto";
    font-weight: 400;
    font-size: 20px;
    text-align: center;
  }
  .linklist {
    display: inline;
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
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    overflow: hidden;
    cursor: pointer;
    z-index: 1;
  }
  .user .dropdown .content > div {
    padding: 8px 12px;
  }
  .user .dropdown .content > div:hover {
    background-color: #f1f1f1
  }
  .user .dropdown:hover .content {
    display: block;
  }
</style>
