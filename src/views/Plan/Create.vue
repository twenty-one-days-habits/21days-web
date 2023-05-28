<template>
  <div class="task-create">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="name"
          rows="1"
          autosize
          label="任务名称"
          label-align="top"
          type="textarea"
          placeholder="请输入任务名称"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field name="radio" label="打卡频次">
          <template #input>
            <van-radio-group v-model="frequencyType" direction="horizontal">
              <van-radio name="1">日</van-radio>
              <van-radio name="2">周</van-radio>
              <van-radio name="0">不限</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="frequencyType === '1'">
        <van-field name="radio" label="每天">
          <template #input>
            <van-switch v-model="isDay" />
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="frequencyType === '1' && !isDay">
        <van-field label-align="top" label="选择需要打卡的天数">
          <template #input>
            <div class="days">
              <span
                class="day"
                :class="{selected: selected.includes(item + '')}"
                v-for="item in Array(21)
                  .fill(0)
                  .map((v, i) => i + 1)"
                :key="item"
                @click="selectDay(item + '')"
              >
                第{{ item }}天
              </span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="frequencyType === '2'">
        <van-field name="radio" label="打卡方式">
          <template #input>
            <van-radio-group v-model="signTypeOfWeek" direction="horizontal">
              <van-radio name="1">按天</van-radio>
              <van-radio name="2">按频次</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="frequencyType === '2'">
        <van-field
          v-if="signTypeOfWeek === '1'"
          label-align="top"
          label="选择需要打卡的天数"
        >
          <template #input>
            <div class="days">
              <span
                class="day"
                :class="{selected: selected.includes(item)}"
                v-for="(item, index) in daysOfWeek"
                :key="index"
                @click="selectDay(item)"
              >
                {{ item }}
              </span>
            </div>
          </template>
        </van-field>
        <van-field
          v-if="signTypeOfWeek === '2'"
          label="填写打卡频次"
          input-align="left"
        >
          <template #input>共&nbsp;<input class="" type="text" v-model="times"/>&nbsp;/&nbsp;周 </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="frequencyType === '0'">
        <van-field
          label="填写打卡频次"
          input-align="left"
        >
          <template #input>共&nbsp;<input class="" type="text" v-model="times"/>&nbsp;/&nbsp;次 </template>
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="score"
          rows="1"
          autosize
          label="分值"
          label-align="top"
          type="text"
          placeholder="请输入分值"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="desc"
          rows="1"
          autosize
          label="任务描述"
          label-align="top"
          type="textarea"
          placeholder="请输入任务描述"
        />
      </van-cell-group>
      <div class="btn-wrapper">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
// import SwitchTab from '../../components/SwitchTab.vue';
import { SwitchItem } from "../../components/interface";

const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
let frequencyType = ref("1");
let name = ref("");
let isDay = ref(false);
let score = ref("");
let desc = ref("");
let signTypeOfWeek = ref("0");
let selected:Array<string> = reactive([]);
let times = ref('');

const selectDay = (item: string) => {
  if(selected.includes(item)) {
    const index = selected.indexOf(item);
    selected.splice(index, 1);
  } else {
    selected.push(item)
  }
}

const onSubmit = (values: any) => {
  console.info(values);
};
</script>
<style lang="scss" scoped>
.task-create {
  .days {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    // justify-content: space-between;
  }
  .day {
    background-color: rgba(87, 118, 242, 0.1);
    color: $blue;
    border-radius: 4px;
    width: 56px;
    box-sizing: border-box;
    text-align: center;
    font-size: 11px;
    &.selected {
      background-color: $blue;
      color: #fff;
    }
  }
  input {
    border: none;
    width: 40px;
    border: 1px solid #f2f3f2;
    border-radius: 4px;
    padding: 0 4px;
  }
  .btn-wrapper {
    margin: 100px 0;
    padding: 0 16px;
    box-sizing: border-box;
  }
}
</style>
