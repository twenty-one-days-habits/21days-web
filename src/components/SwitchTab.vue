<template>
  <div class="switch">
    <span
      v-for="item in options"
      class="switch-item"
      :class="{selected: item.value === selected}"
      :key="item.value"
      @click="handleClick(item)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { SwitchItem } from './interface';
// import { defineComponent } from 'vue';

// export default defineComponent({


const props = defineProps<{
  selected: string,
  options: Array<SwitchItem>
}>();

console.info(props.options)

const emit = defineEmits(["select"]);

const handleClick = (item: SwitchItem) => {
  emit("select", item);
}

// })
</script>
<style lang="scss" scoped>
.switch {
  height: 30px;
  line-height: 30px;
  color:  rgba(87, 118, 242, 1);
  font-size: 14px;
  background-color: rgba(87, 118, 242, .1);
  border-radius: 4px;
  display: inline-block;
  &-item {
    // padding: 10px;
    padding: 0 10px;
    border-radius: 4px;
    display: inline-block;
    &.selected {
      color: #fff;
      background-color: rgba(87, 118, 242, 1);
    }
  }
  
}
</style> 