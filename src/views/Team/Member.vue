<script lang="ts" setup>
import { teamUsers, teamApprove } from '@/utils/team'
import { useRoute } from "vue-router";
import { ref } from 'vue'
import Button from '@/components/Button.vue'
const route = useRoute()
const teamId = route.params.teamId;
const name = decodeURIComponent(route.query.name)
let applyingList = ref([])
let applyedList = ref([])
const getList = async () => { 
    let { data: { data } } = await teamUsers(teamId, {is_allowed: false}); 
    applyingList.value = data;
    let { data: { data: newData } } = await teamUsers(teamId, {is_allowed: true}); 
    applyedList.value = newData;
    console.log(applyingList.value, applyedList.value)
}
getList()
const checked = ref([]);
const agree = async () => {
    const { data: { data }} = await teamApprove(teamId, checked.value)
    console.log(data);
}
 //teamUsers
</script>

<template>
    <div class="team-member">
        <h5 class="team-member-title">
            {{name}}人员情况
        </h5>
        <div class="team-member-content"> 
            <div class="team-member-subtitle">
                申请中的人员
            </div>
            <div class="team-member-appling" v-if="applyingList.length">
                <van-checkbox-group v-model="checked">
                    <van-checkbox v-for="item in applyingList" :key="item.user_id" :name="item.user_id"> 
                        {{item.user_info.username}}
                    </van-checkbox>
                </van-checkbox-group>
                <Button text="同意申请"  @click="agree" className="primary"/>
            </div>
            <div class="team-member-item" v-else>
                暂无
            </div>
            <div class="team-member-appled">
                <div class="team-member-subtitle">
                    已申请的人员
                </div>
                <!-- <van-checkbox-group v-if="applyedList.length" v-model="checked"> -->
                <div v-if="applyedList.length">
                    <div v-for="item in applyedList" :key="item.user_id" :name="item.user_id"> 
                        {{item.user_info.username}}
                    </div>
                </div>    
                <!-- </van-checkbox-group> -->
                <div class="team-member-item" v-else>
                    暂无
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.van-checkbox {
    height: 30px;
}
.team-member {
    background-color: #F4F9FD;
    min-height: 100vh;
    padding: 30px 20px;
    &-title {
        font-size: 24px;
        margin-bottom: 15px;
    }
    &-content {
        padding: 15px;
        background-color: #fff;
        border-radius: 15px;
    }
    &-subtitle {
        font-size: 19px;
        margin-bottom: 5px;
    }
    &-item {
        height: 25px;
        line-height: 25px;
        input {
            display: inline-block;
            vertical-align: middle;
            margin-right: 4px;
        }
    }
    &-appling {
        border-bottom: 1px solid #E4E6E8;
    }
    &-appled {
        padding-top: 10px;
    }
}
</style>