<script setup lang="ts">
import tab from './components/Tab.vue'
import 'vant/es/toast/style';
window.onresize = () => {
 document.getElementById('app')!.style!.height = window.innerHeight + 'px';       
}
</script>

<template>
  <div class="content"><router-view></router-view></div>
  <tab></tab>
</template>

<style>
#app {
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: auto;
}

</style>
