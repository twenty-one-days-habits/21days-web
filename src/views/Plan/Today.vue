<template>
  <div class='plan-today'>
    <div class="plan-today-calendar">
      <van-calendar
        :value="curDate"
        :poppable="false"
        :min-date="new Date(2023,1,1)"
        :show-confirm="false"
        :show-title="false"
        @confirm="selectDate"
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
            label-disabled
            @change="handleClick($event, index, 'today')">
            {{ item.title }}（{{item.description }}
          </van-checkbox>
        </li>
      </ul>
      <hr/>
      <h3>周期任务</h3>
      <ul>
        <li v-for="item in otherPlans" :key="item.id" >
          <van-checkbox
            :disabled="item.checkin"
            v-model="item.checkin"
            shape="square"
            label-disabled
            @change="handleClick($event, index, 'other')">
            {{item.title}}（{{`${item.counts}/ ${item.check_in_type === '2' ? '每周' : (item.check_in_type === 3 ? '总' : '')}${item.counts}次`}}）
          </van-checkbox>
        </li>
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

export default defineComponent({
  async mounted() {
    const res1 = await getMyTeams();
    console.info(res1);
    this.curTeamId = res1.data.current_team?.[0]?.id;
  
    await this.getTasks(this.curTeamId)
  },
  computed: {
    otherPlans() {
      if(!this.allPlans) return [];
      return this.allPlans.filter(v => v?.counts > 0);
    },
    todayPlans() {
      if(!this.allPlans) return [];
      return this.allPlans.filter(v => v.counts === 0);
    }
  },
  methods: {
    async getTasks (teamId:string, date: Date = new Date()) {
      const userId = localStorage.userId;
      this.allPlans.length = 0;
      const res = await getTasksByDate(teamId, userId, this.dateFormate(date?.getTime(), 'yyyy-MM-dd'));
      console.info(res);
      if(res.code === 200) {
        this.allPlans.push(...res.data);
        console.info(this.allPlans)
      }
    },
    async handleClick (e: HTMLElement, index: number, type: string) {
      const list = JSON.parse(JSON.stringify(type === 'today' ? this.todayPlans : this.otherPlans))
      const item = list[index];
      item.checkin = !item.checkin
      // 请求签到接口
      try {
        const res = await checkIn(this.curTeamId, item.id);
        console.info(res);
        if(res.code === 200) {
          showToast('签到成功');
          // 刷新
          this.getTasks(this.curTeamId)
        } else {
          showToast(res.message)
        }
      } catch(err: any) {
        showToast(err?.response?.data?.message || err?.message || '请求出错了，稍后再试')
      }
    },
    selectDate (value: Date) {
      console.info(this.curDate, 'curDate')
      console.info(value);
      this.curDate = value
      this.getTasks(this.curTeamId, this.curDate)
    }
  },
  setup() {
    let allPlans = reactive([]);
    let curTeamId = ref('');
    let curDate = ref(new Date());

    const dateFormate = (timestamp: number, format = 'yyyy-MM-dd hh:mm:ss') => {
        let date = new Date(timestamp);
        var o = {
          'y+': date.getFullYear(),
          'M+': date.getMonth() + 1, // 月份 "d+": value.getDate(), // 日
          'd+': date.getDate(),
          'h+': date.getHours(), // 小时 "m+": value.getMinutes(), // 分 "s+": value.getSeconds(), // 秒
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        };
        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
          }
        }
        return format;
      }
    return {
      curDate,
      allPlans,
      curTeamId,
      dateFormate
    }
  }
})

</script>
<style lang='scss'>
.plan-today {
  height: calc(100vh - 80px);
  overflow: scroll;
}
.plan-today-list {
  border-top: 1px solid #efefef;
  padding: 30px;
  padding-top: 15px;
  margin-top: 15px;
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
  .van-checkbox {
    font-weight: bold;
  }
  .van-checkbox.active {
    color: rgba(0,0,0,.25);
  }
}

</style>