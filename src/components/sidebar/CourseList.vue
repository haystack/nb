<template>
  <div class="list">
    <div
        v-for="course in courses"
        class="item"
        :key="course.id"
        :style="styleItem(course)"
        @click="$emit('select-course', course)">
      {{ course.class_name}}
    </div>
    <p v-if="courses.length === 0" class="empty"> No classes yet </p>
  </div>
</template>

<script>
  export default {
    name: "course-list",
    props: {
      courses: {
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
</style>
