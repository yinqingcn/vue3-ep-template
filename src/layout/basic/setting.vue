<template>
  <div class="flex items-center justify-end h-full">
    <!-- 菜单搜索 -->
    <el-tooltip :content="t('searchMenu')" placement="bottom">
      <icon
        icon="ic:baseline-search"
        width="24"
        class="cursor-pointer outline-none mr-2"
        @click="handleSearchMenu"
      />
    </el-tooltip>
    <!-- 切换主题模式 -->
    <el-tooltip :content="isDark ? t('light') : t('dark')" placement="bottom">
      <icon
        :icon="isDark ? 'ic:baseline-shield-moon' : 'ic:baseline-wb-sunny'"
        width="24"
        class="cursor-pointer outline-none mr-2"
        @click="handleChangeTheme"
      />
    </el-tooltip>
    <!-- 切换语音 -->
    <el-dropdown @command="handleChangeLanguage">
      <span>
        <icon
          icon="ion:language"
          width="24"
          class="cursor-pointer outline-none mr-2"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-cn" :disabled="language === 'zh-cn'">
            简体中文
          </el-dropdown-item>
          <el-dropdown-item command="en" :disabled="language === 'en'">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-avatar :size="30" class="mr-4">
      <template #default> user </template>
    </el-avatar>
    <el-dropdown>
      <span>
        admin
        <icon icon="ic:baseline-arrow-drop-down" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 修改密码 -->
          <el-dropdown-item>{{ t('changePassword') }}</el-dropdown-item>
          <!-- 个人中心 -->
          <el-dropdown-item>{{ t('personalCenter') }}</el-dropdown-item>
          <!-- 退出登录 -->
          <el-dropdown-item divided>
            {{ t('logout') }}
          </el-dropdown-item>
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
      <search-menu :menu-list="menuList" @search-menu="handleChangeMenu" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useDark, useToggle } from '@vueuse/core';
import SearchMenu from './components/searchMenu.vue';
import { MenuModule } from '@/router/types';
import { useI18n } from 'vue-i18n';
import useConfigStore from '@/store/config';

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
    const store = useConfigStore();
    const { t } = useI18n();
    const language = ref('zh-cn');
    const handleChangeLanguage = (command: string) => {
      language.value = command;
      store.setLanguage(command);
    };
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    const dialogVisible = ref(false);
    const handleChangeTheme = () => {
      toggleDark();
    };
    // 搜索菜单
    const handleSearchMenu = () => {
      dialogVisible.value = true;
    };
    // 切换菜单
    const handleChangeMenu = (value: MenuModule) => {
      emit('changeMenu', value);
      dialogVisible.value = false;
    };
    return {
      t,
      language,
      handleChangeLanguage,
      isDark,
      dialogVisible,
      handleChangeTheme,
      handleSearchMenu,
      handleChangeMenu,
    };
  },
});
</script>

<style lang="scss" scoped></style>
<i18n>
  zh-cn:
    searchMenu: 搜索菜单
    dark: 暗黑模式
    light: 明亮模式
    changePassword: 修改密码
    personalCenter: 个人中心
    logout: 退出登录

  en: 
    searchMenu: Search Menu
    dark: Dark Mode
    light: Light Mode
    changePassword: Change Password
    personalCenter: Personal Center
    logout: Logout

</i18n>
