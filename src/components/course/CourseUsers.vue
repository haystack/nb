<template>
  <div class="course-users">
    <div class="csv">
      <div class="csv-child upload">
        <h3>Upload Students CSV
        (Include headers: First, Last, Email, Section)
        </h3>
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
        <button @click="submitFile">Submit</button>
      </div>

      <div class="csv-child download">
        <h3>Download Students CSV</h3>
        <button>
          <download-csv
            :data = "studentsCSV"
            :name = "csvFileName">
            Download Students
          </download-csv>   
        </button>
      </div>
    </div>
    <br><br>
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
    <div class="reload">
      <button @click="refresh">&#x21bb; Reload Table (if users not all loaded)
      </button>
    </div>
    <vue-good-table
        :columns="columns"
        :rows="rows"
        :sort-options="sortOptions"
        :select-options="{ enabled: true }"
        @on-selected-rows-change="onSelectionChanged"
    >  
      <div class="selectUser" slot="selected-row-actions">
        <button @click="showRemoveModal">Remove</button>
      </div>
      <template slot="table-header-row" slot-scope="props">
        <span class="my-fancy-class">
          {{ props.row.label }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-simple-suggest/dist/styles.css'
  import VueSimpleSuggest from 'vue-simple-suggest'

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import JsonCSV from 'vue-json-csv'
  Vue.component('downloadCsv', JsonCSV)

  export default {
    name: 'course-users',
    props: {
      user: Object,
      instructors: {
        type: Array,
        default: () => []
      },
      students: {
        type: Array,
        default: () => []
      },
      course: Object,
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
        selectedRows: [],
        file: "",
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
            label: 'Section',
            field: 'section',
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
          let section = user.section
          if (section == undefined) {
            section = ""
          }
          merged.push(Object.assign(user, {
            role: 'student',
            name: `${user.first_name} ${user.last_name}`,
            section: `${section}`
          }))
        }
        return merged
      },
      studentsCSV: function() {
        let students = []
        for (let user of this.students) {
          let section = user.section
          if (section == undefined) {
            section = ""
          }
          students.push({
            First: `${user.first_name}`,
            Last: `${user.last_name}`,
            Email: `${user.email}`,
            Section: `${section}`
          })
        }
        return students
      },
      csvFileName: function() {
        return this.course.class_name + "_students.csv"
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
      },
      showRemoveModal: function() {
        const selectedValidUsers = this.selectedRows.filter(row => row.username !== this.user.username)
        let removalPeople = ""
        for (let row of selectedValidUsers) {
          removalPeople += row.name + " (" + row.role + ")" + "\n"
        }
        if (selectedValidUsers.length > 0) {
          var r = confirm("Note: You cannot remove yourself from the class.\n\nAre you sure you want to remove the selected users: \n" + removalPeople);
          if (r == true) {
            this.$emit('remove-users', selectedValidUsers);
          } 
        } else {
          alert("You cannnot remove yourself from the class. Please select a list of other users you'd like to remove.")
        }
      },
      onSelectionChanged(params) {
        this.selectedRows = params.selectedRows;
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
      refresh() {
        this.$emit('refresh')
      },
      submitFile() {
        let formData = new FormData();
        formData.append('file', this.file);
        this.$emit('upload-users-file', formData);

      },
    },
    components: {
      VueSimpleSuggest,
      VueGoodTable,
    }
  }
</script>

<style scoped>
  .course-users {
    padding-top: 20px
  }

  .csv h3 {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }

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
  /deep/ .add-user .vue-simple-suggest .input-wrapper input {
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
  
  .selectUser button {
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  .selectUser button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .selectUser button:enabled:hover {
    background-color: #0069d9;
  }

  .reload {
    text-align: right;
    font-family: Lucida Sans Unicode;
  }
  .reload button {
    border-radius: 5px;
    border: solid 1px #aaa;
    background-color: #eee; 
    /* color: #fff; */
    cursor: pointer;
  }
  .reload button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .reload button:enabled:hover {
    background-color: #aaa;
  }

  .csv {
    display: flex; 
    justify-content: space-between;
  }
  .download button {
    padding: 6px 8px;
    margin-left: 5px;
    border-radius: 5px;
    border: solid 1px #aaa;
    background-color: #eee;
    font-size: 16px;
    cursor: pointer;
  }
  .download button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .download button:enabled:hover {
    background-color: #aaa;
  }

</style>
