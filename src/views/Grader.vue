<template>
  <grade-table
      :custom-criteria="customCriteria"
      :grades="grades">
  </grade-table>
</template>

<script>
  import Vue from 'vue'
  import VTooltip from 'v-tooltip'
  import VModal from 'vue-js-modal'
  Vue.use(VTooltip)
  Vue.use(VModal)

  import GradeTable from '../components/grader/GradeTable.vue'
  import { CustomCriterion, Grade } from '../models/grade-schema.js'

  export default {
    name: 'grader',
    data() {
      return {
        customCriteria: [],
        grades: []
      }
    },
    created: function() {
      //// For example:
      let gradeA = new Grade('0', "Very good", 4)
      let gradeB = new Grade('1', "Good", 3)
      let gradeC = new Grade('2', "Fair", 2)

      let criterion = new CustomCriterion('0', "Good Comments")
      criterion.setFilter(20, "WORDS")
      this.customCriteria.push(criterion)

      gradeA.setThreshold(3,  "COMMENTS")
      gradeA.setThreshold(60, "WORDS")
      gradeA.setThreshold(2, "CUSTOM", '0') // 2 "Good Comments"
      gradeB.setThreshold(2,  "COMMENTS")
      gradeB.setThreshold(40, "WORDS")
      gradeB.setThreshold(1, "CUSTOM", '0') // 1 "Good Comments"
      gradeC.setThreshold(1,  "COMMENTS")
      gradeC.setThreshold(15, "WORDS")

      this.grades.push(gradeA)
      this.grades.push(gradeB)
      this.grades.push(gradeC)
      //// ... end example
    },
    components: {
      GradeTable
    }
  }
</script>
