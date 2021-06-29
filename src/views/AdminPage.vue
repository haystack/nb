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
                <template v-if="isNotSaved">
                    Some changes are not saved yet, please click update once you'r done!
                </template>
                <div class="nb-globle-area">
                    <fieldset>
                        <legend>Global configs</legend>
                        <table>
                            <tr v-for="config in globalConfigs">
                                <td>{{config.name}}</td>
                                <td>{{config.value}}</td>
                            </tr>
                        </table>
                    </fieldset>
                </div>

                <template v-if="selectedCourse.class_name">
                    <h1>{{selectedCourse.class_name}}</h1> 
                    <fieldset>
                        <legend>Info</legend>
                        <ul>
                            <li>ID: <code>{{selectedCourse.id}}</code></li>
                            <li>createdAt: <code>{{selectedCourse.createdAt}}</code></li>
                            <li>Creator: <code>{{selectedCourse.Creator.name.first}} {{selectedCourse.Creator.name.last}}</code></li>
                            <li># of Instructors: <code>{{selectedCourse.Instructors.length}}</code></li>
                            <li># of Sections: <code>{{selectedCourse.Sections.length}}</code></li>
                            <li># of Sources: <code>{{selectedCourse.Sources.length}}</code></li>
                            <li># of Students: <code>{{selectedCourseStudents.length}}</code></li>
                        </ul>
                    </fieldset>
                    <fieldset>
                        <legend>Class configs</legend>
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
                    </fieldset>
                    <fieldset>
                        <legend>Spotlight Exp.</legend>
                        <template v-if="!expSpotlight">
                        # of control users: <input v-model="controlUsersCount"> <button @click="createExpSpotlight()">Create</button>
                        </template>
                        <template v-if="expSpotlight">
                            <fieldset>
                                <legend>Groups</legend>
                                <details>
                                    <summary>Control: {{controlStudents.length}}</summary>
                                    <ul>
                                        <li v-for="student in controlStudents"><kbd>[{{student.id}}] </kbd>{{student.first_name}} {{student.last_name}} <kbd>({{student.username}})</kbd></li>
                                    </ul>
                                </details>
                                <details>
                                    <summary>Treatment: {{treatmentStudents.length}}</summary>
                                    <ul>
                                        <li v-for="student in treatmentStudents"><kbd>[{{student.id}}] </kbd>{{student.first_name}} {{student.last_name}} <kbd>({{student.username}})</kbd></li>
                                    </ul>
                                </details>
                            </fieldset>
                            <fieldset>
                                <legend>Sources</legend>
                                <ul>
                                    <li v-for="source in selectedCourse.Sources"><span v-if="assignedSources.includes(source.id)">✔️</span><button v-else @click="assignSource(source)">Assign</button> <kbd>[{{source.id}}] </kbd>{{source.filename}}</li>
                                </ul>
                            </fieldset>
                        </template>
                    </fieldset>
                    <fieldset>
                        <button @click="updateConfig()">Update</button>
                     </fieldset>
                    
                </template>
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
            selectedCourseStudents: [],
            selectedCourseConfigs: {},
            globalConfigs: [],
            controlUsersCount: null,
            expSpotlight: null,
            isNotSaved: false,
            controlStudents: [],
            treatmentStudents: [],
            assignedSources: [],
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
                this.globalConfigs = configsRes.data
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
            this.selectedCourseConfigs = {}
            this.controlUsersCount = null
            this.expSpotlight = null
            this.isNotSaved = false
            this.controlStudents= []
            this.treatmentStudents= []
            this.assignedSources= []

            let cs = JSON.parse(JSON.stringify(this.globalConfigs))
            cs.forEach( c => c.value = 'Globle')
            let m = {}
            cs.forEach( c => m[c.name] = c.value)
            this.selectedCourseConfigs = m

            const token = localStorage.getItem("nb.user");
            const headers = { headers: { Authorization: 'Bearer ' + token }}
            const configsRes = await axios.get(`/api/admin/course/${this.selectedCourse.id}/configs`, headers)
            const courseRes = await axios.get(`/api/admin/course/${this.selectedCourse.id}/info`, headers)
            const selectedCourseStudents = courseRes.data.GlobalSection.MemberStudents

            if (configsRes.data) {
                let course = JSON.parse(configsRes.data.value)
                course.configs.forEach(c => this.selectedCourseConfigs[c.name] = c.value )

                if (course.expSpotlight) {
                    const assignmentsRes = await axios.get(`/api/admin/course/${this.selectedCourse.id}/assignments`, headers)
                    this.assignedSources = assignmentsRes.data.map(s => s.source_id)
                    this.setExpSpotlightGroups(selectedCourseStudents, course.expSpotlight.control, course.expSpotlight.treatment)
                    this.expSpotlight = course.expSpotlight
                }
            }

            this.selectedCourseStudents = selectedCourseStudents
        }
    },
    methods: {
        selectCourse: function(course) {
            this.selectedCourse = course
        },
        setConfig: function(config, value) {
            this.isNotSaved = true
            this.selectedCourseConfigs[config] = value
        },
        updateConfig: async function() {
            if (window.confirm("Are sure?")) {
                let obj = JSON.parse(JSON.stringify(this.selectedCourseConfigs))
                let arr = []
                Object.keys(obj).forEach(k => arr.push({name: k, value: obj[k]}))
                let course = {}
                course.configs = arr
                course.configs = course.configs.filter(c => c.value !== 'Globle')

                if (this.expSpotlight) {
                    course.expSpotlight = this.expSpotlight
                }
                
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                const updateConfigRes = await axios.post(`/api/admin/course/${this.selectedCourse.id}/configs`, course, headers)
                this.isNotSaved = false
            }
        },
        createExpSpotlight: function() {
            this.isNotSaved = true
            const exp = {}
            const controlStudents = []
            let treatmentStudents = JSON.parse(JSON.stringify(this.selectedCourseStudents))
            treatmentStudents = treatmentStudents.map(s => s.id)

            for(let i=0; i < this.controlUsersCount; i++) {
                let random = Math.floor(Math.random() * treatmentStudents.length)
                controlStudents.push(treatmentStudents.splice(random, 1)[0])
            }

            exp.treatment = treatmentStudents
            exp.control = controlStudents
            this.setExpSpotlightGroups(this.selectedCourseStudents, controlStudents, treatmentStudents)
            this.expSpotlight = exp
        },
        assignSource: async function(source) {
            console.log(source)
            const token = localStorage.getItem("nb.user");
            const headers = { headers: { Authorization: 'Bearer ' + token }}
            const updateConfigRes = await axios.post(`/api/admin/course/${this.selectedCourse.id}/source/${source.id}/assignment`, {}, headers)
            const assignmentsRes = await axios.get(`/api/admin/course/${this.selectedCourse.id}/assignments`, headers)
            this.assignedSources = assignmentsRes.data.map(s => s.source_id)
        },
        setExpSpotlightGroups: function(selectedCourseStudents, control, treatment) {
            let treatmentStudents = JSON.parse(JSON.stringify(selectedCourseStudents))
            let controlStudents = []

            treatmentStudents = treatmentStudents.filter(s => {
                if (control.includes(s.id)) {
                    controlStudents.push(s)
                    return false
                }
                if (treatment.includes(s.id)) {
                    return true
                }
                return false
            })

            this.treatmentStudents = treatmentStudents
            this.controlStudents = controlStudents
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
    background-color: #4a2270;
    color: white;
}
.nb-globle-area {
    background: #4a2270;
    padding: 20px 25px;
    margin: 10px 0 20px 0;
    border-radius: 5px;
    color: white;
}
.nb-globle-area fieldset {
    margin-top: 0px;
    border-radius: 5px;
    border: 1px #fff solid;
}
.nb-globle-area legend {
    background: #fff;
    padding: 5px 35px;
    border-radius: 5px;
    color: #4a2270;
}
h1 {
    color: #fff;
    background: #4a2270;
    padding: 10px 20px;
    border-radius: 5px;
}
li {
    color: #4a2270;
}
code {
    color: #000;
    font-weight: bold;
    font-size: 15px;
    margin-left: 10px;
}
table {
    font-size: 12px;
}
fieldset {
    margin-top: 25px;
    border-radius: 5px;
    border: 1px #4a2270 solid;
}
fieldset fieldset {
    margin-top: 15px;
}
legend {
    background: #4a2270;
    padding: 5px 35px;
    border-radius: 5px;
    color: white;
}
fieldset fieldset > legend {
    background: #755692;
    font-size: 0.8em;
}
details {
    border: 1px #d4d4d4 solid;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px 0;
}
summary {

}
kbd {
    color: #9f7bc1;
}

</style>
