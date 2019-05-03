<template>
  <div class="ClassListItem" v-bind:id='nb_class.id' v-on:click="selectClass">
    <div class="class" >
      <div class="class-header" id="content" >
        <h4 id="className">{{nb_class.class_name}}</h4>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import { eventBus } from "../main";
export default {
  name: "ClassListItem",
  props: {
    nb_class: Object,
    listener: Object,
    mode: String,
    selected: Object
  },
  mounted: function(){
    if(this.selected && this.selected.id == this.nb_class.id){
      this.selectClass();
    }
  },
  methods: {
    selectClass: function() {
      let allClasses = document.getElementsByClassName('ClassListItem');
      for (let element of allClasses) {
          element.classList.remove('selected');
      }
      this.$el.classList.add('selected');
      this.listener.$emit('setClass', {nb_class: this.nb_class, mode: this.mode});
      if(this.nb_class){
        axios.post("/api/classes/current", {id: this.nb_class.id});
      }
    }
  }
};
</script>

<style scoped>
.white {
  color: white;
}  

.ClassListItem {
  margin-top: 10px;
  padding: 5%;
  height: 8%;
  background-color: var(--navbar-color);
  color: white;
  width: 90%;
  /*cursor: pointer;*/
}
.ClassListItem:hover {
  background-color: var(--navbar-hover-color);
}
.selected {
  background-color: white !important;
  color: var(--navbar-color) !important;
}
.selected:hover {
  background-color: white !important;
  color: var(--navbar-hover-color) !important;
}
.class-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-between;
}
#className {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0px;
}

.settings{
  cursor: pointer;
  right: 0px;
}
</style>
