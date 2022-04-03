import  Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex)

type rootState = {
  recordList : RecordItem[]
  tags: tag[]
  currentTag?: tag
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tags: [],
    currentTag: undefined
  } as rootState,
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
    findTag(state, id: string) {
      state.currentTag = state.tags.filter(t => t.id === id)[0];
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].id === id) {
          index = i;
          break;
        }
      }
      if(index >= 1) {
        state.tags.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败')
      }
    },
    updateTag(state, tag: tag) {
      const idList = state.tags.map(item => item.id);
      if (idList.indexOf(tag.id) >= 0) {
        const names = state.tags.map(item => item.name);
        if (names.indexOf(tag.name) >= 0) {
          return 'duplicated';
        } else {
          const tagItem = state.tags.filter(item => item.id === tag.id)[0];
          tagItem.name = tag.name;
          store.commit('saveTags')
        }
      } else {
        return 'not found';
      }
    },
  }
})
export default store;
