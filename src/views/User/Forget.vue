<template>
    <div>
        <Title title="找回密码" desc="我们将会将重置链接发送至您邮箱" />
        <input class="user-input" type="email" v-model="email" placeholder="请输入您的邮箱"/>
        <div class="btn-container">
            <Button text="发送"  @click="send" className="primary"/>
        </div>
    </div>
</template>
<style lang="scss">
.btn-container {
    margin-top: 30px;
}

</style>
<script lang="ts">
import Title from './components/Title.vue'
import Button from '@/components/Button.vue'
import { showToast } from 'vant';
import { defineComponent, ref } from 'vue'
import { reset } from '@/utils/user'


export default defineComponent({
    components: {
        Title,
        Button
    },
    setup() {
        const email = ref('');
        const send = async () => {
            if (!email.value) {
                showToast('请填写邮箱');
            }
            const { status, data } = await reset(email.value)
            if (+status !== 200) {
                showToast(data.message)
            } else {
                showToast('已经发送到您的邮箱')
            }
        }
        
        return {
           email,
           send
        }
    },
})
</script>

