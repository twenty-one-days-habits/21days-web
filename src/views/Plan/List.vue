<template>
  <div class="plan-list">
    <h1>2022第13期计划</h1>
    <div class="plan-detail">
      <h3>计划还未开始</h3>
      <p>开始时间：2023.03.09 结束时间：2023.01.09</p>
    </div>
    <ul v-if="planList.length">

    </ul>
    <div class="empty" v-else>
      <img src="../../assets/plan/empty.png" alt="">
      <button>创建任务+</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    return {
      planList: []
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
