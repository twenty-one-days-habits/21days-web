<template>
    <div>
        <Title title="注册" desc="欢迎注册新用户" />
        <input class="user-input" v-model="username" placeholder="请设置用户名"/>
        <input class="user-input" v-model="email" placeholder="请输入邮箱"/>
        <input class="user-input"  v-model="password"  placeholder="请设置密码"/>
        <input class="user-input"  v-model="secondPassword"  placeholder="请重新设置密码"/>
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
    components: {
        Title,
        Button
    },
    setup() {
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const secondPassword = ref('');
        return {
            username,
            email,
            password,
            secondPassword
        }
    },
})
</script>

