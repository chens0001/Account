<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <ol v-if="result.length > 0">
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title" >{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
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
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang='ts'>
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import intervalList from '@/constants/intervalList';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({components: {Tabs},})
  export default class Statistics extends Vue {
    type = '-'
    interval= 'day'
    intervalList = intervalList
    recordTypeList = recordTypeList

    beforeCreate() {
      this.$store.commit('fetchRecordList')
    }

    tagString(tags: tag[]) {
      return tags.length === 0 ? '无' : tags.map(tag => tag.name).join(',');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return this.$store.state.recordList;
    }
    get result() {
      const {recordList} = this;
      const newList = (clone(recordList) as RecordItem[])
          .filter(r => r.type === this.type)
          .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map((group: { title: string, total?: number, items: RecordItem[] }) => {
        group.total = group.items.reduce((sum, item) => {
          console.log(sum);
          console.log(item);
          return Number(sum) + item.amount;
        }, 0);
      });
      return result;
    }
  };
</script>

<style lang='scss' scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
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
  background-color: rgba(175,184,193,0.2);
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