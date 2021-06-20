<template>
    <div class="app-wrapper">
        <nav-bar :course="title" :user="user"></nav-bar>
        <div v-if="!isAdmin">You are not authorized!</div>
        <div v-else class="nb-admin">
            <div class="nb-side">
                <div 
                    v-for="course in courses"
                    @click="selectCourse(course)">
                    {{course.class_name}}
                </div>
            </div>
            <div class="nb-main">
                <h2>Globle Configs</h2>
                <table>
                    <tr v-for="config in globleConfigs">
                        <td>{{config.name}}</td>
                        <td>{{config.value}}</td>
                    </tr>
                </table>
                <hr/>
                <h1>{{selectedCourse.class_name}}</h1> 
                <code>{{selectedCourse.id}}</code>
                <br/><br/><br/>
                <table>
                    <tr v-for="(value, name) in selectedCourseConfigs">
                        <td>{{name}}</td>
                        <td>
                            <button v-bind:class="{ 'selected-config': value == 'true' }" @click="setConfig(name, 'true')">ture</button>
                            <button v-bind:class="{ 'selected-config': value == 'false' }" @click="setConfig(name, 'false')">false</button>
                            <button v-bind:class="{ 'selected-config': value == 'Globle' }" @click="setConfig(name, 'Globle')">Globle</button>
                        </td>
                    </tr>
                </table>
                <br/>
                <button @click="updateConfig()">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode"
import NavBar from '../components/NavBar.vue'

export default {
    name: 'admin-page',
    data() {
        return {
            user: null,
            title: {class_name: 'Admin Page'},
            isAdmin: false,
            courses: [],
            selectedCourse: {},
            selectedCourseConfigs: {},
            globleConfigs: [],
        }
    },
    created: async function() {
        const token = localStorage.getItem("nb.user");
        const decoded = VueJwtDecode.decode(token);
        if (decoded.user.username && decoded.user.username !== '') {
            this.user = decoded.user
            const headers = { headers: { Authorization: 'Bearer ' + token }}
            const res = await axios.get(`/api/admin/check`, headers)
            if (res.status === 200) {
                this.isAdmin = true
                const coursesRes = await axios.get(`/api/admin/courses`, headers)
                this.courses = coursesRes.data
                const configsRes = await axios.get(`/api/admin/configs`, headers)
                this.globleConfigs = configsRes.data
            }
        } else {
            localStorage.removeItem("nb.user");
            localStorage.removeItem("nb.current.course");
            this.user = null
            this.redirect('top-page')
        }
    },
    watch: {
        selectedCourse: async function(newCourse, oldCourse) {
            let cs = JSON.parse(JSON.stringify(this.globleConfigs))
            cs.forEach( c => c.value = 'Globle')
            let m = {}
            cs.forEach( c => m[c.name] = c.value)
            console.log(m)
            this.selectedCourseConfigs = m

            const token = localStorage.getItem("nb.user");
            const headers = { headers: { Authorization: 'Bearer ' + token }}
            const configsRes = await axios.get(`/api/admin/course/${this.selectedCourse.id}/configs`, headers)
            if (configsRes.data) {
                console.log(configsRes.data.value)
                let course = JSON.parse(configsRes.data.value)
                console.log(course)
                course.configs.forEach(c => this.selectedCourseConfigs[c.name] = c.value)
            }

        }
    },
    methods: {
        selectCourse: function(course) {
            this.selectedCourse = course
        },
        setConfig: function(config, value) {
            this.selectedCourseConfigs[config] = value
        },
        updateConfig: async function() {
            console.log('update config now')
            if (window.confirm("Are sure?")) {
                let obj = JSON.parse(JSON.stringify(this.selectedCourseConfigs))
                let arr = []
                Object.keys(obj).forEach(k => arr.push({name: k, value: obj[k]}))
                let course = {}
                course.configs = arr
                course.configs = course.configs.filter(c => c.value !== 'Globle')
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                const updateConfigRes = await axios.post(`/api/admin/course/${this.selectedCourse.id}/configs`, course, headers)
            }
        }
    },
    components: {
        NavBar,
    },
}
</script>

<style>
.app-wrapper {
    height: 100%;
}
.nb-admin {
    display: flex;
}
.nb-main {
    padding: 15px;
    width: 100%;
}
.nb-side {
    min-width: 250px;
    max-width: 250px;
    height: calc(100vh - 40px);
    background-color: #ececec;
    overflow-y: auto;
}
.nb-side > div {
    padding: 5px 10px;
    margin: 4px 0;
    cursor: pointer;
}
.nb-side > div:hover {
    background-color: #999999;
}
.selected-config {
    background-color: #b69cd0;
}
</style>
