<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu :index="menu.path" v-if="menu?.children">
    <template #title>
      <!-- 需要用el-icon标签包裹起来，否则收起的时候会不显示icon -->
      <el-icon>
        <custom-icon :type="menu?.meta.icon" size="16" class="flex items-center mr-8px" />
      </el-icon>
      <!-- 需要用span包裹起来，否则菜单收起来时样式会有问题 -->
      <span>{{ menu?.meta.title }}</span>
    </template>
    <!-- 递归调用本身 -->
    <SubMenu v-for="item in menu.children" :menu="item" :isCollapse="isCollapse" :key="item.key" />
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item v-else :index="menu?.path">
    <custom-icon :type="menu?.meta.icon" size="16" class="flex items-center mr-8px" />
    <template #title
      ><span>{{ menu?.meta.title }}</span></template
    >
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import customIcon from '@/components/Icon/index.vue'
export default defineComponent({
  name: 'SubMenu',
  components: { customIcon },
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
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
