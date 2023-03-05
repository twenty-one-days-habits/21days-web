<template>
    <div>
        <Title title="登录" desc="登录享受独家服务" />
        <input class="user-input" placeholder="请输入用户名"/>
        <input class="user-input" placeholder="请输入密码"/>
        <div class="btn-container">
            <Button text="登录" className="primary"/>
            <Button text="注册" />
        </div>
    </div>
</template>
<style lang="scss">
.user-input {
    display: block;
    height: 55px;
    line-height: 55px;
    font-size: 15px;
    padding: 0 10px;
    width: 100%;
    background-color: #F7F8F9;
    border: none;
    border-radius: 3px;
    margin-top: 20px;
    box-sizing: border-box;
    &:focus {
        border: 1px solid $blue;
        outline: none;
    }
}
.btn-container {
    margin-top: 50px;
}
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

