<template>
  <Layout>
    <div>
      EditLabel
    </div>
    <Notes field-name="标签名" />
    <div>
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {Button, Notes}
})
export default class EditLabel extends Vue{

};
</script>

<style lang='scss' scoped>

</style>