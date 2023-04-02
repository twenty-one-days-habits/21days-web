<template>
    <div class="team-list">
        <div class="team-current" v-if="false">
            <div class="team-current-top">
                <div class="team-current-left">
                    <p class="team-current-title">团队名称</p>
                    <p class="team-current-desc">团队描述</p>
                    <p class="team-current-time">
                        <i></i> 创建时间：2023-01-02
                    </p>
                </div>
                <div class="team-current-right">
                    <i class="team-current-refresh"></i>
                    <i class="team-current-copy">复制邀请码</i>
                </div>
            </div>
            <div class="team-current-bottom">
                <div class="team-current-left">
                    <p class="team-current-title">团队人员</p>
                    <p class="team-current-desc"><span>小葱</span>、<span>其玲</span>等</p>
                </div>
                <div class="team-current-right">
                    <p class="team-current-captain">队长 <span>小葱</span></p>
                    <div class="team-current-detail">查看详情</div>
                </div>
            </div>
        </div>
        <Empty />
        <div class="team-history">
            <h2 class="team-history-title">
                历史团队计划
            </h2>
            <div class="team-history-item">
                <p class="team-current-title">团队名称</p>
                <p class="team-current-desc">团队描述</p>
                <p class="team-current-desc">2019.01.01-2019.01.25</p>
                <i class="team-history-detail">查看详情</i>
            </div>
        </div>
    </div>
    <Join />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Join from './components/Join.vue'
import Empty from './components/Empty.vue'

export default defineComponent({
    components: { 
        Join,
        Empty
    },
    setup() {
        
    },
})
</script>

<style lang="scss">
.team-list {
    padding-top: 15px;
    width: 335px;
    margin: 0 auto;
}
.team-current {
    border-radius: 15px;;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
    padding: 20px;
    box-sizing: border-box;
    &-top {
        display: flex;
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    &-title {
        font-size: 15px;
    }
    &-desc {
        font-size: 14px;
        color: $gray;
        margin-top: 6px;
        span {
            text-decoration:underline;
        }
    }
    &-time {
        margin-top: 11px;
        color: $gray;
        i {
            display: inline-block;
            width: 15px;
            height: 15px;
            background-image: url('../../assets/calender.png');
            background-size: 100% 100%;
            position: relative;
            top: 3px;
        }
    }
    &-right {
        flex: 1;
        position: relative;
    }
    &-refresh {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-image: url('../../assets/refresh.png');
        background-size: 100% 100%;
        position: absolute;
        right: 0;
    }
    &-copy {
        display: inline-block;
        width: 79px;
        height: 25px;
        background-color: $blue;
        color: #fff;
        line-height: 25px;
        border-radius: 10px;
        position: absolute;
        right: 0;
        top: 35px;
        text-align: center;
        font-size: 10px;
    }
    &-bottom {
        display: flex;
    }
    &-captain {
        float: right;
        span {
            color: $gray;
        }
    }
    &-detail {
        color: $blue;
        position: absolute;
        top: 30px;
        right: 10px;
        &::after {
            content: '';
            width: 15px;
            height: 15px;
            background-image: url('../../assets/right.png');
            background-size: 100% 100%;
            position: absolute;
            right: -13px;
            margin-top: 1px;
        }
    }
}
.team-history {
    &-title {
        font-size: 18px;
        margin: 25px 0;
    }
    &-item {
        border-radius: 15px;;
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.1);
        padding: 20px;
        position: relative;
    }
    &-detail {
        display: inline-block;
        width: 79px;
        height: 25px;
        background-color: $blue;
        color: #fff;
        line-height: 25px;
        border-radius: 10px;
        position: absolute;
        right: 15px;
        top: 40px;
        text-align: center;
        font-size: 10px;
    }
}
</style>