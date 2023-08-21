<script setup lang="ts">
import tab from './components/Tab.vue'
import 'vant/es/toast/style';
window.onresize = () => {
 document.getElementById('app')!.style!.height = window.innerHeight + 'px';
 setFontSize();     
}
const setFontSize = () => {
  let num =  document.documentElement.clientWidth / 100
  if (window.innerWidth < 1000) {
    document.documentElement.style.fontSize = num + 'px';
  } else {
    document.documentElement.style.fontSize = '4.5px';
  }
}
setFontSize();
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
