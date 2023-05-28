<template>
  <div class="plan-list">
    <h1>2022第13期计划</h1>
    <div class="plan-detail">
      <chart class="plan-detail_chart" v-if="isStarted"/>
      <div class="plan-detail_info">
        <h3>{{isStarted ? '已用天数：xx天' : '计划还未开始'}}</h3>
        <p>开始时间：2023.03.09 结束时间：2023.01.09</p>
      </div>
    </div>
    <ul v-if="planList.length">
      <li v-for="plan in planList" :key="plan.id">
        <h3>{{plan.title}}</h3>
        <p>{{plan.desc}}</p>
      </li>
    </ul>
    <div class="empty" v-else>
      <img src="../../assets/plan/empty.png" alt="">
      <button>创建任务+</button>
    </div>
  </div>
</template>

<script lang="ts">
import chart from '../../components/Chart.vue';

export default {
  components: {
    chart
  },
  setup() {
    const mockPlanList = [
      {
        id: 1,
        title: '学习英语',
        desc: '进行英语学习'
      }
    ]
    return {
      isStarted: true,
      planList: mockPlanList
    }
  }
}
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
