<template>
  <div class="grade-table">
    <div class="table-wrapper">
      <table>
        <table-head
            :default-criteria="defaultCriteria"
            :custom-criteria="customCriteria"
            @edit-criterion="editCriterion"
            @delete-criterion="deleteCriterion">
        </table-head>
        <tbody>
          <table-row
              v-for="grade in sortedGrades"
              :key="grade.id"
              :default-criteria="defaultCriteria"
              :custom-criteria="customCriteria"
              :grade="grade"
              :editting="edittingGrades.includes(grade)"
              @edit-grade="editGrade"
              @delete-grade="deleteGrade"
              @save-grade="saveGrade">
          </table-row>
        </tbody>
        <table-foot
            :default-criteria="defaultCriteria"
            :custom-criteria="customCriteria"
            @add-grade="addGrade">
        </table-foot>
      </table>
    </div>
    <div class="options">
      <div @click="createCriterion">
        + Add Custom Column
      </div>
    </div>
    <custom-form
        :open="showForm"
        :editting="edittingCriterion"
        @cancel-form="cancelForm"
        @save-criterion="saveCriterion"
        @new-criterion="newCriterion">
    </custom-form>
  </div>
</template>

<script>
  import { DefaultCriterion, CustomCriterion, Grade } from '../../models/grade-schema.js'
  import TableHead from './TableHead.vue'
  import TableRow from './TableRow.vue'
  import TableFoot from './TableFoot.vue'
  import CustomForm from './CustomForm.vue'
  import axios from 'axios'

  export default {
    name: 'grade-table',
    props: {
      gradingSystem: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        customCriteria: [],
        grades: [],
        showForm: false,
        edittingGrades: [],
        edittingCriterion: null,
        defaultCriteria: [
          { type: "COMMENTS", label: "Total Comments" },
          { type: "HASHTAGS", label: "Total Hashtags" },
          { type: "WORDS", label: "Total Words" },
          { type: "CHARS", label: "Total Characters" }
        ]
      }
    },
    computed: {
      sortedGrades: function() {
        return this.grades.sort(function(a, b) {
          return b.points - a.points
        })
      }
    },
    created: function(){
      this.grades = this.gradingSystem.GradingThresholds
        .map(threshold => {
          let grade = Grade.construct(threshold);
          threshold.CriteriaCounts.forEach(criteriaCount => {
            grade.setThreshold(criteriaCount.num_annotations, "CUSTOM", criteriaCount.criteria_id);
          })
          return grade;
        });
      this.customCriteria = this.gradingSystem.Criteria
        .map(criteria => CustomCriterion.construct(criteria));
    },
    methods: {
      addGrade: function(grade) {
        axios.post(`/api/grades/threshold/${this.gradingSystem.id}`, grade)
        .then(res => {
          grade.id = res.data.id;
          this.grades.push(grade)
        });
      },
      editGrade: function(grade) {
        this.edittingGrades.push(grade)
      },
      deleteGrade: function(grade) {
        // TODO: better alert?
        let message = "Do you really want to remove this grade: " +
            (grade.label ? grade.label : "[ no label ]") +
            " (" + grade.points + "pts) ?\n"
        if (confirm(message)) {
          axios.delete(`/api/grades/threshold/${grade.id}`).then(() => {
            let idx = this.grades.indexOf(grade)
            if (idx >= 0) { this.grades.splice(idx, 1) }
          })
        }
      },
      saveGrade: function(grade) {
        axios.put(`/api/grades/threshold/${grade.id}`, grade)
        .then(() => {
          let idx = this.edittingGrades.indexOf(grade)
          if (idx >= 0) { this.edittingGrades.splice(idx, 1) }
        })
      },
      createCriterion: function() {
        this.showForm = true
      },
      editCriterion: function(criterion) {
        this.edittingCriterion = criterion
        this.showForm = true
      },
      cancelForm: function() {
        this.edittingCriterion = null
        this.showForm = false
      },
      saveCriterion: function(criterion) {
        axios.put(`/api/grades/criteria/${criterion.id}`, criterion).then(() => {
          this.edittingCriterion = null
          this.showForm = false
        })
      },
      newCriterion: function(criterion) {
        axios.post(`/api/grades/criteria/${this.gradingSystem.id}`, criterion).then(res => {
          criterion.id = res.data.id;
          this.customCriteria.push(criterion)
          this.showForm = false
        })
      },
      deleteCriterion: function(criterion) {
        axios.delete(`/api/grades/criteria/${criterion.id}`).then(() => {
          let idx = this.customCriteria.indexOf(criterion)
          if (idx >= 0) { this.customCriteria.splice(idx, 1) }
          for (let grade of this.grades) {
            grade.setThreshold(null, "CUSTOM", criterion.id)
          }
        })
      }
    },
    components: {
      TableHead,
      TableRow,
      TableFoot,
      CustomForm
    }
  }
</script>

<style scoped>
  .table-wrapper {
    max-width: 100%;
    overflow-x: scroll;
  }
  table, table td {
    padding: 8px;
    text-align: center;
    border: solid 1px #666;
  }
  table td, table th {
    width: 100px;
  }
  table tr:nth-child(even) {
    background-color: #f0f0f0;
  }
  table tr:hover {
    background-color: #ffffd0;
  }
  .options {
    display: flex;
    align-items: flex-start;
    margin-top: 10px;
  }
  .options > div {
    padding: 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    cursor: pointer;
  }
  .options > div:hover {
    background-color: #eee;
  }
</style>
<style src="../../style/tooltip.css"></style>
