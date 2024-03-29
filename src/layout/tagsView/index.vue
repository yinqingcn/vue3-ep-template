<template>
  <ul class="flex items-center">
    <li :class="['tag-item', { 'is-active': tag.path === defaultActive }]" v-for="tag in tags" :key="tag.path"
      @click="handleClickTag(tag)">
      {{ tag.title }}
      <icon v-show="tag.closable" class="close-icon ml-4px" type="close-small" theme="outline" size="14"
        :color="tag.path === defaultActive ? '#409eff' : '#333'" @click.stop="handleDeleteTag(tag)"></icon>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import Icon from '@/components/Icon/index.vue'

  export default defineComponent({
    components: { Icon },
    props: {
      data: {
        type: Array,
        default: () => [],
      },
      defaultActive: {
        type: String,
        default: '',
      },
    },
    emits: ['clickTag', 'deleteTag'],
    setup(props, { emit }) {
      const tags = computed(() => {
        return props.data.map((item, index) => {
          const { title, path } = item
          return {
            title,
            path,
            closable: index !== 0,
          }
        })
      })
      const handleClickTag = (item : any) => {
        emit('clickTag', item.path)
      }
      const handleDeleteTag = (item : any) => {
        emit('deleteTag', item.path)
      }
      return {
        tags,
        handleClickTag,
        handleDeleteTag,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .tag-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    display: flex;
    align-items: center;
    border: 1px solid var(--el-border-color-lighter);
    padding: 0 15px;
    margin-right: 5px;
    border-radius: 2px;
    position: relative;
    z-index: 0;
    cursor: pointer;
    justify-content: space-between;
    font-size: 12px;

    &:hover {
      border-color: var(--next-border-color);
      color: var(--next-color-primary);
      background-color: var(--next-light-bg-color);
    }

    .close-icon {
      border-radius: 50%;
      display: inline-block;
      height: 14px;
      line-height: 14px;

      &:hover {
        background: var(--next-color-primary);
        color: var(--next-color-white);
      }
    }

    &.is-active {
      color: var(--next-color-white);
      background: var(--next-color-primary);
      border-color: var(--next-color-primary);
      transition: border-color 3s ease;

      .close-icon:hover {
        background: var(--next-color-white);
        color: var(--next-color-primary);
      }
    }
  }
</style>
