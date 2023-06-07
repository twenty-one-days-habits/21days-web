<script setup lang="ts">
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'
    import Join from './Join.vue'    
    const router = useRouter()
    const showJoin = ref(false)
    const createTeam = () => {
        router.push({
            path: '/team/create'
        })
    }
    const close = () => {
        showJoin.value = false
    }
</script>
<template>
    <div class="empty">
        <img src="@/assets/empty.png"/>
        <div class="empty-desc">
            当前没有正在执行中的计划
        </div>
    </div>
    <div class="empty-btns">
        <div class="empty-create" @click="createTeam">
            创建团队计划
        </div>
        <div class="empty-join" @click="showJoin=true">
            加入团队计划
        </div>
    </div>
    <Join v-if="showJoin" @close="close"/>
</template>
<style lang="scss" scoped>
    .empty {
        text-align: center;
        padding-top: 20px;
        &-desc {
            margin-top: 10px;
            font-size: 12px;
        }
        &-create, &-join {
            width: 144px;
            height: 50px;
            line-height: 50px;
            font-size: 17px;
            color: #fff;
            text-align: center;
            border-radius: 12px;
            font-weight: bold;
        }
        &-create {
           background-color: rgba(#753ECF, 0.8); 
           float: left;
        }
        &-join {
            background-color: #FFAA00;
            float: right;
        }
        &-btns {
            height: 58px;
            margin-top: 25px;
        }
    }
</style>