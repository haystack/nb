<template>
  <div class="list">
    <div
        v-for="course in instructor"
        class="item"
        :key="course.id"
        :style="styleItem(course)"
        @click="$emit('select-course', course)">
      <span class="instr">i</span> {{ course.class_name}}
    </div>
        <div
        v-for="course in ta"
        class="item"
        :key="course.id"
        :style="styleItem(course)"
        @click="$emit('select-course', course)">
      <span class="ta">TA</span> {{ course.class_name}}
    </div>
    <div
        v-for="course in student"
        class="item"
        :key="course.id"
        :style="styleItem(course)"
        @click="$emit('select-course', course)">
      {{ course.class_name}}
    </div>
    <p v-if="instructor.length === 0 && ta.length === 0 && student.length === 0" class="empty"> No classes yet </p>
  </div>
</template>

<script>
  export default {
    name: "course-list",
    props: {
      instructor: {
        type: Array,
        default: () => [],
      },
      ta: {
        type: Array,
        default: () => [],
      },
      student: {
        type: Array,
        default: () => [],
      },
      selectedCourse: Object,
    },
    methods: {
      styleItem: function(course) {
        if (this.selectedCourse && this.selectedCourse.id === course.id) {
          return 'background-color: #60348a; color: #fff;'
        }
      }
    },
  }
</script>

<style scoped>
  .list .item {
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
  }
  .list .item:hover {
    background-color: #ddd;
  }
  p.empty {
    padding: 10px;
    color: #888;
    font-family: monospace;
    font-style: italic;
  }
  .instr {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #f4ad3e;
    color: #fff;
    font-size: 14px;
    font-family: 'Verdana', 'Geneva', sans-serif;
    width: 20px;
    height: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    }

  .ta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #3e60f4;
    color: #fff;
    font-size: 10px;
    font-family: 'Verdana', 'Geneva', sans-serif;
    width: 20px;
    height: 20px;
    border: 1px solid #eee;
    border-radius: 4px;
    }
</style>
