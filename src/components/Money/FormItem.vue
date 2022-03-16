<template>
  <div>
    <label class="formItem">
      <span class="name">{{fieldName}}</span>
      <input type="text" :value="value" @input="onValueChange($event.target.value)" :placeholder=" `在这里输入${fieldName}`">
    </label>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component,Watch, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) value!: string;
  @Prop({required: true}) fieldName!: string;

  onValueChange(value: string) {
    this.$emit('update:value', value)
  }
}
</script>

<style lang='scss' scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>