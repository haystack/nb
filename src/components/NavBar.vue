<template>
  <div>
    <nav class="navbar">
        <div id="navbar-left">
        </div>
        <div id="navbar-center">
          <h2 v-on:click="redirect('user-settings')">{{this.title}}</h2>
        </div>
        <div id="navbar-right">
          <div v-if="isSignedIn" class="signed-in">
            <h4 style="margin: auto">{{ this.username }}</h4>
            <div class="dropdown dropdown-arrow">
              <button><i class="material-icons white">expand_more</i></button>
              <div class="dropdown-content">
                <button v-on:click="signOut">Log out</button>
              </div>
            </div>
          </div>
        </div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "NavBar",

  props: {
    title: String,
    hasBackwardArrow: Boolean,
    isSignedIn: Boolean,
    username: String,
    arrowName:String
  },

  data() {
    return {
      className: "",
      users: "",
    }
  },

  methods: {
    redirect: function(page) {
      this.$router.push({ name: page});
    },

    signOut: function() {
      axios.post('api/users/logout')
        .then(() => {
          // handle success
          eventBus.$emit('signout-success', true);
        })
        .catch((err) => {
          // handle error
          alert(`Error with axios request: ${err.response.data.error}`);
        }).then(()=> {
          this.$router.push({name: 'user-settings'});
        });
    },

    signIn: function(){
      this.$router.push({name: 'user-settings'});
    }
  }
}
</script>

<style scoped>
.white {
  color: white;
} 

.navbar {
  padding-left: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 56px;
  background-color: var(--navbar-color);
  color: white;
}

#nav-title {
  text-decoration: none;
  font-weight: bold;
  font-size: 26px;
  padding: 10px;
  color: white;
}

#navbar-left {
  display: flex;
}

#navbar-right {
  display: flex;
  align-items: center;
  height: 100%;
}

.signed-in {
  display: flex;
  height: 100%;
}

.logout {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin: 1px;
  cursor: pointer;
  padding-right: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
}
/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

.notification-badge {
    position: relative;
    right: 5px;
    top: -20px;
    color: white;
    background-color: crimson;
    margin: 0 -.8em;
    border-radius: 50%;
    padding: 4px 5px;
    font-weight: bold;
}

.dropdown-arrow {
  display: flex;
  align-items: center;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  top: 56px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  width: 100%;
}

/* Change color of dropdown links on hover */
.dropdown-content button:hover {background-color: #f1f1f1}
</style>