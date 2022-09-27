<template>
    <div class="documap">
        <a :href="reading.url" target="_blank">
            <title>{{reading.name}}</title>
        </a>
        <iframe :id="reading.id" :src="src"></iframe>
    </div>
</template>

<script>
export default {
    name: 'documap',
    props: {
        reading: {
            type: Object,
            default: () => {}
        },
        settings: {
            type: Object,
            default: () => {}
        },
    },
    computed: {
        src: function () {
            let url =  `${this.reading.url}${this.reading.url.includes('?')? '&documap=true' : '?documap=true'}&doucsettings=${encodeURIComponent(JSON.stringify(this.settings))}`
            console.log(url)
            return url
        }
    }
}
</script>

<style>
.documap {
    width: 100%;
    max-width: 150px;
    margin: 5px;
    border: none;
}

.documap a {
    text-decoration: none;
}

.documap title {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    color: #4a2270;
    text-transform: uppercase;
    font-size: 10px;
    height: 30px;
    font-family: 'Flow Block', cursive;
    text-align: center;
}
.documap iframe {
    height:98%;
    width: 100%;
    border: none;
}
</style>