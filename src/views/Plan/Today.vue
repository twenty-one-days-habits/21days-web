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
          {{ item.checkin }}
          <van-checkbox 
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
        <li v-for="item in otherPlans" :key="item.id">
          <van-checkbox
            v-model="item.checkin"
            shape="square"
            @click="item.checkin = !item.checkin">
            {{ item.title }}（{{item.time }}）
          </van-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Ref, defineComponent, ref } from "vue";
import { getTasksByDate, getMyTeams } from '../../utils/plan';
import { reactive } from "vue";
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
    const getTasks = async (teamId:string, date?: number) => {
      const userId = localStorage.userId;
      const res = await getTasksByDate(teamId, userId, date);
      console.info(res);
      if(res.code === 200) {
        this.todayPlans.push(...res.data);
        console.info(this.todayPlans)
      }
    }
    

    await getTasks(this.curTeamId)
  },
  setup() {
    let todayPlans = reactive([]);
    let otherPlans = ref([]);
    let curTeamId = ref('');
    const plans = reactive({
      todayPlans: [],
      otherPlans: []
    })
    
    

    const handleClick = (e: HTMLElement, index: number)  =>{
      const list = JSON.parse(JSON.stringify(todayPlans))
      const item = list[index];
      item.checkin = !item.checkin
    };
    
    
   
    return {
      handleClick,
      // getTasks,
      todayPlans,
      otherPlans,
      curTeamId,
      plans
    }
  }
}

</script>
<style lang='scss' scoped>
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
}
</style>