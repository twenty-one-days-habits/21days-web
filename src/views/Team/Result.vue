<script lang="ts" setup>
import { getTeamStatics } from '@/utils/team'
import { useRoute } from "vue-router";
import { ref } from 'vue'
import Button from '@/components/Button.vue'
const route = useRoute()
const teamId = route.params.teamId;
const name = decodeURIComponent(route.query.name)

let list = ref([])
const getList = async () => { 
    let { data: { data } } = await getTeamStatics(teamId); 
    list.value = data;
    // applyingList.value = data;
    // let { data: { data: newData } } = await teamUsers(teamId, {is_allowed: true}); 
    // applyedList.value = newData;
    // console.log(applyingList.value, applyedList.value)
}
getList()
const getWidth = ({checkin_count, total_count}) => {
    return checkin_count / total_count * 100 + '%';
}
 //teamUsers
</script>
<template>
    <div class="team-result">
        <div class="team-result-title">{{name}}完成情况总览</div>
        <div class="team-result-item" v-for="(item,index) in list" :key="index">
            <p class="team-result-desc">成员名称</p>
            <p class="team-result-name">{{item.user.username}}</p>
            <div v-if="item.statistic.length">
                <div class="team-result-every" v-for="(plan,index1) in item.statistic" :key="index1">
                    <img class="team-result-icon" :src="'/assets/icon'+(index1%3)+'.png'">
                    <div class="team-result-detail">
                        <div class="team-result-back">
                            <div class="team-result-process" :style = "'width:'+getWidth(plan)"></div>
                        </div>
                        <div class="team-result-text">
                            <span class="plan-name">{{plan.task.title}}</span>
                            <span class="plan-right">{{plan.checkin_count}}/<em>{{plan.total_count}}</em></span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="team-result-empty">
                未制定计划
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.team-result {
    background-color: #F4F9FD;
    padding: 23px;
    box-sizing: border-box;
    min-height: 100%;
    &-title {
        font-size: 24px;
        line-height: 1.6;
    }
    &-item {
        border-radius: 8px;
        background-color: #FFFFFF;
        padding: 15px;
        border-bottom: 1px solid #E4E6E8;
        margin-bottom: 20px;
    }
    &-desc {
        color: #91929E;
        font-size: 14px;
    }
    &-name {
        margin-top: 10px;
        border-bottom: 1px solid #E4E6E8;
        padding-bottom: 10px;
    }
    &-detail {
        margin-left: 30px;
        flex: 1;
    }
    &-every {
        margin-top: 20px;
        display: flex;
    }
    &-icon {
        width: 40px;
        display: block;
    }
    &-back {
        height: 5px;
        margin-top: 10px;
        background-color: rgba(#E4E6E8, 0.5);
    }
    &-process {
        background-color: #A46BFF;
        height: 5px;
    }
    &-text {
        margin-top: 10px;
    }
    &-empty {
        margin-top: 10px;
    }
    .plan-right {
        float: right;
        em {
            color: #ccc;
        }
    }
}
</style>