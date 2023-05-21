<template>
    <div class="tab">
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
        position: absolute;
        height: 85px;
        bottom: 0;
        width: 100%;
        display: flex;
        box-shadow: 3px 3px 10px 2px rgba(#000, 0.1);
        box-sizing: border-box;
        padding-top: 16px;
        div {
            flex: 1;
            text-align: center;
            span {
                display: block;
            }
        }
        &-text {
            font-size: 11px;
            padding-top: 10px;
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