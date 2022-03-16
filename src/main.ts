import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/modles/tagListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Icon',Icon);
Vue.component('Layout', Layout);


// @ts-ignore
window.tagList = tagListModel.fetch();
//@ts-ignore
window.findTag = (id) => {
  // @ts-ignore
  return window.tagList.find( t => t.id === id)[0];
}
// @ts-ignore
window.createTag = (name: string) => {
  const msg = tagListModel.create(name);
  if(msg === 'duplicated') {
    window.alert('标签名重复')
  } else if(msg === 'success') {
    window.alert('添加成功')
  }
}
//@ts-ignore
window.updateTag = (name: string, id: string) => {
  return tagListModel.update(id, name);
}
//@ts-ignore
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
