<template>
  <div class='empty-wrapper'>
    <img src="@/assets/empty.png" alt="" />
    <p>{{ text }}</p>
  </div>
</template>

<script>

export default {
  props: {
    text: {
      type: String,
      default: '您今天没有可执行的任务！'
    }
  }
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.empty-wrapper {
  text-align: center;
  padding-top: 30px;
}
</style>