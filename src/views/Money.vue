<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="type" />
    <Notes field-name="备注" @update:value="onUpdateNotes"/>
    <Tags />
  </Layout>
</template>
<script  lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Notes from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Tags, Notes, NumberPad},
})
export default class Money extends  Vue{
  type = '-'
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: '0'
  };
  recordTypeList = recordTypeList
  get recordList() {
    return this.$store.state.recordList
  }
  mounted() {
    console.log(recordTypeList)
    this.$store.commit('fetchTags')
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  saveRecord() {
    this.$store.commit('createRecord', this.record)
  }
}
</script>

<style lang='scss'>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>