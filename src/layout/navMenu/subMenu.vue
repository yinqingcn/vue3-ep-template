<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu v-if="menu?.children" :index="menu.path">
    <template #title>
      <div class="flex items-center justify-center mr-2">
        <Icon :icon="menu?.meta.icon" width="24px" height="24px" />
      </div>
      <!-- 需要用span包裹起来，否则菜单收起来时样式会有问题 -->
      <span>{{ t(menu?.meta.title) }}</span>
    </template>
    <!-- 递归调用本身 -->
    <SubMenu
      v-for="item in menu.children"
      :key="item.key"
      :menu="item"
      :isCollapse="isCollapse"
    />
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item v-else :index="menu?.path">
    <div class="flex items-center justify-center mr-2">
      <Icon :icon="menu?.meta.icon" width="24px" height="24px" />
    </div>
    <template #title>
      <span>{{ t(menu?.meta.title) }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SubMenu',
  components: { Icon },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    menu: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>

<style lang="scss" scoped></style>
