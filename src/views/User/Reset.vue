<template>
    <div>
        <Title title="重置密码" desc="" />
        <input class="user-input" type="password" v-model="password"  placeholder="请重置密码"/>
        <input class="user-input" type="password"  v-model="secondPassword"  placeholder="确认密码"/>
        <div class="btn-container">
            <Button text="确认" @click="reset" className="primary"/>
        </div>
    </div>
</template>
<style lang="scss">

</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from '@/components/Button.vue'
import { defineComponent, ref } from 'vue'
import { verify } from '@/utils/user'
import { showToast } from 'vant';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    components: {
        Title,
        Button,
    },
    setup() {
        const password = ref('');
        const secondPassword = ref('');
        const router = useRouter();
        const route = useRoute();
         const login = () => {
            router.push({
                path: '/user/login'
            })
        }
        const reset = async () => {
            if (!password.value) {
                showToast('请填写完信息')
                return
            }
            if (password.value !== secondPassword.value) {
                showToast('两次密码不一致')
                return
            }
            const token = route.query.token
            const {status, data} = await verify({
                password: password.value,
                token,
            })
            if (status === 200) {
                showToast('重置成功，请登录');
                login();
            } else {
                showToast(data.message);
            }
        }
    
        return {
            password,
            secondPassword,
            reset,
            login,
        }
    },
})
</script>

