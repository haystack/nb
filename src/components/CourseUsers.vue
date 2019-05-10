<template>
  <div class="course-users">
    <div class="add-user">
      <h3>Enroll User:</h3>
      <vue-simple-suggest
        v-model="newUser.query"
        display-attribute="username"
        placeholder="find by username or email"
        :list="suggestions"
        :filter="filterSuggestion"
        :filter-by-query="true"
        @select="selectNewUser">
        <div slot="suggestion-item" slot-scope="{ suggestion, query }">
          <div>{{ suggestion.username }} ({{ suggestion.email}})</div>
        </div>
      </vue-simple-suggest>
      <div>
        as
        <input type="radio" id="add-student" value="student"
            v-model="newUser.role">
        <label for="add-student">Student</label>
        <input type="radio" id="add-instr" value="instructor"
            v-model="newUser.role">
        <label for="add-instr">Instructor</label>
      </div>
      <button @click="addUser" :disabled="!this.newUser.user">Add</button>
    </div>

    <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="sortOptions">
    </vue-good-table>
  </div>
</template>

<script>
  import 'vue-simple-suggest/dist/styles.css'
  import VueSimpleSuggest from 'vue-simple-suggest'

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'course-users',
    props: {
      instructors: {
        type: Array,
        default: () => []
      },
      students: {
        type: Array,
        default: () => []
      },
      suggestions: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        newUser: {
          query: "",
          role: "student",
          user: null
        },
        columns: [
          {
            label: 'Name',
            field: 'name',
            sortable: true,
            filterOptions: {
              enabled: true,
            },
          },
          {
            label: 'Username',
            field: 'username',
            sortable: true,
            filterOptions: {
              enabled: true,
            },
          },
          {
            label: 'Email',
            field: 'email',
            sortable: true,
            filterOptions: {
              enabled: true,
            },
          },
          {
            label: 'Role',
            field: 'role',
            filterOptions: {
              enabled: true,
              placeholder: "All",
              filterDropdownItems: [
                { value: 'instructor', text: 'Instructors' },
                { value: 'student', text: 'Students' },
              ],
            }
          },
        ],
        sortOptions: {
          enabled: true,
          initialSortBy: [
            {field: 'name', type: 'asc'}
          ],
        },
      }
    },
    computed: {
      rows: function() {
        let merged = []
        for (let user of this.instructors) {
          merged.push(Object.assign(user, {
            role: 'instructor',
            name: `${user.first_name} ${user.last_name}`
          }))
        }
        for (let user of this.students) {
          merged.push(Object.assign(user, {
            role: 'student',
            name: `${user.first_name} ${user.last_name}`
          }))
        }
        return merged
      }
    },
    methods: {
      filterSuggestion: function(user, query) {
        if (this.students.find(student => student.id === user.id)) {
          return false // user already enrolled as student
        }
        if (this.instructors.find(instructor => instructor.id === user.id)) {
          return false // user already enrolled as instructor
        }
        return user.username.toLowerCase().includes(query.toLowerCase())
          || user.email.toLowerCase().includes(query.toLowerCase())
      },
      selectNewUser: function(user) {
        this.newUser.user = user
      },
      addUser: function() {
        this.$emit('add-user', this.newUser.user, this.newUser.role)
        this.newUser = {
          query: "",
          role: "student",
          user: null
        }
      }
    },
    components: {
      VueSimpleSuggest,
      VueGoodTable
    }
  }
</script>

<style scoped>
  .add-user {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .add-user h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  .add-user .vue-simple-suggest {
    margin: 0 10px;
    flex-grow: 1;
  }
  .add-user .vue-simple-suggest .input-wrapper input {
    font-size: 16px;
    padding: 6px 8px;
    border-radius: 5px;
  }
  .add-user label {
    margin-right: 5px;
  }
  .add-user button {
    padding: 6px 8px;
    margin-left: 5px;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .add-user button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .add-user button:enabled:hover {
    background-color: #0069d9;
  }
</style>
