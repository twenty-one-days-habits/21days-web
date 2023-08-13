<template>
  <div class="plan-list">
    <van-loading size="24px" type="spinner" v-if="loading">加载中...</van-loading>
    <h1 v-if="curTeam.name">{{ curTeam.name }}</h1>
    <div class="plan-detail" v-if="curTeam.name">
      <!-- <chart class="plan-detail_chart" v-if="isStarted"/> -->
      <van-circle
        v-if="isStarted"
        class="plan-detail_chart"
        v-model:current-rate="currentRate"
        :rate="pastDays/21*100"
        :speed="100"
        stroke-width="100"
        size="38px"
        color="#3F8CFF"
        layer-color="rgba(125, 133, 146, 0.2)"
      />
      <div class="plan-detail_info">
        <h3>{{ pastDays >= 0 ? `第${pastDays + 1}天` : "计划还未开始" }}</h3>
        <p>开始时间：{{ $filters.dateFormat(curTeam.start, 'yyyy.MM.dd') }} 结束时间：{{ $filters.dateFormat(curTeam.end, 'yyyy.MM.dd') }}</p>
      </div>
    </div>
    <div class="create-button" @click="createPlan" v-if="curTeam.id&&!isStarted"></div>
    <ul v-if="showType === 1">
      <li v-for="(plan, index) in planList" :key="plan.id" :style="{backgroundColor: colors[index % colors.length]}" @click="toDetail(plan)">
        <h3>{{ plan.title }}</h3>
        <p>{{ plan.description ? plan.description : '暂无描述' }}</p>
        <div class="create-arrow">
          <van-icon name="arrow" size="20" color="#fff"/>
        </div>
      </li>
    </ul>
    <div class="empty" v-if="showType === 2">
      <!-- <img src="../../assets/empty.png" alt="" />
      <p>你还没有创建任务哦，抓紧时间创建吧！</p> -->
      <Empty :text="curTeam.id ? '你还没有创建任务哦，抓紧时间创建吧！' : '你还没有加入任何团队，<br/>点击我的团队去加入或者创建团队吧！'" />
      <button v-if="curTeam.id" @click="createPlan">创建任务 +</button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import Chart from "../../components/Chart.vue";
import { getTasksList, getMyTeams } from "../../utils/plan";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'
import { Team, Plan } from '../../interface/plan';
import { Ref } from "vue";
import Empty from '../../components/Empty.vue'

const colors = ['#FFAA00', '#5776F2', '#3DB6FC', '#753ECF'];

interface PlanResponse {
  code: Number;
  message: String;
  data: any;
}

export default defineComponent({
  components: {
    Chart,
    Empty
  },
  computed: {
    text() {
      return this.currentRate.toFixed(2) + "%";
    },
  },
  data() {
    return {
      loading: false
    };
  },
  async mounted() {
    this.loading = true
    const res1 = await getMyTeams();
    // 优先获取当前团队的id 没有的话 再获取未开始的团队计划的id
    if(!res1?.data?.data?.current_team?.length) {
      const noStart = res1.data.data.teams.find(item => {
        return new Date(item.start).getTime() > new Date().getTime()
        })
          console.log(noStart)
        // 有未开始的团队计划
        if (noStart) {
          this.curTeam  = noStart;
        } else {
          this.showType = 2
          return
        }
    } else {
      this.curTeam  = res1.data.data.current_team?.[0] as Team;
    }
    this.loading = false
    const startTime = new Date(this.curTeam.start);
    console.log(startTime, this.curTeam.start);
    this.pastDays = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 86400000
    );
    console.log(this.pastDays)
    this.isStarted = this.pastDays >= 0;
    this.currentRate = this.pastDays / 21;

    if (this.curTeam) {
      const teamId = this.curTeam.id;
      const userId = localStorage.userId;
      const res: any = await getTasksList(teamId, userId);
      if (res?.data?.code === 200) {
        this.planList.push(...(res?.data?.data || []));
        this.showType = this.planList?.length > 0 ? 1 : 2;
      }
    }

    // const res = await getAllPlans(teamId, userId, {
    //   date: ''
    // });
    // console.info(res)
  },
  methods: {
    createPlan () {
      console.info('当前队伍id', this.curTeam.id);
      // location.href = "#/plan/create";
      this.toPlanCreate(this.curTeam.id)
    },
  },
  setup() {
    let planList: Ref<Array<Plan>> = ref([] as Array<Plan>);
    let curTeam: Ref<Team> = ref({} as Team);
    const router = useRouter()
    const showType = ref(0)

    const toPlanCreate = (teamId:string) => {
      router.push({
        path: `/plan/create/${teamId}`
      })
    }

    // const 

    const isStarted = ref(false);
    const pastDays = ref(0);
    const currentRate = ref(0);
      const toDetail = (plan) => {
      console.log(isStarted.value)
      router.push({
        path: `/plan/detail/${plan.id}`,
        query: {
          disableEdit: isStarted.value + ''
        }
      })
    }
    return {
      currentRate,
      pastDays,
      isStarted,
      planList,
      curTeam,
      colors,
      toPlanCreate,
      showType,
      toDetail
      // createPlan,
    };
  },
});
</script>
<style lang="scss" scoped>
.create-arrow {
  position: absolute;
  right: 16px;
  top: 23px;
  opacity: 0.8;
}
.plan-list {
  padding: 16px 16px 0;
  min-height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;


  h1 {
    /** 文本1 */
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    margin-bottom: 22px;
  }
  .plan-detail {
    /** 文本1 */
    font-size: 15px;
    color: rgba(10, 22, 41, 1);
    border-radius: 14px;
    background-color: rgba(244, 249, 253, 1);
    padding: 16px 10px 16px 12px;
    display: flex;
    align-items: center;

    &_chart {
      margin-right: 10px;
      color: red;
    }
    h3 {
      font-size: 15px;
    }

    p {
      /** 文本1 */
                 font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 8px;
      word-break: break-all;
    }
  }

  ul {
    padding: 27px 12px;
    li {
      color: #fff;
      padding: 13px 27px;
      font-size: 12px;
      background-color: rgba(255, 170, 0, 1);
      // box-shadow: 2px 8px 20px 0px rgba(222, 148, 0, 0.4);
      border-radius: 8px;
      position: relative;
      h3 {
        font-size: 14px;
        margin-bottom: 8px;
      }
    }
  }

  .create-button {
    display: inline-block;
    color: #fff;
    font-size: 20px;
    border-radius: 211px;
    text-align: center;
    // width: 50px;
    // height: 50px;
    // line-height: 50px;
    width: 46px;
    height: 46px;
    background: rgba(87, 118, 242, 1);
    box-shadow: 0px 10px 14px 0px rgba(46, 51, 54, 0.2);
    position: fixed;
    bottom: 60px;
    z-index: 11;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: '';
      display: block;
      width: 26px;
      height: 2px;
      background: #fff;
      position: absolute;
      top: 22px;
      left: 11px;
    }
    &::after {
      content: '';
      display: block;
      height: 26px;
      width: 2px;
      background: #fff;
      position: absolute;
      left: 22px;
      top: 11px;
    }
  }

  .empty {
    text-align: center;

    button {
      color: #fff;
      width: 144px;
      height: 5px;
      opacity: 1;
      font-size: 18px;
      border-radius: 8px;
      background: rgba(164, 107, 255, 1);
      margin-top: 38px;
      font-weight: 400;
    }
  }
}

ul li {
  margin-bottom: 10px;
}
</style>
