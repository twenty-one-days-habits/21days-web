<template>
  <div class="plan-list">
    <h1>{{ curTeam.name }}</h1>
    <div class="plan-detail">
      <!-- <chart class="plan-detail_chart" v-if="isStarted"/> -->
      <van-circle
        v-if="isStarted"
        class="plan-detail_chart"
        v-model:current-rate="currentRate"
        :rate="30"
        :speed="100"
      />
      <div class="plan-detail_info">
        <h3>{{ pastDays ? `已用天数：${pastDays}天` : "计划还未开始" }}</h3>
        <p>开始时间：{{ curTeam.start }} 结束时间：{{ curTeam.end }}</p>
      </div>
    </div>
    <ul v-if="planList.length">
      <li v-for="plan in planList" :key="plan.id">
        <h3>{{ plan.title }}</h3>
        <p>{{ plan.desc }}</p>
      </li>
    </ul>
    <div class="empty" v-else>
      <img src="../../assets/plan/empty.png" alt="" />
      <button @click="createPlan">创建任务+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import Chart from "../../components/Chart.vue";
import { getAllPlans, getMyTeams } from "../../utils/plan";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'

interface PlanResponse {
  code: Number;
  message: String;
  data: any;
}

export default defineComponent({
  components: {
    Chart,
  },
  computed: {
    text() {
      return this.currentRate.toFixed(2) + "%";
    },
  },
  async mounted() {
    const res1 = await getMyTeams();
    console.info(res1);
    this.curTeam = res1.data.current_team?.[0];
    const startTime = new Date(this.curTeam.start);
    this.pastDays = Math.floor(
      (new Date().getTime() - startTime.getTime()) / 86400000
    );
    console.info(startTime, this.pastDays);
    this.isStarted = this.pastDays >= 0;
    this.currentRate = this.pastDays / 21;

    console.info(this.isStarted);
    if (this.curTeam) {
      const teamId = this.curTeam.id;
      const userId = localStorage.userId;
      const { data, code }: any = await getAllPlans(teamId, userId, {
        date: "",
      });
      console.info(data);
      if (code === 200) {
        this.planList.push(...data);
      }
      console.info(this.planList);
    }

    // const res = await getAllPlans(teamId, userId, {
    //   date: ''
    // });
    // console.info(res)
  },
  methods: {
    createPlan () {
      // location.href = "#/plan/create";
      this.$router.push({
        path: `/plan/create/${this.curTeam.id}`
      })
    }
  },
  setup() {
    let planList = ref([]);
    let curTeam = ref([]);
    // const router = useRouter()

    // const 

    const isStarted = ref(false);
    const pastDays = ref(0);
    const currentRate = ref(0);

    return {
      currentRate,
      pastDays,
      isStarted,
      planList,
      curTeam,
      // createPlan,
    };
  },
});
</script>
<style lang="scss" scoped>
.plan-list {
  padding: 16px;

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
    padding: 20px;
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
    }
  }

  ul {
    padding: 27px 12px;
    li {
      color: #fff;
      padding: 13px 27px;
      font-size: 12px;
      background-color: rgba(255, 170, 0, 1);
      box-shadow: 2px 8px 20px 0px rgba(222, 148, 0, 0.4);
      border-radius: 8px;

      h2 {
        font-size: 14px;
      }
    }
  }

  .empty {
    text-align: center;
    padding-top: 12px;

    button {
      color: #fff;
      width: 144px;
      height: 57px;
      opacity: 1;
      font-size: 18px;
      border-radius: 8px;
      background: rgba(164, 107, 255, 1);
      margin-top: 38px;
      font-weight: 400;
    }
  }
}
</style>
