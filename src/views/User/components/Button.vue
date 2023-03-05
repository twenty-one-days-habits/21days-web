<template>
    <div :class="className?className:'normal'" class="btn">{{text}}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        className: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        return {
            class: props.className,
            text: props.text
        }
    },
})
</script>

<style lang="scss">
    .primary {
        background-color: $blue;
        color: #fff;
    }
    .normal {
        border: 1px solid $blue;
        color: $blue;
    }
    .btn {
        width: 335px;
        margin: 20px auto;
        text-align: center;
        height: 55px;
        line-height: 55px;
        border-radius: 4px;
        box-sizing: border-box;
    }
</style>
