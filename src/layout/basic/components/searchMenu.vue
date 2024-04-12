<template>
  <el-tree-select
    ref="treeSelectRef"
    v-model="value"
    :data="menuTree"
    node-key="path"
    default-expand-all
    default-first-option
    placeholder="菜单搜索:支持中文、路由路径"
    class="w-full"
    filterable
    :filter-node-method="filterNode"
    @change="handleSelectMenu"
  >
    <template #default="{ node }">
      <div class="flex items-center">
        <div class="inline-block">
          <Icon
            :icon="node?.data?.meta?.icon"
            size="16"
            class="inline-block mr-8px mt-2px"
          />
        </div>
        <span class="-mt-2px">{{ node.label }}</span>
      </div>
    </template>
  </el-tree-select>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { cloneDeep } from 'lodash-es';
import { Icon } from '@iconify/vue';
export default defineComponent({
  name: 'SearchMenu',
  components: { Icon },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['searchMenu'],
  setup(props, { emit }) {
    const value = ref('');
    const treeSelectRef = ref();
    const formatTree = (list) => {
      list.forEach((item) => {
        item.label = item.meta.title;
        if (item.children && item.children.length) {
          formatTree(item.children);
        }
      });
      return list;
    };
    const menuTree = computed(() => {
      return formatTree(cloneDeep(props.menuList));
    });
    const getReturnNode = (node, _array, value) => {
      let isPass =
        (node.data &&
          node.data.label &&
          node.data.label.toUpperCase().indexOf(value.toUpperCase().trim()) !==
            -1) ||
        (node.data &&
          node.data.path &&
          node.data.path.toUpperCase().indexOf(value.toUpperCase().trim()) !==
            -1);
      isPass ? _array.push(isPass) : '';
      if (!isPass && node.level != 1 && node.parent) {
        getReturnNode(node.parent, _array, value);
      }
    };
    const filterNode = (value, data, node) => {
      if (!value) {
        return true;
      }
      let _array = []; //这里使用数组存储 只是为了存储值。
      getReturnNode(node, _array, value);
      let result = false;
      _array.forEach((item) => {
        result = result || item;
      });
      return result;
    };
    const handleSelectMenu = (value) => {
      emit('searchMenu', value);
    };
    return {
      value,
      treeSelectRef,
      menuTree,
      filterNode,
      handleSelectMenu,
    };
  },
});
</script>

<style lang="scss" scoped></style>
