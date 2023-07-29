<template>
  <div class='plan-today'>
    <van-loading size="24px" type="spinner" v-if="loading">加载中...</van-loading>
    <div class="plan-today-calendar" v-if="initalIndex !== -1">
      <!-- <van-calendar
        :value="curDate"
        :poppable="false"
        :min-date="new Date(2023,1,1)"
        :show-confirm="false"
        :show-title="false"
        row-height="40px"
        :style="{ height: '240px' }"
        @confirm="selectDate"
      /> -->
      <div class="plan-today-title">
        {{nowMonth}}
      </div>
      <div class="plan-today-day">
        <span>日</span>
        <span>一</span>
        <span>二</span>
        <span>三</span>
        <span>四</span>
        <span>五</span>
        <span>六</span>
      </div>
      <swiper
        ref="swiper"
        :modules="modules"
        :loop="false"
        :slides-per-view="7"
        :slides-per-group="7"
        :space-between="0"
        :initial-slide="initalIndex"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        class="swiperBox"
        @slideChange="onSlideChange"
      >
        <swiper-slide v-for="(item) in dateInfoList" :key="item.value">
          <span @click="selectDay(item)" :class="{'disabled':item.disabled,'active': item.active}">
            {{item.showValue}}
          </span>
        </swiper-slide>
        
       
        <!--右箭头。如果放置在swiper外面，需要自定义样式。-->
        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </swiper>
      <!--<div class="swiper-button-prev" />-->
        <!--左箭头。如果放置在swiper外面，需要自定义样式。-->
      <!--<div class="swiper-button-next"/>-->
    </div>

    <div class="plan-today-list" v-if="showType === 1">
      <h3>当日任务 {{today}}</h3>
      <ul>
        <li v-for="(item, index) in todayPlans" :key="item.time">
          <van-checkbox 
            :disabled="item.checkin||today !== nowMonth"
            v-model="item.checkin"
            shape="square"
            label-disabled
            @change="handleClick($event, index, 'today')">
            {{ item.title }}<span v-if="item.description">（{{item.description }}）</span>
          </van-checkbox>
        </li>
      </ul>
      <h3 style="padding-top:15px;border-top:1px solid #eee">周期任务</h3>
      <ul>
        <li v-for="(item, index) in otherPlans" :key="item.id" >
          <van-checkbox
            :disabled="item.checkin_count>=item.counts||today !== nowMonth"
            v-model="item.checkin"
            shape="square"
            label-disabled
            @change="handleClick($event, index, 'other')">
            {{item.title}}（{{`${item.check_in_type === 3 ? '完成' : ''}${item.checkin_count||0}次/ ${+item.check_in_type === 2 ? '每周' : (item.check_in_type === 3 ? '总' : '')}${item.counts}次`}}）
          </van-checkbox>
        </li>
      </ul>
    </div>
    <div class="empty" v-if="showType === 2">
      <!-- <img src="../../assets/empty.png" alt="" />
      <p>您今天没有可执行的任务！</p> -->
      <empty />
    </div>
  </div>
</template>

<script lang='ts'>
import { Ref, defineComponent, ref } from "vue";
import { getTasksByDate, getMyTeams, checkIn } from '../../utils/plan';
import { showToast } from "vant";
import { Plan } from '../../interface/plan';
import Empty from '../../components/Empty.vue';
// 引入swiper样式（按需导入）
// import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
// import 'swiper/css/scrollbar'  // 轮播图的滚动条， 轮播图里一般不怎么会使用到滚动条，如果有用到的话import导入就行
// 引入swiper核心和所需模块
import {   Navigation } from 'swiper'
 

// 在modules加入要使用的模块
const modules = [ Navigation]

interface planItem {
  name: string;
  time: number;
  checked: boolean
}

interface CheckInPlan extends Plan {
  checkin: boolean,
  time: string
}

interface DateMap {
  'y+': number,
  'M+': number, // 月份 "d+": value.getDate(), // 日
  'd+': number,
  'h+': number, // 小时 "m+": value.getMinutes(), // 分 "s+": value.getSeconds(), // 秒
  'm+': number,
  's+': number
}

interface dateInfo {
  date: string,
  value: string,
  showValue: string,
  selected: Boolean
}

export default defineComponent({
  components: {
    Empty
  },
  async mounted() {
    const res1 = await getMyTeams();
    await this.getTeamId();
    if(this.curTeamId) {  
      await this.getTasks(this.curTeamId)
    } else {
      this.showType = 2
    }
  },
  computed: {
    otherPlans() {
      if(!this.allPlans) return [];
      return this.allPlans.filter(v => +v?.check_in_type === 3);
    },
    todayPlans() {
      if(!this.allPlans) return [];
      return this.allPlans.filter(v => +v.check_in_type < 3);
    },
    nowMonth() {
      return this.dateInfoList.find(v => v.active)?.value;
    },
  },
  data() {
    return {
      loading: true,
      dateInfoList: [],
      today: this.dateFormate(new Date().getTime(), 'yyyy-MM-dd'),
    }
  },
  methods: {
    selectDay(item) {
      if (item.disabled) return;
      if (this.isFirst) {
        this.isFirst = false;
        return;
      }
      this.dateInfoList.forEach(v => {
        v.active = false;
      })
      item.active = true;
      this.getTasks(this.curTeamId, new Date(item.value));
    },
    prevEl (item, index) {
      console.log(item, index,'pre');
    },
    onSlideChange({activeIndex}) {
      console.log(activeIndex,this.initalIndex)
      if (this.dateInfoList[activeIndex].disabled) {
        const item = this.dateInfoList.slice(activeIndex).find(v => !v.disabled);
        this.selectDay(item);
        return;
      }
      this.selectDay(this.dateInfoList[activeIndex]);
    },
    nextEl(item,index) {
      console.log(item, index,'next');
    },
    dateFormate (timestamp: number, format = 'yyyy-MM-dd hh:mm:ss') {
        let date = new Date(timestamp);
        const o: any = {
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
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
          }
        }
        return format;
    },
    async getTeamId() {
      const res = await getMyTeams();
      // 优先获取当前团队的id 没有的话 再获取未开始的团队计划的id
      const currentTeam = res.data.data.current_team?.[0]
      if (currentTeam) {
        const startDay = new Date(currentTeam.start).getDay();
        let count = -startDay
        const startTime = new Date(currentTeam.start).getTime();
        while (count < 21 + (7-startDay)) {
          const timeItem = this.dateFormate(startTime + count * 60 * 60 * 24 *1000, 'yyyy-MM-dd');
          this.dateInfoList.push({ 
            value: timeItem,
            showValue: timeItem.split('-')[2],
            disabled: count <0 || count >= 21,
            active: timeItem === this.dateFormate(new Date().getTime(), 'yyyy-MM-dd')
          })
          if (timeItem === this.dateFormate(new Date().getTime(), 'yyyy-MM-dd')) {
            this.initalIndex = count;
          }
          // console.log(timeItem, this.dateFormate(new Date().getTime(), 'yyyy-MM-dd'), count, this.initalIndex)
          count++
        }
        // this.dateInfoList.push(...arr);
      }
      this.curTeamId  = res.data.data.current_team?.[0]?.id || '';
    },
    async getTasks (teamId:string, date: Date = new Date()) {
      // this.loading = true;
      const userId = localStorage.userId;
      this.allPlans.length = 0;
      // 清空数组
      this.allPlans = []
      const { data } = await getTasksByDate(teamId, userId, this.dateFormate(date?.getTime(), 'yyyy-MM-dd'));
      this.loading = false;
      if(data?.code === 200) {
        this.allPlans.push(...data.data);
        this.showType = this.allPlans?.length > 0 ? 1 : 2;
      }
    },
    async handleClick (e: HTMLElement, index: number, type: string) {
      const list = JSON.parse(JSON.stringify(type === 'today' ? this.todayPlans : this.otherPlans))
      const item = list[index];
      item.checkin = !item.checkin
      // 请求签到接口
      try {
        const { data } = await checkIn(this.curTeamId, item.id);
        console.info(data);
        if(data.code === 200) {
          showToast('签到成功');
          // 刷新
          this.getTasks(this.curTeamId)
        } else {
          showToast(data.message)
        }
      } catch(err: any) {
        showToast(err?.response?.data?.message || err?.message || '请求出错了，稍后再试')
      }
    },
    selectDate (value: Date) {
      if(!this.curTeamId) return
      this.curDate = value
      this.getTasks(this.curTeamId, this.curDate)
    }
  },
  setup() {
    let allPlans: Ref<Array<CheckInPlan>> = ref([] as Array<CheckInPlan>);
    let curTeamId = ref('');
    let curDate = ref(new Date());
    let showType = ref(0);
    let initalIndex = ref(-1);
    const dateInfoList:Ref<Array<dateInfo>> = ref([] as Array<dateInfo>);
    const isFirst = ref(true);
    return {
      curDate,
      allPlans,
      curTeamId,
      showType,
      modules,
      dateInfoList,
      initalIndex,
      isFirst,
      // navigation
    }
  }
})

</script>
<style lang='scss'>
.swiperBox{
  width: calc(100% - 20px);
  margin: 0 auto 20px;
  font-size: 14px;
}
.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  margin-top: 12px;
}
.swiper-button-next:after, .swiper-button-prev:after {
  font-size: 16px;
  color: #333;
}
.swiper-slide {
  text-align: center;
  span {
    display: block;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin: 0 auto;
    font-size: 14px;
    border-radius: 2px;
    &.disabled {
      color: #bbb;
    }
    &.active {
      background-color: $blue;
      border-radius: 2px;
      color: #fff;
    }
  }
}

.swiper-button-prev {
  margin-left: -5px;
}
.swiper-button-next:after {
  margin-left: 5px;
}
.plan-today {
  height: calc(100vh - 80px);
  overflow: scroll;
  &-title {
    text-align: center;
    height: 38px;
    font-weight: bold;
    line-height: 38px;
    font-size: 16px;
    padding: 10px;
  }
  &-day {
    display: flex;
    width: calc(100% - 20px);
    margin: 0 auto 10px;
    font-size: 14px;
    span {
      display: block;
      flex: 1;
      text-align: center;
    }
  }
  &-calendar {
    position: relative;
    // border-bottom: 1px solid #eee;
  }
}
.plan-today-list {
  border-top: 1px solid #efefef;
  padding: 30px;
  padding-top: 30px;
  h3 {
    font-size: 18px;
  }
  ul {
    padding: 16px 0 0;
  }
  li {
    font-size: 16px;
    margin-bottom: 20px;
    &::last-child {
      margin-bottom: 0;
    }
  }
  .van-checkbox {
    font-weight: bold;
  }
  .van-checkbox.active {
    color: rgba(0,0,0,.25);
  }
}
.van-checkbox__label {
  font-size: 14px;
  font-weight: normal;
}
.van-checkbox__icon .van-icon{
  font-size: 0.6em;
  position: relative;
  top: 2px;
}
</style>
