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
        <li v-for="item in todayPlans" :key="item.time">
          <van-checkbox 
            v-model="item.checked"
            shape="square"
            @click="handleClick($event, item)">
            {{ item.name }}（{{item.time }}）
          </van-checkbox>
        </li>
      </ul>
      <hr/>
      <h3>周期任务</h3>
      <ul>
        <li v-for="item in otherPlans" :key="item.time">
          <van-checkbox
            v-model="item.checked"
            shape="square"
            @click="item.checked = !item.checked">
            {{ item.name }}（{{item.time }}）
          </van-checkbox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Ref, ref } from "vue";
interface planItem {
  name: string;
  time: number;
  checked: boolean
}

let todayPlans = ref([
  {
    name: '学习',
    checked: true,
    time: 11111
  },
  {
    name: '吃早饭',
    checked: false,
    time: 1111
  }, {
    name: '画画',
    checked: false,
    time: 1112
  }
]);

let otherPlans = ref([
  {
    name: '学习',
    checked: false,
    time: 11111
  },
  {
    name: '吃早饭',
    checked: false,
    time: 1111
  }, {
    name: '画画',
    checked: false,
    time: 1112
  }
])

const handleClick = (e: HTMLElement, item: planItem) => {
  item.checked = !item.checked
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