<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter} from 'vue-router'
import { teamCreate } from '../../utils/team';
const showCalender = ref(false);
import Button from '@/components/Button.vue'
import { showToast } from 'vant';
const name = ref('')
const timeString = ref('')
const description = ref('')
const router = useRouter()

const onConfirm = ( selectTime: Date ) => {
    // 全球标准时间的差别
    const timeOffset = new Date().getTimezoneOffset() * 60 * 1000
    console.log(new Date(selectTime.getTime() - timeOffset).toISOString());
    timeString.value = new Date(selectTime.getTime() - timeOffset).toISOString().slice(0, 10);
    showCalender.value = false
}
let hasClick = false
const toSet = async () => {
    if (!name.value || !timeString.value) {
        showToast('请将信息填写完整')
    }
    if (!hasClick) {
        const { data: {data}} = await teamCreate({
            name: name.value,
            description: description.value,
            start: timeString.value.replaceAll('/', '-')
        })
        router.push({
            path: '/team/list'
        })
        hasClick = false
    }
    hasClick = true

}
</script>
<template>
    <div class="team-create">
        <div class="team-create-item">
            <div class="team-create-label">
                团队计划名称
            </div>
            <div>
                <input class="team-create-input" v-model="name" placeholder="请输入团队计划名称"/>
            </div>
        </div>
        <div class="team-create-item">
            <div class="team-create-label">
                开始日期
            </div>
            <div>
                <input disabled="true" v-model="timeString" class="team-create-input" placeholder="请输入开始日期"/>
                <span class="team-create-calender" @click="showCalender=true"></span>
            </div>
        </div>
        <!-- <div class="team-create-item">
            <div class="team-create-label">
                结束日期
            </div>
            <div>
                <input class="team-create-input" placeholder="请输入结束日期"/>
            </div>
        </div> -->
        <div class="team-create-item">
            <div class="team-create-label">
                描述
            </div>
            <div>
                <input class="team-create-input" v-model="description" placeholder="请输入描述"/>
            </div>
        </div>
        <Button text="完成设置"  @click="toSet" className="primary"/>
        <van-calendar v-model:show="showCalender" @confirm="onConfirm" />
    </div>
</template>
<style lang="scss" scoped>
.team-create {
    padding: 20px;
    &-label {
        font-size: 15px;
        margin-top: 20px;
    }
    &-item {
        border-bottom: 1px solid #eee;
    }
    &-input {
        font-size: 15px;
        border: none;
        display: block;
        width: calc(100% - 25px);
        height: 30px;
        margin-top: 10px;
        &:disabled {
            background: transparent;
        }
    }
    &-calender {
        display: block;
        width: 20px;
        height: 20px;
        float: right;
        margin-top: -30px;
        background-image: url('@/assets/calender.png');
        background-size: 100% 100%;
        z-index: 100;
        cursor:pointer;
    }
}
</style>