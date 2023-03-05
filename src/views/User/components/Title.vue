<template>
    <div class="title">{{title}}</div>
    <div class="title-desc">{{desc}}</div>
</template>
<style lang="scss">

</style>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        return {
            title: props.title,
            desc: props.desc
        }
    },
})
</script>
<style lang="scss">
.title {
    font-size: 28px;
    font-weight: bold;
}
.title-desc {
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 40px;
}
</style>