<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
  :root {
    --navbar-height: 40px;
  }
  html {
    height: 100%;
  }
  body {
    margin: 0px;
    height: 100%;
    background-color: #fff;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app {
    height: 100%;
  }
</style>
