<template>
  <nav>
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" >
      <Icon name="label" />
      标签
    </router-link>
    <router-link to="/statistics">
      <Icon name="chart" />
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
import x from '@/assets/icons/label.svg';
console.log(x)
export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>

</style>