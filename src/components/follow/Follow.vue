<template>
  <div class="follow">
    <h1> Following </h1>
  </div>
</template>

<script>
  export default {
    name: "follow",
    props: {
    },
    data() {
    return {
        tabs: ['Followers', 'Following'],
        currentTab: 'Followers',
        userlist:[],
    }},
    methods: {
        styleTab: function(type) {
        if (type === this.currentTab) {
            return 'color: #000; text-decoration: underline; font-weight: bold;'
        }
        },
        openTab: function(type) {
            this.currentTab = type
        },
    },
  }
  
</script>

<style scoped>
  h1 {
    display: flex;
    justify-content: space-around;
  }

</style>
