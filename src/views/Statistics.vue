<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" height="48px" :data-source="intervalList" :value.sync="interval" />
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>

          <li v-for="item in group.items"
              class="record"
          >
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}} </span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';

  @Component({components: {Tabs},})
  export default class Statistics extends Vue {
    type = '-'
    interval= 'day'
    intervalList = intervalList
    recordTypeList = recordTypeList

    beforeCreate() {
      this.$store.commit('fetchRecordList')
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.join(',');
    }

    get recordList() {
      return this.$store.state.recordList;
    }
    get result() {
      type hashTableValue = { title: string, items: RecordItem[]}
      const { recordList } = this;
      const hashTable: {[key: string]:hashTableValue} = {};
      for(let i=0; i< recordList.length; i++) {
        const [date, time] = recordList[i].createdAt!.split('T');
        hashTable[date] = hashTable[date] || {title: date, items: []};
        hashTable[date].items.push(recordList[i]);
      }
      return hashTable;
    }
  };
</script>

<style lang='scss' scoped>
::v-deep {
  .interval-tabs-item {
    height: 48px;
  }
  .type-tabs-item {
    background: white;
    &.selected {
      background: #C4C4C4;
      &::after {
        display: none;
      }
    }
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

</style>