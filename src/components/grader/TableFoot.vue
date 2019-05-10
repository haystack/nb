<template>
  <tfoot>
    <tr>
      <td>
        <input type="text" placeholder="(optional)" v-model="label">
      </td>
      <td>
        <input
            type="text"
            placeholder="0"
            v-model="points"
            @keypress="event => validate(event, true)">
      </td>
      <td v-for="criterion in defaultCriteria" :key="criterion.type">
        <input
            type="text"
            placeholder="0"
            v-model="totals[criterion.type]"
            @keypress="event => validate(event, false)">
      </td>
      <td v-for="criterion in customCriteria" :key="criterion.id">
        <input
            type="text"
            placeholder="0"
            v-model="customs[criterion.id]"
            @keypress="event => validate(event, false)">
      </td>
      <td>
        <button @click="addGrade"> Add </button>
      </td>
    </tr>
  </tfoot>
</template>

<script>
  import { isNumberKey } from '../../utils/input-util.js'
  import { Grade } from '../../models/grade-schema.js'

  export default {
    name: 'table-foot',
    props: {
      defaultCriteria: {
        type: Array,
        default: () => []
      },
      customCriteria: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        label: null,
        points: null,
        totals: {},
        customs: {}
      }
    },
    methods: {
      validate(event, allowDecimal) {
        return isNumberKey(event, allowDecimal)
      },
      addGrade: function() {
        let grade = new Grade(Date.now(), this.label, this.points) // Actual ID is set by listener for add-grade
        for (let criterion of this.defaultCriteria) {
          grade.setThreshold(this.totals[criterion.type], criterion.type)
        }
        for (let criterion of this.customCriteria) {
          grade.setThreshold(this.customs[criterion.id], "CUSTOM", criterion.id)
        }
        this.$emit('add-grade', grade)
        this.reset()
      },
      reset: function() {
        this.label = null
        this.points = null
        this.totals = {}
        this.customs = {}
      }
    }
  }
</script>

<style scoped>
  input {
    width: 100px;
    font-size: 16px;
    text-align: center;
  }
  button {
    width: 50px;
    font-size: 14px;
    color: #fff;
    background: #d9534f;
    border: solid 2px #d9534f;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    background-color: #d43f3a;
  }
</style>
