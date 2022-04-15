<template>
    <div class="app-wrapper">
        <nav-bar :course="title" :user="user"></nav-bar>
        <div v-if="!isAdmin">You are not authorized!</div>
        <div v-else>
            <div class="nb-admin-tabs">
                <span @click="selectTab('classes')" v-bind:class="{ active: currentTab === 'classes' }">Classes</span>
                <span @click="selectTab('consents')" v-bind:class="{ active: currentTab === 'consents' }">Consents</span>
            </div>
            <div v-if="currentTab === 'classes'" class="tab">
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
                                <tr v-for="config in globalConfigs" v-bind:class="{ 'true': config.value === 'true' }">
                                    <td>{{config.name}}</td>
                                    <td><div>{{config.value}}</div></td>
                                    <td><div>{{config.description}}</div></td>
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
                            <table class="class-configs">
                                <tr v-for="(value, name) in selectedCourseConfigs">
                                    <td>{{name}}</td>
                                    <td v-if="name.startsWith('CONFIG_')">
                                        <input v-bind:class="{ 'selected-config': value !== 'Global' }" :value="value" @input="setConfig(name, $event.target.value)" />
                                        <button v-bind:class="{ 'selected-config': value == 'Global' }" @click="setConfig(name, 'Global')">Global</button>
                                    </td>
                                    <td v-else>
                                        <button v-bind:class="{ 'selected-config': value == 'true' }" @click="setConfig(name, 'true')">true</button>
                                        <button v-bind:class="{ 'selected-config': value == 'false' }" @click="setConfig(name, 'false')">false</button>
                                        <button v-bind:class="{ 'selected-config': value == 'Global' }" @click="setConfig(name, 'Global')">Global</button>
                                    </td>
                                </tr>
                            </table>
                        </fieldset>
                        <fieldset>
                            <button @click="updateConfig()">Update</button>
                        </fieldset>
                        
                    </template>
                </div>
            </div>
             <div v-if="currentTab === 'consents'" class="tab consents">
                <fieldset>
                    <legend>New Consent</legend>
                        Name: <input v-model="newConsentName">
                    <button @click="createConsent">New Consent</button>
                </fieldset>
                 <fieldset>
                    <legend>Consents</legend>
                     <table>
                        <tr v-for="consent in consents">
                            <details>
                                <summary>{{consent.name}} ({{consent.id}}) ✔️:{{consent.Consentees.length}} ❌:{{consent.Dissenters.length}}</summary>
                                ✔️:
                                <ul>
                                    <li v-for="consentee in consent.Consentees">
                                        <kbd>[{{consentee.id}}]</kbd>
                                        {{consentee.email}}
                                    </li>
                                </ul>
                                ❌:
                                <ul>
                                    <li v-for="dissenter in consent.Dissenters">
                                        <kbd>[{{dissenter.id}}]</kbd>
                                        {{dissenter.email}}
                                    </li>
                                </ul>

                            </details>
                        </tr>
                    </table>
                </fieldset>
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
            consents: [],
            selectedCourse: {},
            selectedCourseStudents: [],
            selectedCourseConfigs: {},
            globalConfigs: [],
            controlUsersCount: null,
            isNotSaved: false,
            controlStudents: [],
            treatmentStudents: [],
            assignedSources: [],
            currentTab: 'classes',
            newConsentName: null,
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
                this.globalConfigs = configsRes.data.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                const consentsRes = await axios.get(`/api/admin/consent`, headers)
                this.consents = consentsRes.data
                console.log(this.consents)
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
            this.isNotSaved = false
            this.controlStudents= []
            this.treatmentStudents= []
            this.assignedSources= []

            let cs = JSON.parse(JSON.stringify(this.globalConfigs))
            cs.forEach( c => c.value = 'Global')
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
            }

            this.selectedCourseStudents = selectedCourseStudents
        }
    },
    methods: {
        selectTab: function(tab) {
            this.currentTab = tab
        },
        createConsent: async function() {
            if (this.newConsentName) {
                console.log('new onsent: ' + this.newConsentName)
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                await axios.post(`/api/admin/consent`, {name:this.newConsentName}, headers)
            }
        },
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
                course.configs = course.configs.filter(c => c.value !== 'Global')
                const token = localStorage.getItem("nb.user");
                const headers = { headers: { Authorization: 'Bearer ' + token }}
                const updateConfigRes = await axios.post(`/api/admin/course/${this.selectedCourse.id}/configs`, course, headers)
                this.isNotSaved = false
            }
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
.true {
    font-weight: bold;
    font-style: italic;
    background: #260942;
}
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
.nb-admin-tabs {
    display: flex;
    height: 40px;
    background: #60348a;
    margin: 0;
    color: white;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 0 20px;
}
.nb-admin-tabs span {
    margin: 0px 15px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-content: center;
    align-items: center;
    padding: 0 10px;
}
.nb-admin-tabs span.active {
    background: #4a2270;
    cursor: not-allowed;
}
.tab {
    display: flex;
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
    width: 100%;
    table-layout: fixed;
}

table.class-configs tr:nth-child(even) {
    background-color: #f2f2f2;
}

table tr td div {
    overflow: auto;
}

table tr td div::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
 
table tr td div::-webkit-scrollbar-track {
  box-shadow: inset 1px 0px 3px rgb(0 0 0 / 30%);
  background: #5b2f85;
}
 
table tr td div::-webkit-scrollbar-thumb {
  background-color: #260942;
  outline: 1px solid #ffffff5c;
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

.tab.consents {
    flex-direction: column;
}
</style>
