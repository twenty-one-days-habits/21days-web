<template>
    <div>
        <Title title="注册" desc="欢迎注册新用户" />
        <input class="user-input" v-model="username" placeholder="请设置用户名"/>
        <input class="user-input" v-model="email" placeholder="请输入邮箱"/>
        <input class="user-input" type="password" v-model="password"  placeholder="请设置密码"/>
        <input class="user-input" type="password"  v-model="secondPassword"  placeholder="确认密码"/>
        <div class="btn-container">
            <Button text="注册" @click="register" className="primary"/>
            <Button text="登录" @click="login"/>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from '@/components/Button.vue'
import { defineComponent, ref } from 'vue'
import { postRegister } from '@/utils/user'
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Title,
        Button,
    },
    setup() {
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const secondPassword = ref('');
        const router = useRouter();
         const login = () => {
            router.push({
                path: '/user/login'
            })
        }
        const register = async () => {
            if (!password.value || !email.value || !username.value) {
                showToast('请填写完信息')
                return
            }
            if (password.value !== secondPassword.value) {
                showToast('两次密码不一致')
                return
            }
            const res = await postRegister({
                username: username.value,
                password: password.value,
                email: email.value
            })
            console.log(res);
            if (res.status === 200) {
                showToast('注册成功，请登录');
                login();
            } else {
                showToast(res.data.message);
            }
        }
    
        return {
            username,
            email,
            password,
            secondPassword,
            register,
            login,
        }
    },
})
</script>

