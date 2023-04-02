<template>
    <div>
        <Title title="登录" desc="登录享受独家服务" />
        <input class="user-input" v-model="userName" placeholder="请输入用户名"/>
        <input class="user-input" v-model="password" placeholder="请输入密码"/>
        <div class="btn-container">
            <Button text="登录"  @click="login" className="primary"/>
            <Button text="注册"  @click="toRegister" />
        </div>
    </div>
</template>
<style lang="scss">
.btn-container {
    margin-top: 50px;
}
</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from './components/Button.vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { postLogin } from '@/utils/user'

export default defineComponent({
    components: {
        Title,
        Button
    },
    setup() {
        const userName = ref('');
        const password = ref('');
        const router = useRouter()
        const toRegister = () => {
            router.push({
                path: '/user/register'
            })
        }
        const login = async () => {
            const res = await postLogin({
                username: "test4",
                password: "password"
            })
            console.log(res);
        }
        return {
            toRegister,
            login,
            userName,
            password
        }
    },
})
</script>

