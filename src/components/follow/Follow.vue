<template>
  <div class="follow">
    <h1> Following </h1>
    <follow-list :following="following"> </follow-list>
  </div>
</template>

<script>
  import axios from 'axios'
  import FollowList from "./FollowList.vue"
  export default {
    name: "follow",
    props: {
    },
    data() {
    return {
        tabs: ['Followers', 'Following'],
        currentTab: 'Followers',
        userlist:[],
        following: [],
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
        getFollowing: function(){
          const token = localStorage.getItem("nb.user");
          const headers = { headers: { Authorization: 'Bearer ' + token }}
          axios.get(`/api/follow/user`, headers)
          .then(res => {
            console.log(res)
            // this.following = res.data
            for (let u of res.data){
              console.log(u)
              axios.get(`/api/users/${u.follower_id}`, headers)
              .then(res2 => {
                console.log(res2.data)
                this.following.push(res2.data)
              })
            }

          })
        }
    },
    beforeMount(){
      this.getFollowing()
    },
    components: {
    FollowList,
  },
  }
  
</script>

<style scoped>
  h1 {
    display: flex;
    justify-content: space-around;
  }

</style>
