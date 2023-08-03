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
    list.value = data.map((item) => {
        let all = 0;
        let count = 0;
        item.statistic.forEach((plan) => {
            all += (plan.total_count) * plan.task.score;
            count += plan.checkin_count * plan.task.score;
        });
        item.all = all;
        item.count = count;
        item.percent = Math.floor(count / all * 100);
        return item;
    }).sort((item1, item2) => {
       return item2.percent - item1.percent;
    });
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
            <div class="team-result-seq">第{{index+1}}名</div>
            <img class="team-result-first" v-if="index===0" :src="'/assets/tiny.png'">
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
                <div class="team-result-statistic">
                    已完成:{{item.count}}分 总分数:{{item.all}}分  完成率:<i>{{item.percent}}%</i>
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
        color: #666;
        font-size: 14px;
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
        height: 40px;
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
    &-statistic {
        border-top: 1px solid #E4E6E8;
        text-align: right;
        margin-top: 25px;
        padding-top: 20px;
        padding-bottom: 10px;
        font-size: 14px;
        color: #666;
        i {
            font-size: 17px;
        }
    }
    &-seq {
        float: right;
        font-size: 20px;
        margin-top: -40px;
    }
    &-first {
        width: 30px;
        float: right;
        margin-top: -40px;
        margin-right: 60px;
    }
    .plan-right {
        float: right;
        em {
            color: #ccc;
        }
    }
}
</style>