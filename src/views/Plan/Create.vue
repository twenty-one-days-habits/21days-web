<template>
  <div class="task-create">
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          name="title"
          :disabled="disableEdit"
          v-model="title"
          rows="1"
          autosize
          label="任务名称"
          label-align="top"
          type="textarea"
          placeholder="请输入任务名称"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field  :disabled="disableEdit||taskId"  name="checkInType" label="打卡频次">
          <template #input>
            <van-radio-group
              v-model="checkInType"
              :disabled="disableEdit||taskId"
              direction="horizontal">
              <van-radio name="1">日</van-radio>
              <van-radio name="2">周</van-radio>
              <van-radio name="3">不限</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="checkInType === '1'">
        <van-field :disabled="disableEdit||taskId" name="everyday" label="每天">
          <template #input>
            <van-switch :disabled="disableEdit||taskId"  v-model="everyday" />
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="checkInType === '1' && !everyday">
        <van-field  :disabled="disableEdit||taskId" label-align="top" label="选择需要打卡的天数">
          <template #input>
            <div class="days">
              <span
                class="day"
                :class="{selected: selected.includes(item)}"
                v-for="item in Array(21)
                  .fill(0)
                  .map((v, i) => i + 1)"
                :key="item"
                @click="selectDay(item)"
              >
                第{{ item }}天
              </span>
            </div>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="checkInType === '2'">
        <van-field :disabled="disableEdit||taskId" name="signTypeOfWeek" label="打卡方式">
          <template #input>
            <van-radio-group v-model="signTypeOfWeek"  :disabled="disableEdit||taskId" direction="horizontal">
              <van-radio name="1">按天</van-radio>
              <van-radio name="2">按次数</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="checkInType === '2'">
        <van-field
          v-if="signTypeOfWeek === '1'"
          label-align="top"
          :disabled="disableEdit||taskId"
          label="选择需要打卡的天数"
        >
          <template #input>
            <div class="days">
              <span
                class="day"
                :class="{selected: selected.includes(index)}"
                v-for="(item, index) in daysOfWeek"
                :key="index"
                @click="selectDay(index)"
              >
                {{ item }}
              </span>
            </div>
          </template>
        </van-field>
        <van-field
          v-if="signTypeOfWeek === '2'"
          label="打卡次数"
          input-align="left"
          name="counts"
          :disabled="disableEdit||taskId"
          v-model="counts"
          type="digit"
          placeholder="请输入打卡频次"
        >
          <template #input>&nbsp;<input class="" type="digit" v-model="counts"/>次&nbsp;/&nbsp;周 </template>
        </van-field>
      </van-cell-group>
      <van-cell-group v-if="checkInType === '3'">
        <van-field
          label="打卡频次"
          input-align="left"
          name="counts"
          v-model="counts"
          :disabled="disableEdit||taskId"
          type="digit"
          placeholder="请输入打卡频次"
        >
          <!-- <template #input>共&nbsp;<input class="" type="digit" v-model="counts"/>&nbsp;&nbsp;次 </template> -->
        </van-field>
      </van-cell-group>
      <van-cell-group>
        <van-field
          name="score"
          v-model="score"
          rows="1"
          autosize
          label="每次打卡分值"
          label-align="top"
          :disabled="disableEdit"
          type="text"
          placeholder="请输入分值"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          name="description"
          v-model="description"
          rows="1"
          autosize
          label="任务描述"
          :disabled="disableEdit"
          label-align="top"
          type="textarea"
          placeholder="请输入任务描述"
        />
      </van-cell-group>
      <div class="btn-wrapper">
        <van-button round block type="primary" native-type="submit">
          {{ disableEdit ? '返回' : '提交' }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { createTask,getDetail,editTask } from "../../utils/plan";
import { useRoute } from "vue-router";
import { showToast } from 'vant';
import router from "../../router";
// import SwitchTab from '../../components/SwitchTab.vue';
// import { SwitchItem } from "../../components/interface";
const route = useRoute()
let teamId = route.params.teamId;
let taskId = ref(route.params.taskId)


let disableEdit = ref(route.query.disableEdit === 'true')

const daysOfWeek = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
let checkInType = ref("1");
let title = ref("");
let everyday = ref(false);
let score = ref("");
let description = ref("");
let signTypeOfWeek = ref("0");
let selected:Array<number> = reactive([]);
let counts = ref('');
let days = ref('');
if (taskId.value) {
  getDetail(taskId.value).then(({ data: {data} }) => {
    title.value = data.title;
    everyday.value = +data.everyday === 1
    description.value = data.description
    counts.value = data.counts
    checkInType.value =data.check_in_type + ''
    score.value = data.score
    selected.push(...data.days.split('|').map(item => +item));
    console.log(selected);
  })
}
const selectDay = (item: number) => {
  if(taskId.value) {
    return;
  }
  if(selected.includes(item)) {
    const index = selected.indexOf(item);
    selected.splice(index, 1);
  } else {
    selected.push(item)
  }
  days.value = selected.sort((a,b) => a - b).join('|')
  console.info(days)
}

const onSubmit = async (values: any) => {
  if (!values.title) {
    showToast("请输入任务标题");
    return;
  }
  if (!values.score) {
    showToast("请输入每次打卡分值");
    return;
  }
  if(disableEdit.value) {
    location.replace('#/plan/list')
    return
  }
  let data:any = {
    team_id: teamId,
    title: values.title,
    description: values.description,
  }
  if (taskId.value){
    data.id = taskId.value;
    data.score = +values.score;
    const res = await editTask(data);
    showToast(res?.data?.code === 200 ? '修改成功' : '修改失败');
    if(res?.data?.code === 200) {
      location.replace('#/plan/list')
    }
    return;
  }
  // 打卡频次 1
  if(values.checkInType === '1') {
    // 每天
    data.check_in_type = +values.checkInType;
    data.everyday = values.everyday ? 1 : 0;
    data.score = +values.score;

    if(values.everyday) {
      data = {
        ...data,
        days: '',
      }
    } else {
      data = {
        ...data,
        days: days.value,
      }
    }
    

  } else if(values.checkInType === '3') {
    data = {
      // ...values,
      ...data,
      everyday: 0,
      days: "",
      check_in_type: +values.checkInType,
      counts: +values.counts,
      score: +values.score
    }
  } else if(values.checkInType === '2') {
    data = {
      // ...values,
      ...data,
      everyday: 0,
      days: days.value,
      check_in_type: +values.checkInType,
      counts: +values.counts,
      score: +values.score
    }
  }
  // const data = {
  //   ...values,
  //   team_id: teamId,
  //   everyday: 0,
  //   days: "",
  //   check_in_type: +values.checkInType,
  //   counts: +values.counts,
  //   score: +values.score
  // }
  delete data.checkInType
  const res = await createTask(data);
  showToast(res?.data?.code === 200 ? '创建成功' : '创建失败');
  if(res?.data?.code === 200) {
    location.replace('#/plan/list')
  }
};
</script>
<style lang="scss" scoped>
.task-create {
  height: calc(100vh - 62px);
  overflow: scroll;
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
    margin-top: 40px;
    padding: 0 16px;
    box-sizing: border-box;
  }
}
</style>
