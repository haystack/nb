<template>
    <div class="app-wrapper">
        <nav-bar></nav-bar>
        <div class="app-body">
            <div class="dashboard-wrapper">
                <div v-if="isWorking">
                    <font-awesome-icon icon="spinner" class="icon"></font-awesome-icon>
                </div>
                <div v-else>
                    <font-awesome-icon icon="check" class="icon"></font-awesome-icon>
                    <span>Unsubscribed successfully</span>
                    <a href="/profile">manage your preferences</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import VueJwtDecode from "vue-jwt-decode";
import Vue           from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import axios from "axios"

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas, far)

export default {
    name: "unsubscribe-page",
    components: {
        NavBar,
    },
    data() {
        return {
            isWorking: true
        };
    },
    created: async function () {
        console.log(this.$route.query.token);
        const t = this.$route.query.token
        const token = decodeURIComponent(t)

        if (token) {
            try {
                await axios.post("api/unsubscribe", {token})
            } catch (error) {
                
            }
        }

        this.isWorking = false
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
  align-items: center;
  border: solid 3px #60348a;
  flex-grow: 1;
  display: flex;
    justify-content: center;
    font-size: 50px;
    color: #60348a;
}

.dashboard-wrapper div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.dashboard-wrapper div span{
        color: #000;
    font-size: 26px;
    font-weight: bold;
    margin: 30px 0;
}
.dashboard-wrapper div a{
    font-size: 16px;
}

</style>
