<template>
  <div class="flex items-center">
    <div
      v-show="showExpandIcon"
      class="expand-icon cursor-pointer pt-4px"
      @click="handleToggleMenuIcon"
    >
      <icon type="menu-unfold-one" v-show="!isCollapse" size="24" theme="filled" />
      <icon type="menu-fold-one" v-show="isCollapse" size="24" theme="filled" />
    </div>
    <breadcrumb v-show="showBreadcrumb" :list="breadcrumbList" />
    <setting class="flex-1" :menu-list="menuList" @changeMenu="handleChangeMenu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from './breadcrumb.vue'
import Setting from './setting.vue'
import Icon from '@/components/Icon/index.vue'

export default defineComponent({
  components: { Breadcrumb, Setting, Icon },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    showExpandIcon: {
      type: Boolean,
      default: true,
    },
    showBreadcrumb: {
      type: Boolean,
      default: true,
    },
    breadcrumbList: {
      type: Array,
      default: () => [],
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['collapse', 'changeMenu'],
  setup(_props, { emit }) {
    const handleToggleMenuIcon = () => {
      emit('collapse')
    }
    const handleChangeMenu = (value) => {
      emit('changeMenu', value)
    }
    return {
      handleToggleMenuIcon,
      handleChangeMenu,
    }
  },
})
</script>

<style></style>
