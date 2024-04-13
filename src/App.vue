<template>
  <el-config-provider :locale="locale === 'zh-cn' ? zhCn : en">
    <keep-alive :include="keepAliveList">
      <router-view />
    </keep-alive>
  </el-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { ElConfigProvider } from 'element-plus';
import useConfigStore from '@/store/config';
import { useI18n } from 'vue-i18n';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/es/locale/lang/en';
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useConfigStore();
    const { locale } = useI18n();
    const language = computed(() => {
      return store.getLanguage();
    });
    watch(
      () => language.value,
      (val) => {
        locale.value = val;
      },
    );
    // TODO 这里配置需要缓存的页面
    const keepAliveList = ref([]);
    return {
      zhCn,
      en,
      locale,
      keepAliveList,
    };
  },
});
</script>

<style scoped></style>
