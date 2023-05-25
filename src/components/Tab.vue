<script lang="ts" setup>
import { useRouter} from 'vue-router'
import { watch, ref } from 'vue'
const router = useRouter()
// 监听当前路由
const showTab = ref(false)
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    const name: string = newValue.name;
    if (name === 'Login' || name === 'Register') {
        showTab.value = false
    } else {
        showTab.value = true
    }
  },
  { immediate: true }
)
</script>
<template>
    <div class="tab" v-if="showTab">
        <div>
            <span class="tab-icon tab-clock"></span>
            <span class="tab-text">打卡任务</span>
        </div>
        <div>
            <span class="tab-icon tab-list"></span>
            <span class="tab-text">计划列表</span>
        </div>
        <div>
            <span class="tab-icon tab-team on"></span>
            <span class="tab-text">我的团队</span>
        </div>
    </div>
</template>
<style lang="scss">
    .tab {
        position: fixed;
        height: 66px;
        bottom: 0;
        width: 100%;
        display: flex;
        box-shadow: 3px 3px 10px 2px rgba(#000, 0.1);
        box-sizing: border-box;
        padding-top: 11px;
        z-index: 10;
        background-color: #fff;
        div {
            flex: 1;
            text-align: center;
            span {
                display: block;
            }
        }
        &-text {
            font-size: 11px;
            padding-top: 8px;
        }
        &-icon {
            width: 28px;
            height: 25px;
            background-size: 100% 100%;
            margin: 0 auto;
        }
        &-clock {
            background-image: url('@/assets/tab_punch.png');
            &.on {
                background-image: url('@/assets/tab_punch_on.png');
            }
        }
        &-list {
            background-image: url('@/assets/tab_plan.png');
            &.on {
                background-image: url('@/assets/tab_plan_on.png');
            }
        }
         &-team {
            background-image: url('@/assets/tab_team.png');
            &.on {
                background-image: url('@/assets/tab_team_on.png');
            }
        }
    }
</style>