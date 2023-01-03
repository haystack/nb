<template>
  <div class="create-course">
    <h6> Create a New Class </h6>
    <div class="group">
      <label for='new-course-name'>Name:</label>
      <input id='new-course-name' v-model='newCourse.name' type='text'>
    </div>
    <button
        :disabled="newCourse.name.length === 0"
        @click="createCourse">
      Create
    </button>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    name: "course-create",
    data() {
      return {
        newCourse: {
          name: "",
        },
      }
    },
    methods: {
      createCourse: function() {
        const token = localStorage.getItem("nb.user");
        const headers = { headers: { Authorization: 'Bearer ' + token }}
        axios.post("/api/classes/create", this.newCourse, headers).then(res => {
            this.newCourse = { name: "" }
            localStorage.setItem("nb.current.course",JSON.stringify(res.data))
            this.$emit("create-course")
        })
      },
    }
  }
</script>

<style scoped>
  .create-course {
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px 0;
  }
  .create-course .group {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .create-course .group input {
    margin-left: 5px;
    padding: 6px 8px;
    border: solid 1px #aaa;
    border-radius: 5px;
    font-size: 16px;
    flex-grow: 1;
  }
  .create-course button {
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
  .create-course button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .create-course button:enabled:hover {
    background-color: #0069d9;
  }
</style>
