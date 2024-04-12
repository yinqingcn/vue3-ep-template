<template>
  <el-menu
    :default-active="defaultActive"
    :mode="mode"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelectMenu"
  >
    <sub-menu v-for="item in dataSource" :key="item.key" :menu="item" />
  </el-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import SubMenu from './subMenu.vue';
import type { MenuModule } from '@/router/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'VerticalMenu',
  components: { SubMenu },
  props: {
    dataSource: {
      type: Array as PropType<Array<MenuModule>>,
      default: () => [],
    },
    isCollapse: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
    defaultActive: {
      type: String,
      default: '',
    },
  },
  emits: ['selectMenu'],
  setup(_props, { emit }) {
    const route = useRoute();
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    const handleSelectMenu = (key: string) => {
      emit('selectMenu', key);
    };
    return {
      route,
      handleOpen,
      handleClose,
      handleSelectMenu,
    };
  },
});
</script>
