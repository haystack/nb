<template>
  <div id="bookmarklet" class="component">
    <NavBar title="NB Prototype"/>
    <p>To enable the NB sidebar for a class reading, either drag (don't click) this <a href = "javascript:(function(){let s = document.createElement('script'); s.src= 'https://cdn.jsdelivr.net/gh/alisaono/nbdemo@latest/dist/bundle.js'; document.body.append(s);})()">NB Bookmarklet</a> link to your bookmarks bar, or make a new bookmark with the code below as the URL.</p>
    <p>When on the class reading page, just click on the bookmark and the sidebar should appear.</p>
    <pre>
      <code>
        javascript:(function(){
          let s = document.createElement('script');
          s.src= 'https://cdn.jsdelivr.net/gh/alisaono/nbdemo@latest/dist/bundle.js';
          document.body.append(s);
        })()
      </code>
    </pre>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: "Bookmarklet",

  components: {
    NavBar
  }
};
</script>

<style>
p {
  margin-left: 50px;
  margin-right: 50px;
}
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 20px;
  margin: 0 15%;
  text-align: left;
}
</style>
