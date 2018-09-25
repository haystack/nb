<template>
  <div id="app" class='horiz-center'>
    <h1>URL Shortener</h1>
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

<!-- global styles -->
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: lightblue;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

.component {
  background-color: whitesmoke;
  padding: 1rem;
}
</style>

<style scoped>
  .horiz-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
