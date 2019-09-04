<template>
  <div class="grader">
    <grade-table
        v-if="selectedGrading !== null"
        :gradingSystem="gradingSystems[selectedGrading]">
    </grade-table>

    <div class="settings">
      <div class="group">
        <span class="label"> Grading System: </span>
        <select v-model="selectedGrading">
          <option
              v-for="(gradingSystem, index) in gradingSystems"
              :key="index"
              :value="index">
            {{gradingSystem.grading_system_name}}
          </option>
        </select>
      </div>
      <div class="group">
        <span class="label"> Document: </span>
        <select v-model="selectedSource">
          <option
              v-for="(source, index) in sources"
              :key="index"
              :value="index">
            {{source.filename}}
          </option>
        </select>
      </div>
      <div class="group">
        <span class="label"> Deadline: </span>
        <datepicker v-model="date" :bootstrap-styling="true"></datepicker>
      </div>
      <button :disabled="!submitEnabled" @click="createGrades">
        Generate Grades
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  import VTooltip from 'v-tooltip'
  import VModal from 'vue-js-modal'
  import Datepicker from 'vuejs-datepicker';
  Vue.use(VTooltip)
  Vue.use(VModal)

  import GradeTable from './GradeTable.vue'

  export default {
    name: 'Grader',
    data() {
      return {
        gradingSystems: [],
        sources: [],
        selectedGrading: null,
        selectedSource: null,
        date: Date.now() // TODO: default to the assignment due date instead
      }
    },
    computed: {
      submitEnabled: function() {
        return this.selectedGrading !== null && this.selectedSource !== null
      }
    },
    created: function() {
      axios.get("/api/users/current").then(res => {
        if (!(res.data.username !== undefined && res.data.username !== "")) {
          this.$router.push('/')
        }
      })
      .catch(() => {
        this.$router.push('/')
      })
    },
    mounted: function() {
      axios.get('/api/grades/gradingSystems').then(res => {
        this.gradingSystems = res.data
        if (this.gradingSystems.length > 0) {
          this.selectedGrading = 0 // defaults to the first one
        }
      })
      axios.get('/api/classes/sourceList').then(res => {
        this.sources = res.data
        if (this.sources.length > 0) {
          this.selectedSource = 0 // defaults to the first one
        }
      })
    },
    methods: {
      createGrades: function() {
        axios.get("/api/grades/grades",{params:{
          gradingSystemId: this.gradingSystems[this.selectedGrading].id,
          sourceId: this.sources[this.selectedSource].id,
          date: this.date
        }})
        .then(res => {
          var csv = 'Name,Email,Username,Total Comments,Total Words,Total Characters,Total Tags,Grade\n';
          res.data.forEach(function(row) {
            csv += row.name+",";
            csv += row.email+",";
            csv += row.username+",";
            csv += row.total_comments+",";
            csv += row.total_words+",";
            csv += row.total_chars+",";
            csv += row.total_tags+",";
            csv += row.grade+"\n"
          });
          let hiddenElement = document.createElement('a');
          hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
          hiddenElement.target = '_blank';
          hiddenElement.download = 'grades.csv';
          hiddenElement.click();
        })
      }
    },
    components: {
      GradeTable,
      Datepicker
    }
  }
</script>

<style scoped>
  .grader {
    padding-top: 20px;
    overflow: scroll;
  }
  .settings {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .settings .group {
    margin-right: 10px;
  }
  .settings .group select {
    font-size: 16px;
  }
  .vdp-datepicker {
    display: inline-block;
  }
  /deep/ .vdp-datepicker .vdp-datepicker__calendar {
    bottom: 0;
    right: 0;
  }
  .settings button {
    padding: 6px 8px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .settings button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .settings button:enabled:hover {
    background-color: #0069d9;
  }
</style>
