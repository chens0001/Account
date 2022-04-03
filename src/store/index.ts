import  Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tags: [] as tag[]
  },
  mutations: {
    fetchRecordList (state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      store.state.recordList.push(record2);
      store.commit('saveRecordList')
    },
    saveRecordList(state, ) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state){
      state.tags = JSON.parse(window.localStorage.getItem('tagList') || '[]') as tag[]
    },
    createTag(state, name) {
      const names = state.tags.map(item => item.name);
      if (names.indexOf(name) >= 0) {return 'duplicated';}
      const id = createId().toString();
      state.tags.push({id, name: name});
      store.commit('saveTags')
      return 'success';
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tags));
    },
  }
})
export default store;
