<template>
  <div id="app">
    <h1>Fritter</h1>
    <!-- Children Components -->
    <CreateShortForm/>
    <ShortList/>
  </div>
</template>

<script>
import CreateShortForm from "./components/CreateShortForm.vue";
import ShortList from "./components/ShortList.vue";

export default {
  name: "app",
  components: {
    CreateShortForm,
    ShortList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}
</style>
