<template>
    <div class="app-wrapper">
        <nav-bar :course="title" :user="user"></nav-bar>
        <div v-if="!isAdmin">You are not authorized!</div>
        <div class="nb-documap" v-else>
            <div class="nb-admin-tabs">
            </div>
            <div class="tab">
                <div class="nb-main">
                    <template>
                        <documaps
                            :readings="readings">
                        </documaps>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import VueJwtDecode from "vue-jwt-decode"
import NavBar from '../components/NavBar.vue'
import Documaps from '../components/documap/Documaps.vue'

export default {
    name: 'documap-page',
    data() {
        return {
            user: null,
            title: {class_name: 'Documap'},
            isAdmin: false,
            readings: [
                {   id: '123',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                 },
                 {   id: '1223',
                    name: '2009 Tigges A tunable synthetic mammalian oscillat',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=c574362cc0c66929b528bc8ff2e7d174',
                 },
                 {   id: '1223',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                 },
                 {   id: '123',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                 },
                  {   id: '1223',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                 },
            ]
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
            }
        } else {
            localStorage.removeItem("nb.user");
            localStorage.removeItem("nb.current.course");
            this.user = null
            this.redirect('top-page')
        }
    },
    watch: {
        
    },
    methods: {

    },
    components: {
        NavBar,
        Documaps,
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
.tab {
    height: 100%;
}
.nb-documap {
    height: calc(100% - 80px);
}
</style>
