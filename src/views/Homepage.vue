<template>
  <div class="app">
    <NavBar v-bind:hasBackwardArrow="false" title="NB Prototype" v-bind:isSignedIn="this.loggedIn" v-bind:username="this.username"/>
    <div id="body">
      <div class="classes">
        <!-- Classes where user is instructor -->
        <div id="class-header">
          <h2>As Instructor</h2>
        </div>
        <div>
          <ClassList mode="instructor" :selected="nb_class" :listener="listener"/>
        </div>
        <ClassCreate :listener="listener"/>
        <!-- Classes where user is student -->
        <div id="class-header">
          <h2>As Student</h2>
        </div>
        <div>
          <ClassList mode="student" :selected="nb_class" :listener="listener"/>
        </div>
      </div>
      <div class="documents">
        <ClassBody v-if="nb_class" :nb_class="nb_class" :type="type"/>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import ClassList from '../components/ClassList.vue';
import ClassCreate from '../components/ClassCreate.vue';
import NavBar from '../components/NavBar.vue';
import ClassBody from '../components/ClassBody.vue';
import Vue from 'vue';

export default {
  name: 'app',
  components: {
    ClassList,
    ClassCreate,
    ClassBody,
    NavBar
  },
  data() {
    return {
      username: "",
      loggedIn: false,
      nb_class: null,
      listener: new Vue(),
      type: ""
    };
  },
  methods: {
    redirect: function(page){
      this.$router.push({name:page, params:{class: null}});
    },

    setSelectedClass: function(nb_class){
      this.nb_class = nb_class;
    }
  },
  created: function(){
    this.listener.$on("setClass", (res) => {
      console.log("class is set")
      this.nb_class = res.nb_class;
      this.type = res.mode;
    })
    axios.get("/api/users/current")
      .then(res => {
          if (res.data.username !== undefined && res.data.username !== "") {
            this.loggedIn = true;
            this.username = res.data.username;
          } else {
            this.signedIn = false;
            this.redirect('user-settings');
          }
      })
      .catch(() => {
        this.redirect('user-settings');
      });
    axios.get("/api/classes/current").then(res => {
      if(res.data){
        this.nb_class = res.data
      }
    })
  }
}
</script>


<style>
#app {
  height: 100%;
}
.app {
  height: 100%;
}
.show-notifications {
  color: white;
  cursor: pointer;
}
#body {
  display: flex;
  width: 100%;
  height: calc(100% - 56px);
  overflow: auto;
  text-align: center;
}
.classes {
  background-color: var(--background-color);
  width: 30%; 
  height: 100%;
  overflow-y: scroll;
}
#class-header {
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
}
#add-class {
  cursor: pointer;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
  margin-left: 5px;
  font-weight: bold;
}
#add-class:hover {
  color: var(--navbar-hover-color);
}
.documents {
  width: 70%; 
  height: 100%;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>