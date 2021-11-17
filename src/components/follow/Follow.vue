<template>
  <div class="follow">
      <div class="tabs">
      <div
          v-for="tab in tabs"
          class="tab"
          :key="tab"
          :style="styleTab(tab)"
          @click="openTab(tab)">
        {{ tab }}
      </div>
        <div
          v-for="tab in tabs"
          class="tab"
          :key="tab"
          :style="styleTab(tab)"
          @click="openTab(tab)">
        {{ tab }}
      </div>
    </div>

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
  .tabs {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }
  .tabs .tab {
    color: #444;
    cursor: pointer;
  }
  .tabs .tab:hover {
    color: #000;
    font-weight: bold;
  }

</style>
