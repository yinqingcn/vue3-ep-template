<template>
  <div class="flex items-center">
    <icon
      v-show="showExpandIcon"
      :icon="isCollapse ? 'ep:expand' : 'ep:fold'"
      width="20"
      class="cursor-pointer"
      @click="handleToggleMenuIcon"
    />
    <breadcrumb v-show="showBreadcrumb" :list="breadcrumbList" />
    <setting
      class="flex-1"
      :menu-list="menuList"
      @change-menu="handleChangeMenu"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumb from './breadcrumb.vue';
import Setting from './setting.vue';
import { Icon } from '@iconify/vue';

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
      emit('collapse');
    };
    const handleChangeMenu = (value) => {
      emit('changeMenu', value);
    };
    return {
      handleToggleMenuIcon,
      handleChangeMenu,
    };
  },
});
</script>

<style></style>
