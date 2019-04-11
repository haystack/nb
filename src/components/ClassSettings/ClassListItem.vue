<template>
  <div id="class">
    <h3>{{nb_class.class_name}}</h3>
  </div>
</template>

<script>
import { eventBus } from "../../main";


export default {
  name: "ClassListItem",

  props:{
    nb_class: Object
  },
};
</script>
