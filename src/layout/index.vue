<template>
  <el-container class="w-full h-full">
    <el-aside
      :class="[
        'layout-aside duration-300 ease',
        { 'aside-collapse': isCollapse },
      ]"
    >
      <el-scrollbar class="h-full">
        <layout-menu
          :is-collapse="isCollapse"
          :data-source="MenuData"
          :default-active="defaultActive"
          @select-menu="handleSelectMenu"
        />
      </el-scrollbar>
    </el-aside>
    <el-container class="is-vertical">
      <div class="main-header">
        <layout-header
          class="h-50px px-16px"
          :show-logo="false"
          :is-collapse="isCollapse"
          :breadcrumb-list="breadcrumbList"
          :menu-list="MenuData"
          @collapse="handleCollapse"
          @change-menu="handleSelectMenu"
        />
        <tags-view
          class="tags-view py-8px px-16px"
          :data="tagsViewList"
          :default-active="defaultActive"
          @click-tag="handleSelectMenu"
          @delete-tag="handleDeleteTag"
        />
      </div>
      <el-main>
        <el-scrollbar>
          <router-view v-slot="{ Component }" :key="route.fullPath">
            <transition name="slide-right" mode="out-in" appear>
              <component :is="Component" :key="$route.fullPath" />
            </transition>
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import LayoutHeader from '@/layout/basic/header.vue';
import LayoutMenu from '@/layout/navMenu/menuList.vue';
import TagsView from '@/layout/tagsView/index.vue';
import MenuData from '@/layout/navMenu/menuData';
import { useRouter, useRoute } from 'vue-router';
import { flattenTree, getFirstMenu, getParentMenu } from '@/utils/index';

export default defineComponent({
  components: { LayoutHeader, LayoutMenu, TagsView },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const isCollapse = ref(false);
    const defaultActive = ref('');
    defaultActive.value = route.fullPath;
    const tagsViewList = ref<any[]>([]);
    const result = flattenTree(MenuData);
    const firstMenu = getFirstMenu(result[0]);
    if (firstMenu) {
      const {
        path,
        meta: { title, icon },
      } = firstMenu;
      tagsViewList.value.push({
        title,
        icon,
        path,
      });
    }
    const [currentPath] = result.filter((item) => item.path === route.path);
    if (
      currentPath &&
      !tagsViewList.value.find((item) => item.path === currentPath?.path)
    ) {
      const {
        path,
        meta: { title, icon },
      } = currentPath;
      tagsViewList.value.push({
        title,
        icon,
        path,
      });
    }
    const breadcrumbList = computed(() => {
      return getParentMenu(result, defaultActive.value);
    });

    const handleCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };
    const handleSelectMenu = (key) => {
      if (!tagsViewList.value.find((item) => item.path === key)) {
        const [
          {
            path,
            meta: { title, icon },
          },
        ] = result.filter((item: any) => item.path === key);
        tagsViewList.value.push({ title, icon, path });
      }
      defaultActive.value = key;
      router.push({ path: key });
    };
    const handleDeleteTag = (key: string) => {
      // 删除的是当前选中的,因为第一个不允许删除，所以index最小是1
      const index = tagsViewList.value.findIndex((item) => item.path === key);
      if (defaultActive.value === key) {
        const { path } = tagsViewList.value[index - 1];
        handleSelectMenu(path);
      }
      tagsViewList.value.splice(index, 1);
    };
    return {
      router,
      route,
      MenuData,
      isCollapse,
      defaultActive,
      tagsViewList,
      breadcrumbList,
      handleCollapse,
      handleSelectMenu,
      handleDeleteTag,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.layout-aside .el-menu--vertical.el-menu--collapse) {
  transition: none;
}

.aside-collapse {
  width: 65px;
}

.main-header {
  background-color: var(--next-layout-bg-color);
  border-left: 1px solid var(--next-color-border);
}

.tags-view {
  border-top: 1px solid var(--next-color-border);
}
</style>
