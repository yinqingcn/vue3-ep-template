<template>
  <div class="column-aside w-70px p-4px overflow-hidden relative">
    <div
      :class="[
        'flex flex-col items-center text-sm menu-list h-52px py-4px',
        { 'column-aside-active': item.key === currentKey },
      ]"
      v-for="item in dataSource"
      :key="item.key"
      @click="handleClickMenu(item)"
      :title="item.meta?.title"
    >
      <icon :type="item.meta?.icon" theme="outline" size="24" />
      <span class="menu-title">{{ item.meta?.title }}</span>
    </div>
    <div v-show="currentKey" class="column-round" :style="columnRoundStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import type { MenuModule } from '@/router/types'
import Icon from '@/components/Icon/index.vue'
export default defineComponent({
  components: { Icon },
  props: {
    dataSource: {
      type: Array as PropType<Array<MenuModule>>,
      default: () => [],
    },
    defaultSelectKey: {
      type: [String, Number],
      default: '1',
    },
  },
  emits: ['clickMenu'],
  setup(props, { emit }) {
    const currentKey = ref('')
    const handleClickMenu = (item: any) => {
      currentKey.value = item.key
      emit('clickMenu', item)
    }
    const columnRoundStyle = computed(() => {
      const currentIndex = props.dataSource.findIndex((item) => item.key === currentKey.value)
      return {
        top: `${currentIndex * 58}px`,
      }
    })
    return {
      currentKey,
      handleClickMenu,
      columnRoundStyle,
    }
  },
})
</script>

<style lang="scss" scoped>
.menu-list {
  cursor: pointer;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: var(--next-color-primary);
  }

  .menu-title {
    display: inline-block;
    text-align: center;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.column-aside-active {
    color: #e6e6e6 !important;
    transition: 0.3s ease-in-out;
    z-index: 1;
  }
}

.column-round {
  position: absolute;
  background-color: var(--next-color-primary);
  z-index: 0;
  transition: 0.3s ease-in-out;
  border-radius: 5px;
  height: 58px;
  width: 65px;
}
</style>
