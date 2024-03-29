<template>
  <div class="flex items-center justify-end h-full">
    <div class="setting-icon" @click="handleSearchMenu">
      <i-ep-search />
    </div>
    <div class="setting-icon" @click="handleChangeTheme">
      <icon v-show="!isDark" type="sun" theme="filled" size="18" fill="#409eff" />
      <icon v-show="isDark" type="moon" theme="filled" size="18" fill="#409eff" />
    </div>

    <el-avatar :size="30" class="mr-4">
      <template #default>
        <i-ep-avatar />
      </template>
    </el-avatar>
    <el-dropdown>
      <span>
        admin
        <icon
          type="down-one"
          theme="filled"
          size="16"
          fill="#606266"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog
      v-model="dialogVisible"
      class="search-menu-dialog"
      width="30%"
      :show-close="false"
      destroy-on-close
    >
      <search-menu :menu-list="menuList" @searchMenu="handleChangeMenu" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Icon from '@/components/Icon/index.vue'
import { defineComponent, ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import SearchMenu from './components/searchMenu.vue'
export default defineComponent({
  components: { Icon, SearchMenu },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['changeMenu'],
  setup(_props, { emit }) {
    const isDark = useDark()
    const toggleDark = useToggle(isDark)
    const dialogVisible = ref(false)
    const handleChangeTheme = () => {
      toggleDark()
    }
    // 搜索菜单
    const handleSearchMenu = () => {
      dialogVisible.value = true
    }
    const handleChangeMenu = (value) => {
      emit('changeMenu', value)
      dialogVisible.value = false
    }
    return {
      isDark,
      dialogVisible,
      handleChangeTheme,
      handleSearchMenu,
      handleChangeMenu,
    }
  },
})
</script>

<style lang="scss" scoped>
.setting-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  height: 100%;

  &:hover {
    background: var(--next-hover-bg-color);

    svg,
    span {
      animation: logoAnimation 0.3s ease-in-out;
    }
  }

  span {
    margin-top: 6px;
  }
}

:deep(.search-menu-dialog .el-dialog__header) {
  display: none;
}

:deep(.search-menu-dialog .el-dialog__body) {
  padding: 0;

  .el-input__inner {
    height: 40px;
  }
}
</style>
