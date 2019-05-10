<template>

  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --navbar-color: #4a2270;
  --navbar-hover-color: #68309c;
  --background-color: #cfc3db;
  --navbar-height: 40px;
}

html {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  margin: 0px;
  height: 100%;
}

button {
  background-color: transparent;
  border: 0px;
  cursor: pointer;
}

.arrow-button {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

.submit-button {
  background: var(--navbar-color);
  padding: 12px;
  margin: 20px;
  cursor: pointer;
  color: white;
  border: 0px;
  border-radius: 5px;
  font-size: 17px;
}
.submit-button:hover {
  background: var(--navbar-hover-color);
}
.submit-button:disabled {
  cursor: not-allowed;
  background: gray;
}

.danger-button {
  background: crimson;
  padding: 12px;
  margin: 20px;
  cursor: pointer;
  color: white;
  border: 0px;
  border-radius: 5px;
  font-size: 17px;
}
.danger-button:hover {
  background: #bb1133;
}

.card {
  height: auto;
  background-color: rgba(255,255,255,0.9);
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  padding: 20px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  width: fit-content;
}

.no-margin {
  margin: 0px !important;
}
</style>
