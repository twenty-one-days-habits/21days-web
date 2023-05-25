<template>
  <div class='plan-today'>
    <div class="plan-today-calendar">
      <van-calendar
        :poppable="false"
        :show-confirm="false"
        row-height="40px"
        :style="{ height: '240px' }"
      />
    </div>
    <div class="plan-today-list">
      <h3>当日任务</h3>
      <ul>
        <li v-for="(item, index) in todayPlans" :key="item.time">
          <van-checkbox 
            :disabled="item.checkin"
            v-model="item.checkin"
            shape="square"
            @click="handleClick($event, index)">
            {{ item.title }}（{{item.description }}）
          </van-checkbox>
        </li>
      </ul>
      <hr/>
      <h3>周期任务</h3>
      <ul>
        <!-- <li v-for="item in otherPlans" :key="item.id">
          <van-checkbox
            v-model="item.checkin"
            shape="square"
            @click="item.checkin = !item.checkin">
            {{ item.title }}（{{item.time }}）
          </van-checkbox>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Ref, defineComponent, ref } from "vue";
import { getTasksByDate, getMyTeams, checkIn } from '../../utils/plan';
import { reactive } from "vue";
import { showToast } from "vant";
interface planItem {
  name: string;
  time: number;
  checked: boolean
}

export default {
  async mounted() {
    const res1 = await getMyTeams();
    console.info(res1);
    this.curTeamId = res1.data.current_team?.[0]?.id;
  
    await this.getTasks(this.curTeamId)
  },
  setup() {
    let todayPlans = reactive([]);
    let otherPlans = ref([]);
    let curTeamId = ref('');
    const plans = reactive({
      todayPlans: [],
      otherPlans: []
    })
    
    const getTasks = async (teamId:string, date?: number) => {
      const userId = localStorage.userId;
      todayPlans.length = 0;
      const res = await getTasksByDate(teamId, userId, date);
      console.info(res);
      if(res.code === 200) {
        todayPlans.push(...res.data);
        console.info(todayPlans)
      }
    }

    const handleClick = async (e: HTMLElement, index: number) => {
      const list = JSON.parse(JSON.stringify(todayPlans))
      const item = list[index];
      item.checkin = !item.checkin
      // 请求签到接口
      try {
        const res = await checkIn(curTeamId.value, item.id);
        console.info(res);
        if(res.code === 200) {
          showToast('签到成功');
          // 刷新
          getTasks(curTeamId.value)
        } else {
          showToast(res.message)
        }
      } catch(err: any) {
        showToast(err?.response?.data?.message || err?.message || '请求出错了，稍后再试')
      }
    };
   
    return {
      handleClick,
      getTasks,
      todayPlans,
      otherPlans,
      curTeamId,
      plans
    }
  }
}

</script>
<style lang='scss'>
.plan-today {
  height: calc(100vh - 80px);
  overflow: scroll;
}
.plan-today-list {
  padding: 30px;
  h3 {
    font-size: 18px;
  }
  hr {
    border-color: rgba(0, 0, 0, 0.06);
    margin: 10px 0;
  }
  ul {
    padding: 16px 0;
  }
  li {
    font-size: 16px;
    margin-bottom: 20px;
  } 
  .van-checkbox.active {
    color: rgba(0,0,0,.25);
  }
}

</style>