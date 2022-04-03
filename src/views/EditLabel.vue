<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" @click.native="goBack" name="left" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" @update:value="update" :value="tag.name"/>
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue{

  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit('fetchTags')
    const id = this.$route.params.id;
    this.$store.commit('findTag', id)
  }

  update(name: string) {
    if (this.tag) {
     this.$store.commit('updateTag', {id: this.$route.params.id, name});
    }
  }

  removeTag(id: string) {
    if (this.tag) {
      this.$store.commit('removeTag', id);
    }
  }
};
</script>

<style lang='scss' scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>