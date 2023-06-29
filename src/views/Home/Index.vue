<template>
    <div>
        <div class="home-title">
            <!-- <img src="@/assets/icon.jpg"> -->
            <p class="home-title-top">21天计划</p>
            <p class="home-title-second">探索一切的热情最为重要</p>
        </div>
        <div class="home-content">
            <div class="home-content-item">UserId：{{userId}}</div>
            <div class="home-content-item">邮箱：{{email}}</div>
            <div class="home-content-item">用户名：{{username}}</div>
            <Button text="退出登录"  @click="toLogout" className="primary"/>
        </div>
    </div>
</template>
<style lang="scss">
.home-title {
    text-align: center;
    padding-top: 40px;
    &-top {
        font-size: 25px;
        font-weight: bold;
    }
    &-second {
        color: #aaa;
        font-size: 16px;
        margin-top: 20px;
    }
    
}
.home-content {
    width: 90%;
    margin: 40px auto;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    padding: 30px 30px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    &-item {
        color: #5B5E63;
        font-size: 15px;
        line-height: 30px;
    }
}
</style>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { logout } from '@/utils/user'
// localStorage.setItem('userInfo'
import { ref } from "vue";
const router = useRouter()
const storage:string|null = localStorage.getItem('userInfo');
const userInfo = JSON.parse(storage||'')
let email = ref('')
email.value = userInfo.email;
let username = ref('')
username.value = userInfo.username;
let userId = ref('')
userId.value = localStorage.getItem('userId')
const toLogout = async() => {
   const res =  await logout();
   console.log(res)
   router.push({
        path: '/user/login'
    })
}
</script>
