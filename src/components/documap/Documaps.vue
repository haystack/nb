<template>
    <div class="documaps">
        <documap
            v-for="reading in readings"
            :key="reading.id"
            :reading="reading">
        </documap>
    </div>
</template>

<script>
import Documap from './Documap.vue'

export default {
    name: 'documaps',
    props: {
        readings: {
            type: Array,
            default: () => []
        },
    },
    methods: {
    },
    components: {
        Documap,
    }  
}
</script>

<style>
.documaps {
    display: flex;
    height: 100%;
    justify-content: center;
    align-content: space-around;
}
</style>