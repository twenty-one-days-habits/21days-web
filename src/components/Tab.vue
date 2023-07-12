<script lang="ts" setup>
import { useRouter} from 'vue-router'
import { watch, ref } from 'vue'
const router = useRouter()
// 监听当前路由
const showTab = ref(false)
const toRouter = (name: string) => {
    router.push({
        name
    })
}
const getOn = (context) => {
    const { name } = router.currentRoute?.value;
    if (name?.includes(context)) {
        return 'on'
    }
    return ''
}
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    const name: string = newValue.name;
    if (!name) {
        return;
    }
    const hideTab = ['Login', 'Register', 'Forget', 'Reset']
    if (hideTab.includes(name)) {
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
        <div @click="toRouter('TodayIndex')">
            <span class="tab-icon tab-clock" :class="getOn('Today')"></span>
            <span class="tab-text">打卡任务</span>
        </div>
        <div @click="toRouter('PlanList')">
            <span class="tab-icon tab-list" :class="getOn('Plan')"></span>
            <span class="tab-text">计划列表</span>
        </div>
        <div @click="toRouter('TeamList')">
            <span class="tab-icon tab-team" :class="getOn('Team')"></span>
            <span class="tab-text">我的团队</span>
        </div>
        <div @click="toRouter('Home')">
            <span class="tab-icon tab-home" :class="getOn('Home')"></span>
            <span class="tab-text">个人信息</span>
        </div>
    </div>
</template>
<style lang="scss">
    .tab {
        height: 56px;
        width: 100%;
        display: flex;
        box-shadow: 3px 3px 10px 2px rgba(#000, 0.1);
        box-sizing: border-box;
        padding-top: 5px;
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
            padding-top: 2px;
        }
        &-icon {
            width: 28px;
            height: 28px;
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
        &-home {
            background-image: url('@/assets/tab_home.png');
            &.on {
                background-image: url('@/assets/tab_home_on.png');
            }
        }
    }
</style>