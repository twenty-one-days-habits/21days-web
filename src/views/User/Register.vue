<template>
    <div>
        <Title title="注册" desc="欢迎注册新用户" />
        <input class="user-input" placeholder="请设置用户名"/>
        <input class="user-input" placeholder="请设置密码"/>
        <input class="user-input" placeholder="请重新设置密码"/>
        <div class="btn-container">
            <Button text="注册" className="primary"/>
            <Button text="登录" />
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from './components/Button.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Title,
        Button
    },
    setup() {
        
    },
})
</script>

