<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"/>
    <Types @update:value="onUpdateType"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>
<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: string
}

@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends  Vue{
  tags = ['吃', '喝', '玩', '乐', '酒店'];
  record: Record = {
    tags: [], notes: '', type: '-', amount: '0'
  };

  updated() {
    console.log(this.record)
  }

  onUpdateTags(value: string) {
    console.log(value)
  }
  onUpdateNotes(value: string) {
    console.log(value)
  }
  onUpdateType(value: string) {
    console.log('11')
    console.log(value)
  }
}
</script>

<style lang='scss'>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>