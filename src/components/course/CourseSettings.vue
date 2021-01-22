<template>
  <div class="form">
    
    <div class="group">
      <label for="course-settings-title"> Class Title: </label>
      <input id="course-settings-title" type="text" v-model="newCourse.class_name">
    </div>

    <div v-if="false" class="group">
      <label for="course-settings-sections"> Section Names: </label>
      <input id="course-settings-sections" type="text" v-model="sections">
    </div>

    <div v-if="false">
    <div class="group">
      <label for="course-settings-description"> Description: </label>
      <input id="course-settings-description" type="text" v-model="newCourse.description">
    </div>
    <div class="group">
      <label for="course-settings-term"> Term: </label>
      <input id="course-settings-term" type="text" v-model="newCourse.term" placeholder="Spring 2021">
    </div>
    <div class="group">
      <label for="course-settings-institution"> Institution: </label>
      <input id="course-settings-institution" type="text" v-model="newCourse.institution" placeholder="UC Davis">
    </div>
    <div class="group">
      <label for="course-settings-contact"> Contact Email: </label>
      <input id="course-settings-contact" type="text" v-model="newCourse.contact_email">
    </div>
    </div>



    <div v-if="message" class="message">{{ message }}</div>

    <button class="submit" :disabled="!submitEnabled" @click="edit">
      Update
    </button>
  </div>
</template>

<script>
  import axios from "axios"
  import 'vue-simple-suggest/dist/styles.css'
  import VueSimpleSuggest from 'vue-simple-suggest'

  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'CourseSettings',
    props: {
      course: Object
    },
    data() {
      return {
        
        newCourse: {
          class_name: "",
          id: "",
          /* institution: "",
          contact_email: "",
          term: "",
          description: "" */
        },
        sections: "",
        message: null
      
      }
    },
    computed: {
      submitEnabled: function() {
        return this.newCourse && this.newCourse.class_name &&
          this.newCourse.class_name.length > 0
      }
    },
    mounted: function(){
        this.newCourse = this.course
    },
    methods: {
      edit: function() {
        const token = localStorage.getItem("nb.user")
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post("/api/classes/edit", {course: this.newCourse, sections: this.sections}, headers)
          .then((res) => {
            localStorage.setItem("nb.current.course", JSON.stringify(res.data))
            location.reload();

          })
          .catch(err => {
            if (err.response.status === 401) {
              this.message = "Invalid course data. Try again!"
            }
            console.error(`Edit failed: ${err.response.data.error}`)
          })
        
      }
    },
    components: {
   
    }
  }
</script>

<style scoped>
  .form {
    width: 380px;
    display: flex;
    flex-direction: column;
    padding: 20px;
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
  .form .message {
    color: #cf000f;
    font-size: 14px;
  }
  button.submit {
    width: 80px;
    align-self: flex-end;
    padding: 6px 0;
    border-radius: 5px;
    border: solid 1px #007bff;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  button.submit:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  button.submit:enabled:hover {
    background-color: #0069d9;
  }
</style>
