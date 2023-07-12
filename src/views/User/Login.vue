<template>
    <div>
        <Title title="登录" desc="登录享受独家服务" />
        <input class="user-input" v-model="userName" placeholder="请输入用户名"/>
        <input class="user-input" type="password" v-model="password" placeholder="请输入密码"/>
        <span class="user-forget" @click="toSendEmail">忘记密码？</span>
        <div class="btn-container">
            <Button text="登录"  @click="login" className="primary"/>
            <Button text="注册"  @click="toRegister" />
        </div>
    </div>
</template>
<style lang="scss">
.btn-container {
    margin-top: 30px;
}
.user-forget {
    color: $blue;
    margin-top: 10px;
    display: block;
}
</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from '@/components/Button.vue'
import { showToast } from 'vant';
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
        const route = useRoute();

        const toRegister = () => {
            router.push({
                path: '/user/register'
            })
        }
        const toSendEmail = () => {
            router.push({
                path: '/user/forget'
            })
        }
        const login = async () => {
            if (!userName.value || !password.value) {
                showToast('请将信息填写完整')
                return
            }
            const { data, status } = await postLogin({
                username: userName.value,
                password: password.value
            })
            if (+status !== 200) {
                showToast(data.message)
            } else {
                localStorage.setItem('userId', data.userId)
                const info = {
                    username: userName.value,
                    email: data.providerUid
                }
                localStorage.setItem('userInfo', JSON.stringify(info))
                router.push({
                    path: '/team/list'
                })
            }
        }
        return {
            toRegister,
            toSendEmail,
            login,
            userName,
            password
        }
    },
})
</script>

