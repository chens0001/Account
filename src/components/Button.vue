<template>
  <button
      class="createTag"
      @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang='ts'>
export default {
  name: 'Button'
};
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/helper.scss";
.createTag {
  background: $color-highlight;
  color: white;
  border-radius: 10px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>