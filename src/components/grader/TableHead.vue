<template>
  <thead>
    <tr>
      <th> Label </th>
      <th> Points </th>
      <th v-for="criterion in defaultCriteria">
        {{ criterion.label }}
      </th>
      <th v-for="criterion in customCriteria">
        {{ criterion.label }}
        <v-popover
          class="overflow-menu"
          :disabled="!overflowMenu">
          <span class="tooltip-target" @click="overflowMenu = true">
            <font-awesome-icon :icon="editIcon"></font-awesome-icon>
          </span>
          <template slot="popover">
            <div class="overflow-btn" @click="editCriterion(criterion)">
              Edit
            </div>
            <div class="overflow-btn" @click="deleteCriterion(criterion)">
              Delete
            </div>
          </template>
        </v-popover>
      </th>
      <th></th> <!-- edit buttons -->
    </tr>
  </thead>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faEdit } from '@fortawesome/free-solid-svg-icons'
  import { CustomCriterion } from '../../models/grade-schema.js'

  export default {
    name: 'table-head',
    props: {
      defaultCriteria: {
        type: Array,
        default: []
      },
      customCriteria: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        overflowMenu: false,
        editIcon: faEdit,
      }
    },
    methods: {
      editCriterion(criterion) {
        this.overflowMenu = false
        this.$emit('edit-criterion', criterion)
      },
      deleteCriterion(criterion) {
        this.overflowMenu = false
        this.$emit('delete-criterion', criterion)
      }
    },
    components: {
      FontAwesomeIcon,
    },
  }
</script>

<style scoped>
  th {
    padding: 5px;
    text-align: center;
    border-bottom: solid 2px #666;
  }
  .fa-edit {
    color: #666;
  }
  .fa-edit:hover {
    color: #888;
  }
  .overflow-btn {
    padding: 8px 12px;
    cursor: pointer;
  }
  .overflow-menu {
    display: inline-block;
    cursor: pointer;
  }
  .overflow-btn:hover {
    background-color: #444;
  }
</style>
