<template>
  <tr v-if="editting">
    <td>
      <input type="text" placeholder="Label (optional)" v-model="newLabel">
    </td>
    <td>
      <input
          type="text"
          placeholder="0"
          v-model="newPoints"
          @keypress="event => validate(event, true)">
    </td>
    <td v-for="criterion in defaultCriteria">
      <input
          type="text"
          placeholder="0"
          v-model="newTotals[criterion.type]"
          @keypress="event => validate(event, false)">
    </td>
    <td v-for="criterion in customCriteria">
      <input
          type="text"
          placeholder="0"
          v-model="newCustoms[criterion.id]"
          @keypress="event => validate(event, false)">
    </td>
    <td>
      <button @click="saveGrade"> Save </button>
    </td>
  </tr>
  <tr v-else>
    <td>{{ grade.label ? grade.label : "[ no label ]" }}</td>
    <td>{{ grade.points }}</td>
    <td v-for="criterion in defaultCriteria">
      {{ grade.getThreshold(criterion.type) }}
    </td>
    <td v-for="criterion in customCriteria">
      {{ grade.getThreshold("CUSTOM", criterion.id) }}
    </td>
    <td>
      <v-popover
        class="overflow-menu"
        :disabled="!overflowMenu">
        <span class="tooltip-target" @click="overflowMenu = true">
          ···
        </span>
        <template slot="popover">
          <div class="overflow-btn" @click="editGrade"> Edit </div>
          <div class="overflow-btn" @click="deleteGrade"> Delete </div>
        </template>
      </v-popover>
    </td>
  </tr>
</template>

<script>
  import { isNumberKey } from '../../utils/input-util.js'

  export default {
    name: 'table-row',
    props: {
      defaultCriteria: {
        type: Array,
        default: []
      },
      customCriteria: {
        type: Array,
        default: []
      },
      grade: Object,
      editting: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        overflowMenu: false,
        newLabel: this.grade.label,
        newPoints: this.grade.points,
        newTotals: {
          COMMENTS: this.grade.totalComments,
          HASHTAGS: this.grade.totalHashtags,
          WORDS: this.grade.totalWords,
          CHARS: this.grade.totalChars
        },
        newCustoms: Object.assign({}, this.grade.customCriteria)
      }
    },
    methods: {
      validate(event, allowDecimal) {
        return isNumberKey(event, allowDecimal)
      },
      editGrade: function() {
        this.overflowMenu = false
        this.$emit('edit-grade', this.grade)
      },
      deleteGrade: function() {
        this.overflowMenu = false
        this.$emit('delete-grade', this.grade)
      },
      saveGrade: function() {
        this.grade.setLabel(this.newLabel)
        this.grade.setPoints(this.newPoints)
        for (let criterion of this.defaultCriteria) {
          this.grade.setThreshold(
            this.newTotals[criterion.type],
            criterion.type
          )
        }
        for (let criterion of this.customCriteria) {
          this.grade.setThreshold(
            this.newCustoms[criterion.id],
            "CUSTOM",
            criterion.id
          )
        }
        this.$emit('save-grade', this.grade)
      }
    }
  }
</script>

<style scoped>
  .overflow-menu {
    cursor: pointer;
  }
  .overflow-menu span {
    color: #666;
  }
  .overflow-btn {
    padding: 8px 12px;
    cursor: pointer;
  }
  .overflow-btn:hover {
    background-color: #444;
  }
  input {
    width: 100px;
    font-size: 16px;
    text-align: center;
  }
  button {
    width: 50px;
    font-size: 14px;
    color: #fff;
    background: #007bff;
    border: solid 2px #007bff;
    border-radius: 3px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0069d9;
  }
</style>
