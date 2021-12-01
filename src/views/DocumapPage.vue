<template>
    <div class="steps">
        <div class="step one" v-bind:class="{ active: currentStep === 1 }">
            <div>
                <div class="text-div">
                    <h1>Let's take you on a journey through colorful books</h1>
                    <h2 class="text-focus-in">Mooooor color more colorrrr, mooor color more colorrrr, color and colors!</h2>
                </div>
                <div class="button-right-div">
                    <button @click="toStep(2)"> Next </button>
                </div>
            </div>
        </div>
        <div class="step two" v-bind:class="{ active: currentStep === 2 }">
            <div>
                <div class="button-left-div">
                    <button @click="toStep(1)"> Back </button>
                </div>
                <div class="text-div">
                    <div><h1>Pick your interests</h1></div>
                    <div>
                        <ul>
                            <li v-for="reading in readings" v-bind:class="{ active: reading.selected }">
                                <a @click="toggleSelection(reading)">{{reading.name}}</a>
                            </li>
                        </ul>
                    </div>
                    <div><h1>& choose your desires!</h1></div>
                    <div>
                        <ul>
                            <li v-for="desir in desires" v-bind:class="{ active: desir.selected }" class="desir">
                                <a @click="toggleSelection(desir)">{{desir.name}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="button-right-div">
                    <button @click="toStep(3)" v-bind:class="{ disabled: filterReadings.length === 0 || filterDesires.length === 0 }"> Next </button>
                </div>
            </div>
        </div>
        <div class="step three" v-bind:class="{ active: currentStep === 3 }">
            <div>
                <div class="button-left-div">
                    <button @click="toStep(2)"> Back </button>
                </div>
                <div class="text-div">
                    <div class="nb-documap">
                        <div class="tab">
                            <div class="nb-main">
                                <template v-if="currentStep === 3">
                                    <documaps
                                        :readings="filterReadings"
                                        :settings="settings">
                                    </documaps>
                                    <div class="keys">
                                        <ul>
                                            <li v-for="desir in filterDesires" :class="desir.name.toLowerCase()">{{desir.name}}</li>
                                        </ul>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
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
            currentStep: 1,
            user: null,
            desires: [
                {   name: 'Me',
                    selected: false,
                 },
                 {   name: 'Tags',
                    selected: false,
                 },
                 {   name: 'Others',
                    selected: false,
                 },
            ],
            readings: [
                {   id: '123',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                    selected: false,
                 },
                 {   id: '12263',
                    name: '2009 Tigges A tunable synthetic mammalian oscillat',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=c574362cc0c66929b528bc8ff2e7d174',
                    selected: false,
                 },
                 {   id: '12523',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                    selected: false,
                 },
                 {   id: '12344',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                    selected: false,
                 },
                  {   id: '122333',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                    selected: false,
                 },
                 {   id: '123',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                    selected: false,
                 },
                 {   id: '12263',
                    name: '2009 Tigges A tunable synthetic mammalian oscillat',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=c574362cc0c66929b528bc8ff2e7d174',
                    selected: false,
                 },
                 {   id: '12523',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                    selected: false,
                 },
                 {   id: '12344',
                    name: '2011 Ferrell Modeling the cell cycle why do certa copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=2de847ab523a56c0378bf7f6f29931f7',
                    selected: false,
                 },
                  {   id: '122333',
                    name: '2009 Kumar Conditional RNA interference mediated b copy',
                    url: 'https://127.0.0.1:8080/nb_viewer.html?id=95d99f0f17637227b0d49c9fe4c5c093',
                    selected: false,
                 },
            ]
        }
    },
    created: async function() {
        const token = localStorage.getItem("nb.user");
        const decoded = VueJwtDecode.decode(token);
        if (decoded.user.username && decoded.user.username !== '') {} else {
            localStorage.removeItem("nb.user");
            localStorage.removeItem("nb.current.course");
            this.user = null
            this.redirect('top-page')
        }
    },
    watch: {
        
    },
    methods: {
        toStep: function(step) {
            console.log(step)
            this.currentStep = step;
        },
        toggleSelection: function(item) {
            item.selected = !item.selected
        }
    },
    computed: {
        filterReadings: function () {
            return this.readings.filter(r => r.selected)
        },
        filterDesires: function () {
            return this.desires.filter(r => r.selected)
        },
        settings: function () {
            let s = {}
            this.desires.forEach( d => s[d.name] = d.selected)
            return s
        }
    },
    components: {
        NavBar,
        Documaps,
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Flow+Block&display=swap');


.steps {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
}

.step {
    display: flex;
    flex-grow: 0;
    min-height: 20px;
    transition: flex-grow 1s;
}

.step.one .text-div {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.step.one h1 {
    font-family: 'Baskervville', serif;
    font-size: 15vmin;
    padding: 0;
    margin: 0;
}

.step.one h2 {
    font-family: 'Flow Block', cursive;
    padding: 0;
    margin: 0;
    background-image: linear-gradient(to left, indigo, #2ee314, #1800d7, #4b0081, orange, #f4ad3e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 6vmin;
}

.text-focus-in {
	-webkit-animation: text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) 3s both;
	        animation: text-focus-in 2s cubic-bezier(0.550, 0.085, 0.680, 0.530) 3s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-11-30 16:56:5
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation text-focus-in
 * ----------------------------------------
 */
@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}



.step .button-right-div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.step button {
    font-family: 'Baskervville', serif;
    width: 150px;
    height: 50px;
    border: none;
    background: #cbcbcb;
    font-size: 2vmin;
    font-weight: lighter;
    font-style: italic;
    cursor: pointer;
    ransition: background-color .3s;
}

.step.one button {
    background: #cbcbcb;
}

button.disabled {
    cursor: not-allowed !important;
    background-color: rgb(229, 229, 229) !important;
    ransition: background-color .3s;
    color: #b3b2b2;
}

.step > div {
    display: none;
}

.step.one {
    background:#e9e9e9;
}

.step.two {
    background:#cbcbcb;
}

.step.two .button-left-div button {
    background: #e9e9e9;
}

.step.two .text-div {
    flex-grow: 1;
    padding: 20px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.step.two .text-div div {
    flex-grow: 1;
    flex-shrink: 1;
}

.step.two h1 {
    font-family: 'Baskervville', serif;
    font-size: 8vmin;
    padding: 0;
    margin: 0;
    font-style: italic;
}

.step.two .button-right-div button {
    background: #f4ad3e;
}

.step.two ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
}

.step.two ul li {
    display: flex;
    width: 150px;
    height: 150px;
    margin: 10px 10px;
    align-content: center;
    background: #e9e9e9;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    text-align: center;
    font-family: 'Baskervville', serif;
    padding: 5px;
    font-style: italic;
    transition: background-color .3s;
}

.step.two ul li.desir {
    height: 50px;
}

.step.two ul li.active {
    background: #f4ad3e;
    transition: background-color .3s;
}

.step.two ul li a {
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.step.three {
    background:#f4ad3e;
}

.step.three .text-div {
    flex-grow: 1;
    padding: 20px 0;
    width: 100%;
}

.step.active {
    flex-grow: 1;
}

.step.active > div {
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    flex-direction: column;
    align-content: stretch;
    align-items: flex-start;
    padding: 50px;
}

.keys {
    bottom: 20px;
    left: 30px;
    position: absolute;
    font-family: 'Baskervville', serif;
    font-style: italic;
    font-weight: bold;
    font-size: 20px;
}

.keys ul {
    list-style-type: none;
}

.keys ul li {
    display: inline;
    margin: 0 20px;
}

.keys ul li::before {
    content: "—";
    font-weight: bold;
    font-size: 40px;
}

.keys ul li.me::before {
    color: red;
}

.keys ul li.tags::before {
    color: green;
}

.keys ul li.others::before {
    color: white;
}

.nb-main {
    padding: 15px;
    width: 100%;
}

.tab {
    display: flex;
    width: 100%;
    height: 100%;
}



.tab.consents {
    flex-direction: column;
}

.nb-documap {
    height: calc(100% - 80px);
}
</style>
