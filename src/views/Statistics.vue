<template>
  <div class="nav-wrapper">
    <div class="content">
      Statistics.vue
    </div>
    <Nav />
  </div>
</template>

<script lang='ts'>
  export default {
    name: 'Statistics'
  };
</script>

<style lang='scss' scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100Vh;

  .content {
    flex-grow: 1;
    overflow: auto;
    border: 1px solid #ccc;
  }
}
</style>