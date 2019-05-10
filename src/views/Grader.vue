<template>
<div>
  <grade-table
      v-for="gradingSystem in gradingSystems" :key="gradingSystem.id" :gradingSystem="gradingSystem">
  </grade-table>
  <div>
    <div>
      Grading System: 
      <select v-model="selectedGrading">
        <option v-for="gradingSystem in gradingSystems" :key="gradingSystem.id" :value="gradingSystem.id">
          {{gradingSystem.grading_system_name}}
        </option>
      </select>
    </div>
    <div>
      Document: 
      <select v-model="selectedSource">
        <option v-for="source in sources" :key="source.id" :value="source.id">
          {{source.filename}}
        </option>
      </select>
    </div>
    <span>
      Deadline:
      <datepicker v-model=date></datepicker>
    </span>
    <button v-on:click="createGrades">Generate</button>
    
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

  import GradeTable from '../components/grader/GradeTable.vue'

  export default {
    name: 'grader',
    data() {
      return {
        gradingSystems: [],
        sources: [],
        selectedGrading: null,
        selectedSource: null,
        date: null
      }
    },
    created: function() {
      axios.get("/api/users/current").then(res => {
        if (!(res.data.username !== undefined && res.data.username !== "")) {
          this.$router.push('/');
        }
      })
      .catch(() => {
        this.$router.push('/');
      });
    },
    mounted: function(){
      axios.get('/api/grades/gradingSystems').then(res => {
        this.gradingSystems = res.data;
        console.log(res.data)
      })

      axios.get('/api/classes/sourceList').then(res => {
        this.sources = res.data;
        console.log(res.data)
      });
    },
    methods:{
      createGrades: function(){
        axios.get("/api/grades/grades",{params:{
          gradingSystemId: this.selectedGrading, 
          sourceId: this.selectedSource,
          date: this.date
        }})
        .then(res => {
          console.log(res.data);
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
          console.log(csv);
          var hiddenElement = document.createElement('a');
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
