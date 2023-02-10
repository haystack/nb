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
          <div>{{suggestion.first_name}} {{suggestion.last_name}} - {{suggestion.username }} ({{ suggestion.email}})</div>
        </div>
      </vue-simple-suggest>
      <div>
        as
        <input type="radio" id="add-student" value="student" v-model="newUser.role">
        <label for="add-student">Student</label>
        <input type="radio" id="add-instr" value="instructor" v-model="newUser.role">
        <label for="add-instr">Instructor</label>
        <input type="radio" id="add-ta" value="ta" v-model="newUser.role">
        <label for="add-instr">TA</label>
      </div>
      <button @click="addUser">Add</button>
    </div>
    <div class="reload">
      <button @click="refresh">&#x21bb; Reload Table (if sections not all loaded)
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

    <modal name="add-new-user-modal" height="auto" width="70%" >
      <div class="add-new-user-modal">
        <div class="form">
          <h3 class=""> Register & Add user</h3>
          <br />
          <div class="group">
            <label for="add-new-user-first"> Role Selected: {{this.newUser.role.toUpperCase()}} </label>
          </div>

          <div class="group">
            <label for="add-new-user-first"> First name: </label>
            <input id="add-new-user-first" type="text" v-model="newUser.first" >
          </div>

          <div class="group">
            <label for="add-new-user-last"> Last name: </label>
            <input id="add-new-user-last" type="text" v-model="newUser.last">
          </div>

          <div class="group">
            <label for="add-new-user-email"> Email: </label>
            <input id="add-new-user-email" type="text" v-model="newUser.email">
          </div>

          <div class="group" v-if="this.newUser.role !== 'instructor' && this.newUser.role !== 'ta'">
            <label for="add-new-user-section"> Section: </label>
            <input id="add-new-user-section" type="text" v-model="newUser.section">
          </div>

          <button :disabled="!addUserEnabled" @click="addNewUser">
            Save
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import 'vue-simple-suggest/dist/styles.css'
  import VueSimpleSuggest from 'vue-simple-suggest'

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import JsonCSV from 'vue-json-csv'

  import VModal from 'vue-js-modal'
  Vue.use(VModal)

  Vue.component('downloadCsv', JsonCSV)

  export default {
    name: 'course-users',
    props: {
      user: Object,
      instructors: {
        type: Array,
        default: () => []
      },
      tas: {
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
          user: null,
          first: "",
          last: "",
          email: "",
          section: ""
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
                { value: 'ta', text: 'TAs' },
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
        for (let user of this.tas) {
          merged.push(Object.assign(user, {
            role: 'ta',
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
      },
      addUserEnabled: function() {
        return this.newUser.first.length > 0
          && this.newUser.last.length > 0
          && this.newUser.email.length > 0
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
          || (user.first_name + " " + user.last_name).toLowerCase().includes(query.toLowerCase())
      },
      selectNewUser: function(user) {
        this.newUser.user = user
      },
      addUser: function() {
        if (this.newUser.user) {
          this.$emit('add-user', this.newUser.user, this.newUser.role)
          this.newUser = {
            query: "",
            role: "student",
            user: null,
            first: "",
            last: "",
            email: "",
            section: ""
          }
        } else {
          this.openNewUserModal()
        }
      },
      addNewUser: function() { // register/add a user that currently doesn't exist in the class
        this.$emit('add-new-user', this.newUser)
        this.newUser = {
            query: "",
            role: "student",
            user: null,
            first: "",
            last: "",
            email: "",
            section: ""
          }
        this.closeNewUserModal()
      },
      openNewUserModal: function() {
        this.newUser.email = this.newUser.query
        this.$modal.show('add-new-user-modal')
      },
      closeNewUserModal: function() {
        this.$modal.hide('add-new-user-modal')
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
    border: solid 1px #38155a;
    background-color: #38155a;
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
    border: solid 1px #38155a;
    background-color: #38155a;
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

  .add-new-user-modal button {
    padding: 6px 8px;
    margin-left: 5px;
    border-radius: 5px;
    border: solid 1px #38155a;
    background-color: #38155a;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  .add-new-user-modal button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .add-new-user-modal button:enabled:hover {
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

  modal {
    height: 100%;
    overflow: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  modal p {
  margin-left: 50px;
  margin-right: 50px;
  }

  .add-new-user-modal {
  padding: 20px;
  }

  .form {
    width: 420px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: auto;
  }
  .form .title {
    margin: 0;
    padding: 10px 0 20px 0;
  }
  .form .group {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
  }
  .form .group label {
    margin-right: 5px;
  }
  .form .group input {
    padding: 4px 6px;
    border-radius: 3px;
    border: solid 1px #aaa;
    font-size: 16px;
    flex-grow: 1;
  }

</style>
