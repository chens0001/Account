<template>
  <nav>
    <router-link class="item" to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link class="item" to="/labels" >
      <Icon name="label" />
      标签
    </router-link>
    <router-link class="item" to="/statistics">
      <Icon name="chart" />
      统计
    </router-link>
  </nav>
</template>

<script lang='ts'>
export default {
  name: 'Nav'
};
</script>

<style lang='scss' scoped>
 nav {
   display: flex;
   box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
   font-size: 14px;
   > .item {
     .icon {
       width: 30px;
       height: 30px;
     }
     padding: 2px 0;
     width: 33.3333%;
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
   }
 }
</style>